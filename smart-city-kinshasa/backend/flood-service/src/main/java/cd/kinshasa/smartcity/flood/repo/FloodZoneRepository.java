package cd.kinshasa.smartcity.flood.repo;
import cd.kinshasa.smartcity.flood.model.FloodZone;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface FloodZoneRepository extends JpaRepository<FloodZone, Long> {
  List<FloodZone> findByCommuneIgnoreCase(String commune);
}
