package cd.kinshasa.smartcity.flood.service;
import cd.kinshasa.smartcity.flood.model.FloodZone;
import cd.kinshasa.smartcity.flood.repo.FloodZoneRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class FloodZoneService {
  private final FloodZoneRepository repo;
  public FloodZoneService(FloodZoneRepository repo) { this.repo = repo; }
  public List<FloodZone> all(String commune) { return commune == null ? repo.findAll() : repo.findByCommuneIgnoreCase(commune); }
  public FloodZone one(Long id) { return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Ressource introuvable: " + id)); }
  public FloodZone save(FloodZone item) { return repo.save(item); }
  public FloodZone update(Long id, FloodZone item) { item.id = id; return repo.save(item); }
  public void delete(Long id) { repo.deleteById(id); }
}
