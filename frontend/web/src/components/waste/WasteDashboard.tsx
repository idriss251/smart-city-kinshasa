import { useState, useEffect } from 'react';
import { Trash2, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import BinList from './BinList';
import BinMap from './BinMap';

// Generate realistic hourly waste data
const generateWasteData = () => {
  const communes = ['Gombe', 'Limete', 'Kalamu', 'Kimbanseke', 'Ngaliema', 'Matete'];
  return communes.map(commune => ({
    commune,
    fillLevel: Math.floor(Math.random() * 40) + 60, // 60-100% fill
    lastCollection: new Date(Date.now() - Math.random() * 8 * 60 * 60 * 1000), // Last 8 hours
    dailyVolume: Math.floor(Math.random() * 500) + 200, // 200-700 kg/day
    status: Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'warning' : 'normal'
  }));
};

export default function WasteDashboard() {
  const [wasteData, setWasteData] = useState(generateWasteData());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setWasteData(generateWasteData());
      setLastUpdate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const criticalBins = wasteData.filter(b => b.status === 'critical').length;
  const totalVolume = wasteData.reduce((sum, b) => sum + b.dailyVolume, 0);

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 md:grid-cols-3'>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-rose-100 p-3 text-rose-600'>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Poubelles critiques</div>
            <div className='text-2xl font-bold text-slate-900'>{criticalBins}</div>
          </div>
        </div>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-teal-100 p-3 text-teal-600'>
            <Trash2 size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Volume quotidien</div>
            <div className='text-2xl font-bold text-slate-900'>{totalVolume} kg</div>
          </div>
        </div>
        <div className='panel flex items-center gap-3'>
          <div className='rounded-2xl bg-sky-100 p-3 text-sky-600'>
            <Clock size={20} />
          </div>
          <div>
            <div className='text-sm text-slate-500'>Dernière mise à jour</div>
            <div className='text-sm font-semibold text-slate-900'>{lastUpdate.toLocaleTimeString('fr-FR')}</div>
          </div>
        </div>
      </div>

      <div className='grid gap-4 lg:grid-cols-2'>
        <div className='panel'>
          <h3 className='text-lg font-semibold text-slate-900 mb-4'>État des poubelles par commune</h3>
          <div className='space-y-3'>
            {wasteData.map((bin, idx) => (
              <div key={idx} className='flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                <div>
                  <div className='font-semibold text-slate-900'>{bin.commune}</div>
                  <div className='text-sm text-slate-500'>{bin.dailyVolume} kg/jour</div>
                </div>
                <div className='text-right'>
                  <div className={`text-sm font-semibold ${
                    bin.status === 'critical' ? 'text-rose-600' : 
                    bin.status === 'warning' ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {bin.fillLevel}%
                  </div>
                  <div className='text-xs text-slate-500'>
                    {bin.lastCollection.toLocaleTimeString('fr-FR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BinMap />
      </div>
    </div>
  );
}
