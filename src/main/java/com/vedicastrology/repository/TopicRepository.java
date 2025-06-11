package com.vedicastrology.repository;

import com.vedicastrology.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findByCourse_CourseIdOrderByOrderNumberAsc(Long courseId);
    boolean existsByCourse_CourseIdAndOrderNumber(Long courseId, Integer orderNumber);
    List<Topic> findByCourse_CourseIdAndOrderNumberGreaterThanOrderByOrderNumberAsc(Long courseId, Integer orderNumber);
}
