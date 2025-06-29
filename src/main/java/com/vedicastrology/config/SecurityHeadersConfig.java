package com.vedicastrology.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityHeadersConfig {

    @Value("${spring.profiles.active:dev}")
    private String activeProfile;

    private boolean isProductionProfile() {
        return "prod".equals(activeProfile) || "production".equals(activeProfile);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.headers(headers -> headers
            // Prevent clickjacking attacks
            .frameOptions(frameOptions -> frameOptions.deny())
            
            // Prevent MIME type sniffing
            .contentTypeOptions(contentTypeOptions -> {})
            
            // Enable HSTS (HTTP Strict Transport Security)
            .httpStrictTransportSecurity(hstsConfig -> hstsConfig
                .maxAgeInSeconds(31536000) // 1 year
                .includeSubDomains(true)
            )
            
            // Set Referrer Policy
            .referrerPolicy(referrerPolicy -> 
                referrerPolicy.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))
            
            // Add custom security headers
            .addHeaderWriter((request, response) -> {
                // Add Content Security Policy - more restrictive in production
                String cspPolicy = isProductionProfile() ? 
                    "default-src 'self'; " +
                    "script-src 'self'; " +
                    "style-src 'self' 'unsafe-inline'; " +
                    "img-src 'self' data:; " +
                    "font-src 'self'; " +
                    "connect-src 'self' https:; " +
                    "media-src 'self'; " +
                    "object-src 'none'; " +
                    "base-uri 'self'; " +
                    "frame-ancestors 'none';"
                    :
                    "default-src 'self'; " +
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
                    "style-src 'self' 'unsafe-inline'; " +
                    "img-src 'self' data: blob:; " +
                    "font-src 'self'; " +
                    "connect-src 'self' http://localhost:* ws://localhost:* https:; " +
                    "media-src 'self'; " +
                    "object-src 'none'; " +
                    "base-uri 'self';";
                
                response.setHeader("Content-Security-Policy", cspPolicy);
                
                // Add X-XSS-Protection
                response.setHeader("X-XSS-Protection", "1; mode=block");
                
                // Add Permissions Policy - more restrictive in production
                String permissionsPolicy = isProductionProfile() ?
                    "geolocation=(), microphone=(), camera=(), payment=(), usb=(), " +
                    "screen-wake-lock=(), web-share=(), xr-spatial-tracking=(), " +
                    "accelerometer=(), gyroscope=(), magnetometer=(), clipboard-read=(), " +
                    "clipboard-write=(), fullscreen=(), picture-in-picture=()"
                    :
                    "geolocation=(), microphone=(), camera=(), " +
                    "payment=(), usb=(), screen-wake-lock=(), " +
                    "web-share=(), xr-spatial-tracking=()";
                
                response.setHeader("Permissions-Policy", permissionsPolicy);
                
                // Add production-specific headers
                if (isProductionProfile()) {
                    response.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
                    response.setHeader("Expect-CT", "max-age=86400, enforce");
                    response.setHeader("X-Permitted-Cross-Domain-Policies", "none");
                }
            })
        );
        
        return http.build();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOriginPatterns(
                        "http://localhost:*",
                        "http://10.0.2.2:*",
                        "http://192.168.*.*:*",
                        "capacitor://localhost"
                    )
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600); // Cache preflight response for 1 hour
            }
        };
    }
}
