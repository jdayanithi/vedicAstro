package com.vedicastrology.service;

import com.vedicastrology.util.FileSecurityValidator;
import com.vedicastrology.util.FileSecurityValidator.FileValidationResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileUploadService {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadService.class);

    @Autowired
    private FileSecurityValidator fileSecurityValidator;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @Value("${app.upload.payment-proofs:payment-proofs}")
    private String paymentProofDir;

    public String uploadPaymentProof(MultipartFile file) throws IOException {
        logger.info("🔐 Starting secure payment proof upload for file: {}", file.getOriginalFilename());
        
        // Perform comprehensive security validation
        FileValidationResult validationResult = fileSecurityValidator.validateFile(file);
        if (!validationResult.isValid()) {
            logger.warn("🚫 File validation failed: {}", validationResult.getErrorMessage());
            throw new IllegalArgumentException("File validation failed: " + validationResult.getErrorMessage());
        }

        // Additional business logic validation
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        try {
            // Create secure upload directory if it doesn't exist
            Path uploadPath = createSecureUploadDirectory();

            // Generate secure unique filename
            String secureFilename = generateSecureFilename(file.getOriginalFilename());

            // Save file securely
            Path filePath = uploadPath.resolve(secureFilename);
            
            // Ensure the file path is within the expected directory (prevent path traversal)
            if (!filePath.normalize().startsWith(uploadPath.normalize())) {
                throw new SecurityException("Path traversal attempt detected");
            }
            
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            // Set secure file permissions (readable only by owner)
            try {
                Files.setPosixFilePermissions(filePath, 
                    java.nio.file.attribute.PosixFilePermissions.fromString("rw-------"));
            } catch (UnsupportedOperationException e) {
                // Windows doesn't support POSIX permissions, log and continue
                logger.debug("POSIX permissions not supported on this system");
            }

            String relativePath = paymentProofDir + "/" + secureFilename;
            logger.info("✅ Payment proof uploaded successfully: {}", relativePath);
            
            return relativePath;
            
        } catch (IOException e) {
            logger.error("❌ Failed to upload payment proof: {}", e.getMessage(), e);
            throw new IOException("Failed to upload file: " + e.getMessage(), e);
        }
    }

    private Path createSecureUploadDirectory() throws IOException {
        Path uploadPath = Paths.get(uploadDir, paymentProofDir);
        
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
            logger.info("📁 Created upload directory: {}", uploadPath);
        }
        
        // Verify the directory is within expected bounds
        Path normalizedUploadPath = uploadPath.normalize().toAbsolutePath();
        Path expectedBasePath = Paths.get(uploadDir).normalize().toAbsolutePath();
        
        if (!normalizedUploadPath.startsWith(expectedBasePath)) {
            throw new SecurityException("Upload directory is outside expected bounds");
        }
        
        return uploadPath;
    }

    private String generateSecureFilename(String originalFilename) {
        // Extract safe extension
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
            // Additional validation: ensure extension is in our allowed list
            if (!extension.matches("\\.(jpg|jpeg|png|pdf)")) {
                extension = ".unknown";
            }
        }
        
        // Generate UUID-based filename to prevent conflicts and hide original names
        String secureFilename = UUID.randomUUID().toString() + extension;
        
        // Add timestamp prefix for better organization
        String timestamp = String.valueOf(System.currentTimeMillis());
        
        return timestamp + "_" + secureFilename;
    }

    public void deleteFile(String filePath) {
        try {
            Path fullPath = Paths.get(uploadDir, filePath);
            Files.deleteIfExists(fullPath);
            logger.debug("🗑️ Successfully deleted file: {}", filePath);
        } catch (IOException e) {
            // Log error but don't throw exception
            logger.error("💥 Failed to delete file: {} - {}", filePath, e.getMessage(), e);
        }
    }
}
