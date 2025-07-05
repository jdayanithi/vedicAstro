package com.vedicastrology.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.NotBlank;

/**
 * Configuration properties for application logging
 */
@Configuration
@ConfigurationProperties(prefix = "app.logging")
@Validated
public class LoggingConfiguration {

    @NotBlank
    private String basePath = "./logs";
    
    private SecurityLogging security = new SecurityLogging();
    private PerformanceLogging performance = new PerformanceLogging();
    private DosProtectionLogging dosProtection = new DosProtectionLogging();
    private LoginHistoryLogging loginHistory = new LoginHistoryLogging();
    private ArchivingLogging archiving = new ArchivingLogging();

    // Getters and Setters
    public String getBasePath() {
        return basePath;
    }

    public void setBasePath(String basePath) {
        this.basePath = basePath;
    }

    public SecurityLogging getSecurity() {
        return security;
    }

    public void setSecurity(SecurityLogging security) {
        this.security = security;
    }

    public PerformanceLogging getPerformance() {
        return performance;
    }

    public void setPerformance(PerformanceLogging performance) {
        this.performance = performance;
    }

    public DosProtectionLogging getDosProtection() {
        return dosProtection;
    }

    public void setDosProtection(DosProtectionLogging dosProtection) {
        this.dosProtection = dosProtection;
    }

    public LoginHistoryLogging getLoginHistory() {
        return loginHistory;
    }

    public void setLoginHistory(LoginHistoryLogging loginHistory) {
        this.loginHistory = loginHistory;
    }

    public ArchivingLogging getArchiving() {
        return archiving;
    }

    public void setArchiving(ArchivingLogging archiving) {
        this.archiving = archiving;
    }

    /**
     * Security logging configuration
     */
    public static class SecurityLogging {
        private boolean enabled = true;
        private String file = "security.log";

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getFile() {
            return file;
        }

        public void setFile(String file) {
            this.file = file;
        }
    }

    /**
     * Performance logging configuration
     */
    public static class PerformanceLogging {
        private boolean enabled = true;
        private String file = "performance.log";

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getFile() {
            return file;
        }

        public void setFile(String file) {
            this.file = file;
        }
    }

    /**
     * DoS protection logging configuration
     */
    public static class DosProtectionLogging {
        private boolean enabled = true;
        private String file = "dos-protection.log";

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getFile() {
            return file;
        }

        public void setFile(String file) {
            this.file = file;
        }
    }

    /**
     * Login history logging configuration
     */
    public static class LoginHistoryLogging {
        private boolean enabled = true;
        private String file = "login-history.log";

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getFile() {
            return file;
        }

        public void setFile(String file) {
            this.file = file;
        }
    }

    /**
     * Archiving logging configuration
     */
    public static class ArchivingLogging {
        private boolean enabled = true;
        private String sizeThreshold = "100KB";
        private String archiveFolder = "archive";
        private long checkInterval = 300000; // 5 minutes in milliseconds
        private boolean compressArchivedFiles = true;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getSizeThreshold() {
            return sizeThreshold;
        }

        public void setSizeThreshold(String sizeThreshold) {
            this.sizeThreshold = sizeThreshold;
        }

        public String getArchiveFolder() {
            return archiveFolder;
        }

        public void setArchiveFolder(String archiveFolder) {
            this.archiveFolder = archiveFolder;
        }

        public long getCheckInterval() {
            return checkInterval;
        }

        public void setCheckInterval(long checkInterval) {
            this.checkInterval = checkInterval;
        }

        public boolean isCompressArchivedFiles() {
            return compressArchivedFiles;
        }

        public void setCompressArchivedFiles(boolean compressArchivedFiles) {
            this.compressArchivedFiles = compressArchivedFiles;
        }

        /**
         * Parse size threshold string to bytes
         */
        public long getSizeThresholdBytes() {
            String threshold = sizeThreshold.toUpperCase();
            long multiplier = 1;
            
            if (threshold.endsWith("KB")) {
                multiplier = 1024;
                threshold = threshold.substring(0, threshold.length() - 2);
            } else if (threshold.endsWith("MB")) {
                multiplier = 1024 * 1024;
                threshold = threshold.substring(0, threshold.length() - 2);
            } else if (threshold.endsWith("GB")) {
                multiplier = 1024 * 1024 * 1024;
                threshold = threshold.substring(0, threshold.length() - 2);
            } else if (threshold.endsWith("B")) {
                threshold = threshold.substring(0, threshold.length() - 1);
            }
            
            try {
                return Long.parseLong(threshold.trim()) * multiplier;
            } catch (NumberFormatException e) {
                return 100 * 1024; // Default to 100KB
            }
        }
    }
}
