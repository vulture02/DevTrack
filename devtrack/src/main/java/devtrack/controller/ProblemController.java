package devtrack.controller;


import devtrack.dto.ProblemDTO;
import devtrack.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
@RequiredArgsConstructor
public class ProblemController {
    private final ProblemService service;

    @GetMapping
    public ResponseEntity<List<ProblemDTO>> getAllProblems() {
        return ResponseEntity.ok(service.getAllProblems());
    }

    @PostMapping
    public ResponseEntity<ProblemDTO> createProblem(@RequestBody ProblemDTO dto) {
        return new ResponseEntity<>(service.createProblem(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProblemDTO> updateProblem(@PathVariable Long id,
                                                    @RequestBody ProblemDTO dto) {
        return ResponseEntity.ok(service.updateProblem(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable Long id) {
        service.deleteProblem(id);
        return ResponseEntity.noContent().build();
    }
}
