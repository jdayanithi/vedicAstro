# API Documentation

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
- **Device Registration**: Each user can register up to 3 mobile devices
- **Device Tracking**: Monitors device info, login history, and suspicious activity
- **Session Management**: Device-specific login sessions with automatic expiration
- **Security Monitoring**: Detects and prevents unauthorized device access

### Error Codes
- `DEVICE_NOT_AUTHORIZED` - Device not registered or deactivated
- `DEVICE_REGISTRATION_FAILED` - Cannot register device (limit reached, etc.)
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
- **Description**: Logout user (client-side token removal)
- **Authentication**: None required

#### Get Registered Devices
- **GET** `/auth/devices`
- **Description**: Get list of user's registered mobile devices
- **Authentication**: Required (JWT + Device ID)
- **Response**:
```json
{
  "success": true,
  "message": "Devices retrieved successfully",
  "data": {
    "devices": [
      {
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
    ]
  }
}
```

#### Deactivate Device
- **POST** `/auth/devices/:deviceId/deactivate`
- **Description**: Deactivate a registered device (cannot deactivate current device)
- **Authentication**: Required (JWT + Device ID)
- **Response**:
```json
{
  "success": true,
  "message": "Device deactivated successfully"
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

### Google Play Billing

#### Verify Google Play Purchase
- **POST** `/billing/google-play/verify-purchase`
- **Description**: Verify and process Google Play in-app purchase
- **Authentication**: Required
- **Body**:
```json
{
  "productId": "string (Google Play product ID)",
  "purchaseToken": "string (Google Play purchase token)",
  "courseId": "integer (course to enroll in)",
  "isSubscription": "boolean (optional, default: false)"
}
```

#### Get Subscription Status
- **GET** `/billing/google-play/subscription-status/:courseId`
- **Description**: Get user's Google Play subscription status for a course
- **Authentication**: Required

#### Check Subscription with Google Play
- **POST** `/billing/google-play/check-subscription`
- **Description**: Verify current subscription status with Google Play servers
- **Authentication**: Required
- **Body**:
```json
{
  "subscriptionId": "string (Google Play subscription ID)",
  "purchaseToken": "string (Google Play purchase token)"
}
```

#### Google Play Webhook
- **POST** `/billing/google-play/webhook`
- **Description**: Handle Google Play Real-time Developer Notifications
- **Authentication**: None (secured by Google's pub/sub system)
- **Note**: Used for automatic subscription status updates

## Database Setup

To enable full functionality, set up MySQL:

1. Install MySQL Server
2. Create a database (or let the app create it automatically)
3. Update `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=vedic_astro
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

## Google OAuth Setup

To enable Google login functionality:

### 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable Google+ API or Google Sign-In API
4. Go to "Credentials" and create OAuth 2.0 Client ID
5. Configure authorized JavaScript origins and redirect URIs
6. Copy the Client ID and Client Secret

### 2. Environment Configuration
Update your `.env` file:
```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 3. Client-Side Integration (Android)
In your Android app, implement Google Sign-In:
1. Add Google Sign-In SDK to your Android project
2. Configure `google-services.json` with your OAuth client ID
3. Implement Google Sign-In flow to get ID token
4. Send the ID token to `/api/auth/google-login` endpoint

### 4. Authentication Flow
1. **Android App**: User taps "Sign in with Google"
2. **Google SDK**: Shows Google login dialog
3. **Google**: Returns ID token to app
4. **Android App**: Sends token to `/api/auth/google-login`
5. **Backend**: Verifies token with Google, creates/updates user
6. **Backend**: Returns JWT tokens for app authentication
7. **Android App**: Stores JWT tokens for API calls

### 5. User Data Handling
- **New Users**: Automatically created with Google profile data
- **Existing Users**: Google info is merged with existing account
- **Profile Pictures**: Automatically synced from Google profile
- **Email Verification**: Google-verified emails are trusted

## Google Play Billing Setup

To enable Google Play in-app purchases and subscriptions:

### 1. Google Play Console Setup
1. Go to [Google Play Console](https://play.google.com/console/)
2. Select your app project
3. Navigate to "Monetize" > "Products" to create in-app products/subscriptions
4. Set up pricing and availability for each product
5. Go to "Setup" > "API access" and link a Google Cloud project
6. Create a service account and download the JSON key file

### 2. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the "Google Play Android Developer API"
3. Create a service account with "Editor" role
4. Generate and download the service account key (JSON file)
5. Share the service account email with your Google Play Console (with "Admin" role)

### 3. Server Configuration
1. Place the service account JSON file in `config/google-play-service-account.json`
2. Update your `.env` file:
```env
GOOGLE_PLAY_SERVICE_ACCOUNT_KEY_PATH=./config/google-play-service-account.json
GOOGLE_PLAY_PACKAGE_NAME=com.vedicastro.app
GOOGLE_PLAY_DEVELOPER_ACCOUNT_ID=your_developer_account_id
```

### 4. Android App Integration
Configure Google Play Billing in your Android app:

```gradle
// build.gradle (Module: app)
dependencies {
    implementation 'com.android.billingclient:billing:6.0.1'
}
```

### 5. Purchase Flow Example
```java
// Initialize billing client
private void initializeBillingClient() {
    billingClient = BillingClient.newBuilder(context)
        .setListener(purchaseUpdateListener)
        .enablePendingPurchases()
        .build();
    
    billingClient.startConnection(new BillingClientStateListener() {
        @Override
        public void onBillingSetupFinished(BillingResult billingResult) {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                // Ready to make purchases
            }
        }
        
        @Override onBillingServiceDisconnected() {
            // Try to restart connection
        }
    });
}

// Handle purchase updates
private PurchasesUpdatedListener purchaseUpdateListener = (billingResult, purchases) -> {
    if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK 
        && purchases != null) {
        for (Purchase purchase : purchases) {
            handlePurchase(purchase);
        }
    }
};

// Send purchase to your backend for verification
private void handlePurchase(Purchase purchase) {
    // Send to backend API
    apiService.verifyPurchase(new VerifyPurchaseRequest(
        purchase.getSkus().get(0),  // productId
        purchase.getPurchaseToken(),
        courseId,
        purchase.getSkus().get(0).contains("subscription") // isSubscription
    ));
}
```

### 6. Real-time Developer Notifications
Set up webhooks for automatic subscription updates:

1. In Google Play Console, go to "Monetize" > "Monetization setup"
2. Enable Real-time developer notifications
3. Set endpoint URL: `https://yourdomain.com/api/billing/google-play/webhook`
4. Configure Google Cloud Pub/Sub topic

### 7. Testing
- Use Google Play Console's "License Testing" for test accounts
- Test with real Google accounts added to "Internal testing" track
- Verify purchase tokens with the verification endpoints

## Payment Method Updates

The payment system now supports:
- `credit_card`, `debit_card`, `paypal`, `bank_transfer`, `upi`, `google_play`

Google Play purchases include additional fields:
- `google_play_purchase_token`: Unique purchase identifier
- `google_play_product_id`: Product SKU from Google Play
- `google_play_order_id`: Google Play order identifier
- `is_subscription`: Boolean flag for subscription purchases
- `subscription_start_date`: Start date for subscriptions
- `subscription_end_date`: Expiry date for subscriptions
