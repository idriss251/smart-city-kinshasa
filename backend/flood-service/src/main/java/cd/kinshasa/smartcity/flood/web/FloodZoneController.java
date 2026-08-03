package cd.kinshasa.smartcity.flood.web;
import cd.kinshasa.smartcity.flood.model.FloodZone;
import cd.kinshasa.smartcity.flood.service.FloodZoneService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/flood")
public class FloodZoneController {
  private final FloodZoneService service;
  public FloodZoneController(FloodZoneService service) { this.service = service; }
  @GetMapping public List<FloodZone> list(@RequestParam(required=false) String commune) { return service.all(commune); }
  @GetMapping("/{id}") public FloodZone get(@PathVariable Long id) { return service.one(id); }
  @PostMapping public FloodZone create(@Valid @RequestBody FloodZone item) { return service.save(item); }
  @PutMapping("/{id}") public FloodZone update(@PathVariable Long id, @Valid @RequestBody FloodZone item) { return service.update(id, item); }
  @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
