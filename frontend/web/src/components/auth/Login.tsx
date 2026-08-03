import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (d: any) => {
    setLoading(true);
    try {
      console.log('Login data:', d);
      const r = await api.post('/auth/login', {
        username: d.username,
        password: d.password
      });
      localStorage.setItem('token', r.data.token);
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      console.error('Login error:', error);
      alert('Échec de la connexion. Vérifiez vos identifiants.');
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

        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='mb-1.5 block text-sm font-medium text-slate-700'>Nom d’utilisateur</label>
            <input className='input' placeholder='username' {...register('username')} />
          </div>
          <div>
            <label className='mb-1.5 block text-sm font-medium text-slate-700'>Mot de passe</label>
            <input className='input' type='password' placeholder='password' {...register('password')} />
          </div>
          <button className='btn flex w-full items-center justify-center gap-2' disabled={loading}>
            {loading ? 'Connexion...' : 'Entrer'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}
