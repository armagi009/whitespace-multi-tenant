import React, { useState } from 'react';
import { Check, Zap, Building2, Globe } from 'lucide-react';
import { useStripeSession } from '../hooks/useStripeSession';

const PLANS = [
    {
        id: 'price_free',
        name: 'FREE',
        price: '$0',
        period: '/mo',
        seats: '3 seats',
        storage: '0.5 GB',
        support: 'Community support',
        color: 'slate',
        icon: <Globe className="text-slate-500" />
    },
    {
        id: 'price_starter',
        name: 'STARTER',
        price: '$29',
        period: '/mo',
        seats: '10 seats',
        storage: '10 GB',
        support: 'Email support',
        color: 'blue',
        popular: true,
        icon: <Zap className="text-blue-500" />
    },
    {
        id: 'price_enterprise',
        name: 'ENTERPRISE',
        price: 'Custom',
        period: '',
        seats: 'Unlimited',
        storage: 'Unlimited',
        support: 'Slack + SOC-2 letter',
        color: 'purple',
        icon: <Building2 className="text-purple-500" />
    }
];

export const Pricing: React.FC = () => {
    const { createCheckoutSession } = useStripeSession();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const handleSubscribe = async (planId: string) => {
        setLoadingPlan(planId);
        await createCheckoutSession(planId);
        setLoadingPlan(null);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto mb-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose your plan</h1>
                <p className="text-slate-500 text-lg">Unlock the full power of the Universal Opportunity Scanner.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PLANS.map((plan) => (
                    <div 
                        key={plan.id} 
                        className={`relative bg-white rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex flex-col
                            ${plan.popular ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'}
                        `}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                Most Popular
                            </div>
                        )}

                        <div className="p-8 flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg bg-${plan.color}-50`}>
                                    {plan.icon}
                                </div>
                                <h3 className={`text-lg font-bold text-${plan.color}-900`}>{plan.name}</h3>
                            </div>

                            <div className="flex items-baseline mb-6">
                                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                                <span className="text-slate-500 ml-1">{plan.period}</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-600 text-sm">
                                    <Check size={16} className="text-emerald-500 shrink-0" />
                                    {plan.seats}
                                </li>
                                <li className="flex items-center gap-3 text-slate-600 text-sm">
                                    <Check size={16} className="text-emerald-500 shrink-0" />
                                    {plan.storage} storage
                                </li>
                                <li className="flex items-center gap-3 text-slate-600 text-sm">
                                    <Check size={16} className="text-emerald-500 shrink-0" />
                                    {plan.support}
                                </li>
                            </ul>
                        </div>

                        <div className="p-8 pt-0 mt-auto">
                            <button
                                onClick={() => handleSubscribe(plan.id)}
                                disabled={!!loadingPlan}
                                className={`w-full py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2
                                    ${plan.popular 
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                        : 'bg-slate-900 hover:bg-slate-800 text-white'}
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                `}
                            >
                                {loadingPlan === plan.id ? 'Processing...' : 'Start 14-day trial'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};