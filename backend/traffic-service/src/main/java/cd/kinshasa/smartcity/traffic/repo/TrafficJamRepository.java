package cd.kinshasa.smartcity.traffic.repo;
import cd.kinshasa.smartcity.traffic.model.TrafficJam;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface TrafficJamRepository extends JpaRepository<TrafficJam, Long> {
  List<TrafficJam> findByCommuneIgnoreCase(String commune);
}
