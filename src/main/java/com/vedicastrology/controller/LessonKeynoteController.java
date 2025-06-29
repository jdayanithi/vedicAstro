package com.vedicastrology.controller;

import com.vedicastrology.dto.LessonKeynoteDTO;
import com.vedicastrology.dto.response.ErrorResponse;
import com.vedicastrology.dto.response.SuccessResponse;
import com.vedicastrology.service.LessonKeynoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/secure/lesson-keynotes")
public class LessonKeynoteController {
    
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
    @GetMapping("/{id}")
    public ResponseEntity<?> getKeynoteById(@PathVariable Long id) {
        try {
            LessonKeynoteDTO keynote = lessonKeynoteService.getKeynoteById(id);
            return ResponseEntity.ok(keynote);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Not Found", e.getMessage()));
        }
    }
    
    // Get all keynotes
    @GetMapping
    public ResponseEntity<?> getAllKeynotes() {
        try {
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getAllKeynotes();
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes by lesson ID
    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<?> getKeynotesByLessonId(@PathVariable Long lessonId) {
        try {
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getKeynotesByLessonId(lessonId);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get important keynotes by lesson ID
    @GetMapping("/lesson/{lessonId}/important")
    public ResponseEntity<?> getImportantKeynotesByLessonId(@PathVariable Long lessonId) {
        try {
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getImportantKeynotesByLessonId(lessonId);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes by content type
    @GetMapping("/lesson/{lessonId}/content-type/{contentType}")
    public ResponseEntity<?> getKeynotesByContentType(
            @PathVariable Long lessonId, 
            @PathVariable String contentType) {
        try {
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getKeynotesByContentType(lessonId, contentType);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes with visual aids
    @GetMapping("/lesson/{lessonId}/visual-aids")
    public ResponseEntity<?> getKeynotesWithVisualAids(@PathVariable Long lessonId) {
        try {
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getKeynotesWithVisualAids(lessonId);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes by planet
    @GetMapping("/planet/{planet}")
    public ResponseEntity<?> getKeynotesByPlanet(@PathVariable String planet) {
        try {
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getKeynotesByPlanet(planet);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes by zodiac
    @GetMapping("/zodiac/{zodiac}")
    public ResponseEntity<?> getKeynotesByZodiac(@PathVariable String zodiac) {
        try {
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.getKeynotesByZodiac(zodiac);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
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
    @GetMapping("/search")
    public ResponseEntity<?> searchKeynotes(@RequestParam String query) {
        try {
            if (query == null || query.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Invalid Query", "Search query cannot be empty"));
            }
            List<LessonKeynoteDTO> keynotes = lessonKeynoteService.searchKeynotes(query);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
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
    @GetMapping(params = {"page", "size"})
    public ResponseEntity<?> getKeynotesPaginated(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) Long lessonId,
            @RequestParam(required = false) String contentType,
            @RequestParam(required = false) Boolean importantOnly,
            @RequestParam(required = false) String search) {
        try {
            Page<LessonKeynoteDTO> result = lessonKeynoteService.getKeynotesPaginated(
                page, size, lessonId, contentType, importantOnly, search);
            return ResponseEntity.ok().body(
                java.util.Map.of(
                    "content", result.getContent(),
                    "totalElements", result.getTotalElements()
                )
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Paginated retrieval failed", e.getMessage()));
        }
    }
}
