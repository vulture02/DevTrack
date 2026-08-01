package devtrack.repository;

import devtrack.entity.LearningTopic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningTopicRepository extends JpaRepository<LearningTopic,Long> {
    List<LearningTopic>findByStatus(String status);
    long countByStatus(String status);
}
