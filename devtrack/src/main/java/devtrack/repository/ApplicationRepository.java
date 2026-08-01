package devtrack.repository;

import devtrack.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application,Long> {
    List<Application>findByStatus(String status);
    long countByStatus(String status);
}
