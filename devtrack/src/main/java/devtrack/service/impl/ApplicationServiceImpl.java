package devtrack.service.impl;

import devtrack.dto.ApplicationDTO;
import devtrack.entity.Application;
import devtrack.exception.ResourceNotFoundException;
import devtrack.repository.ApplicationRepository;
import devtrack.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {
    private final ApplicationRepository repository;

    @Override
    public List<ApplicationDTO> getAllApplications() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public ApplicationDTO getApplicationById(Long id) {
        return toDTO(repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id)));
    }

    @Override
    public ApplicationDTO createApplication(ApplicationDTO dto) {
        return toDTO(repository.save(toEntity(dto)));
    }

    @Override
    public ApplicationDTO updateApplication(Long id, ApplicationDTO dto) {
        Application existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
        existing.setCompany(dto.getCompany());
        existing.setRole(dto.getRole());
        existing.setStatus(dto.getStatus());
        existing.setAppliedDate(dto.getAppliedDate());
        existing.setInterviewDate(dto.getInterviewDate());
        existing.setNotes(dto.getNotes());
        return toDTO(repository.save(existing));
    }

    @Override
    public void deleteApplication(Long id) {
        repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
        repository.deleteById(id);
    }

    private ApplicationDTO toDTO(Application e) {
        return ApplicationDTO.builder()
                .id(e.getId()).company(e.getCompany()).role(e.getRole())
                .status(e.getStatus()).appliedDate(e.getAppliedDate())
                .interviewDate(e.getInterviewDate()).notes(e.getNotes())
                .build();
    }

    private Application toEntity(ApplicationDTO dto) {
        return Application.builder()
                .id(dto.getId()).company(dto.getCompany()).role(dto.getRole())
                .status(dto.getStatus()).appliedDate(dto.getAppliedDate())
                .interviewDate(dto.getInterviewDate()).notes(dto.getNotes())
                .build();
    }
}
