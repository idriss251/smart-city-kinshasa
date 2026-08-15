import { AlertCircle, Download, PlusCircle, RefreshCw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../services/api';
import ReportDetail from './ReportDetail';
import ReportFilters from './ReportFilters';
import ReportForm from './ReportForm';

interface Report {
  id: number;
  type: string;
  description: string;
  commune: string;
  status: 'EN_ATTENTE' | 'EN_COURS' | 'RESOLU' | 'URGENT';
  createdAt: string;
}

const statusLabel: Record<string, string> = {
  EN_ATTENTE: 'En attente',
  EN_COURS: 'En cours',
  RESOLU: 'Résolu',
  URGENT: 'Urgent',
};

const statusClass: Record<string, string> = {
  EN_ATTENTE: 'bg-amber-100 text-amber-700',
  EN_COURS: 'bg-sky-100 text-sky-700',
  RESOLU: 'bg-emerald-100 text-emerald-700',
  URGENT: 'bg-rose-100 text-rose-700',
};

export default function ReportList() {
  const [showForm, setShowForm] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    try {
      const r = await api.get('/api/citizen');
      setReports(Array.isArray(r.data) ? r.data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filtered = useMemo(() => {
    return reports
      .filter((r) => {
        const matchesSearch =
          r.type?.toLowerCase().includes(search.toLowerCase()) ||
          r.commune?.toLowerCase().includes(search.toLowerCase()) ||
          r.description?.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status ? r.status === status : true;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [reports, search, status]);

  const groupedReports = useMemo(() => {
    const groups: { date: string; reports: Report[] }[] = [];
    for (const report of filtered) {
      const date = new Date(report.createdAt).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const existing = groups.find((g) => g.date === date);
      if (existing) {
        existing.reports.push(report);
      } else {
        groups.push({ date, reports: [report] });
      }
    }
    return groups;
  }, [filtered]);

  const exportCsv = () => {
    const rows = filtered.map((r) => ({
      id: r.id,
      type: r.type,
      commune: r.commune,
      status: statusLabel[r.status] || r.status,
      date: new Date(r.createdAt).toLocaleDateString('fr-FR'),
    }));
    const headers = ['id,type,commune,status,date'];
    const lines = rows.map((row) => `${row.id},${row.type},${row.commune},${row.status},${row.date}`);
    const csv = [...headers, ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signalements-kinshasa.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='space-y-4'>
      <div className='flex flex-col gap-3 rounded-3xl border border-teal-100 bg-gradient-to-r from-teal-600 to-cyan-500 p-5 text-white shadow-lg md:flex-row md:items-center md:justify-between'>
        <div>
          <div className='text-sm font-semibold uppercase tracking-[0.3em] text-teal-100'>Signalements citoyens</div>
          <h2 className='mt-1 text-2xl font-semibold'>Suivi des incidents et demandes de service</h2>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className='flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm hover:bg-teal-50'
        >
          <PlusCircle size={16} />
          Nouveau signalement
        </button>
      </div>

      <ReportFilters search={search} setSearch={setSearch} status={status} setStatus={setStatus} />

      <div className='panel flex items-center justify-between'>
        <div className='text-sm text-slate-600'>{filtered.length} signalement(s)</div>
        <div className='flex gap-2'>
          <button
            onClick={fetchReports}
            disabled={loading}
            className='flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50'
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Actualiser
          </button>
          <button
            onClick={exportCsv}
            className='flex items-center gap-2 rounded-2xl bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700'
          >
            <Download size={16} />
            CSV
          </button>
        </div>
      </div>

      <div className='grid gap-4 xl:grid-cols-[1.2fr_0.8fr]'>
        <div className='space-y-6'>
          {groupedReports.map((group) => (
            <div key={group.date}>
              <div className='mb-2 text-sm font-bold uppercase tracking-wider text-slate-700'>
                {group.date}
              </div>
              <div className='space-y-3'>
                {group.reports.map((report) => (
                  <div key={report.id} className='panel flex items-center justify-between gap-4'>
                    <div>
                      <div className='text-sm font-semibold text-slate-900'>{report.type}</div>
                      <div className='mt-1 text-sm text-slate-500'>#{report.id} • {report.commune} • {new Date(report.createdAt).toLocaleTimeString('fr-FR')}</div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusClass[report.status] || 'bg-slate-100 text-slate-700'}`}>
                      {statusLabel[report.status] || report.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className='panel text-center text-slate-500'>Aucun signalement trouvé.</div>
          )}
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

      {showForm && (
        <ReportForm 
          onClose={() => setShowForm(false)} 
          onSuccess={() => {
            // Refresh reports could be added here
          }}
        />
      )}
    </div>
  );
}
