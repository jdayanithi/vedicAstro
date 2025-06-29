package com.vedicastrology.controller;

import com.vedicastrology.dto.CourseWithAccessDTO;
import com.vedicastrology.service.CourseAccessService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/secure/courses")
public class CourseAccessController {

    private static final Logger logger = LoggerFactory.getLogger(CourseAccessController.class);

    @Autowired
    private CourseAccessService courseAccessService;    /**
     * Get all courses with access information for the current user
     * Works for both authenticated and anonymous users
     */
    @GetMapping("/with-access")
    public ResponseEntity<List<CourseWithAccessDTO>> getCoursesWithAccess(HttpServletRequest request) {
        logger.info("🌍 /with-access endpoint called");
        logger.debug("📧 Authorization header: {}", request.getHeader("Authorization"));
        
        Long userId = getCurrentUserId();
        logger.info("👤 Final userId from getCurrentUserId(): {}", userId);
        
        // Always return courses, but with different access info based on authentication
        List<CourseWithAccessDTO> courses = courseAccessService.getCoursesWithAccess(userId);
        return ResponseEntity.ok(courses);
    }

    /**
     * Get all courses without authentication (for anonymous users)
     */
    @GetMapping("/public")
    public ResponseEntity<List<CourseWithAccessDTO>> getPublicCourses() {
        List<CourseWithAccessDTO> courses = courseAccessService.getCoursesWithAccess(null);
        return ResponseEntity.ok(courses);
    }

    /**
     * Get only enrolled courses for the current user
     */
    @GetMapping("/my-courses")
    public ResponseEntity<List<CourseWithAccessDTO>> getMyCoursesWithAccess() {
        Long userId = getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.ok(List.of()); // Return empty list for anonymous users
        }
        
        List<CourseWithAccessDTO> courses = courseAccessService.getEnrolledCoursesWithAccess(userId);
        return ResponseEntity.ok(courses);
    }

    /**
     * Get only free courses with access information
     */
    @GetMapping("/free")
    public ResponseEntity<List<CourseWithAccessDTO>> getFreeCoursesWithAccess() {
        Long userId = getCurrentUserId();
        List<CourseWithAccessDTO> courses = courseAccessService.getFreeCoursesWithAccess(userId);
        return ResponseEntity.ok(courses);
    }

    /**
     * Get only paid courses with access information
     */
    @GetMapping("/paid")
    public ResponseEntity<List<CourseWithAccessDTO>> getPaidCoursesWithAccess() {
        Long userId = getCurrentUserId();
        List<CourseWithAccessDTO> courses = courseAccessService.getPaidCoursesWithAccess(userId);
        return ResponseEntity.ok(courses);
    }

    /**
     * Debug endpoint to check enrolled courses data
     */
    @GetMapping("/debug/enrolled")
    public ResponseEntity<List<CourseWithAccessDTO>> debugEnrolledCourses() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                String userIdString = authentication.getName();
                if (!userIdString.equals("anonymousUser")) {
                    Long userId = Long.parseLong(userIdString);
                    List<CourseWithAccessDTO> courses = courseAccessService.getEnrolledCoursesWithAccess(userId);
                    return ResponseEntity.ok(courses);
                }
            }
        } catch (Exception e) {
            logger.error("💥 Error in debugEnrolledCourses: {}", e.getMessage(), e);
        }
        return ResponseEntity.ok(List.of());
    }
    
    /**
     * Helper method to get current user ID from JWT token or return null for anonymous users
     */
    private Long getCurrentUserId() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            logger.debug("🔐 Authentication object: {}", authentication);
            
            if (authentication != null && authentication.isAuthenticated()) {
                // The username in JWT is actually the user ID (we set it as user ID in login)
                String userIdString = authentication.getName();
                logger.debug("👤 Username from authentication: {}", userIdString);
                logger.debug("🔍 Is authenticated: {}", authentication.isAuthenticated());
                logger.debug("📜 Authorities: {}", authentication.getAuthorities());
                
                if (!userIdString.equals("anonymousUser")) {
                    Long userId = Long.parseLong(userIdString);
                    logger.debug("✅ Parsed user ID: {}", userId);
                    return userId;
                }
            }
        } catch (Exception e) {
            logger.error("❌ Error getting user ID: {}", e.getMessage(), e);
        }
        logger.debug("🚫 Returning null (anonymous user)");
        return null; // Anonymous user
    }
}
