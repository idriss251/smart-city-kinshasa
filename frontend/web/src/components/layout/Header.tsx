import { Bell, LayoutDashboard, LogOut, Moon, ShieldCheck, Sun, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header({ theme, onToggleTheme }: { theme: 'light' | 'dark'; onToggleTheme: () => void }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
    // Force page reload to clear any cached state
    window.location.reload();
  };

  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case 'ADMIN':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300';
      case 'AGENT':
        return 'bg-green-50 text-green-700 dark:bg-green-950/60 dark:text-green-300';
      case 'CITOYEN':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300';
      default:
        return 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300';
    }
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'ADMIN':
        return 'Admin';
      case 'AGENT':
        return 'Agent';
      case 'CITOYEN':
        return 'Citoyen';
      case 'DECIDEUR':
        return 'Décideur';
      default:
        return 'Utilisateur';
    }
  };

  return (
    <header className='sticky top-0 z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-5'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-lg'>
            <LayoutDashboard size={18} />
          </div>
          <div>
            <div className='flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100'>
              Smart City Kinshasa
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${getRoleBadgeColor()}`}>
                {getRoleLabel()}
              </span>
            </div>
            <div className='text-xs text-slate-500 dark:text-slate-400'>
              {user?.username ? `Connecté en tant que ${user.username}` : 'Centre de gestion urbaine'}
            </div>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 md:flex'>
            <ShieldCheck size={16} className='text-teal-600' />
            Système en ligne
          </div>
          <button
            onClick={onToggleTheme}
            className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={handleLogout}
            className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-rose-500 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
            title='Déconnexion'
          >
            <LogOut size={16} />
          </button>
          <button className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'>
            <Bell size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
