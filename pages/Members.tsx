import React, { useState } from 'react';
import { useMockAuth } from '../hooks/useMockAuth';
import { mockDb } from '../services/mockDb';
import { UserRole } from '../types';
import { Plus, Trash2, Mail } from 'lucide-react';

export const Members: React.FC = () => {
  const { user } = useMockAuth();
  const [showInvite, setShowInvite] = useState(false);
  
  // In a real app, we'd query by tenantId. 
  // Here we filter the mock global list.
  const tenantUsers = mockDb.getUsers().filter(u => u.tenantSlug === user?.tenantSlug);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState(UserRole.TENANT_USER);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if(user && inviteEmail) {
        // Mock invitation - just create the user directly for demo
        mockDb.createUser(inviteEmail, user.tenantSlug, inviteRole);
        setShowInvite(false);
        setInviteEmail('');
        // Force refresh logic would go here in real app, React state update usually handles it
        window.location.reload(); 
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Team Members</h1>
            <p className="text-slate-500">Manage access for {user?.tenantSlug}</p>
        </div>
        <button 
            onClick={() => setShowInvite(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
            <Plus size={18} /> Invite Member
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">User</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Role</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tenantUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                            {u.name.substring(0,2).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-medium text-slate-900">{u.name}</p>
                            <p className="text-slate-500 text-xs">{u.email}</p>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 text-slate-500">
                    <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs">
                        {u.role}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                    {u.id !== user?.id && (
                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                        </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Invite Team Member</h2>
                <form onSubmit={handleInvite} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
                            <input 
                                type="email" 
                                required
                                value={inviteEmail}
                                onChange={e => setInviteEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                placeholder="colleague@company.com"
                            />
                        </div>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                         <select 
                            value={inviteRole}
                            onChange={e => setInviteRole(e.target.value as UserRole)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                         >
                             <option value={UserRole.TENANT_USER}>Tenant User</option>
                             <option value={UserRole.TENANT_ADMIN}>Tenant Admin</option>
                         </select>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button 
                            type="button" 
                            onClick={() => setShowInvite(false)}
                            className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700"
                        >
                            Send Invite
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};