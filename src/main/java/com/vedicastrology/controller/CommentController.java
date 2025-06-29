package com.vedicastrology.controller;

import com.vedicastrology.dto.request.CommonRequestDTOs.PostIdRequest;
import com.vedicastrology.service.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/secure/")
public class CommentController {

    private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    private CommentService commentService;

    @PostMapping("comments/create")
    public ResponseEntity<?> createComment(@RequestParam Long postId, @RequestParam String postedBy, @RequestBody String content){
        try {
            logger.info("📝 Creating comment for post ID: {} by user: {}", postId, postedBy);
            var comment = commentService.createComment(postId, postedBy, content);
            logger.info("✅ Created comment for post ID: {}", postId);
            return ResponseEntity.ok(comment);
        } catch (Exception e){
            logger.error("💥 Error creating comment for post {}: {}", postId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }

    @PostMapping("comments/get-by-post")
    public ResponseEntity<?> getCommentsByPostId(@RequestBody PostIdRequest request){
        Long postId = request.getPostId();
        try {
            logger.info("🔍 Fetching comments for post ID: {}", postId);
            var comments = commentService.getCommentsByPostId(postId);
            logger.info("✅ Fetched {} comments for post ID: {}", comments != null ? ((java.util.List<?>) comments).size() : 0, postId);
            return ResponseEntity.ok(comments);
        } catch (Exception e){
            logger.error("💥 Error fetching comments for post {}: {}", postId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something Went Wrong.");
        }
    }
}
