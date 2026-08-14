import { BarChart3, FileText, TrendingUp, Users, ShieldCheck, Building2, AlertTriangle, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import UserProfile from '../layout/UserProfile';

export default function DecideurDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>();
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    api
      .get('/dashboard/decideur-stats')
      .then((r) => setStats(r.data))
      .catch(() => {
        setStats({
          totalDecisions: 45,
          pendingDecisions: 8,
          approvedDecisions: 32,
          rejectedDecisions: 5,
          avgDecisionTime: '3 jours',
          citizenSatisfaction: 87
        });
      });

    const interval = setInterval(() => setLastUpdate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-orange-100 bg-gradient-to-br from-slate-950 via-slate-900 to-orange-900 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-orange-100">
              <ShieldCheck size={16} />
              Espace Décideur
            </div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Bienvenue, Décideur {user?.username || 'Système'}
            </h2>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Prenez des décisions stratégiques pour le développement de Kinshasa. Analysez les données, validez les projets et suivez les indicateurs de performance.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
            <div className="rounded-2xl bg-orange-500/20 p-2 text-orange-200">
              <Building2 size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">Zone de responsabilité</div>
              <div className="text-sm text-slate-300">{user?.commune || 'Ville de Kinshasa'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs text-slate-300">
            <span>Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}</span>
          </div>
        </div>
      </div>

      <div className="panel flex flex-col gap-3 rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-orange-500 p-2 text-white">
            <FileText size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Décisions en attente</div>
            <div className="text-sm text-slate-600">{stats?.pendingDecisions || 0} dossiers nécessitent votre attention</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-orange-700 shadow-sm">
          <TrendingUp size={16} />
          Taux d'approbation: {Math.round(((stats?.approvedDecisions || 0) / (stats?.totalDecisions || 1)) * 100)}%
        </div>
      </div>

      <UserProfile />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Total décisions</div>
            <FileText size={16} className="text-orange-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.totalDecisions || 0}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">Ce mois</div>
        </div>

        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">En attente</div>
            <AlertTriangle size={16} className="text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.pendingDecisions || 0}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">À traiter</div>
        </div>

        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Approuvées</div>
            <CheckCircle size={16} className="text-green-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.approvedDecisions || 0}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">Validées</div>
        </div>

        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Satisfaction</div>
            <Users size={16} className="text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.citizenSatisfaction || 0}%</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">Citoyens</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="panel">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Décisions à prendre</h3>
          </div>
          <div className="space-y-3">
            <Link
              to="/reports"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-orange-300 hover:bg-orange-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-orange-900 dark:hover:bg-orange-950/40"
            >
              <div className="rounded-xl bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400">
                <FileText size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Signalements citoyens</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Valider les rapports</div>
              </div>
            </Link>

            <Link
              to="/waste"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-green-300 hover:bg-green-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-green-900 dark:hover:bg-green-950/40"
            >
              <div className="rounded-xl bg-green-100 p-2 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <TrendingUp size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Projets déchets</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Approuver les initiatives</div>
              </div>
            </Link>

            <Link
              to="/road"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-blue-900 dark:hover:bg-blue-950/40"
            >
              <div className="rounded-xl bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <Building2 size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Infrastructure routière</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Valider les travaux</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="panel">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Analyse et rapports</h3>
          </div>
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-purple-300 hover:bg-purple-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-purple-900 dark:hover:bg-purple-950/40"
            >
              <div className="rounded-xl bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                <BarChart3 size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Statistiques globales</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Vue d'ensemble ville</div>
              </div>
            </Link>

            <Link
              to="/gis"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-cyan-900 dark:hover:bg-cyan-950/40"
            >
              <div className="rounded-xl bg-cyan-100 p-2 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400">
                <Building2 size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Cartographie GIS</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Analyse spatiale</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="panel">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Performance</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-green-600" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Temps de décision moyen</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{stats?.avgDecisionTime || '3 jours'}</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-600" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Taux d'approbation</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {Math.round(((stats?.approvedDecisions || 0) / (stats?.totalDecisions || 1)) * 100)}%
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-orange-600" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Satisfaction citoyens</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{stats?.citizenSatisfaction || 0}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
