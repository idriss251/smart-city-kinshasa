package cd.kinshasa.smartcity.dashboard.dto;

public record CitizenStats(
  long totalReports,
  long myReports,
  long resolved,
  long pending,
  int resolutionRate,
  String avgResponseTime
) {}