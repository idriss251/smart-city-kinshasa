import { AlertCircle, BellRing, MapPinned, ShieldCheck, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import ChartWidget from './ChartWidget';
import RecentReports from './RecentReports';
import StatsCards from './StatsCards';

// Generate realistic hourly data
const generateHourlyData = () => {
  const hours = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    hours.push({
      hour: hour.getHours() + ':00',
      reports: Math.floor(Math.random() * 15) + 5,
      interventions: Math.floor(Math.random() * 10) + 3,
      resolved: Math.floor(Math.random() * 8) + 2
    });
  }
  return hours;
};

export default function Dashboard() {
  const [stats, setStats] = useState<any>();
  const [hourlyData, setHourlyData] = useState(generateHourlyData());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    api
      .get('/dashboard/stats')
      .then((r) => setStats(r.data))
      .catch(() => {
        // Fallback to realistic hourly stats
        const totalReports = hourlyData.reduce((sum, h) => sum + h.reports, 0);
        const totalInterventions = hourlyData.reduce((sum, h) => sum + h.interventions, 0);
        const totalResolved = hourlyData.reduce((sum, h) => sum + h.resolved, 0);
        setStats({
          totalReports,
          totalInterventions,
          totalResolved,
          resolutionRate: Math.round((totalResolved / totalReports) * 100),
          avgResponseTime: '45 min',
          activeAlerts: 3
        });
      });

    // Update hourly data every minute
    const interval = setInterval(() => {
      setHourlyData(generateHourlyData());
      setLastUpdate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='space-y-4'>
      <div className='rounded-[28px] border border-teal-100 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div className='max-w-2xl'>
            <div className='mb-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-teal-100'>
              <ShieldCheck size={16} />
              Plateforme de gestion urbaine intelligente
            </div>
            <h2 className='text-2xl font-semibold sm:text-3xl'>Bienvenue sur votre centre de supervision de la ville</h2>
            <p className='mt-2 text-sm text-slate-300 sm:text-base'>Suivez les incidents, gérez les services essentiels et améliorez la qualité de vie à Kinshasa.</p>
          </div>

          <div className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur'>
            <div className='rounded-2xl bg-teal-500/20 p-2 text-teal-200'>
              <MapPinned size={18} />
            </div>
            <div>
              <div className='text-sm font-semibold'>Zone active</div>
              <div className='text-sm text-slate-300'>3 quartiers surveillés</div>
            </div>
          </div>
          <div className='flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs text-slate-300'>
            <span>Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}</span>
          </div>
        </div>
      </div>

      <div className='panel flex flex-col gap-3 rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-start gap-3'>
          <div className='rounded-2xl bg-amber-500 p-2 text-white'>
            <BellRing size={18} />
          </div>
          <div>
            <div className='text-sm font-semibold text-slate-900'>Alertes prioritaires</div>
            <div className='text-sm text-slate-600'>3 nouveaux incidents nécessitent une action rapide</div>
          </div>
        </div>
        <div className='flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-amber-700 shadow-sm'>
          <TrendingUp size={16} />
          Tendance positive
        </div>
      </div>

      <div className='panel flex items-center gap-3 bg-rose-50'>
        <AlertCircle size={18} className='text-rose-600' />
        <div className='text-sm text-slate-700'>Zone critique détectée à proximité de la commune de Gombe.</div>
      </div>

      <StatsCards stats={stats} />
      <div className='grid gap-4 xl:grid-cols-[1.2fr_0.8fr]'>
        <ChartWidget />
        <RecentReports />
      </div>
    </div>
  );
}
