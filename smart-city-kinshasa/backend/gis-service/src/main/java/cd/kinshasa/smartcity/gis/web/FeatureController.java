package cd.kinshasa.smartcity.gis.web;
import cd.kinshasa.smartcity.gis.model.Feature;
import cd.kinshasa.smartcity.gis.service.FeatureService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/gis")
public class FeatureController {
  private final FeatureService service;
  public FeatureController(FeatureService service) { this.service = service; }
  @GetMapping public List<Feature> list(@RequestParam(required=false) String commune) { return service.all(commune); }
  @GetMapping("/{id}") public Feature get(@PathVariable Long id) { return service.one(id); }
  @PostMapping public Feature create(@Valid @RequestBody Feature item) { return service.save(item); }
  @PutMapping("/{id}") public Feature update(@PathVariable Long id, @Valid @RequestBody Feature item) { return service.update(id, item); }
  @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
