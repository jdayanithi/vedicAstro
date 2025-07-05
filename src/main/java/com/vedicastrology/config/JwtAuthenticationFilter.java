package com.vedicastrology.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final ObjectMapper objectMapper;    @Override    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            final String authHeader = request.getHeader("Authorization");
            
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                filterChain.doFilter(request, response);
                return;
            }
              final String jwt = authHeader.substring(7);
            final String userIdOrEmail = jwtService.extractUsername(jwt);            if (userIdOrEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Try to load user by ID first (for JWT tokens created with user ID)
                try {
                    Long userId = Long.parseLong(userIdOrEmail);                // For JWT tokens with user ID, validate the token by trying to extract claims
                try {
                    // This will throw an exception if the token is invalid or expired
                    jwtService.extractUsername(jwt);
                    
                    // Extract authorities from the JWT token
                    var authorities = jwtService.extractAuthorities(jwt);
                    log.debug("🔍 Extracted authorities from JWT for user {}: {}", userIdOrEmail, authorities);
                    
                    // Create a simple authentication token with the user ID and extracted authorities
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userIdOrEmail, // Use the user ID as the principal
                            null,
                            authorities // Use extracted authorities from JWT token
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    log.debug("✅ Authentication set for user {} with authorities: {}", userIdOrEmail, authorities);
                    } catch (Exception ex) {
                        // JWT token is invalid or expired, continue as anonymous
                    }
                    filterChain.doFilter(request, response);
                    return;
                } catch (NumberFormatException e) {
                    // Not a user ID, try loading by username/email
                    try {
                        UserDetails userDetails = this.userDetailsService.loadUserByUsername(userIdOrEmail);
                        if (jwtService.isTokenValid(jwt, userDetails)) {
                            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );
                            authToken.setDetails(
                                    new WebAuthenticationDetailsSource().buildDetails(request)
                            );
                            SecurityContextHolder.getContext().setAuthentication(authToken);
                        }
                    } catch (Exception ex) {
                        // Failed to load user or validate token, continue as anonymous
                    }
                }
            }
            filterChain.doFilter(request, response);
            
        } catch (ExpiredJwtException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            
            Map<String, Object> body = new HashMap<>();
            body.put("status", HttpStatus.UNAUTHORIZED.value());
            body.put("error", "Unauthorized");
            body.put("message", "Token has expired");
            
            objectMapper.writeValue(response.getOutputStream(), body);
        } catch (Exception e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            
            Map<String, Object> body = new HashMap<>();
            body.put("status", HttpStatus.UNAUTHORIZED.value());
            body.put("error", "Unauthorized");
            body.put("message", "Invalid token");
            
            objectMapper.writeValue(response.getOutputStream(), body);
        }    }
}