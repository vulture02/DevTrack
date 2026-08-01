package devtrack.service;

import devtrack.dto.LearningTopicDTO;

import java.util.List;

public interface LearningTopicService {
   List<LearningTopicDTO>getAllTopic();
   LearningTopicDTO getTopicById(Long id);
   LearningTopicDTO createTopic(LearningTopicDTO dto);
   LearningTopicDTO updateTopic(Long id, LearningTopicDTO dto);
   void deleteTopic(Long id);
}
