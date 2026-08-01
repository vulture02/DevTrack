package devtrack.service.impl;

import devtrack.dto.LearningTopicDTO;
import devtrack.entity.LearningTopic;
import devtrack.exception.ResourceNotFoundException;
import devtrack.repository.LearningTopicRepository;
import devtrack.service.LearningTopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class LearningTopicServiceImpl implements LearningTopicService {
        private final LearningTopicRepository repository;

    @Override
    public List<LearningTopicDTO> getAllTopic() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public LearningTopicDTO getTopicById(Long id) {
        return toDTO(repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + id)));
    }

    @Override
    public LearningTopicDTO createTopic(LearningTopicDTO dto) {
        LearningTopic entity = toEntity(dto);
        return toDTO(repository.save(entity));
    }

    @Override
    public LearningTopicDTO updateTopic(Long id, LearningTopicDTO dto) {
        LearningTopic existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + id));
        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setStatus(dto.getStatus());
        existing.setTargetDate(dto.getTargetDate());
        existing.setNotes(dto.getNotes());
        return toDTO(repository.save(existing));
    }

    @Override
    public void deleteTopic(Long id) {
        repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + id));
        repository.deleteById(id);
    }

    private LearningTopicDTO toDTO(LearningTopic e) {
        return LearningTopicDTO.builder()
                .id(e.getId())
                .title(e.getTitle())
                .description(e.getDescription())
                .status(e.getStatus())
                .targetDate(e.getTargetDate())   // ✅
                .notes(e.getNotes())
                .build();
    }

    private LearningTopic toEntity(LearningTopicDTO dto) {
        return LearningTopic.builder()
                .id(dto.getId()).title(dto.getTitle()).description(dto.getDescription())
                .status(dto.getStatus()).targetDate(dto.getTargetDate()).notes(dto.getNotes())
                .build();
    }
}
