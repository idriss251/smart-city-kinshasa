package cd.kinshasa.smartcity.waste.repo;
import cd.kinshasa.smartcity.waste.model.GarbageBin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface GarbageBinRepository extends JpaRepository<GarbageBin, Long> {
  List<GarbageBin> findByCommuneIgnoreCase(String commune);
}
