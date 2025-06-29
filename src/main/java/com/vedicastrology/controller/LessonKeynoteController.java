package com.vedicastrology.controller;

import com.vedicastrology.dto.LessonKeynoteDTO;
import com.vedicastrology.dto.response.ErrorResponse;
import com.vedicastrology.dto.response.SuccessResponse;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.IdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.LessonIdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.LessonContentTypeRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.PlanetRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.ZodiacRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.SearchRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.PaginatedKeynoteRequest;
import com.vedicastrology.service.LessonKeynoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/secure/lesson-keynotes")
public class LessonKeynoteController {
    
    private static final Logger logger = LoggerFactory.getLogger(LessonKeynoteController.class);
    
    @Autowired
    private LessonKeynoteService lessonKeynoteService;
    
    // Create a new keynote
    @PostMapping
    public ResponseEntity<?> createKeynote(@RequestBody LessonKeynoteDTO keynoteDTO) {
        try {
            LessonKeynoteDTO createdKeynote = lessonKeynoteService.createKeynote(keynoteDTO);
            return ResponseEntity.ok(createdKeynote);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Creation Failed", e.getMessage()));
        }
    }
    
    // Get keynote by ID
    @PostMapping("/get-by-id")
    public ResponseEntity<?> getKeynoteById(@RequestBody IdRequest request) {
        try {
            Long id = request.getId();
            logger.info("🔍 Fetching keynote with ID: {}", id);
            LessonKeynoteDTO keynote = lessonKeynoteService.getKeynoteById(id);
            logger.info("✅ Fetched keynote: {}", keynote.getTitle());
            return ResponseEntity.ok(keynote);
        } catch (Exception e) {
            logger.error("❌ Error fetching keynote by ID: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Not Found", e.getMessage()));
        }
    }
    
    // Get all keynotes
    @PostMapping("/get-all")
    public ResponseEntity<?> getAllKeynotes(@RequestBody(required = false) EmptyRequest request) {
        try {
            logger.info("🔍 Fetching all keynotes");
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getAllKeynotes();
            logger.info("✅ Fetched {} keynotes", keynotes.size());
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            logger.error("❌ Error fetching all keynotes: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes by lesson ID
    @PostMapping("/get-by-lesson")
    public ResponseEntity<?> getKeynotesByLessonId(@RequestBody LessonIdRequest request) {
        try {
            Long lessonId = request.getLessonId();
            logger.info("🔍 Fetching keynotes for lesson ID: {}", lessonId);
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getKeynotesByLessonId(lessonId);
            logger.info("✅ Fetched {} keynotes for lesson ID: {}", keynotes.size(), lessonId);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            logger.error("❌ Error fetching keynotes by lesson ID: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get important keynotes by lesson ID
    @PostMapping("/get-important-by-lesson")
    public ResponseEntity<?> getImportantKeynotesByLessonId(@RequestBody LessonIdRequest request) {
        try {
            Long lessonId = request.getLessonId();
            logger.info("🔍 Fetching important keynotes for lesson ID: {}", lessonId);
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getImportantKeynotesByLessonId(lessonId);
            logger.info("✅ Fetched {} important keynotes for lesson ID: {}", keynotes.size(), lessonId);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            logger.error("❌ Error fetching important keynotes by lesson ID: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes by content type
    @PostMapping("/get-by-content-type")
    public ResponseEntity<?> getKeynotesByContentType(@RequestBody LessonContentTypeRequest request) {
        try {
            Long lessonId = request.getLessonId();
            String contentType = request.getContentType();
            logger.info("🔍 Fetching keynotes for lesson ID: {} and content type: {}", lessonId, contentType);
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getKeynotesByContentType(lessonId, contentType);
            logger.info("✅ Fetched {} keynotes for lesson ID: {} and content type: {}", keynotes.size(), lessonId, contentType);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            logger.error("❌ Error fetching keynotes by content type: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes with visual aids
    @PostMapping("/get-visual-aids-by-lesson")
    public ResponseEntity<?> getKeynotesWithVisualAids(@RequestBody LessonIdRequest request) {
        try {
            Long lessonId = request.getLessonId();
            logger.info("🔍 Fetching keynotes with visual aids for lesson ID: {}", lessonId);
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getKeynotesWithVisualAids(lessonId);
            logger.info("✅ Fetched {} keynotes with visual aids for lesson ID: {}", keynotes.size(), lessonId);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            logger.error("❌ Error fetching keynotes with visual aids: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes by planet
    @PostMapping("/get-by-planet")
    public ResponseEntity<?> getKeynotesByPlanet(@RequestBody PlanetRequest request) {
        try {
            String planet = request.getPlanet();
            logger.info("🔍 Fetching keynotes for planet: {}", planet);
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getKeynotesByPlanet(planet);
            logger.info("✅ Fetched {} keynotes for planet: {}", keynotes.size(), planet);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            logger.error("❌ Error fetching keynotes by planet: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes by zodiac
    @PostMapping("/get-by-zodiac")
    public ResponseEntity<?> getKeynotesByZodiac(@RequestBody ZodiacRequest request) {
        try {
            String zodiac = request.getZodiac();
            logger.info("🔍 Fetching keynotes for zodiac: {}", zodiac);
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getKeynotesByZodiac(zodiac);
            logger.info("✅ Fetched {} keynotes for zodiac: {}", keynotes.size(), zodiac);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            logger.error("❌ Error fetching keynotes by zodiac: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Update keynote
    @PutMapping("/{id}")
    public ResponseEntity<?> updateKeynote(@PathVariable Long id, @RequestBody LessonKeynoteDTO keynoteDTO) {
        try {
            LessonKeynoteDTO updatedKeynote = lessonKeynoteService.updateKeynote(id, keynoteDTO);
            return ResponseEntity.ok(updatedKeynote);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Update Failed", e.getMessage()));
        }
    }
    
    // Delete keynote
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteKeynote(@PathVariable Long id) {
        try {
            lessonKeynoteService.deleteKeynote(id);
            return ResponseEntity.ok(new SuccessResponse("Keynote deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Deletion Failed", e.getMessage()));
        }
    }
    
    // Search keynotes
    @PostMapping("/search")
    public ResponseEntity<?> searchKeynotes(@RequestBody SearchRequest request) {
        try {
            String query = request.getQuery();
            if (query == null || query.trim().isEmpty()) {
                logger.warn("⚠️ Search query is empty");
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Invalid Query", "Search query cannot be empty"));
            }
            logger.info("🔍 Searching keynotes with query: {}", query);
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.searchKeynotes(query);
            logger.info("✅ Found {} keynotes for search query: {}", keynotes.size(), query);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            logger.error("❌ Error searching keynotes: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Search Failed", e.getMessage()));
        }
    }
    
    // Reorder keynotes within a lesson
    @PutMapping("/lesson/{lessonId}/reorder")
    public ResponseEntity<?> reorderKeynotes(@PathVariable Long lessonId, @RequestBody List<Long> keynoteIds) {
        try {
            List<LessonKeynoteDTO> reorderedKeynotes = lessonKeynoteService.reorderKeynotes(lessonId, keynoteIds);
            return ResponseEntity.ok(reorderedKeynotes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Reorder Failed", e.getMessage()));        }
    }
    
    // Paginated and filtered keynotes endpoint
    @PostMapping("/get-paginated")
    public ResponseEntity<?> getKeynotesPaginated(@RequestBody PaginatedKeynoteRequest request) {
        try {
            logger.info("🔍 Fetching paginated keynotes - page: {}, size: {}", request.getPage(), request.getSize());
            Page<LessonKeynoteDTO> result = lessonKeynoteService.getKeynotesPaginated(
                request.getPage(), request.getSize(), request.getLessonId(), request.getContentType(), 
                request.getImportantOnly(), request.getSearch());
            logger.info("✅ Fetched {} keynotes (page {} of {})", result.getContent().size(), 
                       request.getPage() + 1, result.getTotalPages());
            return ResponseEntity.ok().body(
                java.util.Map.of(
                    "content", result.getContent(),
                    "totalElements", result.getTotalElements()
                )
            );
        } catch (Exception e) {
            logger.error("❌ Error fetching paginated keynotes: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Paginated retrieval failed", e.getMessage()));
        }
    }
}
