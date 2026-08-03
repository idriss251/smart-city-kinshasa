const labels: Record<string, string> = {
  totalReports: 'Signalements (24h)',
  totalInterventions: 'Interventions (24h)',
  totalResolved: 'Résolus (24h)',
  resolutionRate: 'Taux de résolution',
  avgResponseTime: 'Temps moyen réponse',
  activeAlerts: 'Alertes actives'
};

export default function StatsCards({ stats }: { stats: any }) {
  return (
    <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-4'>
      {Object.entries(stats || {}).map(([k, v], index) => {
        const value = typeof v === 'number' ? v.toLocaleString() : String(v);
        const accent = ['from-teal-500 to-cyan-500', 'from-sky-500 to-blue-500', 'from-amber-500 to-orange-500', 'from-violet-500 to-fuchsia-500'][index % 4];

        return (
          <div className='panel flex items-start justify-between' key={k}>
            <div>
              <div className='text-sm text-slate-500'>{labels[k] || k}</div>
              <div className='mt-2 text-2xl font-bold text-slate-900'>{value}</div>
            </div>
            <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${accent}`} />
          </div>
        );
      })}
    </div>
  );
}
