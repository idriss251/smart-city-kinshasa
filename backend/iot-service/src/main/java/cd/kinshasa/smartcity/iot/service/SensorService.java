package cd.kinshasa.smartcity.iot.service;
import cd.kinshasa.smartcity.iot.model.Sensor;
import cd.kinshasa.smartcity.iot.repo.SensorRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class SensorService {
  private final SensorRepository repo;
  public SensorService(SensorRepository repo) { this.repo = repo; }
  public List<Sensor> all(String commune) { return commune == null ? repo.findAll() : repo.findByCommuneIgnoreCase(commune); }
  public Sensor one(Long id) { return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Ressource introuvable: " + id)); }
  public Sensor save(Sensor item) { return repo.save(item); }
  public Sensor update(Long id, Sensor item) { item.id = id; return repo.save(item); }
  public void delete(Long id) { repo.deleteById(id); }
}
