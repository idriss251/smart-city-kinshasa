package cd.kinshasa.smartcity.dashboard.dto;

public record AgentStats(
  long totalInterventions,
  long completedToday,
  long inProgress,
  long pending,
  String avgResponseTime,
  int completionRate
) {}