package cd.kinshasa.smartcity.road.web;
import cd.kinshasa.smartcity.road.model.RoadProblem;
import cd.kinshasa.smartcity.road.service.RoadProblemService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/road")
public class RoadProblemController {
  private final RoadProblemService service;
  public RoadProblemController(RoadProblemService service) { this.service = service; }
  @GetMapping public List<RoadProblem> list(@RequestParam(required=false) String commune) { return service.all(commune); }
  @GetMapping("/{id}") public RoadProblem get(@PathVariable Long id) { return service.one(id); }
  @PostMapping public RoadProblem create(@Valid @RequestBody RoadProblem item) { return service.save(item); }
  @PutMapping("/{id}") public RoadProblem update(@PathVariable Long id, @Valid @RequestBody RoadProblem item) { return service.update(id, item); }
  @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
