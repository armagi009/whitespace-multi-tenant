import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useMockAuth } from '../../hooks/useMockAuth';
import { mockDb } from '../../services/mockDb';

export const StripeSuccess: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useMockAuth();
    const [status, setStatus] = useState<'loading' | 'success'>('loading');

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const priceId = query.get('priceId');
        
        if (user && priceId) {
            // Log the subscription creation
            mockDb.createAuditLog(
                user.id,
                user.tenantSlug,
                'subscription_created',
                { priceId, source: 'stripe_checkout' }
            );
            setStatus('success');
            
            // Auto redirect after delay
            const timer = setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            // Fallback if accessed directly without proper params
            navigate('/dashboard');
        }
    }, [user, location, navigate]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Subscription Confirmed!</h1>
                <p className="text-slate-500 mb-8">
                    Your trial has started successfully. Redirecting you to your dashboard...
                </p>
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="text-primary-600 font-semibold hover:text-primary-700 flex items-center justify-center gap-2 mx-auto"
                >
                    Go to Dashboard Now <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};