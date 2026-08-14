import { UserPlus, Trash2, Edit, ShieldCheck, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'ADMIN' | 'AGENT' | 'CITOYEN' | 'DECIDEUR';
  commune?: string;
  createdAt: string;
}

interface NewUser {
  username: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'AGENT' | 'CITOYEN' | 'DECIDEUR';
  commune?: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({
    username: '',
    email: '',
    password: '',
    role: 'CITOYEN',
    commune: ''
  });

  // Load users from API
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/users', newUser);
      setShowAddModal(false);
      setNewUser({ username: '', email: '', password: '', role: 'CITOYEN', commune: '' });
      loadUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Erreur lors de la création de l\'utilisateur');
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await api.delete(`/users/${id}`);
        loadUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Erreur lors de la suppression de l\'utilisateur');
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-3xl border border-purple-100 bg-gradient-to-r from-purple-600 to-violet-500 p-5 text-white shadow-lg md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-100">Gestion Utilisateurs</div>
          <h2 className="mt-1 text-2xl font-semibold">Administration des comptes utilisateurs</h2>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm hover:bg-purple-50"
        >
          <UserPlus size={16} />
          Ajouter un utilisateur
        </button>
      </div>

      <div className="panel">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {loading && <span className="text-sm text-slate-500">Chargement...</span>}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Utilisateur</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Rôle</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Commune</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Date création</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900 dark:text-slate-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-500 text-white text-sm font-semibold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{user.commune || '-'}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{new Date(user.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">Ajouter un utilisateur</h3>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Nom d'utilisateur</label>
                <input 
                  className="input" 
                  placeholder="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                <input 
                  className="input" 
                  type="email" 
                  placeholder="email@example.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Mot de passe</label>
                <input 
                  className="input" 
                  type="password" 
                  placeholder="••••••••"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Rôle</label>
                <select 
                  className="input"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value as any})}
                >
                  <option value="CITOYEN">Citoyen</option>
                  <option value="AGENT">Agent</option>
                  <option value="ADMIN">Admin</option>
                  <option value="DECIDEUR">Décideur</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Commune</label>
                <select 
                  className="input"
                  value={newUser.commune}
                  onChange={(e) => setNewUser({...newUser, commune: e.target.value})}
                >
                  <option value="">Sélectionnez une commune</option>
                  <option value="Bandalungwa">Bandalungwa</option>
                  <option value="Barumbu">Barumbu</option>
                  <option value="Bumbu">Bumbu</option>
                  <option value="Gombe">Gombe</option>
                  <option value="Kalamu">Kalamu</option>
                  <option value="Kasa-Vubu">Kasa-Vubu</option>
                  <option value="Kimbanseke">Kimbanseke</option>
                  <option value="Kinshasa">Kinshasa</option>
                  <option value="Kintambo">Kintambo</option>
                  <option value="Kisenso">Kisenso</option>
                  <option value="Lemba">Lemba</option>
                  <option value="Limete">Limete</option>
                  <option value="Lingwala">Lingwala</option>
                  <option value="Makala">Makala</option>
                  <option value="Maluku">Maluku</option>
                  <option value="Masina">Masina</option>
                  <option value="Matete">Matete</option>
                  <option value="Mont-Ngafula">Mont-Ngafula</option>
                  <option value="N'Djili">N'Djili</option>
                  <option value="Ngaba">Ngaba</option>
                  <option value="Ngaliema">Ngaliema</option>
                  <option value="Ngiri-Ngiri">Ngiri-Ngiri</option>
                  <option value="Nsele">Nsele</option>
                  <option value="Selembao">Selembao</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn flex-1 border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn flex-1 bg-purple-600 text-white hover:bg-purple-700"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}