import React, { useState } from 'react';
import { useMockAuth } from '../hooks/useMockAuth';
import { useNavigate, Link } from 'react-router-dom';
import { PieChart, CheckCircle2 } from 'lucide-react';

export const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const { signup } = useMockAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, company);
    // Auth hook updates state, App redirects
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
         <div className="flex flex-col items-center mb-8">
             <PieChart size={40} className="text-primary-600 mb-2" />
            <h1 className="text-2xl font-bold text-slate-900">Start your trial</h1>
            <p className="text-slate-500">Identify your next billion-dollar opportunity.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="Acme Strategy Corp"
              required
            />
          </div>

          <div className="space-y-2 py-2">
            {[
                'Access to FinTech, MedTech & GovTech feeds',
                'AI-powered opportunity deep dives',
                'Export to PowerPoint & Excel'
            ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="text-emerald-500" /> {feat}
                </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Create Workspace
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
            Already have a workspace? <Link to="/login" className="text-slate-900 font-semibold hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
};