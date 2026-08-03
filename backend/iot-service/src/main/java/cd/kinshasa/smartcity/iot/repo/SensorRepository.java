package cd.kinshasa.smartcity.iot.repo;
import cd.kinshasa.smartcity.iot.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface SensorRepository extends JpaRepository<Sensor, Long> {
  List<Sensor> findByCommuneIgnoreCase(String commune);
}
