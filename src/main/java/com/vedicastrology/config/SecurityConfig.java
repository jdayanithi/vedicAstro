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
import org.springframework.http.HttpMethod;
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
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
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
                .requestMatchers("/api/login/validate", "/api/login/google").permitAll()
                .requestMatchers("/api/login/encode-password", "/api/login/validate-password", "/api/login/test-password").permitAll()
                .requestMatchers("/api/register/**").permitAll()
                .requestMatchers("/api/auth/validate-token", "/api/auth/logout").permitAll()
                
                // Allow public course access (without authentication)
                .requestMatchers("/api/courses/public", "/api/courses/free").permitAll()
                
                // Allow public category read access (without authentication)
                .requestMatchers(HttpMethod.GET, "/api/categories", "/api/categories/root", "/api/categories/subcategories/*", "/api/categories/*").permitAll()
                
                // Protect user profile and admin endpoints - require authentication
                .requestMatchers("/api/user/**").authenticated()
                .requestMatchers("/api/admin/**").authenticated()
                
                // Protect all other API endpoints - require authentication
                .requestMatchers("/api/**").authenticated()
                
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