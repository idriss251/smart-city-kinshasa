import { AlertTriangle, CheckCircle2, Clock3 } from 'lucide-react';

const items = [
  { title: 'Décharge sauvage', location: 'Kalamu', time: 'Il y a 12 min', status: 'Urgent', tone: 'amber' },
  { title: 'Panne d’éclairage', location: 'Limete', time: 'Il y a 45 min', status: 'En cours', tone: 'sky' },
  { title: 'Canalisation obstruée', location: 'Ngaliema', time: 'Il y a 1h', status: 'Résolu', tone: 'emerald' },
];

export default function RecentReports() {
  return (
    <div className='panel space-y-3'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='text-sm font-semibold text-slate-900'>Activités récentes</div>
          <div className='text-sm text-slate-500'>Suivi des incidents et interventions</div>
        </div>
        <div className='rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700'>Live</div>
      </div>

      <div className='space-y-2'>
        {items.map((item) => (
          <div key={item.title} className='flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3'>
            <div className='flex items-center gap-3'>
              <div className={`rounded-full p-2 ${item.tone === 'amber' ? 'bg-amber-100 text-amber-700' : item.tone === 'sky' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {item.tone === 'amber' ? <AlertTriangle size={16} /> : item.tone === 'sky' ? <Clock3 size={16} /> : <CheckCircle2 size={16} />}
              </div>
              <div>
                <div className='text-sm font-semibold text-slate-800'>{item.title}</div>
                <div className='text-xs text-slate-500'>{item.location} • {item.time}</div>
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.tone === 'amber' ? 'bg-amber-100 text-amber-700' : item.tone === 'sky' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
