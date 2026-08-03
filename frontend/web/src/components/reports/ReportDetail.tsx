import { Clock3, MapPin, MessageSquare, UserRound } from 'lucide-react';

export default function ReportDetail() {
  return (
    <div className='panel space-y-4'>
      <div className='flex items-start justify-between gap-3'>
        <div>
          <div className='text-sm font-semibold uppercase tracking-[0.2em] text-teal-600'>Signalement #1042</div>
          <h3 className='mt-1 text-lg font-semibold text-slate-900'>Décharge sauvage à la sortie de la commune</h3>
        </div>
        <span className='rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700'>Urgent</span>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
          <div className='mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700'>
            <MessageSquare size={16} className='text-teal-600' />
            Description
          </div>
          <p className='text-sm text-slate-600'>Accumulation de déchets depuis plusieurs jours, risque sanitaire pour les habitants.</p>
        </div>

        <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
          <div className='mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700'>
            <MapPin size={16} className='text-teal-600' />
            Localisation
          </div>
          <p className='text-sm text-slate-600'>Quartier Makala • Coordonnées approximatives disponibles</p>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <div className='rounded-2xl border border-slate-200 p-4'>
          <div className='mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700'>
            <UserRound size={16} className='text-teal-600' />
            Déclarant
          </div>
          <p className='text-sm text-slate-600'>Citoyen anonyme</p>
        </div>

        <div className='rounded-2xl border border-slate-200 p-4'>
          <div className='mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700'>
            <Clock3 size={16} className='text-teal-600' />
            Dernière mise à jour
          </div>
          <p className='text-sm text-slate-600'>Il y a 2 heures</p>
        </div>
      </div>
    </div>
  );
}
