package com.vedicastrology.service;

import com.vedicastrology.dto.CategoryDTO;
import com.vedicastrology.entity.Category;
import com.vedicastrology.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    private Category testCategory;
    private CategoryDTO testCategoryDTO;
    private Category parentCategory;

    @BeforeEach
    void setUp() {
        // Setup parent category
        parentCategory = new Category();
        parentCategory.setCategoryId(1L);
        parentCategory.setName("Parent Category");
        parentCategory.setDescription("Parent Description");
        parentCategory.setCategoryType("Astro");
        parentCategory.setIsPublished(true);
        parentCategory.setCreatedAt(LocalDateTime.now());

        // Setup test category
        testCategory = new Category();
        testCategory.setCategoryId(2L);
        testCategory.setName("Test Category");
        testCategory.setDescription("Test Description");
        testCategory.setCategoryType("IT");
        testCategory.setIsPublished(true);
        testCategory.setThumbnailUrl("https://example.com/thumbnail.jpg");
        testCategory.setParentCategory(parentCategory);
        testCategory.setCreatedAt(LocalDateTime.now());

        // Setup test DTO
        testCategoryDTO = new CategoryDTO();
        testCategoryDTO.setCategoryId(2L);
        testCategoryDTO.setName("Test Category");
        testCategoryDTO.setDescription("Test Description");
        testCategoryDTO.setCategoryType("IT");
        testCategoryDTO.setIsPublished(true);
        testCategoryDTO.setThumbnailUrl("https://example.com/thumbnail.jpg");
        testCategoryDTO.setParentCategoryId(1L);
        testCategoryDTO.setParentCategoryName("Parent Category");
    }

    @Test
    void createCategory_Success() {
        // Arrange
        CategoryDTO inputDTO = new CategoryDTO();
        inputDTO.setName("New Category");
        inputDTO.setDescription("New Description");
        inputDTO.setCategoryType("Academic");
        inputDTO.setIsPublished(false);
        inputDTO.setThumbnailUrl("https://example.com/new.jpg");
        inputDTO.setParentCategoryId(1L);

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(parentCategory));
        when(categoryRepository.save(any(Category.class))).thenReturn(testCategory);

        // Act
        CategoryDTO result = categoryService.createCategory(inputDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Test Category", result.getName());
        assertEquals("Test Description", result.getDescription());
        assertEquals("IT", result.getCategoryType());
        assertTrue(result.getIsPublished());
        verify(categoryRepository).save(any(Category.class));
    }

    @Test
    void createCategory_WithoutParent_Success() {
        // Arrange
        CategoryDTO inputDTO = new CategoryDTO();
        inputDTO.setName("Root Category");
        inputDTO.setDescription("Root Description");
        inputDTO.setCategoryType("Professional");
        inputDTO.setIsPublished(true);

        Category rootCategory = new Category();
        rootCategory.setCategoryId(3L);
        rootCategory.setName("Root Category");
        rootCategory.setDescription("Root Description");
        rootCategory.setCategoryType("Professional");
        rootCategory.setIsPublished(true);

        when(categoryRepository.save(any(Category.class))).thenReturn(rootCategory);

        // Act
        CategoryDTO result = categoryService.createCategory(inputDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Root Category", result.getName());
        assertEquals("Professional", result.getCategoryType());
        assertTrue(result.getIsPublished());
        assertNull(result.getParentCategoryId());
        verify(categoryRepository).save(any(Category.class));
    }

    @Test
    void createCategory_DefaultPublishedTrue() {
        // Arrange
        CategoryDTO inputDTO = new CategoryDTO();
        inputDTO.setName("Default Published Category");
        inputDTO.setDescription("Default Description");
        inputDTO.setCategoryType("Student Project");
        // isPublished is null, should default to true

        when(categoryRepository.save(any(Category.class))).thenReturn(testCategory);

        // Act
        CategoryDTO result = categoryService.createCategory(inputDTO);

        // Assert
        assertNotNull(result);
        assertTrue(result.getIsPublished());
        verify(categoryRepository).save(argThat(category -> 
            category.getIsPublished() == true
        ));
    }

    @Test
    void getAllCategories_Success() {
        // Arrange
        List<Category> categories = Arrays.asList(parentCategory, testCategory);
        when(categoryRepository.findAll()).thenReturn(categories);

        // Act
        List<CategoryDTO> result = categoryService.getAllCategories();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Parent Category", result.get(0).getName());
        assertEquals("Test Category", result.get(1).getName());
        verify(categoryRepository).findAll();
    }

    @Test
    void getRootCategories_Success() {
        // Arrange
        List<Category> rootCategories = Arrays.asList(parentCategory);
        when(categoryRepository.findByParentCategoryIsNull()).thenReturn(rootCategories);

        // Act
        List<CategoryDTO> result = categoryService.getRootCategories();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Parent Category", result.get(0).getName());
        assertNull(result.get(0).getParentCategoryId());
        verify(categoryRepository).findByParentCategoryIsNull();
    }

    @Test
    void getCategoryById_Success() {
        // Arrange
        when(categoryRepository.findById(2L)).thenReturn(Optional.of(testCategory));

        // Act
        CategoryDTO result = categoryService.getCategoryById(2L);

        // Assert
        assertNotNull(result);
        assertEquals(2L, result.getCategoryId());
        assertEquals("Test Category", result.getName());
        assertEquals("IT", result.getCategoryType());
        assertTrue(result.getIsPublished());
        assertEquals(1L, result.getParentCategoryId());
        assertEquals("Parent Category", result.getParentCategoryName());
        verify(categoryRepository).findById(2L);
    }

    @Test
    void getCategoryById_NotFound_ThrowsException() {
        // Arrange
        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            categoryService.getCategoryById(99L)
        );
        assertEquals("Category not found with id: 99", exception.getMessage());
        verify(categoryRepository).findById(99L);
    }

    @Test
    void updateCategory_Success() {
        // Arrange
        CategoryDTO updateDTO = new CategoryDTO();
        updateDTO.setName("Updated Category");
        updateDTO.setDescription("Updated Description");
        updateDTO.setCategoryType("Updated Type");
        updateDTO.setIsPublished(false);
        updateDTO.setThumbnailUrl("https://example.com/updated.jpg");
        updateDTO.setParentCategoryId(null); // Remove parent

        Category updatedCategory = new Category();
        updatedCategory.setCategoryId(2L);
        updatedCategory.setName("Updated Category");
        updatedCategory.setDescription("Updated Description");
        updatedCategory.setCategoryType("Updated Type");
        updatedCategory.setIsPublished(false);
        updatedCategory.setThumbnailUrl("https://example.com/updated.jpg");
        updatedCategory.setParentCategory(null);

        when(categoryRepository.findById(2L)).thenReturn(Optional.of(testCategory));
        when(categoryRepository.save(any(Category.class))).thenReturn(updatedCategory);

        // Act
        CategoryDTO result = categoryService.updateCategory(2L, updateDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Category", result.getName());
        assertEquals("Updated Description", result.getDescription());
        assertEquals("Updated Type", result.getCategoryType());
        assertFalse(result.getIsPublished());
        assertNull(result.getParentCategoryId());
        verify(categoryRepository).findById(2L);
        verify(categoryRepository).save(any(Category.class));
    }

    @Test
    void updateCategory_WithNewParent_Success() {
        // Arrange
        CategoryDTO updateDTO = new CategoryDTO();
        updateDTO.setName("Updated Category");
        updateDTO.setDescription("Updated Description");
        updateDTO.setCategoryType("Updated Type");
        updateDTO.setIsPublished(true);
        updateDTO.setParentCategoryId(3L); // Change parent

        Category newParent = new Category();
        newParent.setCategoryId(3L);
        newParent.setName("New Parent");

        when(categoryRepository.findById(2L)).thenReturn(Optional.of(testCategory));
        when(categoryRepository.findById(3L)).thenReturn(Optional.of(newParent));
        when(categoryRepository.save(any(Category.class))).thenReturn(testCategory);

        // Act
        CategoryDTO result = categoryService.updateCategory(2L, updateDTO);

        // Assert
        assertNotNull(result);
        verify(categoryRepository).findById(2L);
        verify(categoryRepository).findById(3L);
        verify(categoryRepository).save(any(Category.class));
    }

    @Test
    void updateCategory_NotFound_ThrowsException() {
        // Arrange
        CategoryDTO updateDTO = new CategoryDTO();
        updateDTO.setName("Updated Category");

        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            categoryService.updateCategory(99L, updateDTO)
        );
        assertEquals("Category not found", exception.getMessage());
        verify(categoryRepository).findById(99L);
    }

    @Test
    void deleteCategory_Success() {
        // Act
        categoryService.deleteCategory(2L);

        // Assert
        verify(categoryRepository).deleteById(2L);
    }

    @Test
    void getSubcategories_Success() {
        // Arrange
        List<Category> subcategories = Arrays.asList(testCategory);
        when(categoryRepository.findByParentCategory_CategoryId(1L)).thenReturn(subcategories);

        // Act
        List<CategoryDTO> result = categoryService.getSubcategories(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Category", result.get(0).getName());
        assertEquals(1L, result.get(0).getParentCategoryId());
        verify(categoryRepository).findByParentCategory_CategoryId(1L);
    }

    @Test
    void convertToDTO_WithParentCategory_Success() {
        // This test verifies the private convertToDTO method indirectly through getCategoryById
        when(categoryRepository.findById(2L)).thenReturn(Optional.of(testCategory));

        // Act
        CategoryDTO result = categoryService.getCategoryById(2L);

        // Assert
        assertNotNull(result);
        assertEquals(2L, result.getCategoryId());
        assertEquals("Test Category", result.getName());
        assertEquals("Test Description", result.getDescription());
        assertEquals("IT", result.getCategoryType());
        assertTrue(result.getIsPublished());
        assertEquals("https://example.com/thumbnail.jpg", result.getThumbnailUrl());
        assertEquals(1L, result.getParentCategoryId());
        assertEquals("Parent Category", result.getParentCategoryName());
    }

    @Test
    void convertToDTO_WithoutParentCategory_Success() {
        // Arrange
        Category categoryWithoutParent = new Category();
        categoryWithoutParent.setCategoryId(1L);
        categoryWithoutParent.setName("Root Category");
        categoryWithoutParent.setDescription("Root Description");
        categoryWithoutParent.setCategoryType("Astro");
        categoryWithoutParent.setIsPublished(true);
        categoryWithoutParent.setParentCategory(null);

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(categoryWithoutParent));

        // Act
        CategoryDTO result = categoryService.getCategoryById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getCategoryId());
        assertEquals("Root Category", result.getName());
        assertEquals("Astro", result.getCategoryType());
        assertTrue(result.getIsPublished());
        assertNull(result.getParentCategoryId());
        assertNull(result.getParentCategoryName());
    }
}
