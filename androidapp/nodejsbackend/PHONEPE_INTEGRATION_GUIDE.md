# PhonePe Payment Gateway Integration Guide

## Overview
This guide covers the integration of PhonePe Payment Gateway into the Vedic Astro backend application. PhonePe is one of India's leading digital payment platforms, supporting UPI, cards, wallets, and net banking.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Configuration](#configuration)
3. [API Endpoints](#api-endpoints)
4. [Payment Flow](#payment-flow)
5. [Database Schema](#database-schema)
6. [Security Considerations](#security-considerations)
7. [Testing](#testing)
8. [Error Handling](#error-handling)
9. [Production Deployment](#production-deployment)

## Prerequisites

### PhonePe Account Setup
1. Register as a merchant on PhonePe Business Dashboard
2. Complete KYC verification
3. Obtain Merchant ID and Salt Key
4. Configure webhook URLs
5. Set up test credentials for sandbox environment

### Technical Requirements
- Node.js with Express.js
- MySQL database
- HTTPS endpoint for production (required by PhonePe)
- Valid SSL certificate for production

## Configuration

### Environment Variables
Add the following variables to your `.env` file:

```bash
# PhonePe Configuration
PHONEPE_MERCHANT_ID=your_merchant_id
PHONEPE_SALT_KEY=your_salt_key
PHONEPE_SALT_INDEX=1
PHONEPE_API_URL=https://api-preprod.phonepe.com/apis/pg-sandbox
PHONEPE_ENVIRONMENT=sandbox

# App URLs
APP_URL=http://localhost:3000
API_URL=http://localhost:3000
```

### Production Configuration
For production, update the following:
```bash
PHONEPE_API_URL=https://api.phonepe.com/apis/hermes
PHONEPE_ENVIRONMENT=production
APP_URL=https://yourdomain.com
API_URL=https://api.yourdomain.com
```

## API Endpoints

### 1. Initiate Payment
**POST** `/api/phonepe/initiate`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "courseId": 1,
  "amount": 999.00,
  "redirectUrl": "https://yourapp.com/payment/success",
  "callbackUrl": "https://yourapi.com/api/phonepe/callback"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment initiated successfully",
  "data": {
    "paymentId": 123,
    "merchantTransactionId": "TXN_1_1704123456789_abc123def",
    "paymentUrl": "https://phonepe.com/pay/...",
    "transactionId": "T2024010112345678",
    "course": {
      "id": 1,
      "title": "Basic Vedic Astrology",
      "price": 999.00
    }
  }
}
```

### 2. Payment Callback (Webhook)
**POST** `/api/phonepe/callback`

This endpoint receives payment notifications from PhonePe. It's called automatically by PhonePe servers.

**Request Body (from PhonePe):**
```json
{
  "merchantId": "your_merchant_id",
  "merchantTransactionId": "TXN_1_1704123456789_abc123def",
  "transactionId": "T2024010112345678",
  "amount": 99900,
  "state": "COMPLETED",
  "responseCode": "SUCCESS",
  "checksum": "calculated_checksum"
}
```

### 3. Check Payment Status
**GET** `/api/phonepe/status/:merchantTransactionId`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Payment status retrieved successfully",
  "data": {
    "paymentId": 123,
    "merchantTransactionId": "TXN_1_1704123456789_abc123def",
    "amount": 999.00,
    "status": "completed",
    "phonePeStatus": "COMPLETED",
    "paymentDate": "2024-01-01T12:34:56.000Z",
    "courseId": 1
  }
}
```

### 4. Payment History
**GET** `/api/phonepe/history?page=1&limit=10`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Payment history retrieved successfully",
  "data": {
    "payments": [
      {
        "id": 123,
        "amount": 999.00,
        "payment_status": "completed",
        "payment_date": "2024-01-01T12:34:56.000Z",
        "phonepe_merchant_transaction_id": "TXN_1_1704123456789_abc123def",
        "phonepe_transaction_id": "T2024010112345678",
        "course_title": "Basic Vedic Astrology",
        "course_description": "Learn the fundamentals of Vedic Astrology"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalRecords": 47,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## Payment Flow

### 1. Frontend Integration
```javascript
// Initiate payment from your mobile app or web frontend
const initiatePayment = async (courseId, amount) => {
  try {
    const response = await fetch('/api/phonepe/initiate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        courseId,
        amount,
        redirectUrl: 'myapp://payment/success',
        callbackUrl: 'https://myapi.com/api/phonepe/callback'
      })
    });

    const data = await response.json();
    
    if (data.success) {
      // Redirect user to PhonePe payment page
      window.location.href = data.data.paymentUrl;
      // Or for mobile apps, open the URL in a WebView
    }
  } catch (error) {
    console.error('Payment initiation failed:', error);
  }
};
```

### 2. Payment Status Verification
```javascript
// Check payment status after redirect
const checkPaymentStatus = async (merchantTransactionId) => {
  try {
    const response = await fetch(`/api/phonepe/status/${merchantTransactionId}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });

    const data = await response.json();
    
    if (data.success && data.data.status === 'completed') {
      // Payment successful - update UI
      showSuccessMessage('Payment successful! Course enrolled.');
    } else {
      // Payment failed or pending
      showErrorMessage('Payment failed. Please try again.');
    }
  } catch (error) {
    console.error('Status check failed:', error);
  }
};
```

## Database Schema

The payment integration uses the following database tables:

### Payments Table
```sql
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('credit_card', 'debit_card', 'paypal', 'bank_transfer', 'upi', 'phonepe') NOT NULL,
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  transaction_id VARCHAR(255),
  payment_gateway VARCHAR(100),
  phonepe_transaction_id VARCHAR(255),
  phonepe_merchant_transaction_id VARCHAR(255),
  phonepe_response_code VARCHAR(50),
  phonepe_payment_method VARCHAR(100),
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
```

## Security Considerations

### 1. Checksum Verification
All PhonePe API requests and callbacks include a checksum for security verification:

```javascript
// Checksum generation for API requests
const generateChecksum = (payload, endpoint) => {
  const string = Buffer.from(payload).toString('base64') + endpoint + process.env.PHONEPE_SALT_KEY;
  return crypto.createHash('sha256').update(string).digest('hex') + '###' + process.env.PHONEPE_SALT_INDEX;
};

// Checksum verification for callbacks
const verifyChecksum = (receivedChecksum, payload) => {
  const string = payload + process.env.PHONEPE_SALT_KEY;
  const expectedChecksum = crypto.createHash('sha256').update(string).digest('hex');
  return receivedChecksum === expectedChecksum;
};
```

### 2. HTTPS Requirement
- PhonePe requires HTTPS endpoints for production
- Ensure valid SSL certificate is installed
- All callback URLs must use HTTPS

### 3. IP Whitelisting
- Configure PhonePe dashboard to whitelist your server IPs
- Verify callback requests come from PhonePe servers

## Testing

### 1. Sandbox Environment
PhonePe provides a sandbox environment for testing:
- API URL: `https://api-preprod.phonepe.com/apis/pg-sandbox`
- Test merchant credentials are provided
- No real money transactions

### 2. Test Scenarios
```javascript
// Test successful payment
const testSuccessfulPayment = async () => {
  const response = await initiatePayment(1, 10.00); // Minimum amount
  // Follow the payment flow and verify enrollment
};

// Test failed payment
const testFailedPayment = async () => {
  const response = await initiatePayment(1, 1.00); // Amount that triggers failure
  // Verify payment status remains 'failed'
};
```

### 3. Callback Testing
Use tools like ngrok to expose local server for callback testing:
```bash
# Install ngrok
npm install -g ngrok

# Expose local server
ngrok http 3000

# Use the HTTPS URL as callback URL
```

## Error Handling

### Common Error Codes
- `PAYMENT_ERROR`: Generic payment failure
- `INSUFFICIENT_FUNDS`: User has insufficient balance
- `TRANSACTION_NOT_FOUND`: Invalid transaction ID
- `CHECKSUM_MISMATCH`: Security verification failed
- `MERCHANT_NOT_FOUND`: Invalid merchant configuration

### Error Response Format
```json
{
  "success": false,
  "message": "Payment failed",
  "error": "INSUFFICIENT_FUNDS",
  "code": "B409"
}
```

## Production Deployment

### 1. Environment Setup
```bash
# Update environment variables
PHONEPE_ENVIRONMENT=production
PHONEPE_API_URL=https://api.phonepe.com/apis/hermes
APP_URL=https://yourdomain.com
API_URL=https://api.yourdomain.com
```

### 2. SSL Certificate
Ensure valid SSL certificate is installed and configured.

### 3. Webhook Configuration
Update PhonePe dashboard with production callback URLs:
- Success URL: `https://api.yourdomain.com/api/phonepe/callback`
- Failure URL: `https://api.yourdomain.com/api/phonepe/callback`

### 4. Monitoring and Logging
Implement comprehensive logging for production:
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'payment-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'payment-combined.log' })
  ]
});

// Log all payment events
logger.info('Payment initiated', { userId, courseId, amount, merchantTransactionId });
```

## Support and Documentation

### PhonePe Resources
- [Official PhonePe API Documentation](https://developer.phonepe.com/docs)
- [PhonePe Merchant Dashboard](https://merchant.phonepe.com)
- [PhonePe Developer Support](https://developer.phonepe.com/support)

### Integration Checklist
- [ ] PhonePe merchant account created and verified
- [ ] Environment variables configured
- [ ] HTTPS endpoint configured for production
- [ ] Database schema updated
- [ ] Callback URL whitelisted in PhonePe dashboard
- [ ] Payment flow tested in sandbox
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Production deployment verified

## Troubleshooting

### Common Issues
1. **Checksum mismatch**: Verify salt key and encoding
2. **Callback not received**: Check HTTPS and IP whitelisting
3. **Payment stuck in pending**: Implement status verification
4. **Invalid merchant ID**: Verify credentials in dashboard

### Debug Mode
Enable debug logging in development:
```javascript
if (process.env.NODE_ENV === 'development') {
  console.log('PhonePe Request:', requestData);
  console.log('PhonePe Response:', responseData);
}
```
