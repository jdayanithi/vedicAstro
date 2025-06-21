package com.vedicastrology.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Standalone utility to encrypt passwords for application.properties
 * 
 * Usage:
 * mvn exec:java -Dexec.mainClass="com.vedicastrology.util.PasswordEncryptorTool" -Dexec.args="your-password-here"
 *  mvn exec:java "-Dexec.args=test"
 * Or run from IDE with program arguments: your-password-here
 */
//@SpringBootApplication
//@ComponentScan(basePackages = "com.vedicastrology.util")
public class PasswordEncryptorTool implements CommandLineRunner {
    
    @Autowired
    private PasswordEncryptionUtil passwordEncryptionUtil;
    
    public static void main(String[] args) {
        System.setProperty("spring.main.web-application-type", "NONE");
        SpringApplication.run(PasswordEncryptorTool.class, args);
    }
    
    @Override
    public void run(String... args) throws Exception {
        if (args.length == 0) {
            printUsage();
            return;
        }
        
        String command = args[0].toLowerCase();
        
        switch (command) {
            case "encrypt":
                if (args.length < 2) {
                    System.out.println("❌ Please provide a password to encrypt");
                    printUsage();
                    return;
                }
                encryptPassword(args[1]);
                break;
                
            case "decrypt":
                if (args.length < 2) {
                    System.out.println("❌ Please provide an encrypted password to decrypt");
                    printUsage();
                    return;
                }
                decryptPassword(args[1]);
                break;
                
            case "test":
                testEncryption();
                break;
                
            default:
                // Backward compatibility - treat first arg as password to encrypt
                encryptPassword(args[0]);
                break;
        }
    }
    
    private void encryptPassword(String password) {
        try {
            passwordEncryptionUtil.printEncryptedPassword(password);
        } catch (Exception e) {
            System.out.println("❌ Encryption failed: " + e.getMessage());
        }
    }
    
    private void decryptPassword(String encryptedPassword) {
        try {
            String decrypted = passwordEncryptionUtil.decryptPassword(encryptedPassword);
            System.out.println("==================================================");
            System.out.println("🔓 DECRYPTED PASSWORD");
            System.out.println("==================================================");
            System.out.println("Encrypted: " + encryptedPassword);
            System.out.println("Decrypted: " + decrypted);
            System.out.println("==================================================");
        } catch (Exception e) {
            System.out.println("❌ Decryption failed: " + e.getMessage());
        }
    }
    
    private void testEncryption() {
        try {
            String testPassword = "test123";
            System.out.println("🧪 Testing encryption/decryption...");
            
            String encrypted = passwordEncryptionUtil.encryptPassword(testPassword);
            String decrypted = passwordEncryptionUtil.decryptPassword("ENC(" + encrypted + ")");
            
            boolean success = testPassword.equals(decrypted);
            
            System.out.println("==================================================");
            System.out.println("🧪 ENCRYPTION TEST RESULTS");
            System.out.println("==================================================");
            System.out.println("Original:  " + testPassword);
            System.out.println("Encrypted: ENC(" + encrypted + ")");
            System.out.println("Decrypted: " + decrypted);
            System.out.println("Test:      " + (success ? "✅ PASSED" : "❌ FAILED"));
            System.out.println("==================================================");
            
        } catch (Exception e) {
            System.out.println("❌ Test failed: " + e.getMessage());
        }
    }
    
    private void printUsage() {
        System.out.println("==================================================");
        System.out.println("🔐 PASSWORD ENCRYPTION TOOL");
        System.out.println("==================================================");
        System.out.println("Usage:");
        System.out.println("  encrypt <password>     - Encrypt a password");
        System.out.println("  decrypt <encrypted>    - Decrypt a password");
        System.out.println("  test                   - Test encryption/decryption");
        System.out.println("");
        System.out.println("Examples:");
        System.out.println("  java -jar app.jar encrypt mypassword123");
        System.out.println("  java -jar app.jar decrypt ENC(abc123...)");
        System.out.println("  java -jar app.jar test");
        System.out.println("");
        System.out.println("Maven:");
        System.out.println("  mvn exec:java -Dexec.mainClass=\"com.vedicastrology.util.PasswordEncryptorTool\" -Dexec.args=\"encrypt mypassword\"");
        System.out.println("==================================================");
    }
}
