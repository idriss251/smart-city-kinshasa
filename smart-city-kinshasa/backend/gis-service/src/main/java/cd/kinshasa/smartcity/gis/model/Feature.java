package cd.kinshasa.smartcity.gis.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.Instant;
@Entity @Table(name="features")
public class Feature {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @NotBlank public String commune;
  public Double latitude;
  public Double longitude;
  public Instant createdAt = Instant.now();
  public Instant updatedAt = Instant.now();
  @Enumerated(EnumType.STRING) public FeatureType type=FeatureType.Signalement; @Column(columnDefinition="TEXT") public String geometry; @Column(columnDefinition="TEXT") public String properties;
  @PreUpdate public void touch() { updatedAt = Instant.now(); }
}
