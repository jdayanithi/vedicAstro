package com.vedicastrology.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @Value("${app.upload.payment-proofs:payment-proofs}")
    private String paymentProofDir;

    public String uploadPaymentProof(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // Validate file type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir, paymentProofDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String uniqueFilename = UUID.randomUUID().toString() + extension;

        // Save file
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return relative path
        return paymentProofDir + "/" + uniqueFilename;
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
