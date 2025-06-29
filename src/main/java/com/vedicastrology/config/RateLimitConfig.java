package com.vedicastrology.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Configuration
public class RateLimitConfig {

    @Bean
    public RateLimitFilter rateLimitFilter() {
        return new RateLimitFilter();
    }

    public static class RateLimitFilter extends OncePerRequestFilter {
        
        // Store request counts per IP
        private final ConcurrentHashMap<String, RequestTracker> requestCounts = new ConcurrentHashMap<>();
        
        // Rate limits
        private static final int REQUESTS_PER_MINUTE = 60;
        private static final int FILE_UPLOAD_REQUESTS_PER_HOUR = 10;
        private static final long WINDOW_SIZE_MS = 60 * 1000; // 1 minute
        private static final long FILE_UPLOAD_WINDOW_SIZE_MS = 60 * 60 * 1000; // 1 hour

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
                                      FilterChain filterChain) throws ServletException, IOException {
            
            String clientIP = getClientIP(request);
            String requestURI = request.getRequestURI();
            
            // Check rate limits
            if (isRateLimited(clientIP, requestURI)) {
                response.setStatus(429); // Too Many Requests
                response.setHeader("Retry-After", "60");
                response.getWriter().write("{\"error\":\"Rate limit exceeded. Please try again later.\"}");
                return;
            }
            
            filterChain.doFilter(request, response);
        }

        private boolean isRateLimited(String clientIP, String requestURI) {
            RequestTracker tracker = requestCounts.computeIfAbsent(clientIP, k -> new RequestTracker());
            
            long currentTime = System.currentTimeMillis();
            
            // Check general rate limit
            if (isGeneralRateLimited(tracker, currentTime)) {
                return true;
            }
            
            // Check file upload rate limit
            if (requestURI.contains("/with-proof") && isFileUploadRateLimited(tracker, currentTime)) {
                return true;
            }
            
            return false;
        }

        private boolean isGeneralRateLimited(RequestTracker tracker, long currentTime) {
            // Reset counter if window has passed
            if (currentTime - tracker.lastResetTime > WINDOW_SIZE_MS) {
                tracker.requestCount.set(0);
                tracker.lastResetTime = currentTime;
            }
            
            return tracker.requestCount.incrementAndGet() > REQUESTS_PER_MINUTE;
        }

        private boolean isFileUploadRateLimited(RequestTracker tracker, long currentTime) {
            // Reset counter if window has passed
            if (currentTime - tracker.fileUploadLastResetTime > FILE_UPLOAD_WINDOW_SIZE_MS) {
                tracker.fileUploadCount.set(0);
                tracker.fileUploadLastResetTime = currentTime;
            }
            
            return tracker.fileUploadCount.incrementAndGet() > FILE_UPLOAD_REQUESTS_PER_HOUR;
        }

        private String getClientIP(HttpServletRequest request) {
            String xForwardedFor = request.getHeader("X-Forwarded-For");
            if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
                return xForwardedFor.split(",")[0].trim();
            }
            
            String xRealIP = request.getHeader("X-Real-IP");
            if (xRealIP != null && !xRealIP.isEmpty()) {
                return xRealIP;
            }
            
            return request.getRemoteAddr();
        }

        private static class RequestTracker {
            final AtomicInteger requestCount = new AtomicInteger(0);
            final AtomicInteger fileUploadCount = new AtomicInteger(0);
            volatile long lastResetTime = System.currentTimeMillis();
            volatile long fileUploadLastResetTime = System.currentTimeMillis();
        }
    }
}
