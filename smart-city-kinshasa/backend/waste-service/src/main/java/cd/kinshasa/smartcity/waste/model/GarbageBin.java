package cd.kinshasa.smartcity.waste.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.Instant;
@Entity @Table(name="garbage_bins")
public class GarbageBin {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @NotBlank public String commune;
  public Double latitude;
  public Double longitude;
  public Instant createdAt = Instant.now();
  public Instant updatedAt = Instant.now();
  public Integer fillLevel=0; @Enumerated(EnumType.STRING) public BinStatus status=BinStatus.ACTIVE; public java.time.Instant lastCollection;
  @PreUpdate public void touch() { updatedAt = Instant.now(); }
}
