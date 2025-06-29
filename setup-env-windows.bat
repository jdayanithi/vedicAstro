@echo off
REM Windows Environment Variables Setup for VedicAstro Application
REM This script sets up environment variables for secure credential management

echo Setting up VedicAstro Environment Variables...

REM Database Configuration
set DB_URL=jdbc:mysql://localhost:3306/astroguide?allowPublicKeyRetrieval=true^&useSSL=true
set DB_USERNAME=astroguide_user
set /p DB_PASSWORD=Enter Database Password: 

REM Jasypt Encryption Configuration
set /p JASYPT_ENCRYPTOR_PASSWORD=Enter Jasypt Encryption Password (32+ characters): 

REM Email Configuration
set MAIL_HOST=smtp.gmail.com
set MAIL_PORT=587
set /p MAIL_USERNAME=Enter Email Username: 
set /p MAIL_PASSWORD=Enter Email App Password: 

REM Google OAuth Configuration
set /p GOOGLE_CLIENT_ID=Enter Google Client ID: 
set /p GOOGLE_CLIENT_SECRET=Enter Google Client Secret: 

REM JWT Configuration
set /p JWT_SECRET=Enter JWT Secret (64+ characters): 

REM Application Profile
set SPRING_PROFILES_ACTIVE=prod

echo.
echo Environment variables set successfully!
echo.
echo IMPORTANT SECURITY NOTES:
echo 1. These variables are only set for this session
echo 2. For permanent setup, add them to System Environment Variables
echo 3. Never commit actual credentials to version control
echo 4. Use strong, unique passwords for production
echo 5. Regularly rotate all credentials
echo.
echo To make these permanent on Windows:
echo 1. Go to System Properties ^> Environment Variables
echo 2. Add these variables to System Variables (for all users) or User Variables
echo 3. Restart your application server
echo.

pause
