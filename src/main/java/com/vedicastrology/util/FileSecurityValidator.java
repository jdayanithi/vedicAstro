package com.vedicastrology.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Component
public class FileSecurityValidator {

    private static final Logger logger = LoggerFactory.getLogger(FileSecurityValidator.class);

    // Maximum file size: 5MB
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    // Allowed MIME types for payment proofs
    private static final Set<String> ALLOWED_MIME_TYPES = Set.of(
        "image/jpeg",
        "image/jpg", 
        "image/png",
        "application/pdf"
    );

    // Allowed file extensions
    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
        ".jpg", ".jpeg", ".png", ".pdf"
    );

    // File signature (magic numbers) validation
    private static final Map<String, byte[]> FILE_SIGNATURES = Map.of(
        "image/jpeg", new byte[]{(byte) 0xFF, (byte) 0xD8, (byte) 0xFF},
        "image/png", new byte[]{(byte) 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A},
        "application/pdf", new byte[]{0x25, 0x50, 0x44, 0x46}
    );

    // Dangerous file extensions that should never be allowed
    private static final Set<String> DANGEROUS_EXTENSIONS = Set.of(
        ".exe", ".bat", ".cmd", ".com", ".pif", ".scr", ".vbs", ".js", ".jar", 
        ".php", ".asp", ".jsp", ".sh", ".py", ".rb", ".pl", ".dll", ".msi"
    );

    public FileValidationResult validateFile(MultipartFile file) {
        logger.info("🔍 Validating uploaded file: {}", file.getOriginalFilename());

        try {
            // 1. Check if file is empty
            if (file.isEmpty()) {
                return FileValidationResult.failure("File is empty");
            }

            // 2. Check file size
            if (file.getSize() > MAX_FILE_SIZE) {
                return FileValidationResult.failure("File size exceeds maximum limit of 5MB");
            }

            // 3. Validate filename
            String filename = file.getOriginalFilename();
            if (filename == null || filename.trim().isEmpty()) {
                return FileValidationResult.failure("Invalid filename");
            }

            // 4. Check for dangerous file extensions
            String lowerFilename = filename.toLowerCase();
            for (String dangerousExt : DANGEROUS_EXTENSIONS) {
                if (lowerFilename.endsWith(dangerousExt)) {
                    return FileValidationResult.failure("File type not allowed for security reasons");
                }
            }

            // 5. Validate file extension
            String extension = getFileExtension(filename);
            if (!ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
                return FileValidationResult.failure("File extension not allowed. Allowed: " + ALLOWED_EXTENSIONS);
            }

            // 6. Validate MIME type
            String mimeType = file.getContentType();
            if (mimeType == null || !ALLOWED_MIME_TYPES.contains(mimeType.toLowerCase())) {
                return FileValidationResult.failure("File type not allowed. Allowed: " + ALLOWED_MIME_TYPES);
            }

            // 7. Validate file signature (magic numbers)
            if (!validateFileSignature(file, mimeType)) {
                return FileValidationResult.failure("File content does not match declared file type");
            }

            // 8. Check for potential script content in image files
            if (mimeType.startsWith("image/") && containsScriptContent(file)) {
                return FileValidationResult.failure("File contains suspicious content");
            }

            // 9. Validate filename for path traversal attacks
            if (containsPathTraversal(filename)) {
                return FileValidationResult.failure("Invalid filename: path traversal detected");
            }

            logger.info("✅ File validation successful for: {}", filename);
            return FileValidationResult.success();

        } catch (Exception e) {
            logger.error("❌ Error during file validation: {}", e.getMessage(), e);
            return FileValidationResult.failure("File validation failed: " + e.getMessage());
        }
    }

    private String getFileExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex == -1) {
            return "";
        }
        return filename.substring(lastDotIndex).toLowerCase();
    }

    private boolean validateFileSignature(MultipartFile file, String mimeType) {
        try {
            byte[] fileSignature = FILE_SIGNATURES.get(mimeType.toLowerCase());
            if (fileSignature == null) {
                // If we don't have a signature for this MIME type, skip signature validation
                return true;
            }

            byte[] fileHeader = new byte[fileSignature.length];
            try (InputStream inputStream = file.getInputStream()) {
                int bytesRead = inputStream.read(fileHeader);
                if (bytesRead < fileSignature.length) {
                    return false;
                }
            }

            return Arrays.equals(fileHeader, fileSignature);

        } catch (IOException e) {
            logger.error("❌ Error validating file signature: {}", e.getMessage());
            return false;
        }
    }

    private boolean containsScriptContent(MultipartFile file) {
        try {
            // Read first 1KB to check for script content
            byte[] buffer = new byte[1024];
            try (InputStream inputStream = file.getInputStream()) {
                int bytesRead = inputStream.read(buffer);
                if (bytesRead > 0) {
                    String content = new String(buffer, 0, bytesRead).toLowerCase();
                    // Check for common script patterns
                    return content.contains("<script") || 
                           content.contains("javascript:") || 
                           content.contains("<?php") ||
                           content.contains("<%") ||
                           content.contains("eval(") ||
                           content.contains("exec(");
                }
            }
        } catch (IOException e) {
            logger.warn("⚠️ Could not scan file content for scripts: {}", e.getMessage());
            // If we can't scan, assume it's safe rather than blocking
        }
        return false;
    }

    private boolean containsPathTraversal(String filename) {
        return filename.contains("..") || 
               filename.contains("/") || 
               filename.contains("\\") ||
               filename.contains("%2e%2e") ||
               filename.contains("%2f") ||
               filename.contains("%5c");
    }

    public static class FileValidationResult {
        private final boolean valid;
        private final String errorMessage;

        private FileValidationResult(boolean valid, String errorMessage) {
            this.valid = valid;
            this.errorMessage = errorMessage;
        }

        public static FileValidationResult success() {
            return new FileValidationResult(true, null);
        }

        public static FileValidationResult failure(String errorMessage) {
            return new FileValidationResult(false, errorMessage);
        }

        public boolean isValid() {
            return valid;
        }

        public String getErrorMessage() {
            return errorMessage;
        }
    }
}
