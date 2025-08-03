# Device-Based Authentication Guide

## Overview

This guide explains how to implement device-based authentication for the Vedic Astro mobile application. The backend now requires device registration and validation for all authentication operations, providing enhanced security for mobile users.

## 🔒 Security Architecture

### Strict Device Registration Process
1. **User Registration/Login**: Device ID and info are required
2. **Single Device Enforcement**: Only ONE device can be registered per user account
3. **No Device Replacement**: Cannot login from new device if already registered elsewhere
4. **Explicit Logout Required**: Users must logout to remove device registration
5. **Complete Device Removal**: Logout completely removes device from system
6. **New Device Registration**: Only allowed after previous device is removed

### Enhanced Security Features
- **Strict One Device Policy**: Each user can have only one registered device at any time
- **No Automatic Replacement**: Prevents unauthorized device switching
- **Explicit Device Management**: Users must consciously logout to switch devices
- **Complete Device Removal**: No traces left after logout for maximum security
- **Login Prevention**: Cannot login from new device until current device is removed
- **Session Security**: All sessions tied to specific device registration

## 📱 Android Implementation

### Required Headers
All authenticated API requests must include:

```javascript
headers: {
    'Authorization': 'Bearer ' + accessToken,
    'x-device-id': deviceId,              // Required: Unique device identifier
    'x-session-token': sessionToken,       // Optional: Enhanced security
    'Content-Type': 'application/json'
}
```

### Getting Android Device ID
```kotlin
// Method 1: Android ID (Recommended)
val androidId = Settings.Secure.getString(contentResolver, Settings.Secure.ANDROID_ID)

// Method 2: Build Serial (Fallback)
val deviceId = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    Build.getSerial()
} else {
    Build.SERIAL
}

// Method 3: Combined approach for uniqueness
val uniqueId = "${Build.BOARD}-${Build.BRAND}-${Build.DEVICE}-${androidId}"
```

### Device Information Collection
```kotlin
fun getDeviceInfo(): JSONObject {
    return JSONObject().apply {
        put("deviceName", "${Build.MANUFACTURER} ${Build.MODEL}")
        put("deviceModel", Build.MODEL)
        put("osVersion", "Android ${Build.VERSION.RELEASE}")
        put("appVersion", BuildConfig.VERSION_NAME)
        put("buildVersion", BuildConfig.VERSION_CODE)
        put("deviceManufacturer", Build.MANUFACTURER)
        put("deviceBrand", Build.BRAND)
    }
}
```

## 🔑 Authentication Flow

### 1. User Registration with Device
```kotlin
fun registerUser(email: String, password: String, username: String) {
    val deviceId = getDeviceId()
    val deviceInfo = getDeviceInfo()
    
    val requestBody = JSONObject().apply {
        put("username", username)
        put("email", email)
        put("password", password)
        put("deviceId", deviceId)
        put("deviceInfo", deviceInfo)
    }
    
    // API call to /api/auth/register
    makeApiCall("/api/auth/register", requestBody) { response ->
        if (response.success) {
            // Store tokens securely
            storeTokens(response.data.tokens.accessToken, 
                       response.data.tokens.refreshToken,
                       response.data.sessionToken)
        }
    }
}
```

### 2. User Login with Device Validation
```kotlin
fun loginUser(email: String, password: String) {
    val deviceId = getDeviceId()
    val deviceInfo = getDeviceInfo()
    
    val requestBody = JSONObject().apply {
        put("email", email)
        put("password", password)
        put("deviceId", deviceId)
        put("deviceInfo", deviceInfo)
    }
    
    // API call to /api/auth/login
    makeApiCall("/api/auth/login", requestBody) { response ->
        when {
            response.success -> {
                storeTokens(response.data.tokens.accessToken, 
                           response.data.tokens.refreshToken,
                           response.data.sessionToken)
            }
            response.errorCode == "DEVICE_ALREADY_REGISTERED" -> {
                // User already has a device registered elsewhere
                showDeviceAlreadyRegisteredDialog(response.message) {
                    // Provide option to contact support or logout from other device
                    showLogoutInstructions()
                }
            }
        }
    }
}
```

### 3. Google OAuth Login with Device
```kotlin
fun googleLogin(googleIdToken: String) {
    val deviceId = getDeviceId()
    val deviceInfo = getDeviceInfo()
    
    val requestBody = JSONObject().apply {
        put("token", googleIdToken)
        put("deviceId", deviceId)
        put("deviceInfo", deviceInfo)
    }
    
    // API call to /api/auth/google-login
    makeApiCall("/api/auth/google-login", requestBody) { response ->
        when {
            response.success -> {
                storeTokens(response.data.tokens.accessToken, 
                           response.data.tokens.refreshToken,
                           response.data.sessionToken)
                
                if (response.data.isNewUser) {
                    showWelcomeFlow()
                }
            }
            response.errorCode == "DEVICE_ALREADY_REGISTERED" -> {
                showDeviceAlreadyRegisteredDialog(response.message) {
                    showLogoutInstructions()
                }
            }
        }
    }
}
```

### 4. User Logout with Device Removal
```kotlin
fun logoutUser() {
    val deviceId = getDeviceId()
    
    val requestBody = JSONObject().apply {
        put("deviceId", deviceId)
    }
    
    // API call to /api/auth/logout
    makeApiCall("/api/auth/logout", requestBody) { response ->
        if (response.success) {
            // Clear all local tokens
            clearTokens()
            
            // Show success message
            showMessage("Logout successful. You can now login from any device.")
            
            // Redirect to login screen
            redirectToLogin()
        }
    }
}
```
```kotlin
fun googleLogin(googleIdToken: String) {
    val deviceId = getDeviceId()
    val deviceInfo = getDeviceInfo()
    
    val requestBody = JSONObject().apply {
        put("token", googleIdToken)
        put("deviceId", deviceId)
        put("deviceInfo", deviceInfo)
    }
    
    // API call to /api/auth/google-login
    makeApiCall("/api/auth/google-login", requestBody) { response ->
        if (response.success) {
            storeTokens(response.data.tokens.accessToken, 
                       response.data.tokens.refreshToken,
                       response.data.sessionToken)
            
            if (response.data.isNewUser) {
                // Show welcome flow for new users
                showWelcomeFlow()
            }
        }
    }
}
```

## 🛡️ Token Management

### Secure Token Storage
```kotlin
class TokenManager(private val context: Context) {
    private val sharedPrefs = context.getSharedPreferences("ldml_astro_tokens", Context.MODE_PRIVATE)
    
    fun storeTokens(accessToken: String, refreshToken: String, sessionToken: String) {
        sharedPrefs.edit().apply {
            putString("access_token", accessToken)
            putString("refresh_token", refreshToken)
            putString("session_token", sessionToken)
            putLong("token_timestamp", System.currentTimeMillis())
            apply()
        }
    }
    
    fun getAccessToken(): String? = sharedPrefs.getString("access_token", null)
    fun getRefreshToken(): String? = sharedPrefs.getString("refresh_token", null)
    fun getSessionToken(): String? = sharedPrefs.getString("session_token", null)
    
    fun clearTokens() {
        sharedPrefs.edit().clear().apply()
    }
}
```

### API Request Helper
```kotlin
class ApiClient {
    fun makeAuthenticatedRequest(
        endpoint: String, 
        method: String = "GET", 
        body: JSONObject? = null,
        callback: (JSONObject) -> Unit
    ) {
        val accessToken = tokenManager.getAccessToken()
        val sessionToken = tokenManager.getSessionToken()
        val deviceId = getDeviceId()
        
        val request = object : JsonObjectRequest(
            if (method == "GET") Request.Method.GET else Request.Method.POST,
            BASE_URL + endpoint,
            body,
            { response -> callback(response) },
            { error -> handleApiError(error) }
        ) {
            override fun getHeaders(): Map<String, String> {
                return mapOf(
                    "Authorization" to "Bearer $accessToken",
                    "x-device-id" to deviceId,
                    "x-session-token" to (sessionToken ?: ""),
                    "Content-Type" to "application/json"
                )
            }
        }
        
        Volley.newRequestQueue(context).add(request)
    }
}
```

## 📱 Device Management

### Get Current Device
```kotlin
fun getCurrentDevice() {
    apiClient.makeAuthenticatedRequest("/api/auth/devices") { response ->
        if (response.getBoolean("success")) {
            val device = response.getJSONObject("data").getJSONObject("device")
            displayCurrentDevice(device)
        }
    }
}
```

### Remove Current Device (Same as Logout)
```kotlin
fun removeCurrentDevice() {
    apiClient.makeAuthenticatedRequest(
        "/api/auth/devices/remove",
        "POST"
    ) { response ->
        if (response.getBoolean("success")) {
            // Clear local tokens
            tokenManager.clearTokens()
            
            showMessage("Device removed successfully. You can now login from a new device.")
            redirectToLogin()
        }
    }
}
```

### Handle Device Already Registered Error
```kotlin
fun handleDeviceAlreadyRegistered() {
    showDialog(
        title = "Device Already Registered",
        message = "You already have another device registered. To use this device, you need to logout from your current device first.",
        positiveButton = "Get Instructions" to { showLogoutInstructions() },
        negativeButton = "Contact Support" to { contactSupport() }
    )
}

fun showLogoutInstructions() {
    showInstructionsDialog(
        title = "How to Switch Devices",
        message = "To use this device:\n\n" +
                 "1. Open the app on your current device\n" +
                 "2. Go to Profile or Settings\n" +
                 "3. Tap 'Logout' or 'Remove Device'\n" +
                 "4. Return to this device and login again\n\n" +
                 "Note: Logging out will completely remove your device registration."
    )
}
```

### Refresh Session
```kotlin
fun refreshSession() {
    val deviceId = getDeviceId()
    val requestBody = JSONObject().apply {
        put("deviceId", deviceId)
    }
    
    apiClient.makeAuthenticatedRequest(
        "/api/auth/refresh-session",
        "POST",
        requestBody
    ) { response ->
        if (response.getBoolean("success")) {
            val newSessionToken = response.getJSONObject("data").getString("sessionToken")
            tokenManager.updateSessionToken(newSessionToken)
        }
    }
}
```

## ⚠️ Error Handling

### Device-Specific Errors
```kotlin
fun handleApiError(error: VolleyError) {
    val response = error.networkResponse
    if (response != null) {
        val errorData = JSONObject(String(response.data))
        val errorCode = errorData.optString("errorCode")
        
        when (errorCode) {
            "DEVICE_NOT_AUTHORIZED" -> {
                // Device has been removed or never registered
                showReLoginDialog("Your device is not registered. Please login again.")
                clearTokensAndRedirectToLogin()
            }
            
            "DEVICE_ALREADY_REGISTERED" -> {
                // User already has another device registered
                showDeviceAlreadyRegisteredDialog(
                    title = "Device Already Registered",
                    message = "You already have another device registered. Please logout from your current device first, then try again.",
                    actions = mapOf(
                        "Contact Support" to { contactSupport() },
                        "Try Again" to { /* retry login */ }
                    )
                )
            }
            
            "SESSION_INVALID" -> {
                // Session token expired or invalid
                refreshSession()
            }
            
            "TOKEN_EXPIRED" -> {
                // JWT token expired, refresh it
                refreshAccessToken()
            }
            
            else -> {
                // Handle other errors
                showGenericError(errorData.optString("message", "An error occurred"))
            }
        }
    }
}
```

## 🔧 Best Practices

### Device ID Management
1. **Consistency**: Always use the same method to generate device ID
2. **Persistence**: Device ID should persist across app updates
3. **Uniqueness**: Ensure device ID is unique per device
4. **Privacy**: Don't include personally identifiable information

### Security Considerations
1. **Token Storage**: Use Android Keystore for sensitive token storage
2. **Network Security**: Always use HTTPS for API communication
3. **Certificate Pinning**: Pin server certificates for additional security
4. **Proguard**: Obfuscate code to prevent reverse engineering

### Error Handling
1. **Graceful Degradation**: Handle offline scenarios gracefully
2. **User Feedback**: Provide clear error messages to users
3. **Retry Logic**: Implement exponential backoff for failed requests
4. **Logging**: Log errors for debugging but avoid sensitive data

### Performance Optimization
1. **Token Caching**: Cache tokens to avoid repeated login
2. **Session Management**: Refresh sessions proactively
3. **Background Sync**: Handle token refresh in background
4. **Connection Pooling**: Reuse HTTP connections when possible

## 🧪 Testing

### Test Device Registration
```kotlin
@Test
fun testDeviceRegistration() {
    val testDeviceId = "test_device_123"
    val testUser = createTestUser()
    
    // Mock device info
    val deviceInfo = JSONObject().apply {
        put("deviceName", "Test Device")
        put("deviceModel", "Test Model")
        put("osVersion", "Android 11")
        put("appVersion", "1.0.0")
    }
    
    // Test registration
    registerUser(testUser.email, testUser.password, testUser.username)
    
    // Verify device was registered
    val devices = getUserDevices()
    assertTrue(devices.any { it.deviceId == testDeviceId })
}
```

### Test Device Validation
```kotlin
@Test
fun testDeviceValidation() {
    // Register device first
    registerDevice()
    
    // Make authenticated request
    val response = makeAuthenticatedRequest("/api/users/profile")
    assertTrue(response.success)
    
    // Test with invalid device
    val invalidResponse = makeRequestWithInvalidDevice("/api/users/profile")
    assertEquals("DEVICE_NOT_AUTHORIZED", invalidResponse.errorCode)
}
```

## 📊 Monitoring & Analytics

### Device Usage Tracking
```kotlin
fun trackDeviceUsage() {
    val deviceMetrics = JSONObject().apply {
        put("deviceId", getDeviceId())
        put("appVersion", BuildConfig.VERSION_NAME)
        put("osVersion", Build.VERSION.RELEASE)
        put("sessionDuration", getSessionDuration())
        put("lastActiveTime", System.currentTimeMillis())
    }
    
    // Send to analytics service
    sendAnalytics("device_usage", deviceMetrics)
}
```

## 🚀 Deployment Considerations

### Production Setup
1. **Environment Variables**: Configure secure JWT secrets
2. **Database Security**: Use encrypted connections and strong passwords
3. **Rate Limiting**: Implement API rate limiting to prevent abuse
4. **Monitoring**: Set up server monitoring and alerting
5. **Backup**: Regular database backups with device data

### Scaling Considerations
1. **Database Indexing**: Index device_id and user_id columns
2. **Connection Pooling**: Configure appropriate pool sizes
3. **Caching**: Consider Redis for session management
4. **Load Balancing**: Distribute load across multiple servers

This guide provides comprehensive implementation details for device-based authentication. Ensure you follow security best practices and test thoroughly before deploying to production.
