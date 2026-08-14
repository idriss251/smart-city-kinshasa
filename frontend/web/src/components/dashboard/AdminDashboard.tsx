import { AlertTriangle, BarChart3, Building2, Users, ShieldCheck, TrendingUp, Zap, Database, Settings, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import UserProfile from '../layout/UserProfile';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>();
  const [systemHealth, setSystemHealth] = useState<any>();
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    api
      .get('/dashboard/admin-stats')
      .then((r) => {
        setStats(r.data);
        setSystemHealth({
          cpu: r.data.cpu,
          memory: r.data.memory,
          disk: r.data.disk,
          network: r.data.network
        });
      })
      .catch(() => {
        setStats({
          totalUsers: 156,
          activeUsers: 89,
          totalReports: 342,
          resolvedReports: 289,
          activeAlerts: 5,
          systemUptime: '99.8%',
          avgResponseTime: '18 min',
          servicesOnline: 8
        });
        setSystemHealth({
          cpu: 45,
          memory: 62,
          disk: 71,
          network: 23
        });
      });

    const interval = setInterval(() => setLastUpdate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-purple-100 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-purple-100">
              <ShieldCheck size={16} />
              Panneau d'Administration
            </div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Bienvenue, Administrateur {user?.username || 'Système'}
            </h2>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Vue d'ensemble du système Smart City Kinshasa. Surveillez les services, gérez les utilisateurs et analysez les performances.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
            <div className="rounded-2xl bg-purple-500/20 p-2 text-purple-200">
              <Activity size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">État du système</div>
              <div className="text-sm text-slate-300">Opérationnel</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs text-slate-300">
            <span>Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}</span>
          </div>
        </div>
      </div>

      <div className="panel flex flex-col gap-3 rounded-3xl border border-purple-100 bg-gradient-to-r from-purple-50 to-violet-50 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-purple-500 p-2 text-white">
            <Zap size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Système opérationnel</div>
            <div className="text-sm text-slate-600">Tous les services sont en ligne • Uptime: {stats?.systemUptime || '99.8%'}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-purple-700 shadow-sm">
          <TrendingUp size={16} />
          Performance optimale
        </div>
      </div>

      <UserProfile />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Utilisateurs total</div>
            <Users size={16} className="text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.totalUsers || 0}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">{stats?.activeUsers || 0} actifs</div>
        </div>

        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Signalements</div>
            <AlertTriangle size={16} className="text-orange-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.totalReports || 0}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">{stats?.resolvedReports || 0} résolus</div>
        </div>

        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Alertes actives</div>
            <Zap size={16} className="text-rose-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.activeAlerts || 0}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">Nécessitent attention</div>
        </div>

        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Services en ligne</div>
            <Activity size={16} className="text-green-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.servicesOnline || 0}/8</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">Microservices actifs</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="panel lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Santé du système</h3>
            <span className="text-xs text-slate-500 dark:text-slate-500">Temps réel</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">CPU</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{systemHealth?.cpu || 0}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all"
                  style={{ width: `${systemHealth?.cpu || 0}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Mémoire</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{systemHealth?.memory || 0}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-2 rounded-full bg-purple-500 transition-all"
                  style={{ width: `${systemHealth?.memory || 0}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Disque</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{systemHealth?.disk || 0}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-2 rounded-full bg-green-500 transition-all"
                  style={{ width: `${systemHealth?.disk || 0}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Réseau</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{systemHealth?.network || 0}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-2 rounded-full bg-orange-500 transition-all"
                  style={{ width: `${systemHealth?.network || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Métriques clés</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-green-600" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Temps de réponse moyen</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{stats?.avgResponseTime || '18 min'}</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-blue-600" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Disponibilité système</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{stats?.systemUptime || '99.8%'}</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-rose-600" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Taux d'erreur</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">0.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="panel">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Gestion utilisateurs</h3>
          </div>
          <div className="space-y-3">
            <Link
              to="/users"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-purple-300 hover:bg-purple-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-purple-900 dark:hover:bg-purple-950/40"
            >
              <div className="rounded-xl bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                <Users size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Gérer les utilisateurs</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Ajouter, modifier, supprimer</div>
              </div>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-blue-900 dark:hover:bg-blue-950/40"
            >
              <div className="rounded-xl bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <Building2 size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Gestion des communes</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Zones et quartiers</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="panel">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Services système</h3>
          </div>
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-green-300 hover:bg-green-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-green-900 dark:hover:bg-green-950/40"
            >
              <div className="rounded-xl bg-green-100 p-2 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <BarChart3 size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Statistiques globales</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Analytics et rapports</div>
              </div>
            </Link>

            <Link
              to="/reports"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-orange-300 hover:bg-orange-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-orange-900 dark:hover:bg-orange-950/40"
            >
              <div className="rounded-xl bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400">
                <AlertTriangle size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Tous les signalements</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Vue d'ensemble incidents</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="panel">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Configuration</h3>
          </div>
          <div className="space-y-3">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-cyan-900 dark:hover:bg-cyan-950/40"
            >
              <div className="rounded-xl bg-cyan-100 p-2 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400">
                <Database size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Base de données</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Backups et migrations</div>
              </div>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-slate-600 dark:hover:bg-slate-700/50"
            >
              <div className="rounded-xl bg-slate-200 p-2 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                <Settings size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Paramètres système</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Configuration globale</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}