# Vedic Astro Backend API Documentation

## Overview
This API serves the Vedic Astrology mobile application with user authentication, strict device security, course management, and PhonePe payment integration.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require JWT authentication and device validation for mobile security. Include these headers:
```
Authorization: Bearer <your_jwt_token>
x-device-id: <unique_device_id>
x-session-token: <session_token> (optional, for enhanced security)
```

### Device Security Features
- **Strict Single Device Policy**: Each user can only have ONE active mobile device
- **No Device Replacement**: Users cannot login from new device if already registered elsewhere
- **Explicit Logout Required**: Users must logout to remove device registration
- **Complete Device Removal**: Logout completely removes device from system
- **New Device Registration**: Only allowed after previous device is removed via logout

### Error Codes
- `DEVICE_NOT_AUTHORIZED` - Device not registered or removed
- `DEVICE_ALREADY_REGISTERED` - User already has an active device, must logout first
- `SESSION_INVALID` - Session token expired or invalid
- `TOKEN_EXPIRED` - JWT token has expired

## Response Format
All responses follow this format:
```json
{
  "success": boolean,
  "message": "Response message",
  "data": {} // Optional response data
}
```

## Table of Contents
1. [Health Check](#health-check)
2. [Authentication](#authentication-endpoints)
3. [User Management](#user-management)
4. [Payment Integration (PhonePe)](#phonepe-payment-integration)
5. [Course Management](#course-management)

## Endpoints

### Health Check
- **GET** `/health`
- **Description**: Check server status
- **Authentication**: None required
- **Response**:
```json
{
  "status": "OK",
  "message": "Vedic Astro Backend Server is running",
  "timestamp": "2025-08-02T20:39:37.557Z"
}
```

### Authentication

#### Register User
- **POST** `/auth/register`
- **Description**: Create a new user account with email/password and register mobile device
- **Authentication**: None required
- **Body**:
```json
{
  "username": "string (min 3 chars)",
  "email": "string (valid email)",
  "password": "string (min 6 chars)",
  "full_name": "string (optional)",
  "phone": "string (optional)",
  "date_of_birth": "date (optional, YYYY-MM-DD)",
  "deviceId": "string (required - unique device identifier)",
  "deviceInfo": {
    "deviceName": "string (optional)",
    "deviceModel": "string (optional)",
    "osVersion": "string (optional)",
    "appVersion": "string (optional)"
  }
}
```

#### Login User
- **POST** `/auth/login`
- **Description**: Authenticate user with email/password, validate device, and get JWT tokens
- **Authentication**: None required
- **Body**:
```json
{
  "email": "string",
  "password": "string",
  "deviceId": "string (required - unique device identifier)",
  "deviceInfo": {
    "deviceName": "string (optional)",
    "deviceModel": "string (optional)",
    "osVersion": "string (optional)",
    "appVersion": "string (optional)"
  }
}
```

#### Google OAuth Login
- **POST** `/auth/google-login`
- **Description**: Authenticate user with Google OAuth token and register/validate device
- **Authentication**: None required
- **Body**:
```json
{
  "token": "string (Google ID token from client)",
  "deviceId": "string (required - unique device identifier)",
  "deviceInfo": {
    "deviceName": "string (optional)",
    "deviceModel": "string (optional)",
    "osVersion": "string (optional)",
    "appVersion": "string (optional)"
  }
}
```
- **Response**: Same as regular login, includes user profile with Google data, session token, and device registration status
- **Note**: Automatically creates account if user doesn't exist

#### Logout
- **POST** `/auth/logout`
- **Description**: Logout user and completely remove device registration
- **Authentication**: Required (JWT + Device ID)
- **Body**:
```json
{
  "deviceId": "string (current device ID)"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Logout successful. Device removed. You can now login from a new device."
}
```

#### Get Current Device
- **GET** `/auth/devices`
- **Description**: Get current user's active device information (single device policy)
- **Authentication**: Required (JWT + Device ID)
- **Response**:
```json
{
  "success": true,
  "message": "Device retrieved successfully",
  "data": {
    "device": {
      "deviceId": "unique_device_id_123",
      "deviceName": "John's Phone",
      "deviceModel": "Samsung Galaxy S21",
      "osVersion": "Android 12",
      "appVersion": "1.0.0",
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "registeredAt": "2024-01-10T08:15:00.000Z",
      "loginCount": 25
    }
  }
}
```

#### Remove Current Device
- **POST** `/auth/devices/remove`
- **Description**: Remove current device registration (allows login from new device)
- **Authentication**: Required (JWT + Device ID)
- **Response**:
```json
{
  "success": true,
  "message": "Device removed successfully. You can now login from a new device."
}
```

#### Refresh Session
- **POST** `/auth/refresh-session`
- **Description**: Create a new session token for the current device
- **Authentication**: Required (JWT + Device ID)
- **Body**:
```json
{
  "deviceId": "string (current device ID)"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Session refreshed successfully",
  "data": {
    "sessionToken": "new_session_token_456"
  }
}
```

### User Management

#### Get Profile
- **GET** `/users/profile`
- **Description**: Get current user's profile
- **Authentication**: Required

#### Update Profile
- **PUT** `/users/profile`
- **Description**: Update user profile information
- **Authentication**: Required
- **Body**:
```json
{
  "full_name": "string (optional)",
  "phone": "string (optional)",
  "date_of_birth": "date (optional)"
}
```

#### Change Password
- **PUT** `/users/change-password`
- **Description**: Change user password
- **Authentication**: Required
- **Body**:
```json
{
  "current_password": "string",
  "new_password": "string (min 6 chars)"
}
```

#### Get Enrolled Courses
- **GET** `/users/courses`
- **Description**: Get user's enrolled courses
- **Authentication**: Required

#### Deactivate Account
- **DELETE** `/users/account`
- **Description**: Deactivate user account
- **Authentication**: Required
- **Body**:
```json
{
  "password": "string"
}
```

### Courses & Payments

#### Get Available Courses
- **GET** `/payments/courses`
- **Description**: Get list of available courses
- **Authentication**: None required

#### Create Payment
- **POST** `/payments/create`
- **Description**: Create a payment record for course enrollment
- **Authentication**: Required
- **Body**:
```json
{
  "course_id": "integer",
  "amount": "decimal",
  "payment_method": "credit_card|debit_card|paypal|bank_transfer|upi",
  "transaction_id": "string (optional)",
  "payment_gateway": "string (optional)"
}
```

#### Update Payment Status
- **PUT** `/payments/update/:paymentId`
- **Description**: Update payment status (usually called by payment gateway)
- **Authentication**: Required
- **Body**:
```json
{
  "payment_status": "pending|completed|failed|refunded",
  "transaction_id": "string (optional)"
}
```

#### Get Payment History
- **GET** `/payments/history`
- **Description**: Get user's payment history
- **Authentication**: Required

#### Get Payment Details
- **GET** `/payments/:paymentId`
- **Description**: Get specific payment details
- **Authentication**: Required

## PhonePe Payment Integration

### Initiate Payment
- **POST** `/phonepe/initiate`
- **Description**: Initiate a PhonePe payment for course enrollment
- **Authentication**: Required
- **Body**:
```json
{
  "courseId": 1,
  "amount": 999.00,
  "redirectUrl": "https://yourapp.com/payment/success",
  "callbackUrl": "https://yourapi.com/api/phonepe/callback"
}
```
- **Response**:
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

### Payment Callback (Webhook)
- **POST** `/phonepe/callback`
- **Description**: Receive payment notifications from PhonePe (called automatically)
- **Authentication**: None (secured by checksum verification)
- **Note**: This endpoint is called by PhonePe servers to notify payment status

### Check Payment Status
- **GET** `/phonepe/status/:merchantTransactionId`
- **Description**: Check the status of a payment transaction
- **Authentication**: Required
- **Response**:
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

### Payment History
- **GET** `/phonepe/history?page=1&limit=10`
- **Description**: Get user's PhonePe payment history
- **Authentication**: Required
- **Response**:
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

## Database Setup

To enable full functionality, set up MySQL:

1. Install MySQL Server
2. Create a database (or let the app create it automatically)
3. Update `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ldml_db
DB_PORT=3306
```
4. Restart the server

The application will automatically create all required tables and sample data.

## Sample Courses

The system includes these sample courses:
1. Basic Vedic Astrology (₹999, 8 weeks)
2. Advanced Nakshatra Analysis (₹1499, 12 weeks)
3. Horoscope Reading Mastery (₹1999, 16 weeks)
4. Remedial Astrology (₹1299, 10 weeks)

## PhonePe Payment Gateway Setup

To enable PhonePe payments for Indian users:

### 1. PhonePe Merchant Account Setup
1. Visit [PhonePe Business](https://business.phonepe.com/) and register as a merchant
2. Complete KYC verification process
3. Submit required business documents
4. Wait for approval (usually 2-3 business days)
5. Once approved, access your merchant dashboard

### 2. Get API Credentials
1. Login to PhonePe Merchant Dashboard
2. Go to "Developer" section
3. Generate/copy your Merchant ID
4. Generate/copy your Salt Key
5. Note down the Salt Index (usually 1)

### 3. Environment Configuration
Update your `.env` file:
```env
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

### 4. Production Configuration
For live transactions, update:
```env
PHONEPE_API_URL=https://api.phonepe.com/apis/hermes
PHONEPE_ENVIRONMENT=production
APP_URL=https://yourdomain.com
API_URL=https://api.yourdomain.com
```

### 5. Webhook Configuration
In PhonePe dashboard, configure webhook URL:
- Callback URL: `https://api.yourdomain.com/api/phonepe/callback`
- Ensure your server has valid HTTPS certificate for production

### 6. Android App Integration
For Android app, integrate PhonePe payment flow:

```java
// Initiate payment from Android app
private void initiatePhonePePayment(int courseId, double amount) {
    // Call your backend API
    ApiService.initiatePayment(courseId, amount)
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe(response -> {
            if (response.isSuccess()) {
                String paymentUrl = response.getData().getPaymentUrl();
                // Open PhonePe payment page in WebView or browser
                openPaymentUrl(paymentUrl);
            }
        });
}

// Handle payment completion
private void handlePaymentResult(String merchantTransactionId) {
    // Check payment status
    ApiService.checkPaymentStatus(merchantTransactionId)
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe(response -> {
            if (response.isSuccess() && "completed".equals(response.getData().getStatus())) {
                // Payment successful - update UI
                showSuccessMessage("Payment successful! Course enrolled.");
                navigateToCourse();
            } else {
                showErrorMessage("Payment failed. Please try again.");
            }
        });
}
```

### 7. Testing
- Use sandbox environment for testing
- Test with small amounts (₹1 to ₹10)
- PhonePe provides test cards and UPI IDs
- Verify callback handling with test transactions

### 8. Security Features
- All requests include SHA256 checksum verification
- Callback authenticity verified using salt key
- HTTPS required for production
- IP whitelisting available in PhonePe dashboard

## Payment Method Updates

The payment system now supports:
- `credit_card`, `debit_card`, `paypal`, `bank_transfer`, `upi`, `phonepe`

PhonePe payments include additional fields:
- `phonepe_transaction_id`: Unique PhonePe transaction identifier
- `phonepe_merchant_transaction_id`: Your generated transaction ID
- `phonepe_response_code`: PhonePe response code (SUCCESS, FAILURE, etc.)
- `phonepe_payment_method`: Method used (UPI, card, wallet, etc.)

### Payment Status Values
- `pending`: Payment initiated but not completed
- `completed`: Payment successful and course enrolled
- `failed`: Payment failed or declined
- `refunded`: Payment refunded (manual process)
