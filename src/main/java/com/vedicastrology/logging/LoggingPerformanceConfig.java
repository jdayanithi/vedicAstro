package com.vedicastrology.logging;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration properties for logging performance optimization
 */
@Configuration
@ConfigurationProperties(prefix = "vedic.logging.performance")
public class LoggingPerformanceConfig {
    
    /**
     * Threshold below which strings skip regex processing entirely
     */
    private int ultraSmallThreshold = 20;
    
    /**
     * Threshold for basic masking (limited patterns)
     */
    private int smallStringThreshold = 100;
    
    /**
     * Threshold for standard masking
     */
    private int mediumStringThreshold = 1000;
    
    /**
     * Threshold above which chunked processing is used
     */
    private int largeStringThreshold = 10000;
    
    /**
     * Chunk size for processing very large strings
     */
    private int chunkSize = 5000;
    
    /**
     * Number of chunks to process before yielding to other threads
     */
    private int yieldInterval = 4;
    
    /**
     * Enable performance monitoring and timing
     */
    private boolean performanceMonitoringEnabled = true;
    
    /**
     * Threshold above which processing time is logged
     */
    private long performanceLoggingThresholdMicros = 100;
    
    // Getters and setters
    public int getUltraSmallThreshold() {
        return ultraSmallThreshold;
    }
    
    public void setUltraSmallThreshold(int ultraSmallThreshold) {
        this.ultraSmallThreshold = ultraSmallThreshold;
    }
    
    public int getSmallStringThreshold() {
        return smallStringThreshold;
    }
    
    public void setSmallStringThreshold(int smallStringThreshold) {
        this.smallStringThreshold = smallStringThreshold;
    }
    
    public int getMediumStringThreshold() {
        return mediumStringThreshold;
    }
    
    public void setMediumStringThreshold(int mediumStringThreshold) {
        this.mediumStringThreshold = mediumStringThreshold;
    }
    
    public int getLargeStringThreshold() {
        return largeStringThreshold;
    }
    
    public void setLargeStringThreshold(int largeStringThreshold) {
        this.largeStringThreshold = largeStringThreshold;
    }
    
    public int getChunkSize() {
        return chunkSize;
    }
    
    public void setChunkSize(int chunkSize) {
        this.chunkSize = chunkSize;
    }
    
    public int getYieldInterval() {
        return yieldInterval;
    }
    
    public void setYieldInterval(int yieldInterval) {
        this.yieldInterval = yieldInterval;
    }
    
    public boolean isPerformanceMonitoringEnabled() {
        return performanceMonitoringEnabled;
    }
    
    public void setPerformanceMonitoringEnabled(boolean performanceMonitoringEnabled) {
        this.performanceMonitoringEnabled = performanceMonitoringEnabled;
    }
    
    public long getPerformanceLoggingThresholdMicros() {
        return performanceLoggingThresholdMicros;
    }
    
    public void setPerformanceLoggingThresholdMicros(long performanceLoggingThresholdMicros) {
        this.performanceLoggingThresholdMicros = performanceLoggingThresholdMicros;
    }
    
    @Override
    public String toString() {
        return "LoggingPerformanceConfig{" +
                "ultraSmallThreshold=" + ultraSmallThreshold +
                ", smallStringThreshold=" + smallStringThreshold +
                ", mediumStringThreshold=" + mediumStringThreshold +
                ", largeStringThreshold=" + largeStringThreshold +
                ", chunkSize=" + chunkSize +
                ", yieldInterval=" + yieldInterval +
                ", performanceMonitoringEnabled=" + performanceMonitoringEnabled +
                ", performanceLoggingThresholdMicros=" + performanceLoggingThresholdMicros +
                '}';
    }
}
