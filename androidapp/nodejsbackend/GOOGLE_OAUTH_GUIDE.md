# Google OAuth Integration Test

This file contains sample code and test scenarios for the Google OAuth implementation.

## Testing the Google Login Endpoint

### Using curl (for testing purposes only)
```bash
# Note: In production, you'll get real Google ID tokens from the Android app
curl -X POST http://localhost:3000/api/auth/google-login \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_google_id_token_here"
  }'
```

### Expected Response Format
```json
{
  "success": true,
  "message": "Google login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john.doe@gmail.com",
      "full_name": "John Doe",
      "profile_picture": "https://lh3.googleusercontent.com/...",
      "auth_provider": "google"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

## Android Implementation Example

### 1. Add Dependencies (build.gradle)
```gradle
implementation 'com.google.android.gms:play-services-auth:20.7.0'
implementation 'com.google.firebase:firebase-auth:22.3.0'
```

### 2. Configure Google Sign-In
```java
// Configure Google Sign-In options
GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
    .requestIdToken(getString(R.string.default_web_client_id)) // From google-services.json
    .requestEmail()
    .build();

GoogleSignInClient googleSignInClient = GoogleSignIn.getClient(this, gso);
```

### 3. Handle Sign-In
```java
private void signInWithGoogle() {
    Intent signInIntent = googleSignInClient.getSignInIntent();
    startActivityForResult(signInIntent, RC_SIGN_IN);
}

@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    
    if (requestCode == RC_SIGN_IN) {
        Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
        try {
            GoogleSignInAccount account = task.getResult(ApiException.class);
            String idToken = account.getIdToken();
            
            // Send idToken to your backend
            sendTokenToBackend(idToken);
        } catch (ApiException e) {
            Log.w("GoogleSignIn", "Google sign in failed", e);
        }
    }
}
```

### 4. Send Token to Backend
```java
private void sendTokenToBackend(String idToken) {
    // Using Retrofit or similar HTTP client
    ApiService apiService = RetrofitClient.getClient().create(ApiService.class);
    
    GoogleLoginRequest request = new GoogleLoginRequest(idToken);
    Call<LoginResponse> call = apiService.googleLogin(request);
    
    call.enqueue(new Callback<LoginResponse>() {
        @Override
        public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
            if (response.isSuccessful() && response.body().isSuccess()) {
                LoginResponse loginResponse = response.body();
                // Store JWT tokens for future API calls
                saveTokens(loginResponse.getData().getTokens());
                navigateToMainActivity();
            }
        }
        
        @Override
        public void onFailure(Call<LoginResponse> call, Throwable t) {
            // Handle error
        }
    });
}
```

## Security Considerations

1. **Token Validation**: Always validate Google ID tokens on the server side
2. **HTTPS Only**: Use HTTPS in production for all API calls
3. **Token Storage**: Store JWT tokens securely on the client side
4. **Token Refresh**: Implement token refresh mechanism for expired JWTs
5. **User Consent**: Ensure proper user consent for data collection

## Error Handling

Common error scenarios:
- Invalid Google token
- Unverified Google email
- Network connectivity issues
- Backend server errors

## Testing Checklist

- [ ] Google Cloud Console project configured
- [ ] Client ID added to .env file
- [ ] Server accepts and validates Google ID tokens
- [ ] New users are created automatically
- [ ] Existing users are updated with Google info
- [ ] JWT tokens are generated correctly
- [ ] Profile pictures are fetched from Google
- [ ] Username generation works for duplicate scenarios
