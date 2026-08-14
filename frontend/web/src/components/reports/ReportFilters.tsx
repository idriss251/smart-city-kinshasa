import { Filter, Search } from 'lucide-react';

interface ReportFiltersProps {
  search: string;
  setSearch: (s: string) => void;
  status: string;
  setStatus: (s: string) => void;
}

export default function ReportFilters({ search, setSearch, status, setStatus }: ReportFiltersProps) {
  return (
    <div className='panel flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
      <div className='flex items-center gap-2 text-sm font-semibold text-slate-700'>
        <Filter size={16} className='text-teal-600' />
        Filtres rapides
      </div>

      <div className='flex flex-1 flex-col gap-3 lg:flex-row lg:justify-end'>
        <label className='flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 lg:w-80'>
          <Search size={16} />
          <input
            className='w-full border-none bg-transparent outline-none'
            placeholder='Rechercher un signalement'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <select
          className='rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value=''>Tous les statuts</option>
          <option value='EN_ATTENTE'>En attente</option>
          <option value='EN_COURS'>En cours</option>
          <option value='RESOLU'>Résolu</option>
          <option value='URGENT'>Urgent</option>
        </select>
      </div>
    </div>
  );
}
