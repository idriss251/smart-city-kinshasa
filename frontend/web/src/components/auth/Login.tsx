import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

type AuthMode = 'legacy' | 'betterauth';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>('legacy');
  const [showForgot, setShowForgot] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = mode === 'betterauth'
        ? '/api/betterauth/sign-in/email'
        : '/api/auth/login';
      const payload = mode === 'betterauth'
        ? { email: formData.email, password: formData.password, rememberMe: true }
        : { username: formData.username, password: formData.password };

      console.log('Sending login request to:', endpoint);
      const r = await api.post(endpoint, payload);
      console.log('Login response:', r.data);

      localStorage.setItem('token', r.data.token);

      const userData = {
        id: r.data.id || r.data.user?.id || 1,
        username: r.data.username || r.data.user?.name || formData.username || formData.email,
        email: r.data.email || r.data.user?.email || `${formData.username || formData.email}@smartcity.cd`,
        role: r.data.role || r.data.user?.role || 'CITOYEN',
        commune: r.data.commune || r.data.user?.commune || 'Gombe'
      };
      localStorage.setItem('user', JSON.stringify(userData));

      const dashboardPath = userData.role === 'ADMIN' ? '/admin' :
                           userData.role === 'AGENT' ? '/agent' : '/citizen';
      navigate(dashboardPath, { replace: true });
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      alert('Échec de la connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await api.post('/api/betterauth/request-password-reset', {
        email: formData.email,
        redirectTo: `${window.location.origin}/reset-password`
      });
      console.log('Forgot response:', r.data);
      alert('Un email de réinitialisation a été envoyé (vérifiez la console pour le token de test).');
      setShowForgot(false);
    } catch (error: any) {
      console.error('Forgot error:', error);
      alert('Échec de l\'envoi. Vérifiez l\'email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.15),_transparent_35%)] px-4'>
      <div className='w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur'>
        <div className='mb-6 flex items-center gap-3'>
          <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-lg'>
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className='text-xl font-semibold text-slate-900'>Connexion</h1>
            <p className='text-sm text-slate-500'>Accédez à votre espace de gestion urbaine</p>
          </div>
        </div>

        <div className='mb-4 flex rounded-xl border border-slate-200 p-1'>
          <button
            type='button'
            onClick={() => { setMode('legacy'); setShowForgot(false); }}
            className={`flex-1 rounded-lg py-1.5 text-sm font-medium transition ${
              mode === 'legacy' ? 'bg-teal-600 text-white' : 'text-slate-600'
            }`}
          >
            Officiel
          </button>
          <button
            type='button'
            onClick={() => { setMode('betterauth'); setShowForgot(false); }}
            className={`flex-1 rounded-lg py-1.5 text-sm font-medium transition ${
              mode === 'betterauth' ? 'bg-teal-600 text-white' : 'text-slate-600'
            }`}
          >
            Citoyen
          </button>
        </div>

        {showForgot ? (
          <form className='space-y-4' onSubmit={handleForgot}>
            <div>
              <label className='mb-1.5 block text-sm font-medium text-slate-700'>Email</label>
              <input
                className='input'
                placeholder='votre@email.cd'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button className='btn flex w-full items-center justify-center gap-2' disabled={loading}>
              {loading ? 'Envoi...' : 'Envoyer le lien'}
              {!loading && <ArrowRight size={16} />}
            </button>
            <button
              type='button'
              onClick={() => setShowForgot(false)}
              className='w-full text-center text-sm text-slate-500 hover:text-slate-700'
            >
              Retour à la connexion
            </button>
          </form>
        ) : (
          <form className='space-y-4' onSubmit={handleLogin}>
            {mode === 'legacy' ? (
              <div>
                <label className='mb-1.5 block text-sm font-medium text-slate-700'>Nom d'utilisateur</label>
                <input
                  className='input'
                  placeholder='username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            ) : (
              <div>
                <label className='mb-1.5 block text-sm font-medium text-slate-700'>Email</label>
                <input
                  className='input'
                  placeholder='votre@email.cd'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div>
              <label className='mb-1.5 block text-sm font-medium text-slate-700'>Mot de passe</label>
              <input
                className='input'
                type='password'
                placeholder='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className='btn flex w-full items-center justify-center gap-2' disabled={loading}>
              {loading ? 'Connexion...' : 'Entrer'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>
        )}

        <div className='mt-4 text-center text-sm text-slate-600'>
          {!showForgot && (
            <button
              type='button'
              onClick={() => { setMode('betterauth'); setShowForgot(true); }}
              className='mb-2 block w-full text-teal-600 hover:underline font-medium'
            >
              Mot de passe oublié ?
            </button>
          )}
          Pas encore de compte ?{' '}
          <button
            onClick={() => navigate('/register')}
            className='text-teal-600 hover:underline font-medium'
          >
            Créer un compte citoyen
          </button>
        </div>
      </div>
    </div>
  );
}
