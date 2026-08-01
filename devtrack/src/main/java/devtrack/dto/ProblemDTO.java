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
public class ProblemDTO {

    private Long id;
    private String title;
    private String platform;
    private String topic;
    private String difficulty;
    private String problemLink;
    private Boolean revisionStatus;
    private LocalDate solvedDate;
}
