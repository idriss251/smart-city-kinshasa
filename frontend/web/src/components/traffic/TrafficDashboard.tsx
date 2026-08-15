import { useEffect, useState } from 'react';
import { AlertTriangle, Car, Clock, MapPin, PlusCircle, Wrench, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

interface TrafficJam {
  id: number;
  type: string;
  description: string;
  commune: string;
  severity: string;
  status: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

const SEVERITIES = ['FAIBLE', 'MOYENNE', 'ELEVEE', 'CRITIQUE'];
const TYPES = ['EMBOUTEILLAGE', 'ACCIDENT', 'TRAVAUX', 'FERMETURE', 'CARREFOUR_DANGEREUX', 'AUTRE'];

const severityClass: Record<string, string> = {
  FAIBLE: 'bg-sky-100 text-sky-700',
  MOYENNE: 'bg-amber-100 text-amber-700',
  ELEVEE: 'bg-orange-100 text-orange-700',
  CRITIQUE: 'bg-rose-100 text-rose-700',
};

const statusLabel: Record<string, string> = {
  SIGNALE: 'Signalé',
  EN_COURS: 'En cours',
  RESOLU: 'Résolu',
  REJETE: 'Rejeté',
};

const statusClass: Record<string, string> = {
  SIGNALE: 'text-amber-600',
  EN_COURS: 'text-sky-600',
  RESOLU: 'text-emerald-600',
  REJETE: 'text-slate-600',
};

export default function TrafficDashboard() {
  const [jams, setJams] = useState<TrafficJam[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'EMBOUTEILLAGE',
    description: '',
    commune: '',
    severity: 'MOYENNE',
    latitude: 0,
    longitude: 0,
  });

  const fetchJams = async () => {
    setLoading(true);
    try {
      const r = await api.get('/api/traffic');
      setJams(Array.isArray(r.data) ? r.data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/traffic', formData);
      setShowForm(false);
      fetchJams();
    } catch (e) {
      console.error(e);
      alert('Erreur lors du signalement');
    }
  };

  const critical = jams.filter((j) => j.severity === 'CRITIQUE' && j.status !== 'RESOLU').length;
  const inProgress = jams.filter((j) => j.status === 'EN_COURS').length;

  return (
    <div className='space-y-4'>
      <div className='panel flex flex-col gap-3 rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-600 to-orange-500 p-5 text-white shadow-lg md:flex-row md:items-center md:justify-between'>
        <div>
          <div className='text-sm font-semibold uppercase tracking-[0.3em] text-amber-100'>Circulation</div>
          <h2 className='mt-1 text-2xl font-semibold'>Embouteillages et incidents de trafic</h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className='flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm hover:bg-amber-50'
        >
          <PlusCircle size={16} />
          Signaler un incident
        </button>
      </div>

      <div className='grid gap-4 md:grid-cols-4'>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-rose-100 p-3 text-rose-600'>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Critiques</div>
            <div className='text-2xl font-bold text-slate-900'>{critical}</div>
          </div>
        </div>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-amber-100 p-3 text-amber-600'>
            <Wrench size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>En cours</div>
            <div className='text-2xl font-bold text-slate-900'>{inProgress}</div>
          </div>
        </div>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-sky-100 p-3 text-sky-600'>
            <Car size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Total</div>
            <div className='text-2xl font-bold text-slate-900'>{jams.length}</div>
          </div>
        </div>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-emerald-100 p-3 text-emerald-600'>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Résolus</div>
            <div className='text-2xl font-bold text-slate-900'>{jams.filter((j) => j.status === 'RESOLU').length}</div>
          </div>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className='panel space-y-4'>
          <h3 className='text-lg font-semibold text-slate-900'>Nouvel incident de circulation</h3>
          <div className='grid gap-4 md:grid-cols-2'>
            <select
              className='input'
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
              className='input'
              value={formData.severity}
              onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
            >
              {SEVERITIES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <input
              className='input'
              placeholder='Commune'
              value={formData.commune}
              onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
              required
            />
            <input
              className='input'
              placeholder='Description'
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className='flex gap-3'>
            <button type='submit' className='btn bg-amber-600 text-white hover:bg-amber-700'>Signaler</button>
            <button type='button' onClick={() => setShowForm(false)} className='btn border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'>Annuler</button>
          </div>
        </form>
      )}

      <div className='panel'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-slate-900'>Incidents en cours</h3>
          <button onClick={fetchJams} disabled={loading} className='text-sm text-slate-500 hover:text-slate-700'>
            {loading ? 'Actualisation...' : 'Actualiser'}
          </button>
        </div>
        <div className='space-y-3'>
          {jams.map((jam) => (
            <div key={jam.id} className='flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${severityClass[jam.severity] || 'bg-slate-100'}`}>
                    {jam.severity}
                  </span>
                  <span className='font-semibold text-slate-900'>{jam.type}</span>
                </div>
                <div className='mt-1 flex items-center gap-2 text-sm text-slate-500'>
                  <MapPin size={14} />
                  {jam.commune}
                </div>
                <div className='text-sm text-slate-600'>{jam.description}</div>
              </div>
              <div className='text-right ml-4'>
                <div className={`text-sm font-semibold ${statusClass[jam.status] || 'text-slate-600'}`}>
                  {statusLabel[jam.status] || jam.status}
                </div>
                <div className='text-xs text-slate-500 flex items-center gap-1'>
                  <Clock size={12} />
                  {new Date(jam.createdAt).toLocaleString('fr-FR')}
                </div>
              </div>
            </div>
          ))}
          {jams.length === 0 && !loading && (
            <div className='text-center text-slate-500'>Aucun incident de circulation signalé.</div>
          )}
        </div>
      </div>
    </div>
  );
}
