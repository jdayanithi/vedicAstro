package com.vedicastrology.util;

import org.jasypt.encryption.StringEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Utility class for encrypting passwords and other sensitive configuration values using Jasypt
 * This can be run as a command-line tool to generate encrypted values for application.properties
 */
@Component
public class JasyptPasswordEncryptionUtil implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(JasyptPasswordEncryptionUtil.class);

    @Autowired
    private StringEncryptor jasyptStringEncryptor;

    @Override
    public void run(String... args) throws Exception {
        // Only run if specific argument is provided
        if (args.length > 0 && "encrypt-passwords".equals(args[0])) {
            logger.info("🔐 Password Encryption Utility");
            
            if (args.length < 2) {
                logger.info("Usage: java -jar app.jar encrypt-passwords <password-to-encrypt>");
                logger.info("Example: java -jar app.jar encrypt-passwords myDatabasePassword");
                return;
            }
            
            String passwordToEncrypt = args[1];
            String encryptedPassword = jasyptStringEncryptor.encrypt(passwordToEncrypt);
            
            logger.info("✅ Encrypted password: ENC({})", encryptedPassword);
            logger.info("📝 Use this in your application.properties like:");
            logger.info("   spring.datasource.password=ENC({})", encryptedPassword);
            logger.info("🔑 Make sure JASYPT_ENCRYPTOR_PASSWORD environment variable is set with the same encryption key");
        }
    }

    /**
     * Programmatically encrypt a password (for testing)
     */
    public String encryptPassword(String plainPassword) {
        try {
            return jasyptStringEncryptor.encrypt(plainPassword);
        } catch (Exception e) {
            logger.error("❌ Failed to encrypt password: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Programmatically decrypt a password (for testing)
     */
    public String decryptPassword(String encryptedPassword) {
        try {
            // Remove ENC() wrapper if present
            String cleanEncrypted = encryptedPassword;
            if (encryptedPassword.startsWith("ENC(") && encryptedPassword.endsWith(")")) {
                cleanEncrypted = encryptedPassword.substring(4, encryptedPassword.length() - 1);
            }
            return jasyptStringEncryptor.decrypt(cleanEncrypted);
        } catch (Exception e) {
            logger.error("❌ Failed to decrypt password: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Validate that encryption/decryption is working correctly
     */
    public boolean validateEncryption() {
        try {
            String testPassword = "test-password-123";
            String encrypted = encryptPassword(testPassword);
            String decrypted = decryptPassword(encrypted);
            
            boolean isValid = testPassword.equals(decrypted);
            if (isValid) {
                logger.info("✅ Encryption validation successful");
            } else {
                logger.error("❌ Encryption validation failed");
            }
            return isValid;
        } catch (Exception e) {
            logger.error("❌ Encryption validation error: {}", e.getMessage());
            return false;
        }
    }
}
