import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import FloodDashboard from './components/flood/FloodDashboard';
import HomePage from './components/home/HomePage';
import MapView from './components/gis/MapView';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import ReportList from './components/reports/ReportList';
import RoadDashboard from './components/road/RoadDashboard';
import TrafficDashboard from './components/traffic/TrafficDashboard';
import WasteDashboard from './components/waste/WasteDashboard';
import CitizenDashboard from './components/dashboard/CitizenDashboard';
import AgentDashboard from './components/dashboard/AgentDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import DecideurDashboard from './components/dashboard/DecideurDashboard';
import UserManagement from './components/admin/UserManagement';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Get default redirect based on user role
  const getDefaultRedirect = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'ADMIN': return '/admin';
      case 'AGENT': return '/agent';
      case 'DECIDEUR': return '/decideur';
      case 'CITOYEN': return '/citizen';
      default: return '/citizen';
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={isAuthenticated ? <Navigate to={getDefaultRedirect()} replace /> : <Login />} />
        <Route path='/register' element={isAuthenticated ? <Navigate to={getDefaultRedirect()} replace /> : <Register />} />
        <Route
          path='/*'
          element={
            <div className='min-h-screen bg-slate-50/70 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100'>
              <Header theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
              <div className='flex min-h-[calc(100vh-64px)]'>
                <Sidebar />
                <main className='flex-1 p-5 lg:p-6'>
                  <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/citizen' element={isAuthenticated ? <CitizenDashboard /> : <Navigate to='/login' replace />} />
                    <Route path='/agent' element={isAuthenticated ? <AgentDashboard /> : <Navigate to='/login' replace />} />
                    <Route path='/decideur' element={isAuthenticated ? <DecideurDashboard /> : <Navigate to='/login' replace />} />
                    <Route path='/admin' element={isAuthenticated ? <AdminDashboard /> : <Navigate to='/login' replace />} />
                    <Route path='/users' element={isAuthenticated ? <UserManagement /> : <Navigate to='/login' replace />} />
                    <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to='/login' replace />} />
                    <Route path='/waste' element={isAuthenticated ? <WasteDashboard /> : <Navigate to='/login' replace />} />
                    <Route path='/road' element={isAuthenticated ? <RoadDashboard /> : <Navigate to='/login' replace />} />
                    <Route path='/traffic' element={isAuthenticated ? <TrafficDashboard /> : <Navigate to='/login' replace />} />
                    <Route path='/flood' element={isAuthenticated ? <FloodDashboard /> : <Navigate to='/login' replace />} />
                    <Route path='/reports' element={isAuthenticated ? <ReportList /> : <Navigate to='/login' replace />} />
                    <Route path='/gis' element={isAuthenticated ? <MapView /> : <Navigate to='/login' replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
