package cd.kinshasa.smartcity.traffic.service;
import cd.kinshasa.smartcity.traffic.model.TrafficJam;
import cd.kinshasa.smartcity.traffic.repo.TrafficJamRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class TrafficJamService {
  private final TrafficJamRepository repo;
  public TrafficJamService(TrafficJamRepository repo) { this.repo = repo; }
  public List<TrafficJam> all(String commune) { return commune == null ? repo.findAll() : repo.findByCommuneIgnoreCase(commune); }
  public TrafficJam one(Long id) { return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Ressource introuvable: " + id)); }
  public TrafficJam save(TrafficJam item) { return repo.save(item); }
  public TrafficJam update(Long id, TrafficJam item) { item.id = id; return repo.save(item); }
  public void delete(Long id) { repo.deleteById(id); }
}
