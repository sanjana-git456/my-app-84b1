import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { HeartPulse } from 'lucide-react';

export default function VitalsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['vitals'],
    queryFn: () => api.get('/vitals/').then((res) => res.data),
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center"><HeartPulse className="mr-2"/>Vitals</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-600">Failed to load vitals.</p>
      ) : (data?.length ? (
        <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Value</th>
              <th className="px-4 py-2 text-left">Measured At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((v) => (
              <tr key={v.id} className="border-t">
                <td className="px-4 py-2">{v.type}</td>
                <td className="px-4 py-2">{v.value}</td>
                <td className="px-4 py-2">{new Date(v.measured_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No vitals recorded yet.</p>
      ))}
    </div>
  );
}
