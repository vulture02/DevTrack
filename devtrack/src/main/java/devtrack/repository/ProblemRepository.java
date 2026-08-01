package devtrack.repository;

import devtrack.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem,Long> {
    List<Problem> findByDifficulty(String difficulty);
    List<Problem>findByPlatform(String platfrom);
    List<Problem>findByRevisionStatusTrue();
    long countByDifficulty(String difficulty);
}
