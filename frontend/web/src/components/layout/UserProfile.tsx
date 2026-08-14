import { User, Mail, ShieldCheck, MapPin, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function UserProfile() {
  const { user, logout } = useAuth();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400';
      case 'AGENT': return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400';
      case 'CITOYEN': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400';
      case 'DECIDEUR': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'Admin';
      case 'AGENT': return 'Agent';
      case 'CITOYEN': return 'Citoyen';
      case 'DECIDEUR': return 'Décideur';
      default: return role;
    }
  };

  return (
    <div className="panel rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-500 text-white text-lg font-semibold">
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {user?.username || 'Utilisateur'}
            </h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getRoleBadgeColor(user?.role || '')}`}>
              {getRoleLabel(user?.role || '')}
            </span>
          </div>
          
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Mail size={14} />
              <span>{user?.email || 'email@exemple.com'}</span>
            </div>
            
            {user?.commune && (
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin size={14} />
                <span>{user.commune}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <button
            onClick={logout}
            className="flex items-center gap-1.5 rounded-lg p-2 text-sm text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
            title="Déconnexion"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-100 p-2.5 dark:bg-slate-700/50">
            <div className="text-xs text-slate-600 dark:text-slate-400">Rôle</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {getRoleLabel(user?.role || '')}
            </div>
          </div>
          <div className="rounded-lg bg-slate-100 p-2.5 dark:bg-slate-700/50">
            <div className="text-xs text-slate-600 dark:text-slate-400">Commune</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {user?.commune || 'Non défini'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
