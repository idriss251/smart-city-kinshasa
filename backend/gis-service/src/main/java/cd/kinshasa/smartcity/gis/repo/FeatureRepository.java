package cd.kinshasa.smartcity.gis.repo;
import cd.kinshasa.smartcity.gis.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface FeatureRepository extends JpaRepository<Feature, Long> {
  List<Feature> findByCommuneIgnoreCase(String commune);
}
