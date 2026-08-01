package devtrack.service.impl;

import devtrack.repository.ApplicationRepository;
import devtrack.repository.LearningTopicRepository;
import devtrack.repository.ProblemRepository;
import devtrack.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final LearningTopicRepository topicRepository;
    private final ProblemRepository problemRepository;
    private final ApplicationRepository applicationRepository;


    @Override
    public Map<String, Object> getDashboardStats() {
        Map<String,Object>stats=new HashMap<>();
        // Topic stats
        stats.put("totalTopics", topicRepository.count());
        stats.put("completedTopics", topicRepository.countByStatus("Completed"));
        stats.put("inProgressTopics", topicRepository.countByStatus("In Progress"));
        stats.put("notStartedTopics", topicRepository.countByStatus("Not Started"));

        // Problem stats
        stats.put("totalProblems", problemRepository.count());
        stats.put("easyProblems", problemRepository.countByDifficulty("Easy"));
        stats.put("mediumProblems", problemRepository.countByDifficulty("Medium"));
        stats.put("hardProblems", problemRepository.countByDifficulty("Hard"));

        // Application stats
        stats.put("totalApplications", applicationRepository.count());
        stats.put("appliedCount", applicationRepository.countByStatus("Applied"));
        stats.put("interviewCount", applicationRepository.countByStatus("Interview"));
        stats.put("offerCount", applicationRepository.countByStatus("Offer"));
        stats.put("rejectedCount", applicationRepository.countByStatus("Rejected"));
        return stats;
    }
}
