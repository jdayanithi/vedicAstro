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
}
