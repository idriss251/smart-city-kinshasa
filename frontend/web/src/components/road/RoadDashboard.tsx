import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Wrench, CheckCircle2, Car } from 'lucide-react';
import ProblemList from './ProblemList';

// Generate realistic hourly road data
const generateRoadData = () => {
  const problemTypes = ['Nid de poule', 'Fissure', 'Effondrement', 'Éclairage défaillant', 'Signalisation endommagée'];
  const locations = ['Boulevard Lumumba', 'Avenue de la Justice', 'Route de Matadi', 'Boulevard du 30 Juin', 'Avenue Kasa-Vubu'];
  
  return locations.map((location, idx) => ({
    id: 1000 + idx,
    location,
    type: problemTypes[Math.floor(Math.random() * problemTypes.length)],
    severity: Math.random() > 0.6 ? 'critical' : Math.random() > 0.3 ? 'high' : 'medium',
    reportedAt: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000), // Last 12 hours
    estimatedRepair: Math.floor(Math.random() * 48) + 2, // 2-50 hours
    status: Math.random() > 0.5 ? 'pending' : Math.random() > 0.3 ? 'in_progress' : 'resolved',
    trafficImpact: Math.random() > 0.4 ? 'high' : 'low'
  }));
};

export default function RoadDashboard() {
  const [roadData, setRoadData] = useState(generateRoadData());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setRoadData(generateRoadData());
      setLastUpdate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const criticalIssues = roadData.filter(r => r.severity === 'critical' && r.status !== 'resolved').length;
  const inProgress = roadData.filter(r => r.status === 'in_progress').length;
  const avgRepairTime = Math.round(roadData.reduce((sum, r) => sum + r.estimatedRepair, 0) / roadData.length);

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 md:grid-cols-4'>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-rose-100 p-3 text-rose-600'>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Problèmes critiques</div>
            <div className='text-2xl font-bold text-slate-900'>{criticalIssues}</div>
          </div>
        </div>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-amber-100 p-3 text-amber-600'>
            <Wrench size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>En cours</div>
            <div className='text-2xl font-bold text-slate-900'>{inProgress}</div>
          </div>
        </div>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-sky-100 p-3 text-sky-600'>
            <Clock size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Temps moyen réparation</div>
            <div className='text-2xl font-bold text-slate-900'>{avgRepairTime}h</div>
          </div>
        </div>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-teal-100 p-3 text-teal-600'>
            <Car size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Impact trafic élevé</div>
            <div className='text-2xl font-bold text-slate-900'>{roadData.filter(r => r.trafficImpact === 'high').length}</div>
          </div>
        </div>
      </div>

      <div className='panel'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-slate-900'>Problèmes routiers par heure</h3>
          <div className='text-sm text-slate-500'>Mis à jour: {lastUpdate.toLocaleTimeString('fr-FR')}</div>
        </div>
        <div className='space-y-3'>
          {roadData.map((problem) => (
            <div key={problem.id} className='flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    problem.severity === 'critical' ? 'bg-rose-100 text-rose-700' :
                    problem.severity === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'
                  }`}>
                    {problem.severity}
                  </span>
                  <span className='font-semibold text-slate-900'>{problem.type}</span>
                </div>
                <div className='text-sm text-slate-500 mt-1'>{problem.location}</div>
              </div>
              <div className='text-right ml-4'>
                <div className={`text-sm font-semibold ${
                  problem.status === 'resolved' ? 'text-emerald-600' :
                  problem.status === 'in_progress' ? 'text-amber-600' : 'text-slate-600'
                }`}>
                  {problem.status === 'resolved' ? 'Résolu' : problem.status === 'in_progress' ? 'En cours' : 'En attente'}
                </div>
                <div className='text-xs text-slate-500'>
                  {problem.reportedAt.toLocaleTimeString('fr-FR')} • {problem.estimatedRepair}h estimé
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
