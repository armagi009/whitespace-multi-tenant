import React, { useState, useEffect } from 'react';
import { mockDb } from '../services/mockDb';
import { Opportunity, OpportunityTrend, Vertical, OpportunityType, SourceReliability } from '../types';
import { TrendingUp, TrendingDown, Minus, Bookmark, Filter, MapPin, Calendar, Layers, ShieldCheck } from 'lucide-react';
import { useMockAuth } from '../hooks/useMockAuth';
import { DeepDiveModal } from '../components/DeepDiveModal';

export const Dashboard: React.FC = () => {
  const { user, toggleBookmark } = useMockAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  
  // Filters State
  const [selectedVertical, setSelectedVertical] = useState<Vertical | 'All'>('All');
  const [selectedHorizon, setSelectedHorizon] = useState<string | 'All'>('All');
  const [selectedType, setSelectedType] = useState<OpportunityType | 'All'>('All');
  const [selectedGeo, setSelectedGeo] = useState<string | 'All'>('All');
  const [minImpact, setMinImpact] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);

  useEffect(() => {
    // Fetch opportunities and auto-refresh occasionally for demo effects if needed
    // Only fetch 'Active' opportunities for the main dashboard
    const allOpps = mockDb.getOpportunities();
    setOpportunities(allOpps);
  }, []);

  const filteredOpps = opportunities.filter(o => {
    // Status Filter (Hard requirement for Dashboard)
    if (o.status !== 'Active') return false;

    if (selectedVertical !== 'All' && o.vertical !== selectedVertical) return false;
    if (selectedHorizon !== 'All' && o.timeHorizon !== selectedHorizon) return false;
    if (selectedType !== 'All' && o.opportunityType !== selectedType) return false;
    if (selectedGeo !== 'All' && o.geography !== selectedGeo) return false;
    if (o.impactScore < minImpact) return false;
    if (verifiedOnly && o.sourceReliability === SourceReliability.LOW) return false;
    return true;
  });

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

  const isBookmarked = (oppId: string) => user?.bookmarks.includes(oppId);

  const handleBookmarkClick = (e: React.MouseEvent, oppId: string) => {
    e.stopPropagation();
    toggleBookmark(oppId);
  };

  // Extract unique values for filters
  const geographies = Array.from(new Set(opportunities.map(o => o.geography)));

  return (
    <div className="p-6 max-w-7xl mx-auto mb-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Opportunity Scanner</h1>
        <p className="text-slate-500">Real-time whitespace identification powered by regulatory and market signals.</p>
      </div>

      {/* Sticky Universal Filter Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-lg mb-8 p-4 transition-all">
          <div className="flex flex-col lg:flex-row gap-4 justify-between lg:items-center">
            
            <div className="flex flex-wrap gap-3 items-center">
                 {/* Vertical Filter */}
                 <div className="relative group">
                    <select 
                        value={selectedVertical}
                        onChange={(e) => setSelectedVertical(e.target.value as any)}
                        className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg pl-9 pr-8 py-2 focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                        <option value="All">All Verticals</option>
                        {Object.values(Vertical).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                    <Filter size={16} className="absolute left-3 top-2.5 text-slate-400" />
                 </div>

                 {/* Type Filter */}
                 <div className="relative group">
                    <select 
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as any)}
                        className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg pl-9 pr-8 py-2 focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                        <option value="All">All Types</option>
                        {Object.values(OpportunityType).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <Layers size={16} className="absolute left-3 top-2.5 text-slate-400" />
                 </div>

                 {/* Horizon Filter */}
                 <div className="relative group">
                    <select 
                        value={selectedHorizon}
                        onChange={(e) => setSelectedHorizon(e.target.value as any)}
                        className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg pl-9 pr-8 py-2 focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                        <option value="All">All Horizons</option>
                        <option value="0-6 months">0-6 months</option>
                        <option value="6-18 months">6-18 months</option>
                        <option value="18+ months">18+ months</option>
                    </select>
                    <Calendar size={16} className="absolute left-3 top-2.5 text-slate-400" />
                 </div>

                 {/* Geo Filter */}
                 <div className="relative group">
                    <select 
                        value={selectedGeo}
                        onChange={(e) => setSelectedGeo(e.target.value as any)}
                        className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg pl-9 pr-8 py-2 focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                        <option value="All">Global</option>
                        {geographies.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <MapPin size={16} className="absolute left-3 top-2.5 text-slate-400" />
                 </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-4 pt-4 lg:pt-0">
                {/* TEMPORARY Reset Button - Remove after use */}
                {/*<button
                    onClick={() => {
                        localStorage.removeItem('whitespace_db_v1');
                        window.location.reload();
                    }}
                    className="px-3 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors border border-red-200"
                    title="Temporary button to reset cached data - remove after use"
                >
                    🔄 Reset Data
                </button>*/}

                {/* Impact Slider */}
                <div className="flex flex-col justify-center min-w-[140px]">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Min Impact</span>
                        <span className="font-bold text-slate-900">{minImpact}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="99" 
                        value={minImpact}
                        onChange={(e) => setMinImpact(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                </div>

                {/* Verified Toggle */}
                <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${verifiedOnly ? 'bg-primary-600' : 'bg-slate-200'}`}>
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${verifiedOnly ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                    <input type="checkbox" className="hidden" checked={verifiedOnly} onChange={() => setVerifiedOnly(!verifiedOnly)} />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 flex items-center gap-1">
                        <ShieldCheck size={14} /> Verified Sources
                    </span>
                </label>
            </div>

          </div>
      </div>

      {/* Grid */}
      {filteredOpps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpps.map((opp) => (
              <div 
                key={opp.id} 
                onClick={() => setSelectedOpp(opp)}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col h-full group relative"
              >
                 {/* Bookmark Button on Card */}
                 <button
                    onClick={(e) => handleBookmarkClick(e, opp.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full z-10 transition-colors ${
                        isBookmarked(opp.id) 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'bg-transparent text-slate-300 hover:bg-slate-50 hover:text-slate-400'
                    }`}
                 >
                    <Bookmark size={18} fill={isBookmarked(opp.id) ? "currentColor" : "none"} />
                 </button>

                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4 pr-8">
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${getImpactColor(opp.impactScore)}`}>
                      Score: {opp.impactScore}
                    </span>
                    {opp.sourceReliability === SourceReliability.HIGH && (
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                             <ShieldCheck size={12} /> Verified
                        </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                    {opp.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3 italic border-l-2 border-slate-200 pl-3">
                    "{opp.evidenceSnippet}"
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded font-medium border border-slate-200">
                        {opp.opportunityType}
                    </span>
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded border border-slate-200">
                        {opp.geography}
                    </span>
                    {opp.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-slate-50 text-slate-500 rounded border border-slate-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex justify-between items-center">
                   <span className="text-xs font-medium text-slate-500">{opp.timeHorizon}</span>
                   <div className="flex gap-2 items-center">
                        <span className="p-1 rounded bg-white border border-slate-100 text-slate-400">
                            {getTrendIcon(opp.trend)}
                        </span>
                        <span className="text-xs text-slate-400 font-medium uppercase">{opp.trend}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
      ) : (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <Filter size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No opportunities found</h3>
              <p className="text-slate-500 max-w-sm mx-auto mt-2">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => {
                    setSelectedVertical('All');
                    setSelectedHorizon('All');
                    setSelectedType('All');
                    setSelectedGeo('All');
                    setMinImpact(0);
                    setVerifiedOnly(false);
                }}
                className="mt-6 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                  Clear all filters
              </button>
          </div>
      )}

      {/* Deep Dive Modal */}
      {selectedOpp && (
        <DeepDiveModal 
            opportunity={selectedOpp} 
            onClose={() => setSelectedOpp(null)} 
        />
      )}
    </div>
  );
};