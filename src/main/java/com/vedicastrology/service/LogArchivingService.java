package com.vedicastrology.service;

import com.vedicastrology.config.LoggingConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.zip.GZIPOutputStream;

/**
 * Service for archiving log files when they exceed configured size thresholds
 */
@Service
public class LogArchivingService {

    private static final Logger logger = LoggerFactory.getLogger(LogArchivingService.class);
    private static final DateTimeFormatter TIMESTAMP_FORMAT = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
    
    @Autowired
    private LoggingConfiguration loggingConfig;
    
    @Autowired
    private StructuredLoggingService structuredLoggingService;
    
    private ScheduledExecutorService scheduler;
    
    @EventListener(ApplicationReadyEvent.class)
    public void startArchivingScheduler() {
        if (!loggingConfig.getArchiving().isEnabled()) {
            logger.info("📁 Log archiving is disabled");
            return;
        }
        
        logger.info("📁 Starting log archiving service with check interval: {} ms", 
            loggingConfig.getArchiving().getCheckInterval());
        
        scheduler = Executors.newSingleThreadScheduledExecutor(r -> {
            Thread t = new Thread(r, "log-archiving-thread");
            t.setDaemon(true);
            return t;
        });
        
        long checkInterval = loggingConfig.getArchiving().getCheckInterval();
        scheduler.scheduleAtFixedRate(this::checkAndArchiveLogs, 
            checkInterval, checkInterval, TimeUnit.MILLISECONDS);
        
        // Create archive directory if it doesn't exist
        createArchiveDirectory();
    }
    
    /**
     * Check all log files and archive those exceeding size threshold
     */
    public void checkAndArchiveLogs() {
        try {
            String basePath = loggingConfig.getBasePath();
            long sizeThreshold = loggingConfig.getArchiving().getSizeThresholdBytes();
            
            logger.debug("🔍 Checking log files for archiving (threshold: {} bytes)", sizeThreshold);
            
            // Check main application log
            checkAndArchiveFile(Paths.get(basePath, "vedicastro-dev.log"), sizeThreshold);
            checkAndArchiveFile(Paths.get(basePath, "vedicastro-prod.log"), sizeThreshold);
            
            // Check specific log files
            if (loggingConfig.getSecurity().isEnabled()) {
                checkAndArchiveFile(Paths.get(loggingConfig.getSecurity().getFile()), sizeThreshold);
            }
            
            if (loggingConfig.getPerformance().isEnabled()) {
                checkAndArchiveFile(Paths.get(loggingConfig.getPerformance().getFile()), sizeThreshold);
            }
            
            if (loggingConfig.getDosProtection().isEnabled()) {
                checkAndArchiveFile(Paths.get(loggingConfig.getDosProtection().getFile()), sizeThreshold);
            }
            
            if (loggingConfig.getLoginHistory().isEnabled()) {
                checkAndArchiveFile(Paths.get(loggingConfig.getLoginHistory().getFile()), sizeThreshold);
            }
            
        } catch (Exception e) {
            logger.error("❌ Error during log archiving process", e);
            structuredLoggingService.logSecurityEvent("LOG_ARCHIVE_ERROR", "system", "localhost", 
                "Log archiving failed: " + e.getMessage());
        }
    }
    
    /**
     * Check individual file and archive if necessary
     */
    private void checkAndArchiveFile(Path logFile, long sizeThreshold) {
        try {
            if (!Files.exists(logFile)) {
                return;
            }
            
            long fileSize = Files.size(logFile);
            if (fileSize >= sizeThreshold) {
                archiveLogFile(logFile, fileSize);
            }
            
        } catch (IOException e) {
            logger.warn("⚠️ Could not check file size for: {}", logFile, e);
        }
    }
    
    /**
     * Archive a log file by moving it to archive folder
     */
    private void archiveLogFile(Path logFile, long fileSize) {
        try {
            String timestamp = LocalDateTime.now().format(TIMESTAMP_FORMAT);
            String fileName = logFile.getFileName().toString();
            String archivedFileName = timestamp + "_" + fileName;
            
            // Add .gz extension if compression is enabled
            if (loggingConfig.getArchiving().isCompressArchivedFiles()) {
                archivedFileName += ".gz";
            }
            
            Path archiveFolder = Paths.get(loggingConfig.getArchiving().getArchiveFolder());
            Path archivedFile = archiveFolder.resolve(archivedFileName);
            
            logger.info("📦 Archiving log file: {} (size: {} bytes) -> {}", 
                logFile, fileSize, archivedFile);
            
            if (loggingConfig.getArchiving().isCompressArchivedFiles()) {
                compressAndMoveFile(logFile, archivedFile);
            } else {
                moveFile(logFile, archivedFile);
            }
            
            // Create new empty log file
            createNewLogFile(logFile);
            
            // Log the archiving event
            structuredLoggingService.logSecurityEvent("LOG_FILE_ARCHIVED", "system", "localhost", 
                String.format("Log file %s archived to %s (original size: %d bytes)", 
                    fileName, archivedFileName, fileSize));
            
        } catch (IOException e) {
            logger.error("❌ Failed to archive log file: {}", logFile, e);
            structuredLoggingService.logSecurityEvent("LOG_ARCHIVE_FAILED", "system", "localhost", 
                "Failed to archive " + logFile + ": " + e.getMessage());
        }
    }
    
    /**
     * Compress and move file to archive location
     */
    private void compressAndMoveFile(Path sourceFile, Path targetFile) throws IOException {
        try (FileInputStream fis = new FileInputStream(sourceFile.toFile());
             FileOutputStream fos = new FileOutputStream(targetFile.toFile());
             GZIPOutputStream gzos = new GZIPOutputStream(fos);
             BufferedInputStream bis = new BufferedInputStream(fis);
             BufferedOutputStream bos = new BufferedOutputStream(gzos)) {
            
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = bis.read(buffer)) != -1) {
                bos.write(buffer, 0, bytesRead);
            }
        }
        
        // Delete original file after successful compression
        Files.delete(sourceFile);
    }
    
    /**
     * Move file without compression
     */
    private void moveFile(Path sourceFile, Path targetFile) throws IOException {
        Files.move(sourceFile, targetFile, StandardCopyOption.REPLACE_EXISTING);
    }
    
    /**
     * Create new empty log file
     */
    private void createNewLogFile(Path logFile) throws IOException {
        Files.createFile(logFile);
        logger.debug("📄 Created new log file: {}", logFile);
    }
    
    /**
     * Create archive directory if it doesn't exist
     */
    private void createArchiveDirectory() {
        try {
            Path archiveFolder = Paths.get(loggingConfig.getArchiving().getArchiveFolder());
            if (!Files.exists(archiveFolder)) {
                Files.createDirectories(archiveFolder);
                logger.info("📁 Created archive directory: {}", archiveFolder);
            }
        } catch (IOException e) {
            logger.error("❌ Failed to create archive directory", e);
        }
    }
    
    /**
     * Manual trigger for archiving (useful for testing)
     */
    public void triggerArchiving() {
        logger.info("🔄 Manually triggering log archiving");
        checkAndArchiveLogs();
    }
    
    /**
     * Get archiving status and statistics
     */
    public ArchivingStatus getArchivingStatus() {
        ArchivingStatus status = new ArchivingStatus();
        status.enabled = loggingConfig.getArchiving().isEnabled();
        status.sizeThreshold = loggingConfig.getArchiving().getSizeThreshold();
        status.archiveFolder = loggingConfig.getArchiving().getArchiveFolder();
        status.checkInterval = loggingConfig.getArchiving().getCheckInterval();
        status.compressionEnabled = loggingConfig.getArchiving().isCompressArchivedFiles();
        
        // Count archived files
        try {
            Path archiveFolder = Paths.get(loggingConfig.getArchiving().getArchiveFolder());
            if (Files.exists(archiveFolder)) {
                status.archivedFileCount = (int) Files.list(archiveFolder)
                    .filter(Files::isRegularFile)
                    .count();
            }
        } catch (IOException e) {
            logger.warn("Could not count archived files", e);
        }
        
        return status;
    }
    
    /**
     * Shutdown the archiving scheduler
     */
    public void shutdown() {
        if (scheduler != null && !scheduler.isShutdown()) {
            scheduler.shutdown();
            try {
                if (!scheduler.awaitTermination(30, TimeUnit.SECONDS)) {
                    scheduler.shutdownNow();
                }
            } catch (InterruptedException e) {
                scheduler.shutdownNow();
                Thread.currentThread().interrupt();
            }
        }
    }
    
    /**
     * Status information for archiving service
     */
    public static class ArchivingStatus {
        public boolean enabled;
        public String sizeThreshold;
        public String archiveFolder;
        public long checkInterval;
        public boolean compressionEnabled;
        public int archivedFileCount;
        
        @Override
        public String toString() {
            return String.format("ArchivingStatus{enabled=%s, threshold=%s, folder='%s', interval=%dms, compression=%s, archived=%d}", 
                enabled, sizeThreshold, archiveFolder, checkInterval, compressionEnabled, archivedFileCount);
        }
    }
}
