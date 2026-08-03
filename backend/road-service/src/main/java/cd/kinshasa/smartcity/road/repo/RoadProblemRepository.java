package cd.kinshasa.smartcity.road.repo;
import cd.kinshasa.smartcity.road.model.RoadProblem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface RoadProblemRepository extends JpaRepository<RoadProblem, Long> {
  List<RoadProblem> findByCommuneIgnoreCase(String commune);
}
