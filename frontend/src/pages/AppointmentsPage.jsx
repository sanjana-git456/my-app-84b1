import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { Calendar, Plus, Edit, Trash2 } from 'lucide-react';

export default function AppointmentsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => api.get('/appointments/').then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (newItem) => api.post('/appointments/', newItem).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/appointments/${id}/`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', scheduled_at: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createMutation.mutateAsync(form);
      setForm({ title: '', description: '', scheduled_at: '' });
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center"><Calendar className="mr-2"/>Appointments</h2>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        <Plus className="mr-2"/> {showForm ? 'Cancel' : 'New Appointment'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 space-y-3 max-w-md">
          {error && <p className="text-red-600">{error}</p>}
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full border rounded p-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded p-2"
          />
          <input
            name="scheduled_at"
            type="datetime-local"
            value={form.scheduled_at}
            onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
            required
            className="w-full border rounded p-2"
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Create</button>
        </form>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-600">Failed to load appointments.</p>
      ) : (data?.length ? (
        <ul className="space-y-2">
          {data.map((item) => (
            <li key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">{new Date(item.scheduled_at).toLocaleString()}</p>
              </div>
              <div className="flex space-x-2">
                {/* Edit functionality could be added here */}
                <button onClick={() => deleteMutation.mutate(item.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments yet.</p>
      ))}
    </div>
  );
}
