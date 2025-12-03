import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useMockAuth } from './hooks/useMockAuth';
import { UserRole } from './types';
import { RoleBasedNav } from './components/RoleBasedNav';
import { FooterInfo } from './components/FooterInfo';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { PlatformAdmin } from './pages/PlatformAdmin';
import { Members } from './pages/Members';
import { Settings } from './pages/Settings';
import { Pricing } from './pages/Pricing';
import { StripeSuccess } from './pages/stripe/Success';
import { DataSources } from './pages/DataSources';
import { Workspace } from './pages/Workspace';
import { GlobalCoPilot } from './components/GlobalCoPilot';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ 
    children: React.ReactNode, 
    user: any, 
    requiredRole?: UserRole[],
    isLoading: boolean 
}> = ({ children, user, requiredRole, isLoading }) => {
    
    if (isLoading) return <div className="h-screen flex items-center justify-center text-slate-500">Loading WhiteSpace...</div>;
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && !requiredRole.includes(user.role)) {
        // Redirect to appropriate home if unauthorized for this specific route
        return <Navigate to={user.role === UserRole.PLATFORM_ADMIN ? "/platform" : "/dashboard"} replace />;
    }

    return <>{children}</>;
};

// Layout Wrapper
const AppLayout: React.FC<{ children: React.ReactNode, user: any, logout: () => void }> = ({ children, user, logout }) => {
    if(!user) return <>{children}</>;

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
            <RoleBasedNav role={user.role} onLogout={logout} />
            <div className="flex-1 flex flex-col min-h-screen relative">
                <main className="flex-1 overflow-auto pb-12">
                    {children}
                </main>
                <GlobalCoPilot user={user} />
                <FooterInfo user={user} />
            </div>
        </div>
    );
}

function AppContent() {
    const { user, isLoading, logout } = useMockAuth();
    
    return (
        <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === UserRole.PLATFORM_ADMIN ? "/platform" : "/dashboard"} />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
            
            <Route path="/platform" element={
                <ProtectedRoute user={user} isLoading={isLoading} requiredRole={[UserRole.PLATFORM_ADMIN]}>
                    <AppLayout user={user} logout={logout}>
                        <PlatformAdmin />
                    </AppLayout>
                </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
                <ProtectedRoute user={user} isLoading={isLoading} requiredRole={[UserRole.TENANT_ADMIN, UserRole.TENANT_USER]}>
                    <AppLayout user={user} logout={logout}>
                        <Dashboard />
                    </AppLayout>
                </ProtectedRoute>
            } />

             <Route path="/workspace" element={
                <ProtectedRoute user={user} isLoading={isLoading} requiredRole={[UserRole.TENANT_ADMIN, UserRole.TENANT_USER]}>
                     <AppLayout user={user} logout={logout}>
                        <Workspace />
                    </AppLayout>
                </ProtectedRoute>
            } />

            <Route path="/sources" element={
                <ProtectedRoute user={user} isLoading={isLoading} requiredRole={[UserRole.TENANT_ADMIN, UserRole.TENANT_USER]}>
                     <AppLayout user={user} logout={logout}>
                        <DataSources />
                    </AppLayout>
                </ProtectedRoute>
            } />

            <Route path="/members" element={
                <ProtectedRoute user={user} isLoading={isLoading} requiredRole={[UserRole.TENANT_ADMIN]}>
                     <AppLayout user={user} logout={logout}>
                        <Members />
                    </AppLayout>
                </ProtectedRoute>
            } />

            <Route path="/pricing" element={
                <ProtectedRoute user={user} isLoading={isLoading}>
                     <AppLayout user={user} logout={logout}>
                        <Pricing />
                    </AppLayout>
                </ProtectedRoute>
            } />
            
             <Route path="/stripe/success" element={
                <ProtectedRoute user={user} isLoading={isLoading}>
                     <AppLayout user={user} logout={logout}>
                        <StripeSuccess />
                    </AppLayout>
                </ProtectedRoute>
            } />

            <Route path="/settings" element={
                <ProtectedRoute user={user} isLoading={isLoading}>
                     <AppLayout user={user} logout={logout}>
                        <Settings />
                    </AppLayout>
                </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
        <HashRouter>
            <AppContent />
        </HashRouter>
    </AuthProvider>
  );
};

export default App;