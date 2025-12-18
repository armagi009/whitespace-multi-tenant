import React, { useState } from 'react';
import { useMockAuth } from '../hooks/useMockAuth';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole } from '../types';
import { PieChart, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@fintech.com');
  const [password, setPassword] = useState('pass!1Q');
  const [error, setError] = useState('');
  const { login } = useMockAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Hint for demo
    if(email === 'platform@saas.local' && password !== 'pa1234') {
        setError('Invalid credentials. (Hint: Platform Admin pass is "pa1234")');
        return;
    }

    const success = await login(email, password);
    if (success) {
      // Determine redirect based on logic inside App.tsx or implicit role
      // But for better UX, let's look at the stored user immediately or rely on App's useEffect
      // However, App.tsx handles the routing logic based on user state change.
      // We just need to wait for state update? 
      // Actually, since login sets state, App component will re-render and redirect.
      // But we can manually push to trigger faster feedback if needed.
    } else {
      setError('Invalid credentials. Try "admin@smartutilities.com" or "platform@saas.local"');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="flex flex-col items-center mb-8">
            <div className="mb-4">
                <img src="/logo-square.png" alt="WhiteSpace Logo" className="w-16 h-16" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-slate-500">Sign in to WhiteSpace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
            Don't have an account? <Link to="/signup" className="text-primary-600 font-semibold hover:underline">Start Free Trial</Link>
        </div>
        
        <div className="hidden mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 text-center">
            <p className="mb-1">Demo Credentials:</p>
            <div className="grid grid-cols-2 gap-2 text-left">
                <div><span className="font-bold">Platform:</span> platform@saas.local</div>
                <div>Pass: pa1234</div>
                <div><span className="font-bold">Tenant:</span> admin@smartutilities.com</div>
                <div>Pass: (any)</div>
            </div>
        </div>
      </div>
    </div>
  );
};