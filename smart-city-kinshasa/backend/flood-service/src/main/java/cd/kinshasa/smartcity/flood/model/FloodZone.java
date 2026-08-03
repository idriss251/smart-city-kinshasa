package cd.kinshasa.smartcity.flood.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.Instant;
@Entity @Table(name="flood_zones")
public class FloodZone {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @NotBlank public String commune;
  public Double latitude;
  public Double longitude;
  public Instant createdAt = Instant.now();
  public Instant updatedAt = Instant.now();
  public String name; public Double radius=500.0; @Enumerated(EnumType.STRING) public RiskLevel riskLevel=RiskLevel.MOYEN;
  @PreUpdate public void touch() { updatedAt = Instant.now(); }
}
