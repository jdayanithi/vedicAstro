const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');
const path = require('path');

class GooglePlayBillingService {
  constructor() {
    this.packageName = process.env.GOOGLE_PLAY_PACKAGE_NAME;
    this.serviceAccountPath = process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_KEY_PATH;
    this.auth = null;
    this.androidPublisher = null;
    this.initialized = false;
  }

  /**
   * Initialize Google Play API client
   */
  async initialize() {
    try {
      if (!this.serviceAccountPath || !fs.existsSync(this.serviceAccountPath)) {
        console.warn('⚠️  Google Play service account file not found. In-app purchase validation disabled.');
        return false;
      }

      // Create auth client
      this.auth = new GoogleAuth({
        keyFile: this.serviceAccountPath,
        scopes: ['https://www.googleapis.com/auth/androidpublisher']
      });

      // Create Android Publisher API client
      this.androidPublisher = google.androidpublisher({
        version: 'v3',
        auth: this.auth
      });

      this.initialized = true;
      console.log('✅ Google Play Billing service initialized');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize Google Play Billing:', error.message);
      return false;
    }
  }

  /**
   * Verify a one-time product purchase
   * @param {string} productId - The product ID
   * @param {string} purchaseToken - Purchase token from Android
   * @returns {Object} Purchase validation result
   */
  async verifyPurchase(productId, purchaseToken) {
    if (!this.initialized) {
      await this.initialize();
    }

    if (!this.initialized) {
      throw new Error('Google Play Billing service not available');
    }

    try {
      const response = await this.androidPublisher.purchases.products.get({
        packageName: this.packageName,
        productId: productId,
        token: purchaseToken
      });

      const purchase = response.data;
      
      return {
        isValid: true,
        purchaseState: this.getPurchaseStateText(purchase.purchaseState),
        consumptionState: this.getConsumptionStateText(purchase.consumptionState),
        developerPayload: purchase.developerPayload,
        purchaseTimeMillis: purchase.purchaseTimeMillis,
        orderId: purchase.orderId,
        acknowledgmentState: this.getAcknowledgmentStateText(purchase.acknowledgmentState),
        kind: purchase.kind,
        regionCode: purchase.regionCode
      };
    } catch (error) {
      console.error('Purchase verification failed:', error);
      throw new Error(`Purchase verification failed: ${error.message}`);
    }
  }

  /**
   * Verify a subscription purchase
   * @param {string} subscriptionId - The subscription ID
   * @param {string} purchaseToken - Purchase token from Android
   * @returns {Object} Subscription validation result
   */
  async verifySubscription(subscriptionId, purchaseToken) {
    if (!this.initialized) {
      await this.initialize();
    }

    if (!this.initialized) {
      throw new Error('Google Play Billing service not available');
    }

    try {
      const response = await this.androidPublisher.purchases.subscriptions.get({
        packageName: this.packageName,
        subscriptionId: subscriptionId,
        token: purchaseToken
      });

      const subscription = response.data;
      
      return {
        isValid: true,
        startTimeMillis: subscription.startTimeMillis,
        expiryTimeMillis: subscription.expiryTimeMillis,
        autoRenewing: subscription.autoRenewing,
        priceCurrencyCode: subscription.priceCurrencyCode,
        priceAmountMicros: subscription.priceAmountMicros,
        countryCode: subscription.countryCode,
        developerPayload: subscription.developerPayload,
        paymentState: this.getPaymentStateText(subscription.paymentState),
        cancelReason: this.getCancelReasonText(subscription.cancelReason),
        orderId: subscription.orderId,
        acknowledgmentState: this.getAcknowledgmentStateText(subscription.acknowledgmentState)
      };
    } catch (error) {
      console.error('Subscription verification failed:', error);
      throw new Error(`Subscription verification failed: ${error.message}`);
    }
  }

  /**
   * Acknowledge a purchase
   * @param {string} productId - The product ID
   * @param {string} purchaseToken - Purchase token from Android
   */
  async acknowledgePurchase(productId, purchaseToken) {
    if (!this.initialized) {
      await this.initialize();
    }

    if (!this.initialized) {
      throw new Error('Google Play Billing service not available');
    }

    try {
      await this.androidPublisher.purchases.products.acknowledge({
        packageName: this.packageName,
        productId: productId,
        token: purchaseToken
      });
      
      return { acknowledged: true };
    } catch (error) {
      console.error('Purchase acknowledgment failed:', error);
      throw new Error(`Purchase acknowledgment failed: ${error.message}`);
    }
  }

  /**
   * Acknowledge a subscription
   * @param {string} subscriptionId - The subscription ID
   * @param {string} purchaseToken - Purchase token from Android
   */
  async acknowledgeSubscription(subscriptionId, purchaseToken) {
    if (!this.initialized) {
      await this.initialize();
    }

    if (!this.initialized) {
      throw new Error('Google Play Billing service not available');
    }

    try {
      await this.androidPublisher.purchases.subscriptions.acknowledge({
        packageName: this.packageName,
        subscriptionId: subscriptionId,
        token: purchaseToken
      });
      
      return { acknowledged: true };
    } catch (error) {
      console.error('Subscription acknowledgment failed:', error);
      throw new Error(`Subscription acknowledgment failed: ${error.message}`);
    }
  }

  // Helper methods for status text conversion
  getPurchaseStateText(state) {
    const states = {
      0: 'Purchased',
      1: 'Canceled',
      2: 'Pending'
    };
    return states[state] || 'Unknown';
  }

  getConsumptionStateText(state) {
    const states = {
      0: 'Yet to be consumed',
      1: 'Consumed'
    };
    return states[state] || 'Unknown';
  }

  getAcknowledgmentStateText(state) {
    const states = {
      0: 'Yet to be acknowledged',
      1: 'Acknowledged'
    };
    return states[state] || 'Unknown';
  }

  getPaymentStateText(state) {
    const states = {
      0: 'Payment pending',
      1: 'Payment received',
      2: 'Free trial',
      3: 'Pending deferred upgrade/downgrade'
    };
    return states[state] || 'Unknown';
  }

  getCancelReasonText(reason) {
    const reasons = {
      0: 'User canceled',
      1: 'System canceled',
      2: 'Replaced with new subscription',
      3: 'Developer canceled'
    };
    return reasons[reason] || 'Unknown';
  }
}

module.exports = new GooglePlayBillingService();
