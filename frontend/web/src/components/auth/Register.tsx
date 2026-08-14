import { ArrowRight, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    commune: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        setLoading(false);
        return;
      }

      console.log('Register data:', formData);

      const r = await api.post('/api/betterauth/sign-up/email', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('token', r.data.token);

      const userData = {
        id: r.data.id || r.data.user?.id || 1,
        username: r.data.user?.name || formData.name,
        email: r.data.user?.email || formData.email,
        role: 'CITOYEN',
        commune: formData.commune
      };
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/citizen', { replace: true });
    } catch (error: any) {
      console.error('Register error:', error);
      alert('Échec de l\'inscription. Vérifiez vos informations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.15),_transparent_35%)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
            <UserPlus size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Inscription Citoyen</h1>
            <p className="text-sm text-slate-500">Créez votre compte pour signaler des incidents</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Nom d'utilisateur</label>
            <input
              className="input"
              placeholder="Choisissez un nom d'utilisateur"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input 
              className="input" 
              type="email" 
              placeholder="votre@email.com" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Mot de passe</label>
            <input 
              className="input" 
              type="password" 
              placeholder="Mot de passe sécurisé" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirmer mot de passe</label>
            <input 
              className="input" 
              type="password" 
              placeholder="Confirmez votre mot de passe" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Commune</label>
            <select 
              className="input"
              name="commune"
              value={formData.commune}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez votre commune</option>
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
          <button className="btn flex w-full items-center justify-center gap-2" disabled={loading}>
            {loading ? 'Inscription...' : 'Créer mon compte'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
        
        <div className="mt-4 text-center text-sm text-slate-600">
          Vous avez déjà un compte ?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline"
            type="button"
          >
            Connectez-vous
          </button>
        </div>
      </div>
    </div>
  );
}
