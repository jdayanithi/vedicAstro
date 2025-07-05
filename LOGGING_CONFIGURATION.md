# Logging Configuration Documentation

## Overview

This application has been configured with comprehensive logging that stores different types of log entries in separate files based on the environment (development/production) and log category.

## Environment-Specific Log File Paths

### Development Environment (`spring.profiles.active=dev`)

**Log Base Directory:** `./logs/dev/`

| Log Type | File Path | Purpose |
|----------|-----------|---------|
| Main Application | `./logs/dev/vedicastro-dev.log` | General application logs |
| Security Events | `./logs/dev/security-dev.log` | Authentication, authorization, security violations |
| Performance | `./logs/dev/performance-dev.log` | Method execution times, slow queries |
| DoS Protection | `./logs/dev/dos-protection-dev.log` | Rate limiting, suspicious activity |
| Login History | `./logs/dev/login-history-dev.log` | Login attempts and user session tracking |

**Retention Policy (Development):**
- Max file size: 20-50MB per log type
- History: 7-14 days
- Total size cap: 100-500MB per log type

### Production Environment (`spring.profiles.active=prod`)

**Log Base Directory:** `/var/log/vedicastro/`

| Log Type | File Path | Purpose |
|----------|-----------|---------|
| Main Application | `/var/log/vedicastro/vedicastro-prod.log` | General application logs |
| Security Events | `/var/log/vedicastro/security-prod.log` | Authentication, authorization, security violations |
| Performance | `/var/log/vedicastro/performance-prod.log` | Method execution times, slow queries |
| DoS Protection | `/var/log/vedicastro/dos-protection-prod.log` | Rate limiting, suspicious activity |
| Login History | `/var/log/vedicastro/login-history-prod.log` | Login attempts and user session tracking |

**Retention Policy (Production):**
- Max file size: 50-100MB per log type
- History: 30-90 days
- Total size cap: 500MB-3GB per log type

## Configuration Files

### 1. Application Properties

**Base Configuration** (`application.properties`):
```properties
# Logging Configuration
logging.config=classpath:logback-spring.xml

# Application Logging Configuration
app.logging.base-path=${LOGGING_BASE_PATH:./logs}
app.logging.security.enabled=true
app.logging.performance.enabled=true
app.logging.dos-protection.enabled=true
app.logging.login-history.enabled=true
```

**Development Configuration** (`application-dev.properties`):
```properties
# Development Logging Paths
app.logging.base-path=./logs/dev
logging.file.name=./logs/dev/vedicastro-dev.log

# Development specific log files
app.logging.security.file=./logs/dev/security-dev.log
app.logging.performance.file=./logs/dev/performance-dev.log
app.logging.dos-protection.file=./logs/dev/dos-protection-dev.log
app.logging.login-history.file=./logs/dev/login-history-dev.log
```

**Production Configuration** (`application-prod.properties`):
```properties
# Production Logging Paths
app.logging.base-path=/var/log/vedicastro
logging.file.name=/var/log/vedicastro/vedicastro-prod.log

# Production specific log files
app.logging.security.file=/var/log/vedicastro/security-prod.log
app.logging.performance.file=/var/log/vedicastro/performance-prod.log
app.logging.dos-protection.file=/var/log/vedicastro/dos-protection-prod.log
app.logging.login-history.file=/var/log/vedicastro/login-history-prod.log
```

### 2. Logback Configuration (`logback-spring.xml`)

The logback configuration automatically routes different types of logs to the appropriate files based on:
- **Spring Profile** (dev/prod)
- **Logger Name** (package-based routing)
- **Rolling Policy** (size and time-based)

## Structured Logging Service

### Available Logging Methods

The `StructuredLoggingService` provides structured logging methods for different event types:

```java
// Security Events
structuredLoggingService.logSecurityEvent(eventType, username, ipAddress, details);
structuredLoggingService.logSuspiciousActivity(activityType, username, ipAddress, userAgent, reason);

// Authentication
structuredLoggingService.logAuthenticationAttempt(username, ipAddress, userAgent, success, reason);

// Performance
structuredLoggingService.logPerformanceEvent(method, executionTimeMs, requestInfo);

// DoS Protection
structuredLoggingService.logDosProtectionEvent(eventType, ipAddress, username, userAgent, details);
structuredLoggingService.logRateLimitingEvent(eventType, ipAddress, endpoint, requestCount, timeWindow);

// Login History
structuredLoggingService.logLoginHistoryEvent(eventType, username, userId, ipAddress, loginStatus, loginType, details);

// Admin Access
structuredLoggingService.logAdminAccessEvent(action, username, ipAddress, resourceAccessed, success);

// File Upload Security
structuredLoggingService.logFileUploadSecurityEvent(eventType, filename, mimeType, fileSize, username, ipAddress);

// SQL Injection Detection
structuredLoggingService.logSqlInjectionAttempt(field, value, ipAddress, userAgent);
```

### Log Format

All structured logs follow this format:
```
[EVENT_TYPE] timestamp | Key1: Value1 | Key2: Value2 | ...
```

**Example:**
```
[AUTHENTICATION] 2025-07-05 17:54:01.389 | User: test-user | IP: 127.0.0.1 | UserAgent: Mozilla/5.0 | Status: SUCCESS | Reason: Valid credentials
```

## Usage Examples

### 1. In Controllers

```java
@Autowired
private StructuredLoggingService structuredLoggingService;

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
    String clientIp = getClientIpAddress(httpRequest);
    String userAgent = httpRequest.getHeader("User-Agent");
    
    try {
        // Login logic here...
        
        structuredLoggingService.logAuthenticationAttempt(
            request.getUsername(), clientIp, userAgent, true, "Valid credentials");
        
        structuredLoggingService.logLoginHistoryEvent("LOGIN_SUCCESS", 
            request.getUsername(), userId, clientIp, "SUCCESS", "STANDARD", "User login successful");
            
    } catch (AuthenticationException e) {
        structuredLoggingService.logAuthenticationAttempt(
            request.getUsername(), clientIp, userAgent, false, e.getMessage());
    }
}
```

### 2. In Security Components

```java
// Log suspicious activity
structuredLoggingService.logSuspiciousActivity("MULTIPLE_FAILED_LOGINS", 
    username, ipAddress, userAgent, "5 failed attempts in 1 minute");

// Log DoS protection events
structuredLoggingService.logDosProtectionEvent("IP_BLOCKED", 
    ipAddress, username, userAgent, "Exceeded failed login threshold");
```

## Log File Rotation

The application uses size and time-based rolling policies:

- **Development:** Daily rotation or when file reaches max size
- **Production:** Daily rotation or when file reaches max size
- **Compression:** Old log files are automatically compressed
- **Cleanup:** Old files are automatically deleted based on retention policy

## Security Considerations

1. **Log Injection Prevention:** All logged values are sanitized to prevent log injection attacks
2. **Sensitive Data:** Passwords and sensitive information are never logged
3. **IP Address Tracking:** Real client IP addresses are extracted considering proxy headers
4. **File Permissions:** Production log files should have restricted permissions (600 or 640)

## Monitoring and Alerting

### Log Patterns to Monitor

1. **Failed Authentication Attempts:**
   ```
   grep "Status: FAILED" /var/log/vedicastro/security-prod.log
   ```

2. **DoS Protection Events:**
   ```
   grep "DOS_PROTECTION" /var/log/vedicastro/dos-protection-prod.log
   ```

3. **Performance Issues:**
   ```
   grep "ExecutionTime: [0-9][0-9][0-9][0-9]ms" /var/log/vedicastro/performance-prod.log
   ```

4. **Admin Access:**
   ```
   grep "ADMIN_ACCESS" /var/log/vedicastro/security-prod.log
   ```

## Testing the Configuration

Run the logging configuration test:
```bash
mvn test -Dtest=LoggingConfigurationTest
```

This test will create sample log entries in all configured log files and verify the structured logging format.

## Troubleshooting

### Common Issues

1. **Log Files Not Created:**
   - Check directory permissions
   - Ensure parent directories exist
   - Verify logback-spring.xml configuration

2. **Logs Going to Wrong Files:**
   - Check logger names in logback-spring.xml
   - Verify package names match logger configurations

3. **Performance Impact:**
   - Logging is designed to be asynchronous where possible
   - Monitor application performance in production

### Log Directory Setup for Production

```bash
# Create log directory
sudo mkdir -p /var/log/vedicastro

# Set proper ownership (replace 'appuser' with your application user)
sudo chown appuser:appuser /var/log/vedicastro

# Set proper permissions
sudo chmod 755 /var/log/vedicastro
```

## Integration with Log Management Systems

The structured log format makes it easy to integrate with log management systems like:

- **ELK Stack (Elasticsearch, Logstash, Kibana)**
- **Splunk**
- **Fluentd**
- **Graylog**

The pipe-separated format can be easily parsed and indexed for searching and alerting.
