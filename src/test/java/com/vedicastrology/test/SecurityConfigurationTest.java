package com.vedicastrology.test;

import com.vedicastrology.util.FileSecurityValidator;
import com.vedicastrology.util.JasyptPasswordEncryptionUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Integration tests for security configurations
 */
@SpringBootTest
@ActiveProfiles("test")
public class SecurityConfigurationTest {

    @Autowired
    private FileSecurityValidator fileSecurityValidator;

    @Autowired
    private JasyptPasswordEncryptionUtil passwordEncryptionUtil;

    @Test
    public void testFileSecurityValidator() {
        // Test valid file
        MockMultipartFile validFile = new MockMultipartFile(
            "file", 
            "test.jpg", 
            "image/jpeg", 
            new byte[]{(byte) 0xFF, (byte) 0xD8, (byte) 0xFF, 0x01, 0x02} // JPEG signature + data
        );
        
        FileSecurityValidator.FileValidationResult validResult = fileSecurityValidator.validateFile(validFile);
        assertTrue(validResult.isValid());
        
        // Test invalid file (executable)
        MockMultipartFile invalidFile = new MockMultipartFile(
            "file", 
            "test.exe", 
            "application/exe", 
            "executable content".getBytes()
        );
        
        FileSecurityValidator.FileValidationResult invalidResult = fileSecurityValidator.validateFile(invalidFile);
        assertFalse(invalidResult.isValid());
        assertNotNull(invalidResult.getErrorMessage());
    }

    @Test
    public void testPasswordEncryptionAndValidation() {
        String testPassword = "testPassword123";
        
        // Test encryption
        String encrypted = passwordEncryptionUtil.encryptPassword(testPassword);
        assertNotNull(encrypted);
        assertNotEquals(testPassword, encrypted);
        
        // Test decryption with ENC() wrapper
        String decrypted = passwordEncryptionUtil.decryptPassword("ENC(" + encrypted + ")");
        assertEquals(testPassword, decrypted);
        
        // Test validation
        assertTrue(passwordEncryptionUtil.validateEncryption());
    }
}
