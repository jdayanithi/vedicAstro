package com.vedicastrology.controller;

import com.vedicastrology.entity.Post;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.PostIdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.NameRequest;
import com.vedicastrology.service.PostService;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/secure/posts")
public class PostController {

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody Post post){
        try {
            logger.info("📝 Creating new post");
            Post createdPost = postService.savePost(post);
            logger.info("✅ Created post with ID: {}", createdPost.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
        } catch (Exception e){
            logger.error("💥 Error creating post: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/get-all")
    public ResponseEntity<List<Post>> getAllPosts(@RequestBody(required = false) EmptyRequest request){
        try {
            logger.info("🔍 Fetching all posts");
            List<Post> posts = postService.getAllPosts();
            logger.info("✅ Fetched {} posts", posts.size());
            return ResponseEntity.status(HttpStatus.OK).body(posts);
        } catch (Exception e){
            logger.error("💥 Error fetching all posts: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/get-by-id")
    public ResponseEntity<?> getPostById(@RequestBody PostIdRequest request){
        Long postId = request.getPostId();
        try {
            logger.info("🔍 Fetching post with ID: {}", postId);
            Post post = postService.getPostById(postId);
            logger.info("✅ Fetched post: {}", post.getName());
            return ResponseEntity.ok(post);
        } catch (EntityNotFoundException e){
            logger.error("💥 Post not found with ID {}: {}", postId, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{postId}/like")
    public ResponseEntity<?> likePost(@PathVariable Long postId){
        try {
            logger.info("👍 Liking post with ID: {}", postId);
            postService.likePost(postId);
            logger.info("✅ Post liked successfully: {}", postId);
            return ResponseEntity.ok(new String[]{"Post liked successfully."});
        } catch (EntityNotFoundException e){
            logger.error("💥 Post not found for like {}: {}", postId, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/search")
    public ResponseEntity<?> searchByName(@RequestBody NameRequest request){
        String name = request.getName();
        try {
            logger.info("🔍 Searching posts by name: {}", name);
            List<Post> posts = postService.searchByName(name);
            logger.info("✅ Found {} posts matching: {}", posts.size(), name);
            return ResponseEntity.status(HttpStatus.OK).body(posts);
        } catch (Exception e){
            logger.error("💥 Error searching posts by name '{}': {}", name, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
