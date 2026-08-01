package devtrack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.PrivateKey;
import java.time.LocalDate;

@Entity
@Table(name = "learning_topics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class LearningTopic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String status;

    private LocalDate targetDate;
    @Column(columnDefinition = "TEXT")
    private String notes;

}
