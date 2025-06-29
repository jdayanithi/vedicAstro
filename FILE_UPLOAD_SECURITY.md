# File Upload Security Implementation

## Overview
This document outlines the comprehensive file upload security measures implemented for payment proof uploads in the VedicAstro application.

## Security Measures Implemented

### 1. File Validation (`FileSecurityValidator`)
- **File Size Validation**: Maximum 5MB file size limit
- **MIME Type Validation**: Only allows image/jpeg, image/png, and application/pdf
- **File Extension Validation**: Whitelist approach for .jpg, .jpeg, .png, .pdf
- **Magic Number Validation**: Validates file signatures to prevent spoofed file types
- **Path Traversal Prevention**: Blocks ../, \, and encoded path traversal attempts
- **Script Content Detection**: Scans for embedded scripts in image files
- **Dangerous Extension Blocking**: Prevents upload of executable files

### 2. Enhanced File Upload Service (`FileUploadService`)
- **Secure Filename Generation**: UUID-based with timestamp prefix
- **Directory Validation**: Ensures files are stored within expected bounds
- **File Permissions**: Sets restrictive permissions (rw------- on POSIX systems)
- **Comprehensive Logging**: Tracks all upload attempts and failures
- **Exception Handling**: Proper error handling without information disclosure

### 3. Secure Controller Implementation (`PaymentController`)
- **Input Validation**: Validates all input parameters before processing
- **Input Sanitization**: Removes dangerous characters from user inputs
- **Amount Validation**: Ensures payment amounts are positive
- **Transaction ID Validation**: Prevents injection attacks
- **Comprehensive Logging**: Tracks all payment creation attempts
- **Structured Error Responses**: Returns user-friendly error messages

### 4. Security Headers (`SecurityHeadersConfig`)
- **Content Security Policy (CSP)**: Prevents XSS attacks
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **HSTS**: Forces HTTPS connections
- **Referrer Policy**: Controls referrer information
- **Permissions Policy**: Restricts browser features

### 5. Rate Limiting (`RateLimitConfig`)
- **General Rate Limit**: 60 requests per minute per IP
- **File Upload Rate Limit**: 10 file uploads per hour per IP
- **IP Detection**: Proper handling of proxied requests
- **Memory Efficient**: Uses concurrent data structures

## Configuration

### Application Properties
```properties
# File upload security
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB
app.upload.max-file-size=5242880
app.upload.allowed-mime-types=image/jpeg,image/jpg,image/png,application/pdf
app.upload.allowed-extensions=.jpg,.jpeg,.png,.pdf
```

## File Validation Process

1. **Empty File Check**: Ensures file is not empty
2. **Size Validation**: Checks file size against 5MB limit
3. **Filename Validation**: Validates filename format and characters
4. **Extension Check**: Ensures file extension is in whitelist
5. **MIME Type Check**: Validates Content-Type header
6. **Magic Number Validation**: Reads file headers to verify actual file type
7. **Script Content Scan**: Scans first 1KB for embedded scripts
8. **Path Traversal Check**: Prevents directory traversal attacks

## Security Benefits

### Prevents Common Attacks
- **File Upload Vulnerabilities**: Malicious file execution prevention
- **Path Traversal**: Directory traversal prevention
- **MIME Type Confusion**: Magic number validation
- **XSS via Files**: Script content detection in images
- **DoS via Large Files**: File size limits
- **Brute Force**: Rate limiting

### Best Practices Implemented
- **Defense in Depth**: Multiple validation layers
- **Fail Secure**: Blocks files when validation fails
- **Comprehensive Logging**: Full audit trail
- **Input Sanitization**: All user inputs are sanitized
- **Secure File Storage**: Files stored outside web root with restricted permissions

## Usage Example

### Frontend (Angular)
```typescript
uploadPaymentProof(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/with-proof`, formData, {
    headers: { /* JWT headers */ }
  });
}
```

### Backend Response
```json
{
  "paymentId": 123,
  "status": "pending",
  "paymentProofUrl": "payment-proofs/1640995200000_a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg"
}
```

## Error Handling

### Validation Errors
- **File too large**: "File size exceeds maximum limit of 5MB"
- **Invalid type**: "File type not allowed. Allowed: [.jpg, .jpeg, .png, .pdf]"
- **Script detected**: "File contains suspicious content"
- **Path traversal**: "Invalid filename: path traversal detected"

### Rate Limiting
- **HTTP 429**: Too Many Requests
- **Retry-After**: 60 seconds header
- **Error Message**: "Rate limit exceeded. Please try again later."

## Monitoring and Alerts

### Log Patterns to Monitor
- Multiple failed upload attempts from same IP
- Attempts to upload dangerous file types
- Rate limit violations
- Path traversal attempts
- Script content detection hits

### Recommended Actions
- Monitor upload success/failure rates
- Set up alerts for suspicious patterns
- Regular review of uploaded files
- Periodic security audits

## Future Enhancements

### Recommended Additions
1. **Virus Scanning**: Integrate with antivirus engine
2. **Image Processing**: Strip metadata from uploaded images
3. **File Quarantine**: Temporary quarantine for manual review
4. **Advanced Threat Detection**: ML-based malicious file detection
5. **Database Rate Limiting**: Move rate limiting to Redis/database
6. **File Integrity**: Checksums and digital signatures

### Performance Optimizations
1. **Async Processing**: Background file validation
2. **CDN Integration**: Secure file serving via CDN
3. **Compression**: Automatic image compression
4. **Cleanup Jobs**: Automated cleanup of old files

## Testing

### Security Tests to Perform
1. Upload files with malicious extensions
2. Upload files with scripts embedded
3. Test path traversal attempts
4. Test oversized files
5. Test rate limiting behavior
6. Test MIME type spoofing
7. Verify file permissions

### Load Testing
1. Concurrent upload tests
2. Rate limit validation
3. Large file handling
4. Memory usage monitoring

This comprehensive file upload security implementation provides robust protection against common file upload vulnerabilities while maintaining usability for legitimate users.
