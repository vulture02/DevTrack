package devtrack.controller;

import devtrack.dto.LearningTopicDTO;
import devtrack.repository.LearningTopicRepository;
import devtrack.service.LearningTopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topic")
@RequiredArgsConstructor
public class LearningTopicController {
    private final LearningTopicService service;

    @GetMapping
    public ResponseEntity<List<LearningTopicDTO>>getAllTopic(){
        return ResponseEntity.ok(service.getAllTopic());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningTopicDTO> getTopicById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getTopicById(id));
    }


    @PostMapping
    public ResponseEntity<LearningTopicDTO> createTopic(@RequestBody LearningTopicDTO dto) {
        return new ResponseEntity<>(service.createTopic(dto), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<LearningTopicDTO> updateTopic(@PathVariable Long id,
                                                        @RequestBody LearningTopicDTO dto) {
        return ResponseEntity.ok(service.updateTopic(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>deleteTopic(@PathVariable Long id){
        service.deleteTopic(id);
        return ResponseEntity.noContent().build();
    }

}
