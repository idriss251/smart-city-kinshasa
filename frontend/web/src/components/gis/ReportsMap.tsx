import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import L from 'leaflet';
import { Filter } from 'lucide-react';

delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Report {
  id: number;
  type: string;
  description: string;
  commune: string;
  latitude: number;
  longitude: number;
  status: string;
  photoUrl?: string;
}

const KINSHASA_CENTER: [number, number] = [-4.325, 15.322];

function FlyToKinshasa() {
  const map = useMap();
  useEffect(() => {
    map.setView(KINSHASA_CENTER, 12);
  }, [map]);
  return null;
}

const REPORT_TYPES = ['TOUS', 'AUTRE', 'DECHET', 'ROUTE', 'INONDATION', 'ECLAIRAGE', 'EAU', 'ELECTRICITE', 'SECURITE', 'SANTE', 'INCENDIE', 'TRANSPORT'];

export default function ReportsMap() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState('TOUS');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/citizen')
      .then((r) => setReports(r.data))
      .catch(() => setReports([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === 'TOUS' ? reports : reports.filter((r) => r.type === filter);

  return (
    <div className="h-full w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Carte des signalements</h2>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-500" />
          <select
            className="input py-1.5 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {REPORT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t === 'TOUS' ? 'Tous les types' : t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <div className="py-8 text-center text-slate-500">Chargement...</div>}

      <div className="h-96 rounded-2xl overflow-hidden">
        <MapContainer
          center={KINSHASA_CENTER}
          zoom={12}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyToKinshasa />
          {filtered.map((r) =>
            r.latitude && r.longitude ? (
              <Marker key={r.id} position={[r.latitude, r.longitude]}>
                <Popup>
                  <div className="space-y-1 min-w-[200px]">
                    <div className="font-semibold text-slate-900">{r.type}</div>
                    <div className="text-sm text-slate-600">{r.commune}</div>
                    <div className="text-sm text-slate-700">{r.description}</div>
                    <div className="text-xs text-slate-500">Statut: {r.status}</div>
                    {r.photoUrl && (
                      <img
                        src={r.photoUrl}
                        alt="Signalement"
                        className="mt-2 h-24 w-full rounded object-cover"
                      />
                    )}
                  </div>
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </div>
    </div>
  );
}
