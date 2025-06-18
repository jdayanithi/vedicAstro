package com.vedicastrology.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class GoogleJwtService {

    private static final Logger logger = LoggerFactory.getLogger(GoogleJwtService.class);

    @Value("${google.client.id:303692874838-i7u06gh4rchrjgckp1c53m4lqma8btlo.apps.googleusercontent.com}")
    private String googleClientId;

    public GoogleIdToken.Payload verifyGoogleToken(String idTokenString) throws GeneralSecurityException, IOException {
        logger.info("🔐 Starting Google JWT verification with client ID: {}", googleClientId);
        logger.debug("📝 Token to verify (first 50 chars): {}", idTokenString.substring(0, Math.min(50, idTokenString.length())) + "...");
        
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();
            
            logger.debug("🔧 GoogleIdTokenVerifier created successfully");

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                logger.info("✅ Google JWT verification successful for user: {}", payload.getEmail());
                logger.debug("📋 Token details - Subject: {}, Issuer: {}, Audience: {}", 
                           payload.getSubject(), payload.getIssuer(), payload.getAudience());
                return payload;
            } else {
                logger.error("❌ Google JWT verification failed - token is invalid");
                throw new SecurityException("Invalid Google ID token");
            }
        } catch (GeneralSecurityException e) {
            logger.error("🔒 Security exception during Google JWT verification: {}", e.getMessage(), e);
            throw e;
        } catch (IOException e) {
            logger.error("🌐 IO exception during Google JWT verification: {}", e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            logger.error("💥 Unexpected error during Google JWT verification: {}", e.getMessage(), e);
            throw new RuntimeException("Google JWT verification failed", e);
        }
    }
}
