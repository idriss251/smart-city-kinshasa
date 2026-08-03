import { useState, useEffect } from 'react';
import { Droplets, AlertTriangle, Clock, Waves, MapPin } from 'lucide-react';
import ZoneList from './ZoneList';

// Generate realistic hourly flood data
const generateFloodData = () => {
  const zones = [
    { name: 'Ndjili', baseLevel: 2.5 },
    { name: 'Ngaliema', baseLevel: 1.8 },
    { name: 'Kingabwa', baseLevel: 3.2 },
    { name: 'Kimbanseke', baseLevel: 2.0 },
    { name: 'Limete', baseLevel: 1.5 },
    { name: 'Kintambo', baseLevel: 2.8 }
  ];

  return zones.map(zone => ({
    ...zone,
    currentLevel: (zone.baseLevel + Math.random() * 2).toFixed(2),
    threshold: (zone.baseLevel + 1.5).toFixed(2),
    trend: Math.random() > 0.5 ? 'rising' : 'stable',
    lastMeasurement: new Date(Date.now() - Math.random() * 60 * 60 * 1000), // Last hour
    riskLevel: Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'high' : 'moderate',
    affectedPopulation: Math.floor(Math.random() * 5000) + 500
  }));
};

export default function FloodDashboard() {
  const [floodData, setFloodData] = useState(generateFloodData());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setFloodData(generateFloodData());
      setLastUpdate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const criticalZones = floodData.filter(z => z.riskLevel === 'critical').length;
  const risingZones = floodData.filter(z => z.trend === 'rising').length;
  const totalAffected = floodData.reduce((sum, z) => sum + z.affectedPopulation, 0);

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 md:grid-cols-4'>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-rose-100 p-3 text-rose-600'>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Zones critiques</div>
            <div className='text-2xl font-bold text-slate-900'>{criticalZones}</div>
          </div>
        </div>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-amber-100 p-3 text-amber-600'>
            <Waves size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Niveau en hausse</div>
            <div className='text-2xl font-bold text-slate-900'>{risingZones}</div>
          </div>
        </div>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-sky-100 p-3 text-sky-600'>
            <Droplets size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Population affectée</div>
            <div className='text-2xl font-bold text-slate-900'>{(totalAffected / 1000).toFixed(1)}k</div>
          </div>
        </div>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-teal-100 p-3 text-teal-600'>
            <Clock size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Dernière mesure</div>
            <div className='text-sm font-semibold text-slate-900'>{lastUpdate.toLocaleTimeString('fr-FR')}</div>
          </div>
        </div>
      </div>

      <div className='panel'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-slate-900'>Surveillance des zones inondables par heure</h3>
          <div className='text-sm text-slate-500'>Mis à jour: {lastUpdate.toLocaleTimeString('fr-FR')}</div>
        </div>
        <div className='space-y-3'>
          {floodData.map((zone, idx) => (
            <div key={idx} className='flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <div className='flex items-center gap-3'>
                <div className={`rounded-full p-2 ${zone.riskLevel === 'critical' ? 'bg-rose-100 text-rose-600' : zone.riskLevel === 'high' ? 'bg-amber-100 text-amber-600' : 'bg-sky-100 text-sky-600'}`}>
                  <MapPin size={16} />
                </div>
                <div>
                  <div className='font-semibold text-slate-900'>{zone.name}</div>
                  <div className='text-sm text-slate-500'>{zone.affectedPopulation} habitants</div>
                </div>
              </div>
              <div className='flex items-center gap-6'>
                <div className='text-right'>
                  <div className='text-sm text-slate-500'>Niveau actuel</div>
                  <div className={`text-lg font-bold ${parseFloat(zone.currentLevel) > parseFloat(zone.threshold) ? 'text-rose-600' : 'text-slate-900'}`}>
                    {zone.currentLevel}m
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-sm text-slate-500'>Seuil d'alerte</div>
                  <div className='text-sm font-semibold text-slate-700'>{zone.threshold}m</div>
                </div>
                <div className='flex items-center gap-1'>
                  {zone.trend === 'rising' ? (
                    <span className='text-xs font-semibold text-amber-600'>↗ Hausse</span>
                  ) : (
                    <span className='text-xs font-semibold text-emerald-600'>→ Stable</span>
                  )}
                </div>
                <div className='text-xs text-slate-500'>
                  {zone.lastMeasurement.toLocaleTimeString('fr-FR')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
