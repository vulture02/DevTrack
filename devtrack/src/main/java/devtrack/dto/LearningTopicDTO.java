package devtrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class LearningTopicDTO {
    private Long id;
    private String title;
    private String description;
    private String status;
    private LocalDate targetDate;
    private String notes;

}
