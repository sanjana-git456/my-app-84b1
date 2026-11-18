import { Link } from 'react-router-dom';
import { Calendar, Pill, HeartPulse } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-200 p-4">
      <h1 className="text-4xl font-bold text-indigo-800 mb-4">SeniorConnect</h1>
      <p className="text-lg text-indigo-700 mb-8 text-center max-w-xl">
        Simple appointment scheduling, medication reminders and health monitoring for seniors and their caregivers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col items-center">
          <Calendar className="w-12 h-12 text-indigo-600" />
          <span className="mt-2 text-indigo-800">One‑click appointments</span>
        </div>
        <div className="flex flex-col items-center">
          <Pill className="w-12 h-12 text-indigo-600" />
          <span className="mt-2 text-indigo-800">Medication reminders</span>
        </div>
        <div className="flex flex-col items-center">
          <HeartPulse className="w-12 h-12 text-indigo-600" />
          <span className="mt-2 text-indigo-800">Live vitals dashboard</span>
        </div>
      </div>
      <div className="flex gap-4">
        <Link
          to="/register"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Get started
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
