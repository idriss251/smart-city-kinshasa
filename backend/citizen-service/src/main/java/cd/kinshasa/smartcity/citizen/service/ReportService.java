package cd.kinshasa.smartcity.citizen.service;
import cd.kinshasa.smartcity.citizen.model.Report;
import cd.kinshasa.smartcity.citizen.repo.ReportRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ReportService {
  private final ReportRepository repo;
  public ReportService(ReportRepository repo) { this.repo = repo; }
  public List<Report> all(String commune) { return commune == null ? repo.findAll() : repo.findByCommuneIgnoreCase(commune); }
  public Report one(Long id) { return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Ressource introuvable: " + id)); }
  public Report save(Report item) { return repo.save(item); }
  public Report update(Long id, Report item) { item.id = id; return repo.save(item); }
  public void delete(Long id) { repo.deleteById(id); }
}
