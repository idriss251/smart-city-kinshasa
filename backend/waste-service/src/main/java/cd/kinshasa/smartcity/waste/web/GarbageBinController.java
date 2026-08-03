package cd.kinshasa.smartcity.waste.web;
import cd.kinshasa.smartcity.waste.model.GarbageBin;
import cd.kinshasa.smartcity.waste.service.GarbageBinService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/waste")
public class GarbageBinController {
  private final GarbageBinService service;
  public GarbageBinController(GarbageBinService service) { this.service = service; }
  @GetMapping public List<GarbageBin> list(@RequestParam(required=false) String commune) { return service.all(commune); }
  @GetMapping("/{id}") public GarbageBin get(@PathVariable Long id) { return service.one(id); }
  @PostMapping public GarbageBin create(@Valid @RequestBody GarbageBin item) { return service.save(item); }
  @PutMapping("/{id}") public GarbageBin update(@PathVariable Long id, @Valid @RequestBody GarbageBin item) { return service.update(id, item); }
  @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
