package com.vedicastrology.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.List;
import java.util.Map;

/**
 * Service for detecting and preventing DoS attacks on login authentication
 * Tracks failed login attempts, IP-based rate limiting, and suspicious patterns
 */
@Component
public class DosProtectionService {

    private static final Logger logger = LoggerFactory.getLogger(DosProtectionService.class);

    // Track failed attempts by IP address
    private final Map<String, List<LoginAttempt>> failedAttemptsByIp = new ConcurrentHashMap<>();
    
    // Track failed attempts by username
    private final Map<String, List<LoginAttempt>> failedAttemptsByUsername = new ConcurrentHashMap<>();
    
    // Track blocked IPs
    private final Map<String, BlockedIp> blockedIps = new ConcurrentHashMap<>();
    
    // Track blocked usernames
    private final Map<String, BlockedUsername> blockedUsernames = new ConcurrentHashMap<>();

    // Configuration constants
    private static final int MAX_FAILED_ATTEMPTS_PER_IP = 5;
    private static final int MAX_FAILED_ATTEMPTS_PER_USERNAME = 3;
    private static final int TIME_WINDOW_MINUTES = 15;
    private static final int BLOCK_DURATION_MINUTES = 30;
    private static final int SUSPICIOUS_ACTIVITY_THRESHOLD = 10; // Multiple usernames from same IP

    /**
     * Record a failed login attempt
     */
    public void recordFailedAttempt(String ipAddress, String username, String userAgent) {
        LoginAttempt attempt = new LoginAttempt(ipAddress, username, userAgent, LocalDateTime.now());
        
        // Record by IP
        failedAttemptsByIp.computeIfAbsent(ipAddress, k -> new CopyOnWriteArrayList<>()).add(attempt);
        
        // Record by username
        if (username != null && !username.trim().isEmpty()) {
            failedAttemptsByUsername.computeIfAbsent(username, k -> new CopyOnWriteArrayList<>()).add(attempt);
        }
        
        // Clean old attempts
        cleanOldAttempts();
        
        // Check for DoS patterns
        checkForDosAttack(ipAddress, username);
        
        logger.warn("🚨 FAILED_LOGIN_ATTEMPT: IP: {} | Username: {} | UserAgent: {}", 
                   ipAddress, username != null ? username : "NULL", userAgent);
    }

    /**
     * Check if an IP address is currently blocked
     */
    public boolean isIpBlocked(String ipAddress) {
        BlockedIp blocked = blockedIps.get(ipAddress);
        if (blocked != null) {
            if (blocked.getBlockedUntil().isAfter(LocalDateTime.now())) {
                return true;
            } else {
                // Block expired, remove it
                blockedIps.remove(ipAddress);
                logger.info("🔓 IP_UNBLOCKED: {} | Block expired", ipAddress);
            }
        }
        return false;
    }

    /**
     * Check if a username is currently blocked
     */
    public boolean isUsernameBlocked(String username) {
        if (username == null || username.trim().isEmpty()) {
            return false;
        }
        
        BlockedUsername blocked = blockedUsernames.get(username);
        if (blocked != null) {
            if (blocked.getBlockedUntil().isAfter(LocalDateTime.now())) {
                return true;
            } else {
                // Block expired, remove it
                blockedUsernames.remove(username);
                logger.info("🔓 USERNAME_UNBLOCKED: {} | Block expired", username);
            }
        }
        return false;
    }

    /**
     * Record a successful login (clears failed attempts)
     */
    public void recordSuccessfulLogin(String ipAddress, String username) {
        // Clear failed attempts for this IP and username
        List<LoginAttempt> ipAttempts = failedAttemptsByIp.get(ipAddress);
        if (ipAttempts != null) {
            ipAttempts.clear();
        }
        
        if (username != null && !username.trim().isEmpty()) {
            List<LoginAttempt> userAttempts = failedAttemptsByUsername.get(username);
            if (userAttempts != null) {
                userAttempts.clear();
            }
        }
        
        logger.info("✅ SUCCESSFUL_LOGIN: IP: {} | Username: {}", ipAddress, username);
    }

    /**
     * Get current security status for an IP
     */
    public SecurityStatus getSecurityStatus(String ipAddress, String username) {
        int ipFailedCount = getRecentFailedAttempts(failedAttemptsByIp.get(ipAddress));
        int usernameFailedCount = username != null ? getRecentFailedAttempts(failedAttemptsByUsername.get(username)) : 0;
        
        boolean ipBlocked = isIpBlocked(ipAddress);
        boolean usernameBlocked = isUsernameBlocked(username);
        
        return new SecurityStatus(ipFailedCount, usernameFailedCount, ipBlocked, usernameBlocked);
    }

    /**
     * Check for DoS attack patterns and block if necessary
     */
    private void checkForDosAttack(String ipAddress, String username) {
        // Check IP-based attacks
        List<LoginAttempt> ipAttempts = failedAttemptsByIp.get(ipAddress);
        int recentIpFailures = getRecentFailedAttempts(ipAttempts);
        
        if (recentIpFailures >= MAX_FAILED_ATTEMPTS_PER_IP) {
            blockIp(ipAddress, recentIpFailures);
        }
        
        // Check username-based attacks
        if (username != null && !username.trim().isEmpty()) {
            List<LoginAttempt> userAttempts = failedAttemptsByUsername.get(username);
            int recentUserFailures = getRecentFailedAttempts(userAttempts);
            
            if (recentUserFailures >= MAX_FAILED_ATTEMPTS_PER_USERNAME) {
                blockUsername(username, recentUserFailures);
            }
        }
        
        // Check for suspicious activity (same IP trying multiple usernames)
        checkSuspiciousActivity(ipAddress);
    }

    /**
     * Block an IP address
     */
    private void blockIp(String ipAddress, int attemptCount) {
        LocalDateTime blockedUntil = LocalDateTime.now().plusMinutes(BLOCK_DURATION_MINUTES);
        BlockedIp blockedIp = new BlockedIp(ipAddress, LocalDateTime.now(), blockedUntil, attemptCount);
        blockedIps.put(ipAddress, blockedIp);
        
        logger.error("🔒 DOS_ATTACK_DETECTED - IP_BLOCKED: {} | Failed attempts: {} | Blocked until: {}", 
                    ipAddress, attemptCount, blockedUntil);
    }

    /**
     * Block a username
     */
    private void blockUsername(String username, int attemptCount) {
        LocalDateTime blockedUntil = LocalDateTime.now().plusMinutes(BLOCK_DURATION_MINUTES);
        BlockedUsername blockedUsername = new BlockedUsername(username, LocalDateTime.now(), blockedUntil, attemptCount);
        blockedUsernames.put(username, blockedUsername);
        
        logger.error("🔒 DOS_ATTACK_DETECTED - USERNAME_BLOCKED: {} | Failed attempts: {} | Blocked until: {}", 
                    username, attemptCount, blockedUntil);
    }

    /**
     * Check for suspicious activity patterns
     */
    private void checkSuspiciousActivity(String ipAddress) {
        List<LoginAttempt> ipAttempts = failedAttemptsByIp.get(ipAddress);
        if (ipAttempts == null) return;
        
        // Count unique usernames tried from this IP in recent time
        long uniqueUsernames = ipAttempts.stream()
                .filter(attempt -> attempt.getTimestamp().isAfter(LocalDateTime.now().minusMinutes(TIME_WINDOW_MINUTES)))
                .map(LoginAttempt::getUsername)
                .filter(username -> username != null && !username.trim().isEmpty())
                .distinct()
                .count();
        
        if (uniqueUsernames >= SUSPICIOUS_ACTIVITY_THRESHOLD) {
            logger.error("🚨 SUSPICIOUS_ACTIVITY_DETECTED: IP: {} | Unique usernames attempted: {} in {} minutes", 
                        ipAddress, uniqueUsernames, TIME_WINDOW_MINUTES);
            
            // Immediately block this IP for suspicious behavior
            blockIp(ipAddress, (int)uniqueUsernames);
        }
    }

    /**
     * Get count of recent failed attempts
     */
    private int getRecentFailedAttempts(List<LoginAttempt> attempts) {
        if (attempts == null) return 0;
        
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(TIME_WINDOW_MINUTES);
        return (int) attempts.stream()
                .filter(attempt -> attempt.getTimestamp().isAfter(cutoff))
                .count();
    }

    /**
     * Clean old attempts to prevent memory leaks
     */
    private void cleanOldAttempts() {
        LocalDateTime cutoff = LocalDateTime.now().minusHours(24); // Keep data for 24 hours
        
        failedAttemptsByIp.values().forEach(attempts -> 
            attempts.removeIf(attempt -> attempt.getTimestamp().isBefore(cutoff)));
        
        failedAttemptsByUsername.values().forEach(attempts -> 
            attempts.removeIf(attempt -> attempt.getTimestamp().isBefore(cutoff)));
        
        // Remove empty lists
        failedAttemptsByIp.entrySet().removeIf(entry -> entry.getValue().isEmpty());
        failedAttemptsByUsername.entrySet().removeIf(entry -> entry.getValue().isEmpty());
    }

    /**
     * Get security statistics
     */
    public SecurityStatistics getSecurityStatistics() {
        cleanOldAttempts(); // Clean before calculating stats
        
        int totalBlockedIps = blockedIps.size();
        int totalBlockedUsernames = blockedUsernames.size();
        int totalFailedAttempts = failedAttemptsByIp.values().stream()
                .mapToInt(List::size)
                .sum();
        
        return new SecurityStatistics(totalBlockedIps, totalBlockedUsernames, totalFailedAttempts);
    }

    // Inner classes for data structures
    public static class LoginAttempt {
        private final String ipAddress;
        private final String username;
        private final String userAgent;
        private final LocalDateTime timestamp;

        public LoginAttempt(String ipAddress, String username, String userAgent, LocalDateTime timestamp) {
            this.ipAddress = ipAddress;
            this.username = username;
            this.userAgent = userAgent;
            this.timestamp = timestamp;
        }

        // Getters
        public String getIpAddress() { return ipAddress; }
        public String getUsername() { return username; }
        public String getUserAgent() { return userAgent; }
        public LocalDateTime getTimestamp() { return timestamp; }
    }

    public static class BlockedIp {
        private final String ipAddress;
        private final LocalDateTime blockedAt;
        private final LocalDateTime blockedUntil;
        private final int failedAttempts;

        public BlockedIp(String ipAddress, LocalDateTime blockedAt, LocalDateTime blockedUntil, int failedAttempts) {
            this.ipAddress = ipAddress;
            this.blockedAt = blockedAt;
            this.blockedUntil = blockedUntil;
            this.failedAttempts = failedAttempts;
        }

        // Getters
        public String getIpAddress() { return ipAddress; }
        public LocalDateTime getBlockedAt() { return blockedAt; }
        public LocalDateTime getBlockedUntil() { return blockedUntil; }
        public int getFailedAttempts() { return failedAttempts; }
    }

    public static class BlockedUsername {
        private final String username;
        private final LocalDateTime blockedAt;
        private final LocalDateTime blockedUntil;
        private final int failedAttempts;

        public BlockedUsername(String username, LocalDateTime blockedAt, LocalDateTime blockedUntil, int failedAttempts) {
            this.username = username;
            this.blockedAt = blockedAt;
            this.blockedUntil = blockedUntil;
            this.failedAttempts = failedAttempts;
        }

        // Getters
        public String getUsername() { return username; }
        public LocalDateTime getBlockedAt() { return blockedAt; }
        public LocalDateTime getBlockedUntil() { return blockedUntil; }
        public int getFailedAttempts() { return failedAttempts; }
    }

    public static class SecurityStatus {
        private final int ipFailedAttempts;
        private final int usernameFailedAttempts;
        private final boolean ipBlocked;
        private final boolean usernameBlocked;

        public SecurityStatus(int ipFailedAttempts, int usernameFailedAttempts, boolean ipBlocked, boolean usernameBlocked) {
            this.ipFailedAttempts = ipFailedAttempts;
            this.usernameFailedAttempts = usernameFailedAttempts;
            this.ipBlocked = ipBlocked;
            this.usernameBlocked = usernameBlocked;
        }

        // Getters
        public int getIpFailedAttempts() { return ipFailedAttempts; }
        public int getUsernameFailedAttempts() { return usernameFailedAttempts; }
        public boolean isIpBlocked() { return ipBlocked; }
        public boolean isUsernameBlocked() { return usernameBlocked; }
        public boolean isBlocked() { return ipBlocked || usernameBlocked; }
    }

    public static class SecurityStatistics {
        private final int totalBlockedIps;
        private final int totalBlockedUsernames;
        private final int totalFailedAttempts;

        public SecurityStatistics(int totalBlockedIps, int totalBlockedUsernames, int totalFailedAttempts) {
            this.totalBlockedIps = totalBlockedIps;
            this.totalBlockedUsernames = totalBlockedUsernames;
            this.totalFailedAttempts = totalFailedAttempts;
        }

        // Getters
        public int getTotalBlockedIps() { return totalBlockedIps; }
        public int getTotalBlockedUsernames() { return totalBlockedUsernames; }
        public int getTotalFailedAttempts() { return totalFailedAttempts; }
    }
}
