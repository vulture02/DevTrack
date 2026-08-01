package devtrack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "problems")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String platform;

    private String topic;    // Arrays, Trees, DP, etc.

    private String difficulty; // Easy, Medium, Hard

    private String problemLink;

    @Column(name = "revision_status")
    private Boolean revisionStatus = false;

    private LocalDate solvedDate;
}
