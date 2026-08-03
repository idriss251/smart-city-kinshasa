package cd.kinshasa.smartcity.citizen.repo;
import cd.kinshasa.smartcity.citizen.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ReportRepository extends JpaRepository<Report, Long> {
  List<Report> findByCommuneIgnoreCase(String commune);
}
