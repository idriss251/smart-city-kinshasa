package cd.kinshasa.smartcity.waste.service;
import cd.kinshasa.smartcity.waste.model.GarbageBin;
import cd.kinshasa.smartcity.waste.repo.GarbageBinRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class GarbageBinService {
  private final GarbageBinRepository repo;
  public GarbageBinService(GarbageBinRepository repo) { this.repo = repo; }
  public List<GarbageBin> all(String commune) { return commune == null ? repo.findAll() : repo.findByCommuneIgnoreCase(commune); }
  public GarbageBin one(Long id) { return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Ressource introuvable: " + id)); }
  public GarbageBin save(GarbageBin item) { return repo.save(item); }
  public GarbageBin update(Long id, GarbageBin item) { item.id = id; return repo.save(item); }
  public void delete(Long id) { repo.deleteById(id); }
}
