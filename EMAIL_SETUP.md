# Email Configuration Guide for VedicAstro

## Overview
This guide explains how to configure email functionality for sending welcome emails to new Google OAuth users.

## Gmail SMTP Setup (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to "Security" 
3. Enable "2-Step Verification"
+
### Step 2: Generate App Password
1. In Google Account settings, go to "Security"
2. Under "2-Step Verification", click "App passwords"
3. Select "Mail" and "Other (custom name)"
4. Enter "VedicAstro" as the app name
5. Copy the generated 16-character password

### Step 3: Update application.properties
Replace the placeholders in `src/main/resources/application.properties`:

```properties
# Email Configuration
spring.mail.username=your-actual-email@gmail.com
spring.mail.password=your-16-character-app-password
app.email.from=your-actual-email@gmail.com
```

## Alternative Email Providers

### Outlook/Hotmail
```properties
spring.mail.host=smtp-mail.outlook.com
spring.mail.port=587
spring.mail.username=your-email@outlook.com
spring.mail.password=your-password
```

### Yahoo Mail
```properties
spring.mail.host=smtp.mail.yahoo.com
spring.mail.port=587
spring.mail.username=your-email@yahoo.com
spring.mail.password=your-app-password
```

## Testing Email Functionality

### 1. Start the application
```bash
mvn spring-boot:run
```

### 2. Monitor logs for email activity
Look for these log messages:
- `📧 Sending welcome email to new Google user: email@example.com`
- `✅ Welcome email sent successfully to: email@example.com`
- `⚠️ Failed to send welcome email` (if there are issues)

### 3. Test Google login flow
1. Navigate to http://localhost:4201/login
2. Click "Continue with Google"
3. Sign in with a NEW Google account (not previously registered)
4. Check the email inbox for the welcome message

## Email Content

The welcome email includes:
- ✅ Personalized greeting with user's name
- ✅ Account details (email, login method)
- ✅ Generated backup password
- ✅ Security information and best practices
- ✅ Feature overview of VedicAstro
- ✅ Call-to-action button to dashboard
- ✅ Professional HTML styling

## Troubleshooting

### Common Issues

1. **Authentication failed**
   - Verify app password is correct
   - Ensure 2FA is enabled on Google account
   - Check email and password in application.properties

2. **Connection timeout**
   - Check firewall settings
   - Verify SMTP host and port
   - Ensure internet connectivity

3. **Email not received**
   - Check spam/junk folder
   - Verify recipient email address
   - Check application logs for errors

### Debug Email Issues

Enable additional logging:
```properties
logging.level.org.springframework.mail=DEBUG
logging.level.com.vedicastrology.service.EmailService=DEBUG
```

## Security Best Practices

1. **Never commit real credentials** to version control
2. **Use environment variables** for production:
   ```bash
   export SPRING_MAIL_USERNAME=your-email@gmail.com
   export SPRING_MAIL_PASSWORD=your-app-password
   ```

3. **Application properties with environment variables**:
   ```properties
   spring.mail.username=${SPRING_MAIL_USERNAME:your-email@gmail.com}
   spring.mail.password=${SPRING_MAIL_PASSWORD:your-app-password}
   ```

## Production Deployment

For production environments:
1. Use a dedicated email service (SendGrid, AWS SES, etc.)
2. Set up proper DNS records (SPF, DKIM, DMARC)
3. Use environment variables for all sensitive data
4. Monitor email delivery rates and bounce rates
5. Implement email templates with proper branding

## Features

- ✅ **Secure password generation** (12 characters with mixed case, numbers, symbols)
- ✅ **HTML email templates** with professional styling
- ✅ **Comprehensive logging** for troubleshooting
- ✅ **Error handling** (email failure doesn't break login process)
- ✅ **Responsive design** (works on mobile and desktop email clients)
- ✅ **Security best practices** (backup password explanation)
