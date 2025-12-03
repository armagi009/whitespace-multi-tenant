import React from 'react';
import { User } from '../types';
import { PlanBadge } from './PlanBadge';

interface FooterInfoProps {
  user: User | null;
}

export const FooterInfo: React.FC<FooterInfoProps> = ({ user }) => {
  if (!user) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-slate-400 text-xs py-1 px-4 flex justify-between items-center z-50 border-t border-slate-700">
        <div className="flex items-center gap-4">
            <span>Logged in as: <span className="text-slate-200">{user.email}</span></span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline">Role: <span className="text-primary-400">{user.role}</span></span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline flex items-center gap-2">
                Tenant: <span className="text-emerald-400 mr-1">{user.tenantSlug}</span>
                <PlanBadge tenantSlug={user.tenantSlug} />
            </span>
        </div>
        <div className="hidden md:block opacity-60">
            GDPR / SOC-2 Compliant Data Handling
        </div>
    </div>
  );
};