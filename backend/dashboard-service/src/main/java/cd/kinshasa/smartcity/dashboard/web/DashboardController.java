package cd.kinshasa.smartcity.dashboard.web;

import cd.kinshasa.smartcity.dashboard.dto.*;
import cd.kinshasa.smartcity.dashboard.service.DashboardService;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    
    private final DashboardService dashboardService;
    
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }
    
    @GetMapping("/stats")
    public DashboardStats stats() {
        return dashboardService.getGlobalStats();
    }
    
    @GetMapping("/citizen-stats")
    public CitizenStats citizenStats(@RequestParam(required = false) String username) {
        return dashboardService.getCitizenStats(username);
    }
    
    @GetMapping("/agent-stats")
    public AgentStats agentStats(@RequestParam(required = false) String username) {
        return dashboardService.getAgentStats(username);
    }
    
    @GetMapping("/admin-stats")
    public AdminStats adminStats() {
        return dashboardService.getAdminStats();
    }
    
    @GetMapping("/communes")
    public List<CommuneStats> communes() {
        return List.of(
            new CommuneStats("Gombe", 3),
            new CommuneStats("Limete", 5),
            new CommuneStats("Kalamu", 2),
            new CommuneStats("Ngaliema", 4),
            new CommuneStats("Masina", 6)
        );
    }
    
    @GetMapping("/evolution")
    public List<EvolutionData> evolution() {
        return java.util.stream.IntStream.range(0, 7)
            .mapToObj(i -> new EvolutionData(LocalDate.now().minusDays(6 - i).toString(), i + 2))
            .toList();
    }
}
