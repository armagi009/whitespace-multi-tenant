import React, { useState } from 'react';
import { CoPilotPanel } from './CoPilotPanel';
import { MessageCircle, X, Maximize2, Minimize2 } from 'lucide-react';
import { User } from '../types';

interface GlobalCoPilotProps {
    user: User;
}

export const GlobalCoPilot: React.FC<GlobalCoPilotProps> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            {/* FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-12 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${
                    isOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-r from-purple-600 to-indigo-600'
                } text-white`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div 
                    className={`fixed z-40 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ${
                        isExpanded 
                        ? 'bottom-24 right-6 w-[90vw] md:w-[600px] h-[80vh]' 
                        : 'bottom-24 right-6 w-[90vw] md:w-[400px] h-[500px]'
                    }`}
                >
                    {/* Header */}
                    <div className="bg-slate-900 text-white p-4 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                             <span className="font-bold">Strategy Assistant</span>
                        </div>
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                        </button>
                    </div>

                    {/* Chat Panel */}
                    <div className="flex-1 overflow-hidden">
                        <CoPilotPanel 
                             context={`
                                You are a Global Strategy Assistant for a user named ${user.name}.
                                Their role is: ${user.role}.
                                Their Tenant is: ${user.tenantSlug}.
                                
                                You have access to general market data in FinTech, MedTech, and GovTech.
                                You are helpful, concise, and professional.
                                
                                If they ask about specific opportunities, guide them to use the "Opportunity Co-pilot" inside the Deep Dive modal.
                                Focus on high-level trends, market definitions, and general strategy advice.
                            `}
                            initialMessage={`Hello ${user.name.split(' ')[0]}. I'm ready to discuss market trends or help refine your search strategy. What are you looking for today?`}
                            placeholder="Ask about market trends..."
                        />
                    </div>
                </div>
            )}
        </>
    );
};