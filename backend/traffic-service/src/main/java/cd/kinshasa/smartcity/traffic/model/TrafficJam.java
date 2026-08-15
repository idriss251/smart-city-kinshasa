package cd.kinshasa.smartcity.traffic.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.Instant;
@Entity @Table(name="traffic_jams")
public class TrafficJam {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @NotBlank public String commune;
  public Double latitude;
  public Double longitude;
  public Instant createdAt = Instant.now();
  public Instant updatedAt = Instant.now();
  @Enumerated(EnumType.STRING) public ProblemType type=ProblemType.AUTRE; @Enumerated(EnumType.STRING) public Severity severity=Severity.MOYENNE; public String description; public String photoUrl; @Enumerated(EnumType.STRING) public ProblemStatus status=ProblemStatus.SIGNALE;
  @PreUpdate public void touch() { updatedAt = Instant.now(); }
}
