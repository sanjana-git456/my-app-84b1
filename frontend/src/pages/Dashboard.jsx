import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { Calendar, Pill, HeartPulse, Users } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();

  const { data: appointments, isLoading: aLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => api.get('/appointments/').then((res) => res.data),
  });

  const { data: meds, isLoading: mLoading } = useQuery({
    queryKey: ['medications'],
    queryFn: () => api.get('/medications/').then((res) => res.data),
  });

  const { data: vitals, isLoading: vLoading } = useQuery({
    queryKey: ['vitals'],
    queryFn: () => api.get('/vitals/').then((res) => res.data),
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <nav className="w-64 bg-white p-4 shadow-lg flex flex-col">
        <h1 className="text-xl font-bold mb-6 text-indigo-800">SeniorConnect</h1>
        <Link to="/dashboard" className="mb-2 text-indigo-600 hover:underline">Dashboard</Link>
        <Link to="/appointments" className="mb-2 text-indigo-600 hover:underline">Appointments</Link>
        <Link to="/medications" className="mb-2 text-indigo-600 hover:underline">Medications</Link>
        <Link to="/vitals" className="mb-2 text-indigo-600 hover:underline">Vitals</Link>
        <button onClick={logout} className="mt-auto text-red-600 hover:underline">Logout</button>
      </nav>
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome, {user?.username}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow flex items-center">
            <Calendar className="w-8 h-8 text-indigo-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Upcoming Appointments</p>
              <p className="text-lg font-medium">
                {aLoading ? '...' : (appointments?.length || 0)}
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow flex items-center">
            <Pill className="w-8 h-8 text-emerald-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Medications</p>
              <p className="text-lg font-medium">
                {mLoading ? '...' : (meds?.length || 0)}
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow flex items-center">
            <HeartPulse className="w-8 h-8 text-rose-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Recent Vitals</p>
              <p className="text-lg font-medium">
                {vLoading ? '...' : (vitals?.length || 0)}
              </p>
            </div>
          </div>
        </div>
        <p className="text-gray-600">Select a section from the menu to manage data.</p>
      </main>
    </div>
  );
}
