import React, { useState, useEffect } from 'react';
import { Opportunity, SourceReliability, OpportunityTrend } from '../types';
import { X, Sparkles, ExternalLink, Bookmark, TrendingUp, TrendingDown, Minus, ShieldCheck, FileText, MessageCircle } from 'lucide-react';
import { generateOpportunityBrief } from '../services/geminiService';
import { useMockAuth } from '../hooks/useMockAuth';
import { CoPilotPanel } from './CoPilotPanel';

interface DeepDiveModalProps {
    opportunity: Opportunity;
    onClose: () => void;
}

export const DeepDiveModal: React.FC<DeepDiveModalProps> = ({ opportunity, onClose }) => {
    const { user, toggleBookmark } = useMockAuth();
    const [activeTab, setActiveTab] = useState<'brief' | 'copilot'>('brief');
    const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
    const [brief, setBrief] = useState<string>('');

    const getImpactColor = (score: number) => {
        if (score >= 80) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        if (score >= 50) return 'bg-amber-100 text-amber-700 border-amber-200';
        return 'bg-slate-100 text-slate-700 border-slate-200';
    };

    const getTrendIcon = (trend: OpportunityTrend) => {
        switch (trend) {
            case OpportunityTrend.ACCELERATING: return <TrendingUp className="text-emerald-500" size={18} />;
            case OpportunityTrend.COOLING: return <TrendingDown className="text-rose-500" size={18} />;
            default: return <Minus className="text-slate-400" size={18} />;
        }
    };

    const handleGenerateBrief = async () => {
        setIsGeneratingBrief(true);
        const result = await generateOpportunityBrief(opportunity);
        setBrief(result);
        setIsGeneratingBrief(false);
    };

    const isBookmarked = (oppId: string) => user?.bookmarks.includes(oppId);

    const handleBookmarkClick = (e: React.MouseEvent, oppId: string) => {
        e.stopPropagation();
        toggleBookmark(oppId);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">

                {/* Modal Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-white z-10 shrink-0">
                    <div className="flex-1 pr-8">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-bold text-slate-400 tracking-wider uppercase">{opportunity.vertical}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getImpactColor(opportunity.impactScore)}`}>
                                Score: {opportunity.impactScore}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">
                                {opportunity.opportunityType}
                            </span>
                             {opportunity.status === 'Staging' && (
                                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded font-bold border border-amber-200">
                                    STAGING
                                </span>
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">{opportunity.title}</h2>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 bg-slate-50 shrink-0 px-6">
                    <button 
                        onClick={() => setActiveTab('brief')}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === 'brief' 
                            ? 'border-slate-900 text-slate-900' 
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <FileText size={16} /> Briefing
                    </button>
                    <button 
                         onClick={() => setActiveTab('copilot')}
                         className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === 'copilot' 
                            ? 'border-purple-600 text-purple-700' 
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <Sparkles size={16} /> Opportunity Co-pilot
                    </button>
                </div>

                {/* Modal Content - Scrollable Area */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    
                    {/* BRIEF TAB */}
                    {activeTab === 'brief' && (
                        <div className="overflow-y-auto p-6 space-y-6">
                             {/* Primary Data Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Horizon</h4>
                                    <p className="font-medium text-slate-900 text-sm">{opportunity.timeHorizon}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Geography</h4>
                                    <p className="font-medium text-slate-900 text-sm">{opportunity.geography}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Trend</h4>
                                    <div className="flex items-center gap-2">
                                        {getTrendIcon(opportunity.trend)}
                                        <span className="font-medium text-slate-900 text-sm">{opportunity.trend}</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Reliability</h4>
                                    <p className={`font-medium text-sm ${opportunity.sourceReliability === SourceReliability.HIGH ? 'text-emerald-600' : 'text-slate-700'
                                        }`}>
                                        {opportunity.sourceReliability}
                                    </p>
                                </div>
                            </div>

                            {/* Context & Evidence - Enhanced with Details */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Context & Evidence</h3>
                                <p className="text-slate-700 leading-relaxed mb-4 p-4 bg-slate-50/50 border-l-4 border-primary-200 rounded-r-lg italic">
                                    "{opportunity.description || opportunity.evidenceSnippet}"
                                </p>
                                <div className="flex items-center gap-2 text-sm text-primary-600 hover:underline cursor-pointer">
                                    <ExternalLink size={14} />
                                    Source: {opportunity.source}
                                </div>
                            </div>

                            {/* Detailed Analysis Section - Show prominently if available */}
                            {opportunity.details && (
                                <div className="border-t border-slate-200 pt-6 space-y-6">
                                    {/* Why It Matters */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Why It Matters</h3>
                                        <p className="text-slate-700 leading-relaxed">{opportunity.details.whyItMatters}</p>
                                    </div>

                                    {/* Evidence Highlights */}
                                    {opportunity.details.evidenceHighlights && opportunity.details.evidenceHighlights.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Evidence Highlights</h3>
                                            <ul className="space-y-2">
                                                {opportunity.details.evidenceHighlights.map((highlight, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-slate-700">
                                                        <span className="text-slate-400 mt-1">•</span>
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Money Trail */}
                                    {opportunity.details.moneyTrail && (
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Money Trail</h3>
                                            <p className="text-slate-700 leading-relaxed bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-200">
                                                {opportunity.details.moneyTrail}
                                            </p>
                                        </div>
                                    )}

                                    {/* Key Players */}
                                    {opportunity.details.keyPlayers && opportunity.details.keyPlayers.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Key Players</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {opportunity.details.keyPlayers.map((player, index) => (
                                                    <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                                                        {player}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Risk Flags */}
                                    {opportunity.details.riskFlags && opportunity.details.riskFlags.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Risk Flags</h3>
                                            <div className="space-y-2">
                                                {opportunity.details.riskFlags.map((risk, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-amber-700">
                                                        <span className="text-amber-500 mt-1">⚠</span>
                                                        <span>{risk}</span>
                                                    </li>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Curation Status */}
                                    {opportunity.curation && (
                                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Curation Status</h3>
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                    opportunity.curation.status === 'Published' ? 'bg-emerald-100 text-emerald-700' :
                                                    opportunity.curation.status === 'Under Review' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-slate-100 text-slate-700'
                                                }`}>
                                                    {opportunity.curation.status}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-600">Confidence: <span className="font-bold text-slate-900">{opportunity.curation.confidence}%</span></span>
                                                {opportunity.curation.humanReviewer && (
                                                    <span className="text-slate-600">Reviewed by: <span className="font-bold text-slate-900">{opportunity.curation.humanReviewer}</span></span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* CO-PILOT TAB */}
                    {activeTab === 'copilot' && (
                        <div className="flex-1 p-4 bg-slate-50 h-full overflow-hidden">
                            <CoPilotPanel 
                                context={`
                                    You are a strategic co-pilot for a business analyst.
                                    You are discussing a specific opportunity:
                                    Title: ${opportunity.title}
                                    Description: ${opportunity.description || opportunity.evidenceSnippet}
                                    Vertical: ${opportunity.vertical}
                                    Trend: ${opportunity.trend}
                                    
                                    Your goal is to help the user extend this idea. 
                                    Suggest execution strategies, identify potential blockers, competitor angles, or pivot ideas.
                                    Be concise, professional, and outcome-oriented.
                                `}
                                initialMessage={`I've analyzed **${opportunity.title}**. I can help you draft a pitch, identify competitors, or brainstorm go-to-market strategies. What's on your mind?`}
                                placeholder="e.g. Draft a cold email to a potential partner..."
                            />
                        </div>
                    )}

                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-100 bg-white rounded-b-2xl flex justify-between items-center shrink-0 z-10">
                    <button
                        onClick={(e) => handleBookmarkClick(e, opportunity.id)}
                        className={`px-4 py-2 font-medium rounded-lg transition-colors flex items-center gap-2 border ${isBookmarked(opportunity.id)
                                ? 'bg-blue-50 text-blue-600 border-blue-200'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                    >
                        <Bookmark size={18} fill={isBookmarked(opportunity.id) ? "currentColor" : "none"} />
                        {isBookmarked(opportunity.id) ? 'Saved' : 'Save to Workspace'}
                    </button>

                    <div className="flex gap-3">
                        <button className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">
                            Export PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};