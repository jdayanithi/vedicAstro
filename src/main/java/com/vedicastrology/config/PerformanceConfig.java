package com.vedicastrology.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration properties for performance monitoring
 */
@Configuration
@ConfigurationProperties(prefix = "performance.logging")
public class PerformanceConfig {
    
    private boolean enabled = true;
    private long thresholdMs = 1000;
    private boolean logAllRequests = false;
    private boolean includeRequestDetails = true;
    private boolean includeUserAgent = true;
    private int maxUserAgentLength = 50;
    
    // Getters and Setters
    public boolean isEnabled() {
        return enabled;
    }
    
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
    
    public long getThresholdMs() {
        return thresholdMs;
    }
    
    public void setThresholdMs(long thresholdMs) {
        this.thresholdMs = thresholdMs;
    }
    
    public boolean isLogAllRequests() {
        return logAllRequests;
    }
    
    public void setLogAllRequests(boolean logAllRequests) {
        this.logAllRequests = logAllRequests;
    }
    
    public boolean isIncludeRequestDetails() {
        return includeRequestDetails;
    }
    
    public void setIncludeRequestDetails(boolean includeRequestDetails) {
        this.includeRequestDetails = includeRequestDetails;
    }
    
    public boolean isIncludeUserAgent() {
        return includeUserAgent;
    }
    
    public void setIncludeUserAgent(boolean includeUserAgent) {
        this.includeUserAgent = includeUserAgent;
    }
    
    public int getMaxUserAgentLength() {
        return maxUserAgentLength;
    }
    
    public void setMaxUserAgentLength(int maxUserAgentLength) {
        this.maxUserAgentLength = maxUserAgentLength;
    }
}
