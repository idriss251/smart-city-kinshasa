package cd.kinshasa.smartcity.citizen.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.Instant;
@Entity @Table(name="reports")
public class Report {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @NotBlank public String commune;
  public Double latitude;
  public Double longitude;
  public Instant createdAt = Instant.now();
  public Instant updatedAt = Instant.now();
  public Long citizenId; @Enumerated(EnumType.STRING) public ReportType type=ReportType.AUTRE; public String description; public String photoUrl; @Enumerated(EnumType.STRING) public ReportStatus status=ReportStatus.EN_ATTENTE; public java.time.Instant resolvedAt;
  @PreUpdate public void touch() { updatedAt = Instant.now(); }
}
