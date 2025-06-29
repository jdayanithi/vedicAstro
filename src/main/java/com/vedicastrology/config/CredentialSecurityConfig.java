package com.vedicastrology.config;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.security.SecureRandom;

@Configuration
@EnableEncryptableProperties
public class CredentialSecurityConfig {

    private static final Logger logger = LoggerFactory.getLogger(CredentialSecurityConfig.class);

    @Value("${app.encryption.password:}")
    private String encryptionPassword;

    @Value("${spring.profiles.active:dev}")
    private String activeProfile;

    @Bean("jasyptStringEncryptor")
    @Primary
    public StringEncryptor stringEncryptor() {
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();
        
        // Get encryption password from environment or generate a warning
        String password = getEncryptionPassword();
        
        config.setPassword(password);
        config.setAlgorithm("PBEWITHHMACSHA512ANDAES_256");
        config.setKeyObtentionIterations("1000");
        config.setPoolSize("1");
        config.setProviderName("SunJCE");
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
        config.setIvGeneratorClassName("org.jasypt.iv.RandomIvGenerator");
        config.setStringOutputType("base64");
        
        encryptor.setConfig(config);
        
        logger.info("🔐 Jasypt encryptor initialized for profile: {}", activeProfile);
        
        return encryptor;
    }

    private String getEncryptionPassword() {
        // Try to get from environment variable first (most secure)
        String envPassword = System.getenv("JASYPT_ENCRYPTOR_PASSWORD");
        if (envPassword != null && !envPassword.trim().isEmpty()) {
            logger.info("✅ Using encryption password from environment variable");
            return envPassword;
        }
        
        // Try to get from application property
        if (encryptionPassword != null && !encryptionPassword.trim().isEmpty()) {
            logger.warn("⚠️ Using encryption password from application properties (not recommended for production)");
            return encryptionPassword;
        }
        
        // Generate a random password for development (not recommended for production)
        if ("dev".equals(activeProfile) || "development".equals(activeProfile)) {
            String randomPassword = generateRandomPassword();
            logger.warn("⚠️ Generated random encryption password for development: {}", randomPassword);
            logger.warn("⚠️ This is NOT suitable for production! Set JASYPT_ENCRYPTOR_PASSWORD environment variable.");
            return randomPassword;
        }
        
        // Fail for production if no password is provided
        logger.error("❌ No encryption password provided for production environment!");
        logger.error("❌ Set JASYPT_ENCRYPTOR_PASSWORD environment variable");
        throw new IllegalStateException("Encryption password is required for production environment");
    }

    private String generateRandomPassword() {
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        
        for (int i = 0; i < 32; i++) {
            password.append(chars.charAt(random.nextInt(chars.length())));
        }
        
        return password.toString();
    }

    /**
     * Bean to validate database connection configuration on startup
     */
    @Bean
    public DatabaseConfigurationValidator databaseConfigurationValidator(
            @Value("${spring.datasource.url}") String dbUrl,
            @Value("${spring.datasource.username}") String dbUsername,
            @Value("${spring.datasource.password}") String dbPassword) {
        
        return new DatabaseConfigurationValidator(dbUrl, dbUsername, dbPassword, activeProfile);
    }

    public static class DatabaseConfigurationValidator {
        private static final Logger logger = LoggerFactory.getLogger(DatabaseConfigurationValidator.class);
        
        public DatabaseConfigurationValidator(String url, String username, String password, String profile) {
            validateDatabaseConfiguration(url, username, password, profile);
        }
        
        private void validateDatabaseConfiguration(String url, String username, String password, String profile) {
            logger.info("🔍 Validating database configuration for profile: {}", profile);
            
            // Check if credentials are properly configured
            if (url == null || url.trim().isEmpty()) {
                logger.error("❌ Database URL is not configured");
                throw new IllegalStateException("Database URL is required");
            }
            
            if (username == null || username.trim().isEmpty()) {
                logger.error("❌ Database username is not configured");
                throw new IllegalStateException("Database username is required");
            }
            
            if (password == null || password.trim().isEmpty()) {
                if ("prod".equals(profile) || "production".equals(profile)) {
                    logger.error("❌ Database password is not configured for production");
                    throw new IllegalStateException("Database password is required for production");
                } else {
                    logger.warn("⚠️ Database password is empty for profile: {}", profile);
                }
            }
            
            // Check for default/insecure passwords in production
            if ("prod".equals(profile) || "production".equals(profile)) {
                if ("admin".equals(password) || "password".equals(password) || 
                    "root".equals(password) || "123456".equals(password)) {
                    logger.error("❌ Insecure default password detected in production!");
                    throw new IllegalStateException("Default passwords are not allowed in production");
                }
                
                if ("root".equals(username)) {
                    logger.warn("⚠️ Using 'root' username in production is not recommended");
                }
            }
            
            // Log successful validation (but don't log actual credentials)
            logger.info("✅ Database configuration validated successfully");
            logger.debug("🔍 Database URL: {}", maskUrl(url));
            logger.debug("🔍 Database Username: {}", maskUsername(username));
        }
        
        private String maskUrl(String url) {
            // Mask password in URL if present
            return url.replaceAll("password=[^&;]*", "password=***");
        }
        
        private String maskUsername(String username) {
            if (username.length() <= 2) return "***";
            return username.substring(0, 2) + "***";
        }
    }
}
