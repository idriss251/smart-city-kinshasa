package cd.kinshasa.smartcity.traffic.web;
import cd.kinshasa.smartcity.traffic.model.TrafficJam;
import cd.kinshasa.smartcity.traffic.service.TrafficJamService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/traffic")
public class TrafficJamController {
  private final TrafficJamService service;
  public TrafficJamController(TrafficJamService service) { this.service = service; }
  @GetMapping public List<TrafficJam> list(@RequestParam(required=false) String commune) { return service.all(commune); }
  @GetMapping("/{id}") public TrafficJam get(@PathVariable Long id) { return service.one(id); }
  @PostMapping public TrafficJam create(@Valid @RequestBody TrafficJam item) { return service.save(item); }
  @PutMapping("/{id}") public TrafficJam update(@PathVariable Long id, @Valid @RequestBody TrafficJam item) { return service.update(id, item); }
  @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
