package com.vedicastrology.service;

import com.vedicastrology.dto.TagDTO;
import com.vedicastrology.entity.Tag;
import com.vedicastrology.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public List<TagDTO> getAllTags() {
        return tagRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public Optional<TagDTO> getTagById(Long id) {
        return tagRepository.findById(id).map(this::toDTO);
    }

    public Optional<TagDTO> getTagByName(String tagName) {
        return tagRepository.findByTagName(tagName).map(this::toDTO);
    }    public TagDTO createTag(TagDTO tagDTO) {
        Tag tag = new Tag();
        BeanUtils.copyProperties(tagDTO, tag);
        // Set default statusFlag if not provided
        if (tag.getStatusFlag() == null) {
            tag.setStatusFlag(true);
        }
        Tag saved = tagRepository.save(tag);
        return toDTO(saved);
    }public Optional<TagDTO> updateTag(Long id, TagDTO tagDTO) {
        return tagRepository.findById(id).map(existing -> {
            existing.setTagName(tagDTO.getTagName());
            existing.setTagCategory(tagDTO.getTagCategory());
            existing.setDescription(tagDTO.getDescription());
            existing.setCreatedByUserId(tagDTO.getCreatedByUserId());
            existing.setStatusFlag(tagDTO.getStatusFlag());
            Tag saved = tagRepository.save(existing);
            return toDTO(saved);
        });
    }

    public boolean deleteTag(Long id) {
        if (tagRepository.existsById(id)) {
            tagRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private TagDTO toDTO(Tag tag) {
        TagDTO dto = new TagDTO();
        BeanUtils.copyProperties(tag, dto);
        return dto;
    }
}
