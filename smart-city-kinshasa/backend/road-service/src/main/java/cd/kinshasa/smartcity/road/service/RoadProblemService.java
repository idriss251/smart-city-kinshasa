package cd.kinshasa.smartcity.road.service;
import cd.kinshasa.smartcity.road.model.RoadProblem;
import cd.kinshasa.smartcity.road.repo.RoadProblemRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class RoadProblemService {
  private final RoadProblemRepository repo;
  public RoadProblemService(RoadProblemRepository repo) { this.repo = repo; }
  public List<RoadProblem> all(String commune) { return commune == null ? repo.findAll() : repo.findByCommuneIgnoreCase(commune); }
  public RoadProblem one(Long id) { return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Ressource introuvable: " + id)); }
  public RoadProblem save(RoadProblem item) { return repo.save(item); }
  public RoadProblem update(Long id, RoadProblem item) { item.id = id; return repo.save(item); }
  public void delete(Long id) { repo.deleteById(id); }
}
