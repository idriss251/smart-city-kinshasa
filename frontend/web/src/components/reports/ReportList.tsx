import { AlertCircle, PlusCircle } from 'lucide-react';
import ReportDetail from './ReportDetail';
import ReportFilters from './ReportFilters';

const recentReports = [
  { id: 1042, title: 'Décharge sauvage', status: 'Urgent', location: 'Makala', time: 'Il y a 2h' },
  { id: 1039, title: 'Panne d’éclairage', status: 'En cours', location: 'Gombe', time: 'Il y a 5h' },
  { id: 1038, title: 'Route déformée', status: 'Résolu', location: 'Ngaliema', time: 'Hier' },
];

export default function ReportList() {
  return (
    <div className='space-y-4'>
      <div className='flex flex-col gap-3 rounded-3xl border border-teal-100 bg-gradient-to-r from-teal-600 to-cyan-500 p-5 text-white shadow-lg md:flex-row md:items-center md:justify-between'>
        <div>
          <div className='text-sm font-semibold uppercase tracking-[0.3em] text-teal-100'>Signalements citoyens</div>
          <h2 className='mt-1 text-2xl font-semibold'>Suivi des incidents et demandes de service</h2>
        </div>
        <button className='flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm'>
          <PlusCircle size={16} />
          Nouveau signalement
        </button>
      </div>

      <ReportFilters />

      <div className='grid gap-4 xl:grid-cols-[1.2fr_0.8fr]'>
        <div className='space-y-3'>
          {recentReports.map((report) => (
            <div key={report.id} className='panel flex items-center justify-between gap-4'>
              <div>
                <div className='text-sm font-semibold text-slate-900'>{report.title}</div>
                <div className='mt-1 text-sm text-slate-500'>#{report.id} • {report.location} • {report.time}</div>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${report.status === 'Urgent' ? 'bg-amber-100 text-amber-700' : report.status === 'En cours' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {report.status}
              </span>
            </div>
          ))}
        </div>

        <div className='space-y-3'>
          <div className='panel flex items-center gap-3 bg-amber-50'>
            <AlertCircle size={18} className='text-amber-600' />
            <div>
              <div className='text-sm font-semibold text-slate-800'>3 signalements à traiter</div>
              <div className='text-sm text-slate-600'>Priorité élevée cette semaine</div>
            </div>
          </div>
          <ReportDetail />
        </div>
      </div>
    </div>
  );
}
