# JWT Authentication Header Fix

## Issue
The JWT token was not being passed in the Authorization header to the protected `/api/login/profile` endpoint, causing authentication to fail.

## Root Cause
The auth interceptor was excluding ALL `/login` endpoints from receiving the JWT token header, but `/api/login/profile` is a protected endpoint that requires authentication.

## Solution

### 1. Frontend Auth Interceptor Updates

**Web App (`web/src/app/interceptors/auth.interceptor.ts`)**
```typescript
// Before: Excluded all /login endpoints
if (token && !request.url.includes('/login')) {

// After: Only exclude public login endpoints
const isPublicLoginEndpoint = request.url.includes('/login/validate') || 
                             request.url.includes('/login/google') ||
                             request.url.includes('/register');

if (token && !isPublicLoginEndpoint) {
```

**Admin App (`admin/src/app/interceptors/auth.interceptor.ts`)**
```typescript
// Same fix applied to admin interceptor
const isPublicLoginEndpoint = req.url.includes('/login/validate') || 
                             req.url.includes('/login/google') ||
                             req.url.includes('/register');

if (token && !isPublicLoginEndpoint) {
```

### 2. Backend Security Configuration Update

**Updated Security Rules (`SecurityConfig.java`)**
```java
// Before: Allowed all /api/login/** endpoints
.requestMatchers("/api/login/**", "/api/register/**").permitAll()

// After: Only allow specific public login endpoints
.requestMatchers("/api/login/validate", "/api/login/google").permitAll()
.requestMatchers("/api/register/**").permitAll()
```

## Endpoint Classification

### Public Endpoints (No JWT Required)
- `POST /api/login/validate` - User login
- `POST /api/login/google` - Google OAuth login
- `POST /api/register/**` - User registration
- `GET /api/auth/validate-token` - Token validation
- `POST /api/auth/logout` - Logout

### Protected Endpoints (JWT Required)
- `GET /api/login/profile` - Get user profile (NEW)
- All other `/api/**` endpoints

## How It Works Now

1. **Login Flow**:
   - User logs in via `/api/login/validate` (no token needed)
   - Server returns JWT token only
   - Frontend stores token and calls `/api/login/profile` (WITH token)
   - Server returns user profile data

2. **Token Handling**:
   - Auth interceptor adds `Authorization: Bearer <token>` to all API requests
   - EXCEPT for public login/register endpoints
   - Profile endpoint now receives token and can authenticate user

3. **Error Handling**:
   - 401 responses on protected routes trigger automatic redirect to login
   - Token expiration is properly handled

## Testing

To verify the fix works:

1. Login successfully → Should receive token
2. Profile endpoint should be called automatically with token
3. Check browser network tab → `/api/login/profile` should have Authorization header
4. Should see user data loaded without authentication errors

## Files Modified

- `web/src/app/interceptors/auth.interceptor.ts`
- `admin/src/app/interceptors/auth.interceptor.ts` 
- `src/main/java/com/vedicastrology/config/SecurityConfig.java`

The fix ensures that protected endpoints receive the JWT token while keeping public endpoints accessible without authentication.
