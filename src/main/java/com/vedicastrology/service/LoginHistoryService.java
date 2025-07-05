package com.vedicastrology.service;

import com.vedicastrology.entity.LoginHistory;
import com.vedicastrology.repository.LoginHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Service for managing login history and security audit trails
 */
@Service
public class LoginHistoryService {

    private static final Logger logger = LoggerFactory.getLogger(LoginHistoryService.class);

    @Autowired
    private LoginHistoryRepository loginHistoryRepository;

    /**
     * Record a login attempt (asynchronous for performance)
     */
    @Async
    public void recordLoginAttempt(String username, Long userId, String ipAddress, String userAgent,
                                 LoginHistory.LoginStatus status, LoginHistory.LoginType type,
                                 String failureReason) {
        try {
            LoginHistory loginHistory = new LoginHistory(username, userId, ipAddress, userAgent, status, type);
            
            if (failureReason != null) {
                loginHistory.setFailureReason(failureReason);
            }
            
            // Calculate risk score and detect suspicious activity
            calculateRiskScore(loginHistory);
            extractDeviceInfo(loginHistory);
            
            loginHistoryRepository.save(loginHistory);
            
            logger.debug("📝 LOGIN_HISTORY_RECORDED: {} | User: {} | IP: {} | Status: {}", 
                        loginHistory.getId(), username, ipAddress, status);
            
        } catch (Exception e) {
            logger.error("💥 Error recording login history: {}", e.getMessage(), e);
        }
    }

    /**
     * Record successful login
     */
    public void recordSuccessfulLogin(String username, Long userId, String ipAddress, String userAgent,
                                    LoginHistory.LoginType type) {
        recordLoginAttempt(username, userId, ipAddress, userAgent, 
                          LoginHistory.LoginStatus.SUCCESS, type, null);
    }

    /**
     * Record failed login
     */
    public void recordFailedLogin(String username, String ipAddress, String userAgent,
                                LoginHistory.LoginType type, String failureReason) {
        recordLoginAttempt(username, null, ipAddress, userAgent, 
                          LoginHistory.LoginStatus.FAILED, type, failureReason);
    }

    /**
     * Record blocked IP attempt
     */
    public void recordBlockedIpAttempt(String username, String ipAddress, String userAgent,
                                     LoginHistory.LoginType type) {
        recordLoginAttempt(username, null, ipAddress, userAgent, 
                          LoginHistory.LoginStatus.BLOCKED_IP, type, 
                          "IP address blocked due to too many failed attempts");
    }

    /**
     * Record blocked username attempt
     */
    public void recordBlockedUsernameAttempt(String username, String ipAddress, String userAgent,
                                           LoginHistory.LoginType type) {
        recordLoginAttempt(username, null, ipAddress, userAgent, 
                          LoginHistory.LoginStatus.BLOCKED_USERNAME, type, 
                          "Username blocked due to too many failed attempts");
    }

    /**
     * Record suspicious activity
     */
    public void recordSuspiciousActivity(String username, String ipAddress, String userAgent,
                                       LoginHistory.LoginType type, String reason) {
        LoginHistory loginHistory = new LoginHistory(username, null, ipAddress, userAgent, 
                                                    LoginHistory.LoginStatus.SUSPICIOUS_ACTIVITY, type);
        loginHistory.setFailureReason(reason);
        loginHistory.setIsSuspicious(true);
        loginHistory.setRiskScore(100); // Maximum risk for suspicious activity
        
        extractDeviceInfo(loginHistory);
        
        try {
            loginHistoryRepository.save(loginHistory);
            logger.warn("🚨 SUSPICIOUS_ACTIVITY_RECORDED: IP: {} | Username: {} | Reason: {}", 
                       ipAddress, username, reason);
        } catch (Exception e) {
            logger.error("💥 Error recording suspicious activity: {}", e.getMessage(), e);
        }
    }

    /**
     * Get recent login attempts by IP
     */
    public List<LoginHistory> getRecentAttemptsByIp(String ipAddress, int hours) {
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        return loginHistoryRepository.findByIpAddressAndAttemptTimestampAfterOrderByAttemptTimestampDesc(
                ipAddress, since);
    }

    /**
     * Get recent login attempts by username
     */
    public List<LoginHistory> getRecentAttemptsByUsername(String username, int hours) {
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        return loginHistoryRepository.findByUsernameAndAttemptTimestampAfterOrderByAttemptTimestampDesc(
                username, since);
    }

    /**
     * Get recent failed attempts by IP
     */
    public List<LoginHistory> getRecentFailedAttemptsByIp(String ipAddress, int hours) {
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        return loginHistoryRepository.findFailedAttemptsByIp(ipAddress, since);
    }

    /**
     * Get recent failed attempts by username
     */
    public List<LoginHistory> getRecentFailedAttemptsByUsername(String username, int hours) {
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        return loginHistoryRepository.findFailedAttemptsByUsername(username, since);
    }

    /**
     * Get recent suspicious activities
     */
    public List<LoginHistory> getRecentSuspiciousActivities(int hours) {
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        return loginHistoryRepository.findByIsSuspiciousTrueAndAttemptTimestampAfterOrderByAttemptTimestampDesc(since);
    }

    /**
     * Get high risk login attempts
     */
    public List<LoginHistory> getHighRiskAttempts(int riskThreshold, int hours) {
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        return loginHistoryRepository.findByRiskScoreGreaterThanEqualAndAttemptTimestampAfterOrderByRiskScoreDescAttemptTimestampDesc(
                riskThreshold, since);
    }

    /**
     * Get login statistics for date range
     */
    public LoginStatistics getLoginStatistics(LocalDateTime startDate, LocalDateTime endDate) {
        Object[] stats = loginHistoryRepository.getLoginStatistics(startDate, endDate);
        
        if (stats != null && stats.length > 0) {
            Object[] row = stats; // Single row result
            return new LoginStatistics(
                    ((Number) row[0]).longValue(), // totalAttempts
                    ((Number) row[1]).longValue(), // successfulLogins
                    ((Number) row[2]).longValue(), // failedLogins
                    ((Number) row[3]).longValue(), // blockedAttempts
                    ((Number) row[4]).longValue(), // uniqueIps
                    ((Number) row[5]).longValue()  // uniqueUsernames
            );
        }
        
        return new LoginStatistics(0L, 0L, 0L, 0L, 0L, 0L);
    }

    /**
     * Clean up old login history records
     */
    public void cleanupOldRecords(int daysToKeep) {
        try {
            LocalDateTime cutoffDate = LocalDateTime.now().minusDays(daysToKeep);
            loginHistoryRepository.deleteOldRecords(cutoffDate);
            logger.info("🧹 Cleaned up login history records older than {} days", daysToKeep);
        } catch (Exception e) {
            logger.error("💥 Error cleaning up old login history records: {}", e.getMessage(), e);
        }
    }

    /**
     * Calculate risk score based on various factors
     */
    private void calculateRiskScore(LoginHistory loginHistory) {
        int riskScore = 0;
        String ipAddress = loginHistory.getIpAddress();
        String username = loginHistory.getUsername();
        
        try {
            // Factor 1: Recent failed attempts from same IP
            List<LoginHistory> recentIpFailures = getRecentFailedAttemptsByIp(ipAddress, 1);
            riskScore += Math.min(recentIpFailures.size() * 10, 30);
            
            // Factor 2: Recent failed attempts for same username
            if (username != null) {
                List<LoginHistory> recentUserFailures = getRecentFailedAttemptsByUsername(username, 1);
                riskScore += Math.min(recentUserFailures.size() * 15, 40);
            }
            
            // Factor 3: Multiple usernames from same IP
            LocalDateTime since = LocalDateTime.now().minusHours(1);
            Long uniqueUsernames = loginHistoryRepository.countDistinctUsernamesByIp(ipAddress, since);
            if (uniqueUsernames != null && uniqueUsernames > 3) {
                riskScore += Math.min((uniqueUsernames.intValue() - 3) * 5, 20);
            }
            
            // Factor 4: Time-based risk (unusual hours)
            int hour = loginHistory.getAttemptTimestamp().getHour();
            if (hour < 6 || hour > 22) { // Late night/early morning
                riskScore += 5;
            }
            
            // Factor 5: Status-based risk
            switch (loginHistory.getLoginStatus()) {
                case FAILED:
                    riskScore += 10;
                    break;
                case BLOCKED_IP:
                case BLOCKED_USERNAME:
                    riskScore += 50;
                    break;
                case SUSPICIOUS_ACTIVITY:
                    riskScore = 100; // Maximum risk
                    break;
                case SUCCESS:
                    riskScore = Math.max(0, riskScore - 20); // Reduce risk on success
                    break;
            }
            
            // Mark as suspicious if risk score is high
            if (riskScore >= 70) {
                loginHistory.setIsSuspicious(true);
            }
            
        } catch (Exception e) {
            logger.debug("Error calculating risk score: {}", e.getMessage());
            riskScore = 0; // Default to safe
        }
        
        loginHistory.setRiskScore(Math.min(riskScore, 100)); // Cap at 100
    }

    /**
     * Extract device and browser information from User-Agent
     */
    private void extractDeviceInfo(LoginHistory loginHistory) {
        String userAgent = loginHistory.getUserAgent();
        if (userAgent == null || userAgent.trim().isEmpty()) {
            return;
        }
        
        try {
            // Extract browser information
            if (userAgent.contains("Chrome")) {
                loginHistory.setBrowser("Chrome");
            } else if (userAgent.contains("Firefox")) {
                loginHistory.setBrowser("Firefox");
            } else if (userAgent.contains("Safari") && !userAgent.contains("Chrome")) {
                loginHistory.setBrowser("Safari");
            } else if (userAgent.contains("Edge")) {
                loginHistory.setBrowser("Edge");
            } else if (userAgent.contains("Opera")) {
                loginHistory.setBrowser("Opera");
            } else {
                loginHistory.setBrowser("Unknown");
            }
            
            // Extract OS information
            if (userAgent.contains("Windows")) {
                loginHistory.setOs("Windows");
            } else if (userAgent.contains("Mac OS")) {
                loginHistory.setOs("macOS");
            } else if (userAgent.contains("Linux")) {
                loginHistory.setOs("Linux");
            } else if (userAgent.contains("Android")) {
                loginHistory.setOs("Android");
            } else if (userAgent.contains("iOS") || userAgent.contains("iPhone") || userAgent.contains("iPad")) {
                loginHistory.setOs("iOS");
            } else {
                loginHistory.setOs("Unknown");
            }
            
            // Extract device type
            if (userAgent.contains("Mobile") || userAgent.contains("Android") || userAgent.contains("iPhone")) {
                loginHistory.setDeviceType("Mobile");
            } else if (userAgent.contains("Tablet") || userAgent.contains("iPad")) {
                loginHistory.setDeviceType("Tablet");
            } else {
                loginHistory.setDeviceType("Desktop");
            }
            
        } catch (Exception e) {
            logger.debug("Error extracting device info from user agent: {}", e.getMessage());
        }
    }

    /**
     * Login statistics data class
     */
    public static class LoginStatistics {
        private final Long totalAttempts;
        private final Long successfulLogins;
        private final Long failedLogins;
        private final Long blockedAttempts;
        private final Long uniqueIps;
        private final Long uniqueUsernames;

        public LoginStatistics(Long totalAttempts, Long successfulLogins, Long failedLogins,
                             Long blockedAttempts, Long uniqueIps, Long uniqueUsernames) {
            this.totalAttempts = totalAttempts;
            this.successfulLogins = successfulLogins;
            this.failedLogins = failedLogins;
            this.blockedAttempts = blockedAttempts;
            this.uniqueIps = uniqueIps;
            this.uniqueUsernames = uniqueUsernames;
        }

        // Getters
        public Long getTotalAttempts() { return totalAttempts; }
        public Long getSuccessfulLogins() { return successfulLogins; }
        public Long getFailedLogins() { return failedLogins; }
        public Long getBlockedAttempts() { return blockedAttempts; }
        public Long getUniqueIps() { return uniqueIps; }
        public Long getUniqueUsernames() { return uniqueUsernames; }
        
        public Double getSuccessRate() {
            return totalAttempts > 0 ? (successfulLogins.doubleValue() / totalAttempts.doubleValue()) * 100 : 0.0;
        }
        
        public Double getFailureRate() {
            return totalAttempts > 0 ? (failedLogins.doubleValue() / totalAttempts.doubleValue()) * 100 : 0.0;
        }
    }
}
