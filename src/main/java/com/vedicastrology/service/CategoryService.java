package com.vedicastrology.service;

import com.vedicastrology.dto.CategoryDTO;
import com.vedicastrology.entity.Category;
import com.vedicastrology.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = new Category();        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category.setCategoryType(categoryDTO.getCategoryType());
        category.setIsPublished(categoryDTO.getIsPublished() != null ? categoryDTO.getIsPublished() : true);
        category.setThumbnailUrl(categoryDTO.getThumbnailUrl());
        
        if (categoryDTO.getParentCategoryId() != null) {
            categoryRepository.findById(categoryDTO.getParentCategoryId())
                .ifPresent(category::setParentCategory);
        }

        Category savedCategory = categoryRepository.save(category);
        return convertToDTO(savedCategory);
    }

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<CategoryDTO> getRootCategories() {
        return categoryRepository.findByParentCategoryIsNull().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        return categoryRepository.findById(id)
                .map(category -> {                    category.setName(categoryDTO.getName());
                    category.setDescription(categoryDTO.getDescription());
                    category.setCategoryType(categoryDTO.getCategoryType());
                    category.setIsPublished(categoryDTO.getIsPublished() != null ? categoryDTO.getIsPublished() : true);
                    category.setThumbnailUrl(categoryDTO.getThumbnailUrl());
                    
                    if (categoryDTO.getParentCategoryId() != null) {
                        categoryRepository.findById(categoryDTO.getParentCategoryId())
                            .ifPresent(category::setParentCategory);
                    } else {
                        category.setParentCategory(null);
                    }
                    
                    return convertToDTO(categoryRepository.save(category));
                })
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    public CategoryDTO getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }    public List<CategoryDTO> getSubcategories(Long parentId) {
        return categoryRepository.findByParentCategory_CategoryId(parentId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setCategoryId(category.getCategoryId());        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        dto.setCategoryType(category.getCategoryType());
        dto.setIsPublished(category.getIsPublished());
        dto.setThumbnailUrl(category.getThumbnailUrl());
        
        if (category.getParentCategory() != null) {
            dto.setParentCategoryId(category.getParentCategory().getCategoryId());
            dto.setParentCategoryName(category.getParentCategory().getName());
        }
        
        return dto;
    }
}
