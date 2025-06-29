package com.vedicastrology.controller;

import com.vedicastrology.dto.CategoryDTO;
import com.vedicastrology.service.CategoryService;
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

    @PostMapping
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
        logger.info("📝 Creating new category: {}", categoryDTO.getName());
        try {
            CategoryDTO createdCategory = categoryService.createCategory(categoryDTO);
            logger.info("✅ Successfully created category with ID: {}", createdCategory.getCategoryId());
            return ResponseEntity.ok(createdCategory);
        } catch (Exception e) {
            logger.error("💥 Error creating category: {}", e.getMessage(), e);
            throw e;
        }
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
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

    @GetMapping("/root")
    public ResponseEntity<List<CategoryDTO>> getRootCategories() {
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

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
        logger.info("🔍 Fetching category with ID: {}", id);
        try {
            CategoryDTO category = categoryService.getCategoryById(id);
            logger.info("✅ Successfully fetched category: {}", category.getName());
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            logger.error("💥 Error fetching category {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }

    @GetMapping("/subcategories/{parentId}")
    public ResponseEntity<List<CategoryDTO>> getSubcategories(@PathVariable Long parentId) {
        logger.info("🔍 Fetching subcategories for parent ID: {}", parentId);
        try {
            List<CategoryDTO> subcategories = categoryService.getSubcategories(parentId);
            logger.info("✅ Successfully fetched {} subcategories for parent {}", subcategories.size(), parentId);
            return ResponseEntity.ok(subcategories);
        } catch (Exception e) {
            logger.error("💥 Error fetching subcategories for parent {}: {}", parentId, e.getMessage(), e);
            throw e;
        }
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        logger.error("💥 Unhandled runtime exception in CategoryController: {}", ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }
}
