package com.vedicastrology.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthFilter;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200", "http://localhost:4201", "http://localhost:8100"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        // Set preflight response cache duration (in seconds) - reduces repeated preflight requests
        configuration.setMaxAge(7200L); // Cache preflight response for 2 hours (increased from 1 hour)
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();        
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                // Allow static resources and Angular apps
                .requestMatchers("/web/index.html", "/admin/index.html").permitAll()
                .requestMatchers("/web/**", "/admin/**", "/static/**").permitAll()
                .requestMatchers("/", "/*.js", "/*.css", "/*.html", "/*.ico", "/*.png", "/*.jpg", "/*.svg", "/*.woff", "/*.woff2", "/*.ttf").permitAll()
                
                // Allow public login endpoints (unprotected)
                .requestMatchers("/api/login/**").permitAll()
                .requestMatchers("/api/register/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                
                // Protect course management endpoints - require authentication  
                .requestMatchers("/api/courses/**").authenticated()
                // Protect all secure API endpoints - require authentication
                .requestMatchers("/api/secure/**").authenticated()
                
                // Allow error pages
                .requestMatchers("/error").permitAll()
                
                // Allow all other requests (for serving static content)
                .anyRequest().permitAll()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}