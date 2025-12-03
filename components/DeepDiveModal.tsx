import React, { useState, useEffect } from 'react';
import { Opportunity, SourceReliability, OpportunityTrend } from '../types';
import { X, Sparkles, ExternalLink, Bookmark, TrendingUp, TrendingDown, Minus, ShieldCheck } from 'lucide-react';
import { generateOpportunityBrief } from '../services/geminiService';
import { useMockAuth } from '../hooks/useMockAuth';

interface DeepDiveModalProps {
    opportunity: Opportunity;
    onClose: () => void;
}

export const DeepDiveModal: React.FC<DeepDiveModalProps> = ({ opportunity, onClose }) => {
    const { user, toggleBookmark } = useMockAuth();
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
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-200">

                {/* Modal Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
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

                {/* Modal Content */}
                <div className="p-6 space-y-6">

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

                    {/* AI Section */}
                    <div className="border-t border-slate-200 pt-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                    <Sparkles size={18} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Strategic Deep Dive</h3>
                            </div>

                            {!brief && (
                                <button
                                    onClick={handleGenerateBrief}
                                    disabled={isGeneratingBrief}
                                    className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                                >
                                    {isGeneratingBrief ? 'Analyzing...' : 'Generate Briefing'}
                                </button>
                            )}
                        </div>

                        {isGeneratingBrief && (
                            <div className="p-12 text-center">
                                <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
                                <p className="text-slate-500 font-medium">Consulting the oracle...</p>
                            </div>
                        )}

                        {brief && (
                            <div className="prose prose-slate max-w-none bg-white p-1 rounded-xl text-slate-800">
                                <div dangerouslySetInnerHTML={{
                                    __html: brief
                                        .replace(/\n/g, '<br/>')
                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900">$1</strong>')
                                        .replace(/# (.*?)(<br\/>|$)/g, '<h1 class="text-xl font-bold mb-4 text-slate-900">$1</h1>')
                                        .replace(/## (.*?)(<br\/>|$)/g, '<h2 class="text-lg font-bold mt-6 mb-3 text-primary-700">$1</h2>')
                                        .replace(/^\d\.\s/gm, '<span class="inline-block w-6 font-bold text-slate-400">➤</span>')
                                }} />
                            </div>
                        )}
                    </div>

                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-between items-center">
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