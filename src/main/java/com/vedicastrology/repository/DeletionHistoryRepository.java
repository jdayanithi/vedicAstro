package com.vedicastrology.repository;

import com.vedicastrology.entity.DeletionHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DeletionHistoryRepository extends JpaRepository<DeletionHistory, Long> {
    
    List<DeletionHistory> findByTableName(String tableName);
    
    List<DeletionHistory> findByDeletedBy(Long deletedBy);
    
    List<DeletionHistory> findByTableNameAndRecordId(String tableName, Long recordId);
    
    @Query("SELECT d FROM DeletionHistory d WHERE d.deletionTimestamp BETWEEN :startDate AND :endDate ORDER BY d.deletionTimestamp DESC")
    List<DeletionHistory> findByDeletionTimestampBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT d FROM DeletionHistory d WHERE d.tableName = :tableName AND d.deletionTimestamp BETWEEN :startDate AND :endDate ORDER BY d.deletionTimestamp DESC")
    List<DeletionHistory> findByTableNameAndDeletionTimestampBetween(@Param("tableName") String tableName, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    Page<DeletionHistory> findByTableNameOrderByDeletionTimestampDesc(String tableName, Pageable pageable);
    
    Page<DeletionHistory> findByDeletedByOrderByDeletionTimestampDesc(Long deletedBy, Pageable pageable);
    
    @Query("SELECT COUNT(d) FROM DeletionHistory d WHERE d.tableName = :tableName")
    Long countByTableName(@Param("tableName") String tableName);
    
    @Query("SELECT COUNT(d) FROM DeletionHistory d WHERE d.deletedBy = :deletedBy")
    Long countByDeletedBy(@Param("deletedBy") Long deletedBy);
}
