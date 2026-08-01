package devtrack.service;

import devtrack.dto.ApplicationDTO;

import java.util.List;

public interface ApplicationService {
    List<ApplicationDTO>getAllApplications();
    ApplicationDTO getApplicationById(Long id);
    ApplicationDTO createApplication(ApplicationDTO dto);
    ApplicationDTO updateApplication(Long id, ApplicationDTO dto);
    void deleteApplication(Long id);
}
