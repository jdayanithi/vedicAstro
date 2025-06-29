#!/bin/bash
# Linux/Mac Environment Variables Setup for VedicAstro Application
# This script sets up environment variables for secure credential management

echo "Setting up VedicAstro Environment Variables..."

# Database Configuration
export DB_URL="jdbc:mysql://localhost:3306/astroguide?allowPublicKeyRetrieval=true&useSSL=true"
echo -n "Enter Database Username: "
read DB_USERNAME
export DB_USERNAME

echo -n "Enter Database Password: "
read -s DB_PASSWORD
export DB_PASSWORD
echo

# Jasypt Encryption Configuration
echo -n "Enter Jasypt Encryption Password (32+ characters): "
read -s JASYPT_ENCRYPTOR_PASSWORD
export JASYPT_ENCRYPTOR_PASSWORD
echo

# Email Configuration
export MAIL_HOST="smtp.gmail.com"
export MAIL_PORT="587"
echo -n "Enter Email Username: "
read MAIL_USERNAME
export MAIL_USERNAME

echo -n "Enter Email App Password: "
read -s MAIL_PASSWORD
export MAIL_PASSWORD
echo

# Google OAuth Configuration
echo -n "Enter Google Client ID: "
read GOOGLE_CLIENT_ID
export GOOGLE_CLIENT_ID

echo -n "Enter Google Client Secret: "
read -s GOOGLE_CLIENT_SECRET
export GOOGLE_CLIENT_SECRET
echo

# JWT Configuration
echo -n "Enter JWT Secret (64+ characters): "
read -s JWT_SECRET
export JWT_SECRET
echo

# Application Profile
export SPRING_PROFILES_ACTIVE="prod"

echo
echo "Environment variables set successfully!"
echo
echo "IMPORTANT SECURITY NOTES:"
echo "1. These variables are only set for this session"
echo "2. For permanent setup, add them to ~/.bashrc or ~/.profile"
echo "3. Never commit actual credentials to version control"
echo "4. Use strong, unique passwords for production"
echo "5. Regularly rotate all credentials"
echo
echo "To make these permanent:"
echo "1. Add 'export VAR_NAME=value' lines to ~/.bashrc"
echo "2. Run 'source ~/.bashrc' to reload"
echo "3. Or add them to /etc/environment for system-wide variables"
echo

# Optionally save to a file (without values for security)
cat > .env.template << EOF
# Environment Variables Template for VedicAstro
# Copy this to .env and fill in the values (DO NOT commit .env to git)

DB_URL=jdbc:mysql://localhost:3306/astroguide?allowPublicKeyRetrieval=true&useSSL=true
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

JASYPT_ENCRYPTOR_PASSWORD=your_32_plus_character_encryption_password

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_email_app_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

JWT_SECRET=your_64_plus_character_jwt_secret

SPRING_PROFILES_ACTIVE=prod
EOF

echo "Template saved to .env.template"
