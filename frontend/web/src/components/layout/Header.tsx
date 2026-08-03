import { Bell, LayoutDashboard, LogOut, Moon, ShieldCheck, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ theme, onToggleTheme }: { theme: 'light' | 'dark'; onToggleTheme: () => void }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
    window.location.reload();
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
              <span className='rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:bg-teal-950/60 dark:text-teal-300'>
                Admin
              </span>
            </div>
            <div className='text-xs text-slate-500 dark:text-slate-400'>Centre de gestion urbaine</div>
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
