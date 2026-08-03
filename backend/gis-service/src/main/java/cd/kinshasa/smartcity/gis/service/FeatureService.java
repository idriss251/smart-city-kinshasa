package cd.kinshasa.smartcity.gis.service;
import cd.kinshasa.smartcity.gis.model.Feature;
import cd.kinshasa.smartcity.gis.repo.FeatureRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class FeatureService {
  private final FeatureRepository repo;
  public FeatureService(FeatureRepository repo) { this.repo = repo; }
  public List<Feature> all(String commune) { return commune == null ? repo.findAll() : repo.findByCommuneIgnoreCase(commune); }
  public Feature one(Long id) { return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Ressource introuvable: " + id)); }
  public Feature save(Feature item) { return repo.save(item); }
  public Feature update(Long id, Feature item) { item.id = id; return repo.save(item); }
  public void delete(Long id) { repo.deleteById(id); }
}
