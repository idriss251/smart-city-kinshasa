import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

// Generate realistic hourly chart data
const generateChartData = () => {
  const labels = [];
  const reports = [];
  const interventions = [];
  const resolved = [];
  
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    labels.push(hour.getHours() + ':00');
    reports.push(Math.floor(Math.random() * 15) + 5);
    interventions.push(Math.floor(Math.random() * 10) + 3);
    resolved.push(Math.floor(Math.random() * 8) + 2);
  }
  
  return { labels, reports, interventions, resolved };
};

export default function ChartWidget() {
  const chartData = generateChartData();
  
  return (
    <div className='panel'>
      <div className='mb-3 flex items-center justify-between'>
        <div>
          <div className='text-sm font-semibold text-slate-900'>Évolution des signalements (24h)</div>
          <div className='text-sm text-slate-500'>Mise à jour par heure</div>
        </div>
        <div className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700'>+18%</div>
      </div>

      <Line
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: 'Signalements',
              data: chartData.reports,
              borderColor: '#0f766e',
              backgroundColor: 'rgba(15, 118, 110, 0.12)',
              tension: 0.35,
              pointRadius: 4,
              pointBackgroundColor: '#0f766e',
            },
            {
              label: 'Interventions',
              data: chartData.interventions,
              borderColor: '#0ea5e9',
              backgroundColor: 'rgba(14, 165, 233, 0.12)',
              tension: 0.35,
              pointRadius: 4,
              pointBackgroundColor: '#0ea5e9',
            },
            {
              label: 'Résolus',
              data: chartData.resolved,
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              tension: 0.35,
              pointRadius: 4,
              pointBackgroundColor: '#10b981',
            },
          ],
        }}
        options={{
          plugins: { 
            legend: { 
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20
              }
            } 
          },
          scales: { 
            y: { 
              beginAtZero: true, 
              grid: { color: 'rgba(15,23,42,0.06)' } 
            }, 
            x: { 
              grid: { display: false } 
            } 
          },
        }}
      />
    </div>
  );
}
