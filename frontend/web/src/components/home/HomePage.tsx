import { ArrowRight, Building2, ClipboardList, MapPinned, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { title: 'Signalement citoyen', description: 'Déposez rapidement un incident depuis votre téléphone ou votre navigateur.' },
  { title: 'Gestion des déchets', description: 'Suivi des poubelles, zones sensibles et interventions prioritaires.' },
  { title: 'Routes et voirie', description: 'Identification des trous, dégâts et problèmes de circulation.' },
  { title: 'Inondations', description: 'Détection des zones à risque et coordination des interventions.' },
];

const stats = [
  { value: '24/7', label: 'Surveillance continue' },
  { value: '12+', label: 'Services urbains suivis' },
  { value: '95%', label: 'Taux de réponse ciblé' },
];

const impacts = [
  { title: 'Réduction des délais', text: 'Les équipes réagissent plus vite grâce à un suivi centralisé.' },
  { title: 'Meilleure transparence', text: 'Citoyens et services partagent la même visibilité sur l’état des interventions.' },
  { title: 'Ville plus sûre', text: 'Les zones critiques sont détectées plus tôt et mieux anticipées.' },
];

export default function HomePage() {
  return (
    <div className='space-y-6'>
      <section className='overflow-hidden rounded-[30px] border border-teal-100 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 p-8 text-white shadow-[0_20px_70px_rgba(15,23,42,0.18)]'>
        <div className='grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end'>
          <div className='max-w-2xl'>
            <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-teal-100'>
              <Sparkles size={16} />
              Smart City Kinshasa
            </div>
            <h2 className='text-3xl font-semibold sm:text-4xl'>Une plateforme moderne pour une ville plus intelligente, plus réactive et plus connectée.</h2>
            <p className='mt-4 text-base text-slate-300 sm:text-lg'>Cette solution centralise les services urbains, améliore la coordination des interventions et donne aux citoyens un moyen simple de contribuer à l’amélioration de leur environnement.</p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <Link to='/reports' className='inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2.5 font-semibold text-white transition hover:bg-teal-400'>
                Signaler un problème
                <ArrowRight size={16} />
              </Link>
              <Link to='/dashboard' className='rounded-full border border-white/20 bg-white/10 px-4 py-2.5 font-semibold text-white transition hover:bg-white/20'>
                Voir le tableau de bord
              </Link>
            </div>
          </div>

          <div className='rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur'>
            <div className='flex items-center gap-3'>
              <div className='rounded-2xl bg-teal-500/20 p-2 text-teal-200'>
                <Building2 size={18} />
              </div>
              <div>
                <div className='text-sm font-semibold'>Vision du projet</div>
                <div className='text-sm text-slate-300'>Transformer la gestion urbaine grâce à la data, la cartographie et l’intelligence collective.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_0.8fr]'>
        <div className='panel'>
          <div className='mb-4 flex items-center gap-2'>
            <ShieldCheck size={18} className='text-teal-600' />
            <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>Services disponibles</h3>
          </div>
          <div className='grid gap-3 md:grid-cols-2'>
            {services.map((service) => (
              <div key={service.title} className='rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70'>
                <div className='text-sm font-semibold text-slate-800 dark:text-slate-100'>{service.title}</div>
                <div className='mt-1 text-sm text-slate-600 dark:text-slate-400'>{service.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='panel'>
          <div className='mb-4 flex items-center gap-2'>
            <TrendingUp size={18} className='text-teal-600' />
            <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>Chiffres clés</h3>
          </div>
          <div className='space-y-3'>
            {stats.map((item) => (
              <div key={item.label} className='rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70'>
                <div className='text-2xl font-semibold text-slate-900 dark:text-slate-100'>{item.value}</div>
                <div className='text-sm text-slate-600 dark:text-slate-400'>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_1fr]'>
        <div className='panel'>
          <div className='mb-4 flex items-center gap-2'>
            <ClipboardList size={18} className='text-teal-600' />
            <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>Exemples d’impact</h3>
          </div>
          <div className='space-y-3'>
            {impacts.map((item) => (
              <div key={item.title} className='rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70'>
                <div className='text-sm font-semibold text-slate-800 dark:text-slate-100'>{item.title}</div>
                <div className='mt-1 text-sm text-slate-600 dark:text-slate-400'>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='panel'>
          <div className='mb-4 flex items-center gap-2'>
            <MapPinned size={18} className='text-teal-600' />
            <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>Témoignages ou retours d’usage</h3>
          </div>
          <div className='space-y-3'>
            <div className='rounded-2xl border border-teal-100 bg-teal-50 p-4 dark:border-teal-900/50 dark:bg-teal-950/40'>
              <div className='text-sm font-semibold text-slate-800 dark:text-slate-100'>“Une solution claire pour mieux servir la ville.”</div>
              <div className='mt-1 text-sm text-slate-600 dark:text-slate-400'>— Équipe de gestion urbaine</div>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70'>
              <div className='text-sm font-semibold text-slate-800 dark:text-slate-100'>“Le suivi est désormais plus rapide et plus visible.”</div>
              <div className='mt-1 text-sm text-slate-600 dark:text-slate-400'>— Agent de terrain</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
