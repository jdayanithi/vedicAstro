package com.vedicastrology.controller;

import com.vedicastrology.dto.CategoryDTO;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.IdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.ParentIdRequest;
import com.vedicastrology.security.InputSanitizationService;
import com.vedicastrology.service.CategoryService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/secure/categories")
public class CategoryController {

    private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    private CategoryService categoryService;
    
    @Autowired
    private InputSanitizationService inputSanitizationService;

    @PostMapping
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryDTO categoryDTO) {
        logger.info("📝 Creating new category: {}", categoryDTO.getName());
        try {
            // Sanitize input fields
            if (categoryDTO.getName() != null) {
                categoryDTO.setName(inputSanitizationService.sanitizeInput(categoryDTO.getName(), "categoryName"));
            }
            if (categoryDTO.getDescription() != null) {
                categoryDTO.setDescription(inputSanitizationService.sanitizeInput(categoryDTO.getDescription(), "categoryDescription"));
            }
            
            CategoryDTO createdCategory = categoryService.createCategory(categoryDTO);
            logger.info("✅ Successfully created category with ID: {}", createdCategory.getCategoryId());
            return ResponseEntity.ok(createdCategory);
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in create category: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid category data: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error creating category: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to create category");
        }
    }

    @PostMapping("/get-all")
    public ResponseEntity<List<CategoryDTO>> getAllCategories(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching all categories");
        try {
            List<CategoryDTO> categories = categoryService.getAllCategories();
            logger.info("✅ Successfully fetched {} categories", categories.size());
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            logger.error("💥 Error fetching all categories: {}", e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/get-root")
    public ResponseEntity<List<CategoryDTO>> getRootCategories(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching root categories");
        try {
            List<CategoryDTO> rootCategories = categoryService.getRootCategories();
            logger.info("✅ Successfully fetched {} root categories", rootCategories.size());
            return ResponseEntity.ok(rootCategories);
        } catch (Exception e) {
            logger.error("💥 Error fetching root categories: {}", e.getMessage(), e);
            throw e;
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<CategoryDTO> updateCategory(
            @PathVariable Long id,
            @RequestBody CategoryDTO categoryDTO) {
        logger.info("📝 Updating category with ID: {}", id);
        try {
            CategoryDTO updatedCategory = categoryService.updateCategory(id, categoryDTO);
            logger.info("✅ Successfully updated category: {}", updatedCategory.getName());
            return ResponseEntity.ok(updatedCategory);
        } catch (Exception e) {
            logger.error("💥 Error updating category {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        logger.info("🗑️ Deleting category with ID: {}", id);
        try {
            categoryService.deleteCategory(id);
            logger.info("✅ Successfully deleted category with ID: {}", id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("💥 Error deleting category {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/get-by-id")
    public ResponseEntity<?> getCategoryById(@Valid @RequestBody IdRequest request) {
        Long id = request.getId();
        logger.info("🔍 Fetching category with ID: {}", id);
        try {
            // Additional validation for ID
            if (id == null || id <= 0) {
                logger.warn("🚨 Invalid category ID provided: {}", id);
                return ResponseEntity.badRequest().body("Invalid category ID");
            }
            
            CategoryDTO category = categoryService.getCategoryById(id);
            if (category != null) {
                logger.info("✅ Successfully fetched category: {}", category.getName());
                return ResponseEntity.ok(category);
            } else {
                logger.warn("⚠️ Category with ID {} not found", id);
                return ResponseEntity.notFound().build();
            }
        } catch (SecurityException e) {
            logger.error("� SECURITY_VIOLATION in get category by ID: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            logger.error("�💥 Error fetching category {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch category");
        }
    }

    @PostMapping("/get-subcategories")
    public ResponseEntity<?> getSubcategories(@Valid @RequestBody ParentIdRequest request) {
        Long parentId = request.getParentId();
        logger.info("🔍 Fetching subcategories for parent ID: {}", parentId);
        try {
            // Additional validation for ID
            if (parentId == null || parentId <= 0) {
                logger.warn("🚨 Invalid parent ID provided: {}", parentId);
                return ResponseEntity.badRequest().body("Invalid parent ID");
            }
            
            List<CategoryDTO> subcategories = categoryService.getSubcategories(parentId);
            logger.info("✅ Successfully fetched {} subcategories for parent {}", subcategories.size(), parentId);
            return ResponseEntity.ok(subcategories);
        } catch (SecurityException e) {
            logger.error("� SECURITY_VIOLATION in get subcategories: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            logger.error("�💥 Error fetching subcategories for parent {}: {}", parentId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch subcategories");
        }
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        logger.error("💥 Unhandled runtime exception in CategoryController: {}", ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }
}
