import React, { useState, useEffect } from 'react';
import { useMockAuth } from '../hooks/useMockAuth';
import { mockDb } from '../services/mockDb';
import { Opportunity, SavedOpportunity } from '../types';
import { Bookmark, MessageSquare, Target, Save, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DeepDiveModal } from '../components/DeepDiveModal';

export const Workspace: React.FC = () => {
    const { user, toggleBookmark } = useMockAuth();
    const [savedOpps, setSavedOpps] = useState<(Opportunity & { savedData: SavedOpportunity })[]>([]);
    const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
    
    // State for managing edits
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editNote, setEditNote] = useState('');
    const [editScore, setEditScore] = useState(50);

    useEffect(() => {
        if (!user) return;
        
        const allOpps = mockDb.getOpportunities();
        
        // Map savedItems to actual Opportunity objects
        const items = user.savedItems
            .map(saved => {
                const opp = allOpps.find(o => o.id === saved.oppId);
                if (!opp) return null;
                return { ...opp, savedData: saved };
            })
            .filter((item): item is (Opportunity & { savedData: SavedOpportunity }) => item !== null);
            
        setSavedOpps(items);
    }, [user, user?.bookmarks]); // Re-run when bookmarks change

    const startEditing = (e: React.MouseEvent, item: Opportunity & { savedData: SavedOpportunity }) => {
        e.stopPropagation();
        setEditingId(item.id);
        setEditNote(item.savedData.note);
        setEditScore(item.savedData.personalConfidence);
    };

    const saveChanges = (e: React.MouseEvent, oppId: string) => {
        e.stopPropagation();
        if (!user) return;
        mockDb.updateSavedItem(user.id, oppId, {
            note: editNote,
            personalConfidence: editScore
        });
        setEditingId(null);
        // Local update
        setSavedOpps(prev => prev.map(o => {
            if (o.id === oppId) {
                return { ...o, savedData: { ...o.savedData, note: editNote, personalConfidence: editScore } };
            }
            return o;
        }));
    };

    const removeSavedItem = (e: React.MouseEvent, oppId: string) => {
        e.stopPropagation();
        toggleBookmark(oppId);
        // Local update
        setSavedOpps(prev => prev.filter(o => o.id !== oppId));
    };

    const getWeightedScore = (systemScore: number, personalScore: number) => {
        return Math.round((systemScore + personalScore) / 2);
    };

    if (savedOpps.length === 0) {
        return (
            <div className="p-8 max-w-5xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Analyst Workspace</h1>
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-16">
                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Bookmark size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Workspace is empty</h2>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                        Go to the Dashboard to bookmark opportunities. Your saved items will appear here for deep analysis and scoring.
                    </p>
                    <Link to="/dashboard" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors">
                        Browse Opportunities
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto mb-20">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Analyst Workspace</h1>
                <p className="text-slate-500">Review, annotate, and prioritize your selected opportunities.</p>
            </div>

            <div className="space-y-6">
                {savedOpps.map((item) => (
                    <div 
                        key={item.id} 
                        onClick={() => setSelectedOpp(item)}
                        className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row overflow-hidden group"
                    >
                        {/* Left: Opportunity Summary */}
                        <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-slate-100 relative">
                             <div className="flex items-start justify-between mb-3">
                                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.vertical}</span>
                                 <div className="flex gap-2">
                                     <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{item.opportunityType}</span>
                                 </div>
                             </div>
                             <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                             <p className="text-sm text-slate-600 italic mb-4 border-l-2 border-slate-200 pl-3">"{item.evidenceSnippet}"</p>
                             <div className="flex items-center gap-4 text-xs text-slate-500">
                                 <span className="flex items-center gap-1"><ExternalLink size={12} /> {item.source}</span>
                                 <span>{item.dateDetected}</span>
                             </div>
                        </div>

                        {/* Right: Analyst Tools */}
                        <div className="p-6 w-full md:w-[450px] bg-slate-50/50 flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
                            {editingId === item.id ? (
                                <div className="space-y-4 animate-in fade-in duration-200">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Analyst Note</label>
                                        <textarea 
                                            value={editNote}
                                            onChange={(e) => setEditNote(e.target.value)}
                                            className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none h-24 resize-none"
                                            placeholder="Add strategic context..."
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                            <span>Personal Confidence</span>
                                            <span className="text-primary-600">{editScore}%</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="100" 
                                            value={editScore} 
                                            onChange={(e) => setEditScore(parseInt(e.target.value))}
                                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <button 
                                            onClick={(e) => saveChanges(e, item.id)}
                                            className="flex-1 bg-slate-900 text-white text-xs font-bold py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Save size={14} /> Save
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setEditingId(null); }}
                                            className="px-3 py-2 text-slate-500 hover:text-slate-700 text-xs font-bold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col">
                                    <div className="mb-4">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                                            <MessageSquare size={14} /> Strategic Note
                                        </h4>
                                        {item.savedData.note ? (
                                            <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                                                {item.savedData.note}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-slate-400 italic">No notes added.</p>
                                        )}
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-slate-200 flex items-end justify-between">
                                        <div className="flex items-center gap-4">
                                             <div className="text-center">
                                                 <span className="block text-[10px] uppercase text-slate-400 font-bold">System</span>
                                                 <span className="text-lg font-bold text-slate-500">{item.impactScore}</span>
                                             </div>
                                             <div className="text-center">
                                                 <span className="block text-[10px] uppercase text-slate-400 font-bold">You</span>
                                                 <span className="text-lg font-bold text-primary-600">{item.savedData.personalConfidence}</span>
                                             </div>
                                             <div className="h-8 w-px bg-slate-300 mx-1"></div>
                                             <div className="text-center">
                                                 <span className="block text-[10px] uppercase text-slate-400 font-bold">Weighted</span>
                                                 <span className="text-xl font-extrabold text-slate-900">
                                                    {getWeightedScore(item.impactScore, item.savedData.personalConfidence)}
                                                 </span>
                                             </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button 
                                                onClick={(e) => startEditing(e, item)}
                                                className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                title="Edit Note"
                                            >
                                                <Target size={18} />
                                            </button>
                                            <button 
                                                onClick={(e) => removeSavedItem(e, item.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Remove from Workspace"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {selectedOpp && (
                <DeepDiveModal 
                    opportunity={selectedOpp} 
                    onClose={() => setSelectedOpp(null)} 
                />
            )}
        </div>
    );
};