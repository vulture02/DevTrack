package devtrack.controller;

import devtrack.dto.ApplicationDTO;
import devtrack.repository.LearningTopicRepository;
import devtrack.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService service;

    @GetMapping
    public ResponseEntity<List<ApplicationDTO>>getAllApplications(){
        return ResponseEntity.ok(service.getAllApplications());

    }

    @PostMapping
    public ResponseEntity<ApplicationDTO>createApplication(@RequestBody ApplicationDTO dto){
        return new ResponseEntity<>(service.createApplication(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicationDTO> updateApplication(@PathVariable Long id,
                                                            @RequestBody ApplicationDTO dto) {
        return ResponseEntity.ok(service.updateApplication(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        service.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }
}
