import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import FloodDashboard from './components/flood/FloodDashboard';
import HomePage from './components/home/HomePage';
import MapView from './components/gis/MapView';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import ReportList from './components/reports/ReportList';
import RoadDashboard from './components/road/RoadDashboard';
import WasteDashboard from './components/waste/WasteDashboard';

export default function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={isAuthenticated ? <Navigate to='/dashboard' replace /> : <Login />} />
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
                    <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to='/login' replace />} />
                    <Route path='/waste' element={isAuthenticated ? <WasteDashboard /> : <Navigate to='/login' replace />} />
                    <Route path='/road' element={isAuthenticated ? <RoadDashboard /> : <Navigate to='/login' replace />} />
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
