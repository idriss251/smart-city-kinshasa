import { AlertTriangle, ClipboardList, Droplets, LayoutDashboard, Map, PanelsTopLeft, Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/waste', label: 'Déchets', icon: Trash2 },
  { to: '/road', label: 'Routes', icon: AlertTriangle },
  { to: '/flood', label: 'Inondations', icon: Droplets },
  { to: '/reports', label: 'Signalements', icon: ClipboardList },
  { to: '/gis', label: 'Carte', icon: Map },
];

export default function Sidebar() {
  return (
    <aside className='w-64 border-r border-slate-200 bg-slate-950/95 p-4 text-slate-200 dark:border-slate-800'>
      <div className='mb-6 rounded-2xl border border-white/10 bg-white/10 p-3'>
        <div className='text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400'>Navigation</div>
        <div className='mt-2 flex items-center gap-2 text-sm font-semibold text-white'>
          <PanelsTopLeft size={16} className='text-teal-400' />
          Services urbains
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
