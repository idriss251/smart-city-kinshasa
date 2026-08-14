import { AlertCircle, BellRing, ClipboardList, MapPinned, Plus, ShieldCheck, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import UserProfile from '../layout/UserProfile';

export default function CitizenDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>();
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    api
      .get('/dashboard/citizen-stats', { params: { username: user?.username } })
      .then((r) => setStats(r.data))
      .catch(() => {
        setStats({
          totalReports: 12,
          myReports: 5,
          resolved: 3,
          pending: 2,
          resolutionRate: 60,
          avgResponseTime: '2h 30min'
        });
      });

    const interval = setInterval(() => setLastUpdate(new Date()), 60000);
    return () => clearInterval(interval);
  }, [user?.username]);

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-blue-100 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-blue-100">
              <ShieldCheck size={16} />
              Espace Citoyen
            </div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Bienvenue, {user?.username || 'Citoyen'}
            </h2>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Signalez des incidents, suivez leur progression et contribuez à l'amélioration de votre quartier.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
            <div className="rounded-2xl bg-blue-500/20 p-2 text-blue-200">
              <MapPinned size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">Votre commune</div>
              <div className="text-sm text-slate-300">{user?.commune || 'Non définie'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs text-slate-300">
            <span>Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}</span>
          </div>
        </div>
      </div>

      <div className="panel flex flex-col gap-3 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-blue-500 p-2 text-white">
            <BellRing size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Alertes dans votre zone</div>
            <div className="text-sm text-slate-600">2 nouvelles alertes à surveiller dans votre commune</div>
          </div>
        </div>
        <Link to="/flood" className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50">
          Voir les détails
          <TrendingUp size={16} />
        </Link>
      </div>

      <div className="panel flex items-center gap-3 bg-rose-50">
        <AlertCircle size={18} className="text-rose-600" />
        <div className="text-sm text-slate-700">
          Un de vos signalements a été mis à jour. <Link to="/reports" className="font-semibold text-rose-700 underline">Voir le statut</Link>
        </div>
      </div>

      <UserProfile />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Mes signalements</div>
            <ClipboardList size={16} className="text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.myReports || 0}</div>
        </div>

        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">En attente</div>
            <AlertCircle size={16} className="text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.pending || 0}</div>
        </div>

        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Résolus</div>
            <ShieldCheck size={16} className="text-green-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.resolved || 0}</div>
        </div>

        <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">Taux de résolution</div>
            <TrendingUp size={16} className="text-teal-600" />
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats?.resolutionRate || 0}%</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="panel">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Actions rapides</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/reports"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-blue-900 dark:hover:bg-blue-950/40"
            >
              <div className="rounded-xl bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <Plus size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Nouveau signalement</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Signaler un incident</div>
              </div>
            </Link>

            <Link
              to="/reports"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-green-300 hover:bg-green-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-green-900 dark:hover:bg-green-950/40"
            >
              <div className="rounded-xl bg-green-100 p-2 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <ClipboardList size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Mes signalements</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Voir l'historique</div>
              </div>
            </Link>

            <Link
              to="/gis"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-purple-300 hover:bg-purple-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-purple-900 dark:hover:bg-purple-950/40"
            >
              <div className="rounded-xl bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                <MapPinned size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Carte interactive</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Voir les incidents</div>
              </div>
            </Link>

            <Link
              to="/flood"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-cyan-900 dark:hover:bg-cyan-950/40"
            >
              <div className="rounded-xl bg-cyan-100 p-2 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400">
                <BellRing size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Alertes inondations</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Surveillance zones</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="panel border-l-4 border-l-rose-500">
          <div className="mb-3 flex items-center gap-2">
            <BellRing size={18} className="text-rose-600" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Numéros d'urgence</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a href="tel:112" className="rounded-2xl bg-rose-50 p-3 text-center transition hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/30">
              <div className="text-lg font-bold text-rose-700">112</div>
              <div className="text-xs text-slate-600 dark:text-slate-300">Police secours</div>
            </a>
            <a href="tel:118" className="rounded-2xl bg-rose-50 p-3 text-center transition hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/30">
              <div className="text-lg font-bold text-rose-700">118</div>
              <div className="text-xs text-slate-600 dark:text-slate-300">Pompiers</div>
            </a>
            <a href="tel:113" className="rounded-2xl bg-rose-50 p-3 text-center transition hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/30">
              <div className="text-lg font-bold text-rose-700">113</div>
              <div className="text-xs text-slate-600 dark:text-slate-300">SAMU</div>
            </a>
            <a href="tel:110" className="rounded-2xl bg-rose-50 p-3 text-center transition hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/30">
              <div className="text-lg font-bold text-rose-700">110</div>
              <div className="text-xs text-slate-600 dark:text-slate-300">Général</div>
            </a>
          </div>
        </div>

        <div className="panel">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Informations utiles</h3>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Comment signaler ?</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Utilisez le bouton "Nouveau signalement" pour déposer un incident. Les équipes municipales seront notifiées automatiquement.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Suivi en temps réel</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Consultez l'état de vos signalements à tout moment. Vous recevrez des notifications lors des mises à jour.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Transparence</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Les signalements sont publiés de manière anonymisée. Téléchargez les données ouvertes en CSV depuis la page Signalements.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}