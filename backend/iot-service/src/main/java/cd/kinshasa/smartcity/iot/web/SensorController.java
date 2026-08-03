package cd.kinshasa.smartcity.iot.web;
import cd.kinshasa.smartcity.iot.model.Sensor;
import cd.kinshasa.smartcity.iot.service.SensorService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/iot")
public class SensorController {
  private final SensorService service;
  public SensorController(SensorService service) { this.service = service; }
  @GetMapping public List<Sensor> list(@RequestParam(required=false) String commune) { return service.all(commune); }
  @GetMapping("/{id}") public Sensor get(@PathVariable Long id) { return service.one(id); }
  @PostMapping public Sensor create(@Valid @RequestBody Sensor item) { return service.save(item); }
  @PutMapping("/{id}") public Sensor update(@PathVariable Long id, @Valid @RequestBody Sensor item) { return service.update(id, item); }
  @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
