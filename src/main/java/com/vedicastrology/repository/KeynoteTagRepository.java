package com.vedicastrology.repository;

import com.vedicastrology.entity.KeynoteTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeynoteTagRepository extends JpaRepository<KeynoteTag, Long> {
    
    // Find tags by keynote ID
    List<KeynoteTag> findByKeynote_KeynoteId(Long keynoteId);
    
    // Find keynotes by tag ID
    List<KeynoteTag> findByTag_TagId(Long tagId);
    
    // Check if keynote-tag association exists
    boolean existsByKeynote_KeynoteIdAndTag_TagId(Long keynoteId, Long tagId);
    
    // Delete by keynote and tag IDs
    void deleteByKeynote_KeynoteIdAndTag_TagId(Long keynoteId, Long tagId);
    
    // Find tags by keynote ID with relevance score greater than threshold
    @Query("SELECT kt FROM KeynoteTag kt WHERE kt.keynote.keynoteId = :keynoteId AND kt.relevanceScore >= :minScore ORDER BY kt.relevanceScore DESC")
    List<KeynoteTag> findByKeynoteIdWithMinRelevance(@Param("keynoteId") Long keynoteId, @Param("minScore") Integer minScore);
    
    // Find keynotes by tag ID with relevance score greater than threshold
    @Query("SELECT kt FROM KeynoteTag kt WHERE kt.tag.tagId = :tagId AND kt.relevanceScore >= :minScore ORDER BY kt.relevanceScore DESC")
    List<KeynoteTag> findByTagIdWithMinRelevance(@Param("tagId") Long tagId, @Param("minScore") Integer minScore);
    
    // Find keynote tags by lesson ID (through keynote relationship)
    @Query("SELECT kt FROM KeynoteTag kt WHERE kt.keynote.lessonId = :lessonId")
    List<KeynoteTag> findByLessonId(@Param("lessonId") Long lessonId);
    
    // Get top tags by relevance for a keynote
    @Query("SELECT kt FROM KeynoteTag kt WHERE kt.keynote.keynoteId = :keynoteId ORDER BY kt.relevanceScore DESC")
    List<KeynoteTag> findByKeynoteIdOrderByRelevanceDesc(@Param("keynoteId") Long keynoteId);
}
