import React from 'react';
import { mockDb } from '../services/mockDb';

interface PlanBadgeProps {
  tenantSlug: string;
}

export const PlanBadge: React.FC<PlanBadgeProps> = ({ tenantSlug }) => {
  const tenants = mockDb.getTenants();
  const tenant = tenants.find(t => t.slug === tenantSlug);
  
  if (!tenant) return null;

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Growth': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Starter': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getPlanColor(tenant.plan)}`}>
      {tenant.plan}
    </span>
  );
};