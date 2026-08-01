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
public class ApplicationDTO {
    private Long id;
    private String company;
    private String role;
    private String status;
    private LocalDate appliedDate;
    private LocalDate interviewDate;
    private String notes;
}
