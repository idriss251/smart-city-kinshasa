import { AlertTriangle, Car, ClipboardList, Droplets, LayoutDashboard, Map, PanelsTopLeft, Trash2, Users, Settings, ShieldCheck, Navigation } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const citizenLinks = [
  { to: '/citizen', label: 'Mon tableau de bord', icon: LayoutDashboard },
  { to: '/reports', label: 'Mes signalements', icon: ClipboardList },
  { to: '/waste', label: 'Déchets', icon: Trash2 },
  { to: '/road', label: 'Routes', icon: AlertTriangle },
  { to: '/traffic', label: 'Trafic', icon: Car },
  { to: '/flood', label: 'Inondations', icon: Droplets },
  { to: '/gis', label: 'Carte', icon: Map },
];

const agentLinks = [
  { to: '/agent', label: 'Mon tableau de bord', icon: LayoutDashboard },
  { to: '/road', label: 'Interventions routes', icon: AlertTriangle },
  { to: '/traffic', label: 'Trafic', icon: Car },
  { to: '/waste', label: 'Collectes déchets', icon: Trash2 },
  { to: '/flood', label: 'Surveillance inondations', icon: Droplets },
  { to: '/gis', label: 'Navigation GPS', icon: Navigation },
];

const adminLinks = [
  { to: '/admin', label: 'Administration', icon: ShieldCheck },
  { to: '/dashboard', label: 'Statistiques globales', icon: LayoutDashboard },
  { to: '/reports', label: 'Tous les signalements', icon: ClipboardList },
  { to: '/waste', label: 'Gestion déchets', icon: Trash2 },
  { to: '/road', label: 'Gestion routes', icon: AlertTriangle },
  { to: '/traffic', label: 'Gestion trafic', icon: Car },
  { to: '/flood', label: 'Surveillance inondations', icon: Droplets },
  { to: '/gis', label: 'Carte système', icon: Map },
  { to: '/users', label: 'Gestion utilisateurs', icon: Users },
  { to: '/', label: 'Configuration', icon: Settings },
];

export default function Sidebar() {
  const { user } = useAuth();
  
  const getLinks = () => {
    switch (user?.role) {
      case 'ADMIN':
        return adminLinks;
      case 'AGENT':
        return agentLinks;
      case 'CITOYEN':
      default:
        return citizenLinks;
    }
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'ADMIN':
        return 'Administration';
      case 'AGENT':
        return 'Agent Municipal';
      case 'CITOYEN':
        return 'Espace Citoyen';
      default:
        return 'Services urbains';
    }
  };

  const links = getLinks();

  return (
    <aside className='w-64 border-r border-slate-200 bg-slate-950/95 p-4 text-slate-200 dark:border-slate-800'>
      <div className='mb-6 rounded-2xl border border-white/10 bg-white/10 p-3'>
        <div className='text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400'>Navigation</div>
        <div className='mt-2 flex items-center gap-2 text-sm font-semibold text-white'>
          <PanelsTopLeft size={16} className='text-teal-400' />
          {getRoleLabel()}
        </div>
      </div>

      <nav className='space-y-1'>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                isActive ? 'bg-teal-600/20 text-white shadow-sm' : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
