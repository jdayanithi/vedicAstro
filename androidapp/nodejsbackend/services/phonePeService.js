const crypto = require('crypto');
const axios = require('axios');

class PhonePeService {
  constructor() {
    this.merchantId = process.env.PHONEPE_MERCHANT_ID;
    this.saltKey = process.env.PHONEPE_SALT_KEY;
    this.saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://api.phonepe.com/apis/hermes'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox';
  }

  /**
   * Generate PhonePe payment request
   * @param {Object} paymentData - Payment details
   * @returns {Object} Payment initiation response
   */
  async initiatePayment(paymentData) {
    try {
      const { userId, courseId, amount, callbackUrl, redirectUrl, mobileNumber } = paymentData;
      
      // Generate unique transaction ID
      const transactionId = `TXN${Date.now()}${userId}`;
      
      // Prepare payment request
      const paymentRequest = {
        merchantId: this.merchantId,
        merchantTransactionId: transactionId,
        merchantUserId: `USER_${userId}`,
        amount: Math.round(amount * 100), // Convert to paise
        redirectUrl: redirectUrl || `${process.env.FRONTEND_URL}/payment/success`,
        redirectMode: 'POST',
        callbackUrl: callbackUrl || `${process.env.API_BASE_URL}/api/payments/phonepe/callback`,
        mobileNumber: mobileNumber,
        paymentInstrument: {
          type: 'PAY_PAGE'
        }
      };

      // Encode payload
      const payload = Buffer.from(JSON.stringify(paymentRequest)).toString('base64');
      
      // Generate checksum
      const checksum = this.generateChecksum(payload);

      // API call to PhonePe
      const response = await axios.post(
        `${this.baseUrl}/pg/v1/pay`,
        {
          request: payload
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'accept': 'application/json'
          }
        }
      );

      if (response.data.success) {
        return {
          success: true,
          transactionId,
          paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
          merchantTransactionId: transactionId
        };
      } else {
        throw new Error(response.data.message || 'Payment initiation failed');
      }

    } catch (error) {
      console.error('PhonePe payment initiation error:', error);
      throw new Error(`Payment initiation failed: ${error.message}`);
    }
  }

  /**
   * Verify payment status
   * @param {string} merchantTransactionId - Transaction ID
   * @returns {Object} Payment verification response
   */
  async verifyPayment(merchantTransactionId) {
    try {
      const checksum = this.generateChecksumForStatus(merchantTransactionId);
      
      const response = await axios.get(
        `${this.baseUrl}/pg/v1/status/${this.merchantId}/${merchantTransactionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': this.merchantId,
            'accept': 'application/json'
          }
        }
      );

      return {
        success: response.data.success,
        code: response.data.code,
        message: response.data.message,
        data: response.data.data
      };

    } catch (error) {
      console.error('PhonePe payment verification error:', error);
      throw new Error(`Payment verification failed: ${error.message}`);
    }
  }

  /**
   * Generate checksum for payment request
   * @param {string} payload - Base64 encoded payload
   * @returns {string} Checksum
   */
  generateChecksum(payload) {
    const string = payload + '/pg/v1/pay' + this.saltKey;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    return sha256 + '###' + this.saltIndex;
  }

  /**
   * Generate checksum for status check
   * @param {string} merchantTransactionId - Transaction ID
   * @returns {string} Checksum
   */
  generateChecksumForStatus(merchantTransactionId) {
    const string = `/pg/v1/status/${this.merchantId}/${merchantTransactionId}` + this.saltKey;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    return sha256 + '###' + this.saltIndex;
  }

  /**
   * Verify callback checksum
   * @param {string} response - Base64 encoded response
   * @param {string} checksum - Received checksum
   * @returns {boolean} Verification result
   */
  verifyCallback(response, checksum) {
    try {
      const payload = Buffer.from(response, 'base64').toString();
      const expectedChecksum = crypto
        .createHash('sha256')
        .update(payload + this.saltKey)
        .digest('hex') + '###' + this.saltIndex;
      
      return checksum === expectedChecksum;
    } catch (error) {
      console.error('Callback verification error:', error);
      return false;
    }
  }
}

module.exports = new PhonePeService();
