package devtrack.service.impl;

import devtrack.dto.ProblemDTO;
import devtrack.entity.Problem;
import devtrack.exception.ResourceNotFoundException;
import devtrack.repository.ProblemRepository;
import devtrack.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProblemServiceImpl implements ProblemService {
    private final ProblemRepository repository;

    @Override
    public List<ProblemDTO> getAllProblems() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());

    }

    @Override
    public ProblemDTO getProblemById(Long id) {
        return toDTO(repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Problem not found with id: " + id)));
    }

    @Override
    public ProblemDTO createProblem(ProblemDTO dto) {
        return toDTO(repository.save(toEntity(dto)));
    }

    @Override
    public ProblemDTO updateProblem(Long id, ProblemDTO dto) {
        Problem existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Problem not found with id: " + id));
        existing.setTitle(dto.getTitle());
        existing.setPlatform(dto.getPlatform());
        existing.setTopic(dto.getTopic());
        existing.setDifficulty(dto.getDifficulty());
        existing.setProblemLink(dto.getProblemLink());
        existing.setRevisionStatus(dto.getRevisionStatus());
        existing.setSolvedDate(dto.getSolvedDate());
        return toDTO(repository.save(existing));
    }

    @Override
    public void deleteProblem(Long id) {
            repository.findById(id)
                    .orElseThrow(()->new ResourceNotFoundException("Problem not found with id: " + id));
                    repository.deleteById(id);
    }

    private ProblemDTO toDTO(Problem e) {
        return ProblemDTO.builder()
                .id(e.getId()).title(e.getTitle()).platform(e.getPlatform())
                .topic(e.getTopic()).difficulty(e.getDifficulty()).problemLink(e.getProblemLink())
                .revisionStatus(e.getRevisionStatus()).solvedDate(e.getSolvedDate())
                .build();
    }

    private Problem toEntity(ProblemDTO dto) {
        return Problem.builder()
                .id(dto.getId()).title(dto.getTitle()).platform(dto.getPlatform())
                .topic(dto.getTopic()).difficulty(dto.getDifficulty()).problemLink(dto.getProblemLink())
                .revisionStatus(dto.getRevisionStatus()).solvedDate(dto.getSolvedDate())
                .build();
    }
}
