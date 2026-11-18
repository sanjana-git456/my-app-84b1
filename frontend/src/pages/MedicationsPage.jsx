import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { Pill, Plus, Trash2 } from 'lucide-react';

export default function MedicationsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['medications'],
    queryFn: () => api.get('/medications/').then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (newItem) => api.post('/medications/', newItem).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['medications'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/medications/${id}/`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['medications'] }),
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', dosage: '', frequency: '', next_dose: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createMutation.mutateAsync(form);
      setForm({ name: '', dosage: '', frequency: '', next_dose: '' });
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center"><Pill className="mr-2"/>Medications</h2>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
      >
        <Plus className="mr-2"/> {showForm ? 'Cancel' : 'Add Medication'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 space-y-3 max-w-md">
          {error && <p className="text-red-600">{error}</p>}
          <input
            name="name"
            placeholder="Medication name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full border rounded p-2"
          />
          <input
            name="dosage"
            placeholder="Dosage (e.g., 10 mg)"
            value={form.dosage}
            onChange={(e) => setForm({ ...form, dosage: e.target.value })}
            required
            className="w-full border rounded p-2"
          />
          <input
            name="frequency"
            placeholder="Frequency (e.g., Twice a day)"
            value={form.frequency}
            onChange={(e) => setForm({ ...form, frequency: e.target.value })}
            required
            className="w-full border rounded p-2"
          />
          <input
            name="next_dose"
            type="datetime-local"
            value={form.next_dose}
            onChange={(e) => setForm({ ...form, next_dose: e.target.value })}
            required
            className="w-full border rounded p-2"
          />
          <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">Add</button>
        </form>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-600">Failed to load medications.</p>
      ) : (data?.length ? (
        <ul className="space-y-2">
          {data.map((item) => (
            <li key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.dosage} – {item.frequency}</p>
              </div>
              <button onClick={() => deleteMutation.mutate(item.id)} className="text-red-600 hover:text-red-800">
                <Trash2 />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No medications yet.</p>
      ))}
    </div>
  );
}
