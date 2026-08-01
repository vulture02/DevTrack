package devtrack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String company;

    private String role;

    private String status; // Applied, Online Test, Interview, Offer, Rejected

    private LocalDate appliedDate;

    private LocalDate interviewDate;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
