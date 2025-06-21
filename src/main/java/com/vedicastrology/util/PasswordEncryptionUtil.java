package com.vedicastrology.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Component
public class PasswordEncryptionUtil {
    
    private static final Logger logger = LoggerFactory.getLogger(PasswordEncryptionUtil.class);
    private static final String ALGORITHM = "AES";
    private static final String TRANSFORMATION = "AES";
    private static final String KEY_FILE = "email.key";
    
    @Value("${app.encryption.key-path:./config}")
    private String keyPath;
    
    /**
     * Encrypt a password for storage
     */
    public String encryptPassword(String plainPassword) {
        try {
            SecretKey secretKey = getOrCreateSecretKey();
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedBytes = cipher.doFinal(plainPassword.getBytes());
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (Exception e) {
            logger.error("❌ Failed to encrypt password: {}", e.getMessage());
            throw new RuntimeException("Password encryption failed", e);
        }
    }
    
    /**
     * Decrypt a password for use
     */
    public String decryptPassword(String encryptedPassword) {
        try {
            // Handle plain text passwords (for backward compatibility)
            if (!isEncrypted(encryptedPassword)) {
                logger.warn("⚠️ Using plain text password. Consider encrypting it for security.");
                return encryptedPassword;
            }
            
            // Remove the ENC() wrapper if present
            String cleanEncryptedPassword = encryptedPassword;
            if (encryptedPassword.startsWith("ENC(") && encryptedPassword.endsWith(")")) {
                cleanEncryptedPassword = encryptedPassword.substring(4, encryptedPassword.length() - 1);
            }
            
            SecretKey secretKey = getOrCreateSecretKey();
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(cleanEncryptedPassword));
            return new String(decryptedBytes);
        } catch (Exception e) {
            logger.error("❌ Failed to decrypt password: {}", e.getMessage());
            throw new RuntimeException("Password decryption failed", e);
        }
    }
    
    /**
     * Check if a password is encrypted (starts with ENC())
     */
    public boolean isEncrypted(String password) {
        return password != null && password.startsWith("ENC(") && password.endsWith(")");
    }
    
    /**
     * Get or create secret key for encryption/decryption
     */
    private SecretKey getOrCreateSecretKey() throws Exception {
        Path keyFilePath = Paths.get(keyPath, KEY_FILE);
        
        if (Files.exists(keyFilePath)) {
            // Load existing key
            byte[] keyBytes = Files.readAllBytes(keyFilePath);
            return new SecretKeySpec(keyBytes, ALGORITHM);
        } else {
            // Generate new key
            logger.info("🔑 Generating new encryption key for email passwords");
            KeyGenerator keyGen = KeyGenerator.getInstance(ALGORITHM);
            keyGen.init(256);
            SecretKey secretKey = keyGen.generateKey();
            
            // Save key to file
            Files.createDirectories(keyFilePath.getParent());
            Files.write(keyFilePath, secretKey.getEncoded());
            logger.info("✅ Encryption key saved to: {}", keyFilePath);
            
            return secretKey;
        }
    }
    
    /**
     * Utility method to help users encrypt their passwords
     * This can be called from a command line tool or admin endpoint
     */
    public void printEncryptedPassword(String plainPassword) {
        String encrypted = encryptPassword(plainPassword);
        System.out.println("==================================================");
        System.out.println("🔐 ENCRYPTED PASSWORD FOR APPLICATION.PROPERTIES");
        System.out.println("==================================================");
        System.out.println("Plain text: " + plainPassword);
        System.out.println("Encrypted:  ENC(" + encrypted + ")");
        System.out.println("==================================================");
        System.out.println("Copy the encrypted value to application.properties:");
        System.out.println("spring.mail.password=ENC(" + encrypted + ")");
        System.out.println("==================================================");
    }
}
