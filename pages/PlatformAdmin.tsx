import React from 'react';
import { mockDb } from '../services/mockDb';
import { Building2, Users, TrendingUp } from 'lucide-react';

export const PlatformAdmin: React.FC = () => {
  const tenants = mockDb.getTenants();
  
  const totalMRR = tenants.reduce((acc, t) => acc + t.mrr, 0);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Platform Overview</h1>
        <p className="text-slate-500">Manage tenants and global metrics.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Building2 />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Total Tenants</p>
                    <p className="text-2xl font-bold text-slate-900">{tenants.length}</p>
                </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                    <TrendingUp />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Total MRR</p>
                    <p className="text-2xl font-bold text-slate-900">${totalMRR.toLocaleString()}</p>
                </div>
            </div>
        </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Users />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Total Users</p>
                    <p className="text-2xl font-bold text-slate-900">
                        {tenants.reduce((acc, t) => acc + t.userCount, 0)}
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Tenant Name</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Slug</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Plan</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Users</th>
              <th className="px-6 py-4 font-semibold text-slate-700">MRR</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tenants.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{t.name}</td>
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{t.slug}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                        t.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                        {t.plan}
                    </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{t.userCount}</td>
                <td className="px-6 py-4 text-slate-900 font-medium">${t.mrr.toLocaleString()}</td>
                <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Active
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};