import { AlertTriangle, CheckCircle, Clock, MapPin, Navigation, ShieldCheck, Truck, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import UserProfile from '../layout/UserProfile';

interface Intervention {
  id: number;
  type: string;
  location: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedAt: string;
  estimatedTime?: string;
}

export default function AgentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>();
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    api
      .get('/dashboard/agent-stats', { params: { username: user?.username } })
      .then((r) => setStats(r.data))
      .catch(() => {
        setStats({
          totalInterventions: 15,
          completedToday: 4,
          inProgress: 2,
          pending: 3,
          avgResponseTime: '25 min',
          completionRate: 85
        });
      });

    setInterventions([
      {
        id: 1,
        type: 'Collecte déchets',
        location: 'Avenue de la Justice, Gombe',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        assignedAt: '2024-08-04T08:30:00',
        estimatedTime: '15 min'
      },
      {
        id: 2,
        type: 'Réparation route',
        location: 'Boulevard du 30 Juin, Limete',
        status: 'PENDING',
        priority: 'URGENT',
        assignedAt: '2024-08-04T09:15:00',
        estimatedTime: '45 min'
      },
      {
        id: 3,
        type: 'Surveillance inondation',
        location: 'Quartier Kingabwa, Kalamu',
        status: 'PENDING',
        priority: 'MEDIUM',
        assignedAt: '2024-08-04T07:00:00',
        estimatedTime: '30 min'
      }
    ]);

    const interval = setInterval(() => setLastUpdate(new Date()), 60000);
    return () => clearInterval(interval);
  }, [user?.username]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-600 bg-green-100 dark:bg-green-900/50 dark:text-green-400';
      case 'IN_PROGRESS': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400';
      case 'PENDING': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/50 dark:text-amber-400';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'text-rose-600 bg-rose-100 dark:bg-rose-900/50 dark:text-rose-400';
      case 'HIGH': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/50 dark:text-orange-400';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-400';
      case 'LOW': return 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'Terminé';
      case 'IN_PROGRESS': return 'En cours';
      case 'PENDING': return 'En attente';
      default: return status;
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-green-100 bg-gradient-to-br from-slate-950 via-slate-900 to-green-900 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-green-100">
              <ShieldCheck size={16} />
              Espace Agent Municipal
            </div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Bonjour, {user?.username || 'Agent'}
            </h2>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Gérez vos interventions, suivez votre itinéraire et mettez à jour le statut des opérations en temps réel.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
            <div className="rounded-2xl bg-green-500/20 p-2 text-green-200">
              <MapPin size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">Zone assignée</div>
              <div className="text-sm text-slate-300">{user?.commune || 'Non définie'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs text-slate-300">
            <span>GPS actif • {lastUpdate.toLocaleTimeString('fr-FR')}</span>
          </div>
        </div>
      </div>

      <div className="panel flex flex-col gap-3 rounded-3xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-green-500 p-2 text-white">
            <Navigation size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Intervention en cours</div>
            <div className="text-sm text-slate-600">1 intervention active - GPS tracking activé</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-green-700 shadow-sm">
          <UserCheck size={16} />
          Statut: Actif
        </div>
      </div>

      <UserProfile />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Total interventions</div>
            <Truck size={16} className="text-green-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.totalInterventions || 0}</div>
        </div>

        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Complétées aujourd'hui</div>
            <CheckCircle size={16} className="text-green-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.completedToday || 0}</div>
        </div>

        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">En cours</div>
            <Clock size={16} className="text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.inProgress || 0}</div>
        </div>

        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Taux de complétion</div>
            <UserCheck size={16} className="text-teal-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.completionRate || 0}%</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="panel lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Interventions assignées</h3>
            <Link to="/road" className="text-sm text-green-600 hover:underline">
              Voir tout →
            </Link>
          </div>
          <div className="space-y-3">
            {interventions.map((intervention) => (
              <div
                key={intervention.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {intervention.type}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPriorityColor(intervention.priority)}`}>
                        {intervention.priority}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin size={14} />
                      {intervention.location}
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                      <span>Assigné: {new Date(intervention.assignedAt).toLocaleTimeString('fr-FR')}</span>
                      {intervention.estimatedTime && (
                        <span>Estimé: {intervention.estimatedTime}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(intervention.status)}`}>
                      {getStatusLabel(intervention.status)}
                    </span>
                    {intervention.status === 'PENDING' && (
                      <button className="rounded-lg bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700">
                        Démarrer
                      </button>
                    )}
                    {intervention.status === 'IN_PROGRESS' && (
                      <button className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700">
                        Terminer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Actions rapides</h3>
          </div>
          <div className="space-y-3">
            <Link
              to="/gis"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-green-300 hover:bg-green-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-green-900 dark:hover:bg-green-950/40"
            >
              <div className="rounded-xl bg-green-100 p-2 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <Navigation size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Navigation GPS</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Itinéraire optimisé</div>
              </div>
            </Link>

            <Link
              to="/waste"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-blue-900 dark:hover:bg-blue-950/40"
            >
              <div className="rounded-xl bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <Truck size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Collectes déchets</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Gérer les tournées</div>
              </div>
            </Link>

            <Link
              to="/road"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-orange-300 hover:bg-orange-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-orange-900 dark:hover:bg-orange-950/40"
            >
              <div className="rounded-xl bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400">
                <AlertTriangle size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Problèmes routiers</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Interventions routes</div>
              </div>
            </Link>

            <Link
              to="/flood"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-cyan-900 dark:hover:bg-cyan-950/40"
            >
              <div className="rounded-xl bg-cyan-100 p-2 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400">
                <Clock size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Surveillance inondations</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Alertes et capteurs</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}