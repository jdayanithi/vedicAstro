# JWT Authentication Implementation

## Overview
This implementation provides a complete JWT-based authentication system with automatic token validation, configurable token expiration, and automatic redirect to login on token failure.

## Key Features
- **JWT Token Only Response**: Login endpoints now return only the JWT token
- **Configurable Token Expiration**: Set to 5 minutes (configurable)
- **Automatic Token Validation**: All `/api` routes require valid JWT tokens
- **Auto Redirect on Token Failure**: Automatic redirect to login when token expires/fails
- **User Profile Endpoint**: Fetch user details using JWT token

## Backend Changes

### 1. JWT Service (`JwtService.java`)
```java
private static final long JWT_TOKEN_VALIDITY = 5 * 60 * 1000; // 5 minutes configurable
```
- Changed token validity from 24 hours to 5 minutes
- Can be easily configured by changing this value

### 2. Login Controller (`LoginController.java`)
**Updated Login Response:**
```java
// Create response with only token
Map<String, Object> response = new HashMap<>();
response.put("token", token);
return ResponseEntity.ok(response);
```

**New Profile Endpoint:**
```java
@GetMapping("/profile")
public ResponseEntity<?> getUserProfile() {
    // Returns user profile based on JWT token
}
```

### 3. Security Configuration (`SecurityConfig.java`)
```java
.authorizeHttpRequests(auth -> auth
    // Allow login endpoints (unprotected)
    .requestMatchers("/api/login/**", "/api/register/**").permitAll()
    
    // Protect all other API endpoints - require authentication
    .requestMatchers("/api/**").authenticated()
    
    // Allow all other requests (for serving static content)
    .anyRequest().permitAll()
)
.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
```

### 4. JWT Authentication Filter (`JwtAuthenticationFilter.java`)
- Validates JWT tokens for all `/api` requests
- Returns proper error responses for expired/invalid tokens
- Handles both user ID and email-based tokens

## Frontend Changes (Both Web & Admin)

### 1. Updated Interfaces
```typescript
interface LoginResponse {
  token: string; // Only token now
}

interface UserProfile {
  userId: number;
  username: string;
  role: string;
  // ... other user fields
}
```

### 2. Auth Service Updates
- **Login Method**: Now only receives token, then fetches user profile
- **Profile Fetching**: New method to get user profile using token
- **Token Validation**: Validates token on app initialization
- **Session Management**: Stores user profile after successful login

### 3. Auth Interceptor Updates
```typescript
// Add token to all API requests except login endpoints
if (token && !request.url.includes('/login')) {
  request = request.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
}

// Handle 401 responses for protected routes
if (error.status === 401 && request.url.includes('/api')) {
  this.authService.redirectToLogin();
}
```

## API Endpoints

### Authentication Endpoints (Public)
- `POST /api/login/validate` - Login with credentials, returns JWT token
- `POST /api/login/google` - Google OAuth login, returns JWT token
- `POST /api/register` - User registration

### Protected Endpoints (Require JWT)
- `GET /api/login/profile` - Get user profile from JWT
- `GET /api/auth/validate-token` - Validate current token
- `POST /api/auth/logout` - Logout (clear server session)
- All other `/api/**` routes

## Token Flow

1. **Login**: User submits credentials → Server validates → Returns JWT token only
2. **Profile Loading**: Frontend stores token → Fetches user profile using token
3. **API Requests**: All subsequent API calls include JWT token in Authorization header
4. **Token Validation**: Server validates token on each protected route
5. **Token Expiry**: When token expires (5 min), server returns 401 → Frontend redirects to login

## Error Handling

### Backend Error Responses
```json
{
  "status": 401,
  "error": "Unauthorized", 
  "message": "Token has expired"
}
```

### Frontend Behavior
- 401 errors on `/api` routes → Automatic redirect to login
- Token validation failure → Clear session and redirect
- Network errors → Show appropriate error messages

## Configuration

### Token Expiration
Change in `JwtService.java`:
```java
private static final long JWT_TOKEN_VALIDITY = 5 * 60 * 1000; // 5 minutes
```

### CORS Configuration
```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:4200", // Web app
    "http://localhost:4201", // Admin app  
    "http://localhost:8100"  // Mobile app
));
```

## Security Features

1. **Route Protection**: All `/api/**` routes require valid JWT tokens
2. **Token Validation**: Server-side validation on every request
3. **Automatic Logout**: Expired tokens trigger automatic logout
4. **Session Management**: Secure token storage and cleanup
5. **CORS Protection**: Configured for specific allowed origins

## Testing

### Manual Testing Steps
1. Login with valid credentials → Should receive only token
2. Access protected route → Should work with valid token
3. Wait 5 minutes → Token should expire and redirect to login
4. Access protected route without token → Should get 401 and redirect

### Token Validation
```bash
# Test protected endpoint without token
curl -X GET http://localhost:8080/api/courses/with-access

# Test with valid token
curl -X GET http://localhost:8080/api/courses/with-access \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Maintenance

### Monitoring Token Issues
- Check browser console for 401 errors
- Monitor server logs for authentication failures
- Verify CORS settings for cross-origin requests

### Updating Token Expiration
1. Update `JWT_TOKEN_VALIDITY` in `JwtService.java`
2. Restart backend application
3. Test with new expiration time

This implementation provides a robust, secure JWT authentication system that automatically handles token expiration and provides a seamless user experience.
