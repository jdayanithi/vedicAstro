# DoS Protection for Login Authentication

## Overview
This implementation provides comprehensive protection against Denial of Service (DoS) attacks on login authentication endpoints. It tracks failed login attempts, implements IP-based rate limiting, and detects suspicious activity patterns.

## Features

### 🛡️ **Multi-Layer Protection**
- **IP-based blocking**: Blocks IPs after multiple failed attempts
- **Username-based blocking**: Blocks specific usernames after failed attempts
- **Suspicious activity detection**: Detects when one IP tries multiple usernames
- **Automatic cleanup**: Removes old data to prevent memory leaks

### 📊 **Attack Detection Metrics**
- **Failed attempts by IP**: Tracks attempts per IP address
- **Failed attempts by username**: Tracks attempts per username
- **Time-window analysis**: Only considers recent attempts (15 minutes)
- **Threshold-based blocking**: Configurable limits for blocking

### 🔒 **Blocking Mechanisms**
- **Temporary blocks**: Automatically expire after configured time
- **Different thresholds**: IP vs username blocking limits
- **Real-time checks**: Instant blocking status verification

## Configuration

### Default Settings:
```java
MAX_FAILED_ATTEMPTS_PER_IP = 5;         // 5 failed attempts per IP
MAX_FAILED_ATTEMPTS_PER_USERNAME = 3;   // 3 failed attempts per username
TIME_WINDOW_MINUTES = 15;               // Consider attempts in last 15 minutes
BLOCK_DURATION_MINUTES = 30;           // Block for 30 minutes
SUSPICIOUS_ACTIVITY_THRESHOLD = 10;     // 10 different usernames from same IP
```

## Implementation Details

### Files Created/Modified:

1. **`DosProtectionService.java`** - Core DoS protection service
2. **`LoginController.java`** - Integrated DoS protection into login endpoints
3. **`SecurityMonitoringController.java`** - Admin monitoring endpoints

### Key Methods:

#### DosProtectionService
- `recordFailedAttempt(ip, username, userAgent)` - Records failed login
- `isIpBlocked(ip)` - Checks if IP is currently blocked
- `isUsernameBlocked(username)` - Checks if username is blocked
- `recordSuccessfulLogin(ip, username)` - Clears failed attempts on success
- `getSecurityStatus(ip, username)` - Gets current security status
- `getSecurityStatistics()` - Gets overall security statistics

#### LoginController Integration
- Pre-login IP/username blocking checks
- Failed attempt recording on authentication failures
- Successful login attempt clearing
- Enhanced logging with IP addresses

## Attack Detection Patterns

### 🚨 **IP-based Attacks**
```
Timeline: Failed attempts from same IP
127.0.0.1: user1 (failed) → user2 (failed) → user3 (failed) → user4 (failed) → user5 (failed)
Result: IP 127.0.0.1 blocked for 30 minutes
```

### 👤 **Username-based Attacks**
```
Timeline: Failed attempts on same username from different IPs
admin: 192.168.1.1 (failed) → 192.168.1.2 (failed) → 192.168.1.3 (failed)
Result: Username "admin" blocked for 30 minutes
```

### 🔍 **Suspicious Activity**
```
Timeline: Multiple usernames from same IP
127.0.0.1: admin, user1, user2, user3, user4, user5, user6, user7, user8, user9, user10
Result: IP 127.0.0.1 blocked immediately (credential stuffing detected)
```

## API Endpoints

### Authentication Endpoints (Protected)
- `POST /api/login/validate` - Standard login with DoS protection
- `POST /api/login/google` - Google OAuth login with DoS protection

### Monitoring Endpoints (Admin only)
- `POST /api/secure/security/dos-stats` - Get DoS protection statistics
- `POST /api/secure/security/check-status` - Check security status for current IP
- `POST /api/secure/security/test-dos` - Test DoS protection (development)

## Log Examples

### Normal Failed Login:
```
17:30:15.123 [http-nio-8080-exec-1] WARN  c.v.s.DosProtectionService - 🚨 FAILED_LOGIN_ATTEMPT: IP: 127.0.0.1 | Username: admin | UserAgent: Mozilla/5.0...
17:30:15.125 [http-nio-8080-exec-1] ERROR c.v.c.LoginController - ❌ Authentication failed for username: admin from IP: 127.0.0.1 - Invalid credentials
```

### IP Blocked (DoS Detected):
```
17:30:45.456 [http-nio-8080-exec-2] ERROR c.v.s.DosProtectionService - 🔒 DOS_ATTACK_DETECTED - IP_BLOCKED: 127.0.0.1 | Failed attempts: 5 | Blocked until: 2025-07-05T18:00:45
17:30:45.458 [http-nio-8080-exec-2] WARN  c.v.c.LoginController - 🚫 BLOCKED_IP_ATTEMPT: IP 127.0.0.1 is currently blocked
```

### Username Blocked:
```
17:31:12.789 [http-nio-8080-exec-3] ERROR c.v.s.DosProtectionService - 🔒 DOS_ATTACK_DETECTED - USERNAME_BLOCKED: admin | Failed attempts: 3 | Blocked until: 2025-07-05T18:01:12
17:31:12.791 [http-nio-8080-exec-3] WARN  c.v.c.LoginController - 🚫 BLOCKED_USERNAME_ATTEMPT: Username admin is currently blocked
```

### Suspicious Activity:
```
17:31:30.123 [http-nio-8080-exec-4] ERROR c.v.s.DosProtectionService - 🚨 SUSPICIOUS_ACTIVITY_DETECTED: IP: 127.0.0.1 | Unique usernames attempted: 10 in 15 minutes
```

### Successful Login (Clears blocks):
```
17:32:00.456 [http-nio-8080-exec-5] INFO  c.v.s.DosProtectionService - ✅ SUCCESSFUL_LOGIN: IP: 127.0.0.1 | Username: john.doe
```

## Response Examples

### Blocked IP Response:
```json
{
  "error": "Access Denied",
  "message": "Too many failed login attempts. Please try again later.",
  "status": 429
}
```

### Blocked Username Response:
```json
{
  "error": "Access Denied", 
  "message": "This account is temporarily locked due to suspicious activity.",
  "status": 429
}
```

### Security Status Response:
```json
{
  "ipAddress": "127.0.0.1",
  "ipFailedAttempts": 2,
  "ipBlocked": false,
  "isBlocked": false,
  "timestamp": 1720182600123
}
```

### DoS Statistics Response (Admin):
```json
{
  "totalBlockedIps": 3,
  "totalBlockedUsernames": 1,
  "totalFailedAttempts": 47,
  "timestamp": 1720182600123
}
```

## Benefits

### 🔐 **Security**
- Prevents brute force attacks on login endpoints
- Stops credential stuffing attacks
- Protects against automated bot attacks
- Reduces server load from malicious requests

### 📈 **Monitoring**
- Real-time attack detection and blocking
- Comprehensive logging of security events
- Administrative dashboard for security metrics
- Historical data for security analysis

### ⚡ **Performance**
- Blocks malicious requests before expensive authentication
- Automatic cleanup prevents memory leaks
- Thread-safe implementation for high concurrency
- Minimal overhead for legitimate users

## Testing DoS Protection

### Manual Testing:
1. Make 5 failed login attempts from same IP
2. Verify IP gets blocked
3. Try to login again and get 429 error
4. Wait 30 minutes for automatic unblock

### API Testing:
```bash
# Test failed attempt recording
curl -X POST http://localhost:8080/api/secure/security/test-dos \
  -H "Content-Type: application/json" \
  -d '{"username": "test-user"}'

# Check security status
curl -X POST http://localhost:8080/api/secure/security/check-status \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Production Recommendations

### 🛡️ **Security Settings**
- Monitor DoS statistics regularly
- Adjust thresholds based on attack patterns
- Implement IP whitelisting for admin accounts
- Use rate limiting at load balancer level as additional protection

### 📊 **Monitoring**
- Set up alerts for blocked IPs/usernames
- Monitor suspicious activity patterns
- Review security logs regularly
- Track false positive rates

### 🔧 **Maintenance**
- The service automatically cleans old data (24 hours)
- Blocks automatically expire (30 minutes default)
- No manual intervention required for normal operation
- Consider database persistence for production environments

This DoS protection system provides robust defense against authentication-based attacks while maintaining usability for legitimate users.
