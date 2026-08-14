package cd.kinshasa.smartcity.dashboard.dto;

public record AdminStats(
  long totalUsers,
  long activeUsers,
  long totalReports,
  long resolvedReports,
  long activeAlerts,
  String systemUptime,
  String avgResponseTime,
  int servicesOnline,
  int cpu,
  int memory,
  int disk,
  int network
) {}