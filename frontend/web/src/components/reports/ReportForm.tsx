import { X, MapPin, AlertTriangle, Trash2, Wrench } from 'lucide-react';
import { useState } from 'react';
import { api } from '../../services/api';

interface ReportFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReportForm({ onClose, onSuccess }: ReportFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    type: string;
    description: string;
    location: string;
    commune: string;
    photoUrl: string;
  }>({
    type: 'AUTRE',
    description: '',
    location: '',
    commune: '',
    photoUrl: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (base64.length > 2_000_000) {
        alert('Image trop grande. Choisissez une image de moins de 1,5 Mo.');
        return;
      }
      setFormData({ ...formData, photoUrl: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create proper JSON string to avoid any encoding issues
      const reportData = {
        type: formData.type,
        description: formData.description,
        commune: formData.commune,
        latitude: 0.0,
        longitude: 0.0,
        citizenId: 1,
        photoUrl: formData.photoUrl || undefined
      };
      
      console.log('Sending report data:', JSON.stringify(reportData));
      const response = await api.post('/api/citizen', reportData);
      console.log('Report created:', response.data);
      alert('Signalement créé avec succès');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating report:', error);
      alert('Erreur lors de la création du signalement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Nouveau Signalement</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Type d'incident</label>
            <select
              className="input"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            >
              <option value="AUTRE">Autre</option>
              <option value="DECHET">Déchets / Propreté</option>
              <option value="ROUTE">Problème routier</option>
              <option value="INONDATION">Inondation</option>
              <option value="ECLAIRAGE">Éclairage</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              className="input min-h-[100px]"
              placeholder="Décrivez l'incident en détail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Localisation</label>
            <input
              className="input"
              placeholder="Adresse ou repère"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Commune</label>
            <select
              className="input"
              value={formData.commune}
              onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
              required
            >
              <option value="">Sélectionnez la commune</option>
              <option value="Bandalungwa">Bandalungwa</option>
              <option value="Barumbu">Barumbu</option>
              <option value="Bumbu">Bumbu</option>
              <option value="Gombe">Gombe</option>
              <option value="Kalamu">Kalamu</option>
              <option value="Kasa-Vubu">Kasa-Vubu</option>
              <option value="Kimbanseke">Kimbanseke</option>
              <option value="Kinshasa">Kinshasa</option>
              <option value="Kintambo">Kintambo</option>
              <option value="Kisenso">Kisenso</option>
              <option value="Lemba">Lemba</option>
              <option value="Limete">Limete</option>
              <option value="Lingwala">Lingwala</option>
              <option value="Makala">Makala</option>
              <option value="Maluku">Maluku</option>
              <option value="Masina">Masina</option>
              <option value="Matete">Matete</option>
              <option value="Mont-Ngafula">Mont-Ngafula</option>
              <option value="N'Djili">N'Djili</option>
              <option value="Ngaba">Ngaba</option>
              <option value="Ngaliema">Ngaliema</option>
              <option value="Ngiri-Ngiri">Ngiri-Ngiri</option>
              <option value="Nsele">Nsele</option>
              <option value="Selembao">Selembao</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Photo du signalement</label>
            <input
              className="input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formData.photoUrl && (
              <img
                src={formData.photoUrl}
                alt="Aperçu"
                className="mt-2 h-32 w-auto rounded-lg border border-slate-200 object-cover"
              />
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn flex-1 border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn flex-1 bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? 'Envoi...' : 'Envoyer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}