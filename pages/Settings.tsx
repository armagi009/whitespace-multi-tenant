import React from 'react';
import { useMockAuth } from '../hooks/useMockAuth';

export const Settings: React.FC = () => {
    const { user } = useMockAuth();
    
    return (
        <div className="p-8 max-w-2xl mx-auto">
             <h1 className="text-3xl font-bold text-slate-900 mb-8">Settings</h1>
             
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2 mb-4">Profile Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm text-slate-500 mb-1">Full Name</label>
                            <input disabled value={user?.name} className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-slate-700" />
                        </div>
                         <div>
                            <label className="block text-sm text-slate-500 mb-1">Email</label>
                            <input disabled value={user?.email} className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-slate-700" />
                        </div>
                    </div>
                </div>

                <div>
                     <h3 className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2 mb-4">Notification Preferences</h3>
                     <div className="space-y-3">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 rounded border-slate-300" />
                            <span className="text-slate-700">Email me about new High Impact opportunities</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-slate-300" />
                            <span className="text-slate-700">Weekly digest summary</span>
                        </label>
                     </div>
                </div>
                
                <div className="pt-4">
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        Save Changes
                    </button>
                </div>
             </div>
        </div>
    );
};