package cd.kinshasa.smartcity.citizen.web;
import cd.kinshasa.smartcity.citizen.model.Report;
import cd.kinshasa.smartcity.citizen.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/citizen")
public class ReportController {
  private final ReportService service;
  public ReportController(ReportService service) { this.service = service; }
  @GetMapping public List<Report> list(@RequestParam(required=false) String commune) { return service.all(commune); }
  @GetMapping("/{id}") public Report get(@PathVariable Long id) { return service.one(id); }
  @PostMapping public Report create(@Valid @RequestBody Report item) { return service.save(item); }
  @PutMapping("/{id}") public Report update(@PathVariable Long id, @Valid @RequestBody Report item) { return service.update(id, item); }
  @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
