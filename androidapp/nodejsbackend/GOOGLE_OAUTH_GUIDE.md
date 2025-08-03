# Google OAuth Integration Guide

## Overview
This guide covers the complete Google OAuth integration for the Vedic Astro mobile application. The backend supports Google Sign-In with automatic user creation, account linking, and strict device security.

## Table of Contents
1. [Google Cloud Console Setup](#google-cloud-console-setup)
2. [Backend Configuration](#backend-configuration)
3. [Android Integration](#android-integration)
4. [API Usage](#api-usage)
5. [Security Features](#security-features)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

## Google Cloud Console Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "New Project" or select existing project
3. Enter project name: `vedic-astro-app`
4. Note your Project ID

### Step 2: Enable Google Sign-In API
1. Navigate to "APIs & Services" > "Library"
2. Search for "Google Sign-In API" or "Google+ API"
3. Click "Enable"
4. Also enable "People API" for profile information

### Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure consent screen first if prompted:
   - Application name: "Vedic Astro"
   - User support email: your email
   - Developer contact: your email
4. Create credentials for:
   - **Android Application**
   - **Web Application** (for backend verification)

### Step 4: Configure Android OAuth Client
1. Select "Android" as application type
2. Package name: `com.vedicastro.app` (match your Android package)
3. Get SHA-1 fingerprint:
   ```bash
   # Debug keystore
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   
   # Release keystore
   keytool -list -v -keystore your-release-key.keystore -alias your-key-alias
   ```
4. Enter SHA-1 fingerprint
5. Copy the Client ID

### Step 5: Configure Web OAuth Client
1. Create another OAuth 2.0 Client ID
2. Select "Web application"
3. Name: "Vedic Astro Backend"
4. No redirect URIs needed for backend verification
5. Copy Client ID and Client Secret

## Backend Configuration

### Environment Variables
Add to your `.env` file:
```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_web_client_id_here
GOOGLE_CLIENT_SECRET=your_web_client_secret_here
```

### Service Configuration
The Google Auth service is automatically initialized on server start:

```javascript
// services/googleAuth.js features:
- ID token verification
- User profile extraction
- Username generation
- Account creation/linking
- Email verification
```

## Android Integration

### Step 1: Add Dependencies
Add to your `app/build.gradle`:
```gradle
dependencies {
    implementation 'com.google.android.gms:play-services-auth:20.7.0'
    implementation 'com.google.android.gms:play-services-identity:18.0.1'
}
```

### Step 2: Configure google-services.json
1. Download `google-services.json` from Firebase Console or Google Cloud Console
2. Place in `app/` directory
3. Ensure it contains your OAuth client configuration

### Step 3: Initialize Google Sign-In Client
```kotlin
class GoogleSignInManager(private val context: Context) {
    private lateinit var googleSignInClient: GoogleSignInClient
    
    fun initialize() {
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(context.getString(R.string.server_client_id)) // Web client ID
            .requestEmail()
            .requestProfile()
            .build()
            
        googleSignInClient = GoogleSignIn.getClient(context, gso)
    }
    
    fun getSignInIntent(): Intent {
        return googleSignInClient.signInIntent
    }
    
    fun signOut() {
        googleSignInClient.signOut()
    }
}
```

### Step 4: Handle Sign-In Flow
```kotlin
class AuthActivity : AppCompatActivity() {
    private lateinit var googleSignInManager: GoogleSignInManager
    private val RC_SIGN_IN = 123
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        googleSignInManager = GoogleSignInManager(this)
        googleSignInManager.initialize()
        
        // Google Sign-In button click
        googleSignInButton.setOnClickListener {
            startGoogleSignIn()
        }
    }
    
    private fun startGoogleSignIn() {
        val signInIntent = googleSignInManager.getSignInIntent()
        startActivityForResult(signInIntent, RC_SIGN_IN)
    }
    
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        
        if (requestCode == RC_SIGN_IN) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            handleSignInResult(task)
        }
    }
    
    private fun handleSignInResult(completedTask: Task<GoogleSignInAccount>) {
        try {
            val account = completedTask.getResult(ApiException::class.java)
            val idToken = account.idToken
            
            if (idToken != null) {
                sendTokenToBackend(idToken)
            } else {
                showError("Failed to get Google ID token")
            }
        } catch (e: ApiException) {
            showError("Google sign-in failed: ${e.statusCode}")
        }
    }
}
```

### Step 5: Send Token to Backend
```kotlin
private fun sendTokenToBackend(idToken: String) {
    val deviceId = getDeviceId()
    val deviceInfo = getDeviceInfo()
    
    val requestBody = JSONObject().apply {
        put("token", idToken)
        put("deviceId", deviceId)
        put("deviceInfo", deviceInfo)
    }
    
    val request = object : JsonObjectRequest(
        Method.POST,
        "$BASE_URL/api/auth/google-login",
        requestBody,
        { response ->
            handleLoginSuccess(response)
        },
        { error ->
            handleLoginError(error)
        }
    ) {
        override fun getHeaders(): Map<String, String> {
            return mapOf("Content-Type" to "application/json")
        }
    }
    
    Volley.newRequestQueue(this).add(request)
}

private fun handleLoginSuccess(response: JSONObject) {
    val success = response.getBoolean("success")
    
    if (success) {
        val data = response.getJSONObject("data")
        val user = data.getJSONObject("user")
        val tokens = data.getJSONObject("tokens")
        val sessionToken = data.getString("sessionToken")
        val isNewUser = data.getBoolean("isNewUser")
        
        // Store tokens securely
        tokenManager.storeTokens(
            tokens.getString("accessToken"),
            tokens.getString("refreshToken"),
            sessionToken
        )
        
        // Navigate to main app
        if (isNewUser) {
            startActivity(Intent(this, WelcomeActivity::class.java))
        } else {
            startActivity(Intent(this, MainActivity::class.java))
        }
        finish()
    }
}

private fun handleLoginError(error: VolleyError) {
    val response = error.networkResponse
    if (response != null) {
        val errorData = JSONObject(String(response.data))
        val errorCode = errorData.optString("errorCode")
        
        when (errorCode) {
            "DEVICE_ALREADY_REGISTERED" -> {
                showDeviceAlreadyRegisteredDialog(errorData.getString("message"))
            }
            else -> {
                showError(errorData.optString("message", "Login failed"))
            }
        }
    }
}
```

## API Usage

### Google Login Endpoint
**POST** `/api/auth/google-login`

**Request Body:**
```json
{
  "token": "google_id_token_here",
  "deviceId": "unique_device_identifier",
  "deviceInfo": {
    "deviceName": "Samsung Galaxy S21",
    "deviceModel": "SM-G991B",
    "osVersion": "Android 13",
    "appVersion": "1.0.0"
  }
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Google login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "johnsmith",
      "email": "john@gmail.com",
      "full_name": "John Smith",
      "profile_picture": "https://lh3.googleusercontent.com/...",
      "auth_provider": "google"
    },
    "tokens": {
      "accessToken": "jwt_access_token",
      "refreshToken": "jwt_refresh_token"
    },
    "sessionToken": "session_token",
    "deviceRegistered": true,
    "isNewUser": false
  }
}
```

**Error Response (Device Already Registered):**
```json
{
  "success": false,
  "message": "User already has another device registered. Please logout from your current device first.",
  "errorCode": "DEVICE_ALREADY_REGISTERED"
}
```

## Security Features

### 1. Server-Side Token Verification
- ID tokens are verified using Google's libraries
- Audience validation ensures tokens are for your app
- Signature verification prevents token tampering
- Expiration time is checked automatically

### 2. Device Security Integration
- Google login includes strict device registration
- Same single-device policy applies to Google users
- Device validation prevents unauthorized access
- Session management with device binding

### 3. Account Linking
- Existing email users can link Google accounts
- Google profile data is merged with existing accounts
- Auth provider is updated to 'google'
- Profile pictures are automatically synced

### 4. Email Verification
- Only verified Google emails are accepted
- Email verification status is checked from Google
- Unverified emails are rejected with error message

## Testing

### Development Testing
1. **Use Test Accounts**: Create test Google accounts
2. **Debug Tokens**: Log ID tokens for verification
3. **Mock Responses**: Test error scenarios
4. **Device Testing**: Test on multiple devices

### Test Scenarios
```kotlin
// Test Google Sign-In flow
@Test
fun testGoogleSignIn() {
    val mockIdToken = "mock_google_id_token"
    val result = authService.googleLogin(mockIdToken)
    assertTrue(result.success)
}

// Test device registration with Google
@Test
fun testGoogleLoginWithDevice() {
    val deviceId = "test_device_123"
    val result = authService.googleLoginWithDevice(mockToken, deviceId)
    assertTrue(result.data.deviceRegistered)
}

// Test account creation vs linking
@Test
fun testAccountLinking() {
    // Create regular account first
    createRegularAccount("test@gmail.com")
    
    // Login with Google using same email
    val result = googleLogin("google_token_same_email")
    
    // Should link, not create new account
    assertFalse(result.data.isNewUser)
}
```

### Production Testing
1. **Release Keystore**: Update SHA-1 fingerprint
2. **Production Credentials**: Use production OAuth client
3. **Rate Limit Testing**: Test Google API limits
4. **Error Handling**: Test network failures

## Troubleshooting

### Common Issues

#### 1. "Invalid ID Token"
**Causes:**
- Wrong Client ID in environment variables
- Token expired or malformed
- Audience mismatch

**Solutions:**
```bash
# Check environment variables
echo $GOOGLE_CLIENT_ID

# Verify token structure
# ID tokens should have 3 parts separated by dots
echo "token" | base64 -d
```

#### 2. "SHA-1 Fingerprint Mismatch"
**Causes:**
- Debug/release keystore mismatch
- Wrong fingerprint in Google Console

**Solutions:**
```bash
# Get current fingerprint
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey

# Update Google Console with correct fingerprint
```

#### 3. "Device Already Registered" Error
**Causes:**
- User has another device registered
- Device ID changed between sessions

**Solutions:**
- Implement device management UI
- Provide logout instructions
- Clear app data as last resort

#### 4. "Email Not Verified" Error
**Causes:**
- Google account email not verified
- Test account without verification

**Solutions:**
- Ask user to verify email with Google
- Use different Google account
- Check email verification in Google account settings

### Debug Logging
Enable debug mode in development:
```javascript
// In googleAuth.js
if (process.env.NODE_ENV === 'development') {
  console.log('Google User Data:', googleUser);
  console.log('Token Payload:', payload);
}
```

### Network Issues
```kotlin
// Android network security config
// Add to res/xml/network_security_config.xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">10.0.2.2</domain>
    </domain-config>
</network-security-config>
```

## Integration Checklist

### Backend Setup
- [ ] Google Cloud Console project created
- [ ] OAuth 2.0 credentials configured
- [ ] Environment variables set
- [ ] Google Auth service initialized
- [ ] Database schema supports Google fields

### Android Setup
- [ ] Google Sign-In dependencies added
- [ ] google-services.json configured
- [ ] SHA-1 fingerprint registered
- [ ] Sign-in flow implemented
- [ ] Error handling implemented

### Testing
- [ ] Test accounts created
- [ ] Debug/production keystores configured
- [ ] Network connectivity tested
- [ ] Error scenarios tested
- [ ] Device registration tested

### Production
- [ ] Production OAuth credentials
- [ ] Release keystore fingerprint
- [ ] API rate limits configured
- [ ] Monitoring and logging enabled
- [ ] User support documentation

## Best Practices

### Security
1. **Never expose client secrets** in Android app
2. **Use web client ID** for backend verification
3. **Validate tokens server-side** always
4. **Implement proper session management**
5. **Handle token expiration gracefully**

### User Experience
1. **Clear error messages** for users
2. **Fallback authentication** options
3. **Account linking guidance** for existing users
4. **Privacy policy** compliance
5. **Logout functionality** clearly visible

### Performance
1. **Cache Google Sign-In state** appropriately
2. **Handle offline scenarios** gracefully
3. **Minimize API calls** to Google services
4. **Implement proper loading states**
5. **Background token refresh** when possible

This comprehensive guide should help you implement Google OAuth integration successfully with the Vedic Astro backend!
