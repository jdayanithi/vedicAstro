package com.vedicastrology.config;

import com.vedicastrology.util.PasswordEncryptionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfiguration {
    
    private static final Logger logger = LoggerFactory.getLogger(MailConfiguration.class);
    
    @Autowired
    private PasswordEncryptionUtil passwordEncryptionUtil;
    
    @Value("${spring.mail.host}")
    private String host;
    
    @Value("${spring.mail.port}")
    private int port;
    
    @Value("${spring.mail.username}")
    private String username;
    
    @Value("${spring.mail.password}")
    private String encryptedPassword;
    
    @Value("${spring.mail.properties.mail.smtp.auth:true}")
    private boolean auth;
    
    @Value("${spring.mail.properties.mail.smtp.starttls.enable:true}")
    private boolean starttlsEnable;
    
    @Value("${spring.mail.properties.mail.smtp.starttls.required:true}")
    private boolean starttlsRequired;
    
    @Value("${spring.mail.properties.mail.smtp.ssl.trust:}")
    private String sslTrust;
    
    @Bean
    public JavaMailSender javaMailSender() {
        logger.info("🔧 Configuring JavaMailSender with encrypted password support");
        
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        
        // Decrypt the password before setting it
        try {
            String decryptedPassword = passwordEncryptionUtil.decryptPassword(encryptedPassword);
            mailSender.setPassword(decryptedPassword);
            logger.info("✅ Email password decrypted successfully");
        } catch (Exception e) {
            logger.error("❌ Failed to decrypt email password: {}", e.getMessage());
            throw new RuntimeException("Failed to configure email with encrypted password", e);
        }
        
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", auth);
        props.put("mail.smtp.starttls.enable", starttlsEnable);
        props.put("mail.smtp.starttls.required", starttlsRequired);
        
        if (!sslTrust.isEmpty()) {
            props.put("mail.smtp.ssl.trust", sslTrust);
        }
        
        // Additional security properties
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");
        props.put("mail.smtp.timeout", "10000");
        props.put("mail.smtp.connectiontimeout", "10000");
        
        logger.info("📧 Mail configuration completed for host: {} port: {}", host, port);
        return mailSender;
    }
}
