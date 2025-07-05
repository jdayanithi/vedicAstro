package com.vedicastrology.aop;

import com.vedicastrology.config.PerformanceConfig;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;

/**
 * AOP Aspect for logging slow API requests
 * Intercepts all controller methods and logs performance metrics
 * Configurable through performance.properties
 */
@Aspect
@Component
public class PerformanceLoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(PerformanceLoggingAspect.class);
    
    @Autowired
    private PerformanceConfig performanceConfig;

    /**
     * Intercept all controller methods
     */
    @Around("execution(* com.vedicastrology.controller..*(..))")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        // Skip if performance logging is disabled
        if (!performanceConfig.isEnabled()) {
            return joinPoint.proceed();
        }
        
        // Get request information
        String methodName = joinPoint.getSignature().toShortString();
        String requestInfo = performanceConfig.isIncludeRequestDetails() ? getRequestInfo() : "Request details disabled";
        
        long startTime = System.currentTimeMillis();
        
        try {
            // Execute the actual method
            Object result = joinPoint.proceed();
            
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            
            // Log if request took more than threshold
            if (duration > performanceConfig.getThresholdMs()) {
                logger.warn("🐌 SLOW REQUEST DETECTED: {} took {}ms | Request: {}", 
                           methodName, duration, requestInfo);
            } else if (performanceConfig.isLogAllRequests()) {
                // Log all requests if configured to do so
                logger.info("⚡ Request completed: {} took {}ms | Request: {}", 
                           methodName, duration, requestInfo);
            } else {
                // Log all requests in debug mode for development
                logger.debug("⚡ Request completed: {} took {}ms | Request: {}", 
                            methodName, duration, requestInfo);
            }
            
            return result;
            
        } catch (Exception e) {
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            
            logger.error("💥 REQUEST FAILED: {} took {}ms and threw exception | Request: {} | Error: {}", 
                        methodName, duration, requestInfo, e.getMessage());
            
            throw e; // Re-throw the exception
        }
    }

    /**
     * Extract request information for logging
     */
    private String getRequestInfo() {
        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();
                String method = request.getMethod();
                String uri = request.getRequestURI();
                String remoteAddr = getClientIpAddress(request);
                
                StringBuilder info = new StringBuilder();
                info.append(String.format("%s %s | IP: %s", method, uri, remoteAddr));
                
                if (performanceConfig.isIncludeUserAgent()) {
                    String userAgent = request.getHeader("User-Agent");
                    if (userAgent != null) {
                        int maxLength = performanceConfig.getMaxUserAgentLength();
                        String truncatedUserAgent = userAgent.length() > maxLength ? 
                            userAgent.substring(0, maxLength) + "..." : userAgent;
                        info.append(" | UserAgent: ").append(truncatedUserAgent);
                    } else {
                        info.append(" | UserAgent: N/A");
                    }
                }
                
                return info.toString();
            }
        } catch (Exception e) {
            logger.debug("Could not extract request info: {}", e.getMessage());
        }
        return "Unknown Request";
    }

    /**
     * Get the real client IP address, considering proxy headers
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String[] headerNames = {
            "X-Forwarded-For",
            "X-Real-IP", 
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR"
        };
        
        for (String header : headerNames) {
            String ip = request.getHeader(header);
            if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
                // X-Forwarded-For can contain multiple IPs, get the first one
                if (ip.contains(",")) {
                    ip = ip.split(",")[0].trim();
                }
                return ip;
            }
        }
        
        return request.getRemoteAddr();
    }
}
