import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '../types';
import { LayoutDashboard, Users, CreditCard, Settings, ShieldCheck, PieChart, LogOut, Menu, X, Database, Briefcase } from 'lucide-react';

interface RoleBasedNavProps {
  role: UserRole;
  onLogout: () => void;
  tenantSlug?: string;
}

export const RoleBasedNav: React.FC<RoleBasedNavProps> = ({ role, onLogout, tenantSlug }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const getNavItems = () => {
    switch (role) {
      case UserRole.PLATFORM_ADMIN:
        return [
          { label: 'Tenants', path: '/platform', icon: <Users size={20} /> },
          { label: 'Billing', path: '/pricing', icon: <CreditCard size={20} /> },
          { label: 'Audit', path: '/audit', icon: <ShieldCheck size={20} /> },
          { label: 'Settings', path: '/settings', icon: <Settings size={20} /> },
        ];
      case UserRole.TENANT_ADMIN:
        const adminItems = [
          { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
          { label: 'Workspace', path: '/workspace', icon: <Briefcase size={20} /> },
          { label: 'Data Sources', path: '/sources', icon: <Database size={20} /> },
          { label: 'Members', path: '/members', icon: <Users size={20} /> },
          { label: 'Billing', path: '/pricing', icon: <CreditCard size={20} /> },
          { label: 'Settings', path: '/settings', icon: <Settings size={20} /> },
        ];
        
        // Add NSoft-specific route for utilities tenant
        if (tenantSlug === 'nsoft-utilities') {
          adminItems.splice(1, 0, { label: 'NSoft Intelligence', path: '/nsoft', icon: <PieChart size={20} /> });
        }
        
        return adminItems;
      case UserRole.TENANT_USER:
        const userItems = [
          { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
          { label: 'Workspace', path: '/workspace', icon: <Briefcase size={20} /> },
          { label: 'Data Sources', path: '/sources', icon: <Database size={20} /> },
          { label: 'Settings', path: '/settings', icon: <Settings size={20} /> },
        ];
        
        // Add NSoft-specific route for utilities tenant
        if (tenantSlug === 'nsoft-utilities') {
          userItems.splice(1, 0, { label: 'NSoft Intelligence', path: '/nsoft', icon: <PieChart size={20} /> });
        }
        
        return userItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white">
        <div className="flex items-center gap-2 font-bold text-xl">
           <img src="/logo-square.png" alt="WhiteSpace Logo" className="w-12 h-12" />
           WhiteSpace
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center gap-2 font-bold text-2xl tracking-tight border-b border-slate-800">
            <img src="/logo-square.png" alt="WhiteSpace Logo" className="w-16 h-16" />
            <span>WhiteSpace</span>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/50'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-800">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};