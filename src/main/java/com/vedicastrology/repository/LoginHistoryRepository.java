package com.vedicastrology.repository;

import com.vedicastrology.entity.LoginHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoginHistoryRepository extends JpaRepository<LoginHistory, Long> {

    /**
     * Find recent login attempts by IP address
     */
    List<LoginHistory> findByIpAddressAndAttemptTimestampAfterOrderByAttemptTimestampDesc(
            String ipAddress, LocalDateTime since);

    /**
     * Find recent login attempts by username
     */
    List<LoginHistory> findByUsernameAndAttemptTimestampAfterOrderByAttemptTimestampDesc(
            String username, LocalDateTime since);

    /**
     * Find suspicious activities in the last period
     */
    List<LoginHistory> findByIsSuspiciousTrueAndAttemptTimestampAfterOrderByAttemptTimestampDesc(
            LocalDateTime since);

    /**
     * Find failed login attempts by IP in time window
     */
    @Query("SELECT lh FROM LoginHistory lh WHERE lh.ipAddress = :ipAddress " +
           "AND lh.loginStatus IN ('FAILED', 'BLOCKED_IP', 'BLOCKED_USERNAME') " +
           "AND lh.attemptTimestamp > :since ORDER BY lh.attemptTimestamp DESC")
    List<LoginHistory> findFailedAttemptsByIp(@Param("ipAddress") String ipAddress, 
                                             @Param("since") LocalDateTime since);

    /**
     * Find failed login attempts by username in time window
     */
    @Query("SELECT lh FROM LoginHistory lh WHERE lh.username = :username " +
           "AND lh.loginStatus IN ('FAILED', 'BLOCKED_USERNAME') " +
           "AND lh.attemptTimestamp > :since ORDER BY lh.attemptTimestamp DESC")
    List<LoginHistory> findFailedAttemptsByUsername(@Param("username") String username, 
                                                   @Param("since") LocalDateTime since);

    /**
     * Count unique usernames tried from an IP in time window
     */
    @Query("SELECT COUNT(DISTINCT lh.username) FROM LoginHistory lh " +
           "WHERE lh.ipAddress = :ipAddress AND lh.attemptTimestamp > :since " +
           "AND lh.username IS NOT NULL")
    Long countDistinctUsernamesByIp(@Param("ipAddress") String ipAddress, 
                                   @Param("since") LocalDateTime since);

    /**
     * Find login attempts with high risk scores
     */
    List<LoginHistory> findByRiskScoreGreaterThanEqualAndAttemptTimestampAfterOrderByRiskScoreDescAttemptTimestampDesc(
            Integer riskScore, LocalDateTime since);

    /**
     * Find recent successful logins for a user
     */
    @Query("SELECT lh FROM LoginHistory lh WHERE lh.userId = :userId " +
           "AND lh.loginStatus = 'SUCCESS' ORDER BY lh.attemptTimestamp DESC")
    List<LoginHistory> findRecentSuccessfulLoginsByUserId(@Param("userId") Long userId);

    /**
     * Get login statistics for date range
     */
    @Query("SELECT " +
           "COUNT(*) as totalAttempts, " +
           "SUM(CASE WHEN lh.loginStatus = 'SUCCESS' THEN 1 ELSE 0 END) as successfulLogins, " +
           "SUM(CASE WHEN lh.loginStatus = 'FAILED' THEN 1 ELSE 0 END) as failedLogins, " +
           "SUM(CASE WHEN lh.loginStatus IN ('BLOCKED_IP', 'BLOCKED_USERNAME') THEN 1 ELSE 0 END) as blockedAttempts, " +
           "COUNT(DISTINCT lh.ipAddress) as uniqueIps, " +
           "COUNT(DISTINCT lh.username) as uniqueUsernames " +
           "FROM LoginHistory lh WHERE lh.attemptTimestamp BETWEEN :startDate AND :endDate")
    Object[] getLoginStatistics(@Param("startDate") LocalDateTime startDate, 
                               @Param("endDate") LocalDateTime endDate);

    /**
     * Find all blocked attempts in time window
     */
    @Query("SELECT lh FROM LoginHistory lh WHERE lh.loginStatus IN ('BLOCKED_IP', 'BLOCKED_USERNAME') " +
           "AND lh.attemptTimestamp > :since ORDER BY lh.attemptTimestamp DESC")
    List<LoginHistory> findBlockedAttempts(@Param("since") LocalDateTime since);

    /**
     * Clean up old login history records
     */
    @Query("DELETE FROM LoginHistory lh WHERE lh.attemptTimestamp < :cutoffDate")
    void deleteOldRecords(@Param("cutoffDate") LocalDateTime cutoffDate);
}
