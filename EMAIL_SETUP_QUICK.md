# 🔐 Email Setup Instructions - VedicAstro

## Quick Setup Guide

### Step 1: Get Gmail App Password
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Click **App passwords** → **Generate**
4. Select **Mail** and **Other (custom name)**
5. Enter **"VedicAstro"** as the app name
6. **Copy** the generated 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 2: Encrypt Your Password
Open PowerShell and run:
```powershell
cd "c:\Users\jdaya\git\vedicAstro"
mvn exec:java "-Dexec.args=encrypt YOUR-GMAIL-APP-PASSWORD-HERE"
```

**Example:**
```powershell
mvn exec:java "-Dexec.args=encrypt abcdefghijklmnop"
```

### Step 3: Update Configuration
Replace these values in `src/main/resources/application.properties`:

```properties
# Replace with your actual email
spring.mail.username=your-actual-email@gmail.com
app.email.from=your-actual-email@gmail.com

# Replace with the encrypted value from Step 2
spring.mail.password=ENC(your-generated-encrypted-password)
```

### Step 4: Test the Setup
1. **Start the backend:**
   ```powershell
   mvn spring-boot:run
   ```

2. **Start the frontend:**
   ```powershell
   cd web
   npm start
   ```

3. **Test Google login:**
   - Go to http://localhost:4200/login
   - Click "Continue with Google"
   - Sign in with a **NEW** Google account (not previously registered)
   - Check your email inbox (including spam folder)

## 🎯 Expected Results

### ✅ What Should Happen:
1. New Google user logs in successfully
2. Backend logs show: `📧 Sending welcome email to new Google user: email@example.com`
3. User receives a professional welcome email with:
   - Personalized greeting
   - Account details (email, login method: Google OAuth)
   - Generated backup password
   - Security information
   - Call-to-action button to dashboard

### ⚠️ Troubleshooting

**Email not received?**
- Check spam/junk folder
- Verify email settings in application.properties
- Check backend logs for error messages

**Authentication failed?**
- Verify Gmail app password is correct
- Ensure 2FA is enabled on your Google account
- Double-check encrypted password format: `ENC(...)`

**Backend errors?**
- Check if `./config/email.key` file exists
- Verify all dependencies are installed: `mvn clean install`

## 🔧 Useful Commands

**Test encryption/decryption:**
```powershell
mvn exec:java "-Dexec.args=test"
```

**Encrypt a new password:**
```powershell
mvn exec:java "-Dexec.args=encrypt your-password"
```

**Decrypt an encrypted password:**
```powershell
mvn exec:java "-Dexec.args=decrypt ENC(encrypted-value)"
```

## 🚀 Next Steps

After email setup is working:
1. Test the complete Google OAuth flow
2. Verify welcome emails are sent and received
3. Consider setting up email templates customization
4. Add error handling for email delivery failures
5. Monitor email delivery rates

## 🔒 Security Notes

- ✅ Email passwords are encrypted at rest
- ✅ Encryption keys are stored separately from application
- ✅ Generated user passwords are secure (12 chars, mixed case, numbers, symbols)
- ✅ Google OAuth tokens are properly validated
- ✅ Debug logging helps with troubleshooting

---
**Ready to test!** 🎉
