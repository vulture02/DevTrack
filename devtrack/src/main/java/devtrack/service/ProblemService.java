package devtrack.service;

import devtrack.dto.ProblemDTO;

import java.util.List;

public interface ProblemService {
    List<ProblemDTO>getAllProblems();
    ProblemDTO getProblemById(Long id);
    ProblemDTO createProblem(ProblemDTO dto);
    ProblemDTO updateProblem(Long id, ProblemDTO dto);
    void deleteProblem(Long id);
}
