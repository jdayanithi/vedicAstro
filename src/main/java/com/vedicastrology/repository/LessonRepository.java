package com.vedicastrology.repository;

import com.vedicastrology.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByTopic_TopicIdOrderByOrderNumberAsc(Long topicId);
    boolean existsByTopic_TopicIdAndOrderNumber(Long topicId, Integer orderNumber);
    List<Lesson> findByTopic_TopicIdAndOrderNumberGreaterThanOrderByOrderNumberAsc(Long topicId, Integer orderNumber);
}
