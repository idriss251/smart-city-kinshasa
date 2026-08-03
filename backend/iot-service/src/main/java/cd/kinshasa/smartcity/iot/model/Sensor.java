package cd.kinshasa.smartcity.iot.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.Instant;
@Entity @Table(name="sensors")
public class Sensor {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @NotBlank public String commune;
  public Double latitude;
  public Double longitude;
  public Instant createdAt = Instant.now();
  public Instant updatedAt = Instant.now();
  public String name; @Enumerated(EnumType.STRING) public SensorType type=SensorType.WEATHER; public String status="ACTIVE"; @Column(columnDefinition="TEXT") public String lastData;
  @PreUpdate public void touch() { updatedAt = Instant.now(); }
}
