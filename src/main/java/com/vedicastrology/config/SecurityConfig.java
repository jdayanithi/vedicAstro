package com.vedicastrology.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200", "http://localhost:4201"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();        source.registerCorsConfiguration("/**", configuration);
        return source;
    }    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                // Allow ALL static resources and Angular apps first (most specific)
                .requestMatchers("/web/index.html", "/admin/index.html").permitAll()
                .requestMatchers("/web/**", "/admin/**", "/static/**").permitAll()
                .requestMatchers("/", "/*.js", "/*.css", "/*.html", "/*.ico", "/*.png", "/*.jpg", "/*.svg", "/*.woff", "/*.woff2", "/*.ttf").permitAll()
                // Allow API endpoints
                .requestMatchers("/api/auth/**", "/api/dashboard/**","/api/login/**", "/api/courses/**", "/api/categories/**", "/api/users/**",
                               "/api/topics/**", "/api/lessons/**", "/api/lesson-keynotes/**", "/api/tags/**", 
                               "/api/payments/**", "/api/notifications/**", "/api/posts/**", "/api/comments/**",
                               "/api/lesson-tags/**","/api/keynote-tags/**").permitAll()
                // Allow error pages
                .requestMatchers("/error").permitAll()
                .anyRequest().permitAll() // Temporarily allow all requests for testing
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );
            // JWT filter and auth provider disabled for testing
            //.authenticationProvider(authenticationProvider());
            //.addFilterBefore(jwtAuthFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}