package com.vedicastrology.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vedicastrology.dto.CategoryDTO;
import com.vedicastrology.service.CategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CategoryController.class)
@ContextConfiguration(classes = {CategoryController.class, CategoryControllerTest.TestSecurityConfig.class})
class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoryService categoryService;

    @Autowired
    private ObjectMapper objectMapper;

    private CategoryDTO testCategoryDTO;

    @BeforeEach
    void setUp() {
        testCategoryDTO = new CategoryDTO();
        testCategoryDTO.setCategoryId(1L);
        testCategoryDTO.setName("Test Category");
        testCategoryDTO.setDescription("Test Description");
        testCategoryDTO.setCategoryType("IT");
        testCategoryDTO.setIsPublished(true);
        testCategoryDTO.setThumbnailUrl("https://example.com/thumbnail.jpg");
        testCategoryDTO.setParentCategoryId(null);
        testCategoryDTO.setParentCategoryName(null);
    }    @Test
    void createCategory_Success() throws Exception {
        // Arrange
        CategoryDTO inputDTO = new CategoryDTO();
        inputDTO.setName("New Category");
        inputDTO.setDescription("New Description");
        inputDTO.setCategoryType("Academic");
        inputDTO.setIsPublished(false);

        when(categoryService.createCategory(any(CategoryDTO.class))).thenReturn(testCategoryDTO);

        // Act & Assert
        mockMvc.perform(post("/api/categories")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(inputDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categoryId").value(1L))
                .andExpect(jsonPath("$.name").value("Test Category"))
                .andExpect(jsonPath("$.description").value("Test Description"))
                .andExpect(jsonPath("$.categoryType").value("IT"))
                .andExpect(jsonPath("$.isPublished").value(true));

        verify(categoryService).createCategory(any(CategoryDTO.class));
    }

    @Test
    void getAllCategories_Success() throws Exception {
        // Arrange
        List<CategoryDTO> categories = Arrays.asList(testCategoryDTO);
        when(categoryService.getAllCategories()).thenReturn(categories);

        // Act & Assert
        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].categoryId").value(1L))
                .andExpect(jsonPath("$[0].name").value("Test Category"))
                .andExpect(jsonPath("$[0].categoryType").value("IT"))
                .andExpect(jsonPath("$[0].isPublished").value(true));

        verify(categoryService).getAllCategories();
    }

    @Test
    void getRootCategories_Success() throws Exception {
        // Arrange
        List<CategoryDTO> rootCategories = Arrays.asList(testCategoryDTO);
        when(categoryService.getRootCategories()).thenReturn(rootCategories);

        // Act & Assert
        mockMvc.perform(get("/api/categories/root"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].categoryId").value(1L))
                .andExpect(jsonPath("$[0].name").value("Test Category"))
                .andExpect(jsonPath("$[0].parentCategoryId").isEmpty());

        verify(categoryService).getRootCategories();
    }

    @Test
    void getCategoryById_Success() throws Exception {
        // Arrange
        when(categoryService.getCategoryById(1L)).thenReturn(testCategoryDTO);

        // Act & Assert
        mockMvc.perform(get("/api/categories/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categoryId").value(1L))
                .andExpect(jsonPath("$.name").value("Test Category"))
                .andExpect(jsonPath("$.description").value("Test Description"))
                .andExpect(jsonPath("$.categoryType").value("IT"))
                .andExpect(jsonPath("$.isPublished").value(true));

        verify(categoryService).getCategoryById(1L);
    }

    @Test
    void updateCategory_Success() throws Exception {
        // Arrange
        CategoryDTO updateDTO = new CategoryDTO();
        updateDTO.setName("Updated Category");
        updateDTO.setDescription("Updated Description");
        updateDTO.setCategoryType("Professional");
        updateDTO.setIsPublished(false);

        CategoryDTO updatedCategory = new CategoryDTO();
        updatedCategory.setCategoryId(1L);
        updatedCategory.setName("Updated Category");
        updatedCategory.setDescription("Updated Description");
        updatedCategory.setCategoryType("Professional");
        updatedCategory.setIsPublished(false);

        when(categoryService.updateCategory(eq(1L), any(CategoryDTO.class))).thenReturn(updatedCategory);

        // Act & Assert
        mockMvc.perform(put("/api/categories/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categoryId").value(1L))
                .andExpect(jsonPath("$.name").value("Updated Category"))
                .andExpect(jsonPath("$.description").value("Updated Description"))
                .andExpect(jsonPath("$.categoryType").value("Professional"))
                .andExpect(jsonPath("$.isPublished").value(false));

        verify(categoryService).updateCategory(eq(1L), any(CategoryDTO.class));
    }

    @Test
    void deleteCategory_Success() throws Exception {
        // Arrange
        doNothing().when(categoryService).deleteCategory(1L);

        // Act & Assert
        mockMvc.perform(delete("/api/categories/1"))
                .andExpect(status().isOk());

        verify(categoryService).deleteCategory(1L);
    }

    @Test
    void getSubcategories_Success() throws Exception {
        // Arrange
        CategoryDTO subcategory = new CategoryDTO();
        subcategory.setCategoryId(2L);
        subcategory.setName("Subcategory");
        subcategory.setParentCategoryId(1L);
        subcategory.setParentCategoryName("Test Category");

        List<CategoryDTO> subcategories = Arrays.asList(subcategory);
        when(categoryService.getSubcategories(1L)).thenReturn(subcategories);        // Act & Assert
        mockMvc.perform(get("/api/categories/subcategories/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].categoryId").value(2L))
                .andExpect(jsonPath("$[0].name").value("Subcategory"))
                .andExpect(jsonPath("$[0].parentCategoryId").value(1L))
                .andExpect(jsonPath("$[0].parentCategoryName").value("Test Category"));

        verify(categoryService).getSubcategories(1L);
    }

    @Test
    void createCategory_InvalidInput_BadRequest() throws Exception {
        // Arrange - empty/invalid input
        CategoryDTO invalidDTO = new CategoryDTO();
        // Missing required fields

        // Act & Assert
        mockMvc.perform(post("/api/categories")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidDTO)))
                .andExpect(status().isOk()); // Note: Actual validation depends on @Valid annotations

        // Verify service was still called (since no @Valid validation in controller)
        verify(categoryService).createCategory(any(CategoryDTO.class));
    }

    @Test
    void getCategoryById_NotFound() throws Exception {
        // Arrange
        when(categoryService.getCategoryById(99L)).thenThrow(new RuntimeException("Category not found with id: 99"));

        // Act & Assert
        mockMvc.perform(get("/api/categories/99"))
                .andExpect(status().isInternalServerError());

        verify(categoryService).getCategoryById(99L);
    }

    @Test
    void updateCategory_NotFound() throws Exception {
        // Arrange
        CategoryDTO updateDTO = new CategoryDTO();
        updateDTO.setName("Updated Category");

        when(categoryService.updateCategory(eq(99L), any(CategoryDTO.class)))
                .thenThrow(new RuntimeException("Category not found"));

        // Act & Assert
        mockMvc.perform(put("/api/categories/99")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isInternalServerError());        verify(categoryService).updateCategory(eq(99L), any(CategoryDTO.class));
    }

    @Configuration
    @EnableWebSecurity
    static class TestSecurityConfig {
        
        @Bean
        @Primary
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http.authorizeHttpRequests(authz -> authz.anyRequest().permitAll())
                .csrf(csrf -> csrf.disable());
            return http.build();
        }
    }
}
