import React, { useState, useEffect } from 'react';
import { mockDb } from '../services/mockDb';
import { DataSource, SourceType, Opportunity, OpportunityTrend, Vertical, SourceReliability, OpportunityType } from '../types';
import { Globe, FileText, Lock, RefreshCw, UploadCloud, CheckCircle2, File, Loader2, Plus, AlertCircle, Check, X } from 'lucide-react';
import { analyzeUploadedFile, analyzeManualEntry } from '../services/geminiService';
import { Link } from 'react-router-dom';

export const DataSources: React.FC = () => {
  const [sources, setSources] = useState<DataSource[]>(mockDb.getDataSources());
  const [activeTab, setActiveTab] = useState<SourceType | 'All' | 'Staging'>('All');
  
  // File Upload State
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  // Manual Entry State
  const [manualDescription, setManualDescription] = useState('');
  const [manualVertical, setManualVertical] = useState<Vertical>(Vertical.GENERAL);
  const [manualType, setManualType] = useState<OpportunityType>(OpportunityType.TECH_GAP);
  const [manualState, setManualState] = useState<'idle' | 'analyzing' | 'complete'>('idle');

  // Shared Result State (for Upload or Manual)
  const [newOpp, setNewOpp] = useState<Opportunity | null>(null);
  
  // Staging Queue State
  const [stagingOpps, setStagingOpps] = useState<Opportunity[]>([]);

  useEffect(() => {
      // Load staging items
      const all = mockDb.getOpportunities();
      setStagingOpps(all.filter(o => o.status === 'Staging'));
  }, [newOpp]); // Reload if newOpp changes (potentially added to staging)

  const filteredSources = activeTab === 'All' 
    ? sources 
    : activeTab === 'Staging' 
        ? [] // Staging is handled separately
        : sources.filter(s => s.type === activeTab);

  const handleSync = (id: string) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, status: 'Syncing' } : s));
    setTimeout(() => {
        setSources(prev => prev.map(s => s.id === id ? { ...s, status: 'Active', lastSync: 'Just now', itemCount: s.itemCount + Math.floor(Math.random() * 5) } : s));
    }, 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploadedFile(file.name);
      setUploadState('uploading');

      await new Promise(r => setTimeout(r, 1500));
      setUploadState('processing');

      const aiResult = await analyzeUploadedFile(file.name);
      
      const score = aiResult.impactScore || 75;
      const status = score >= 80 ? 'Active' : 'Staging';

      const newOpportunity: Opportunity = {
          id: `opp_${Date.now()}`,
          title: aiResult.title || "Detected Opportunity",
          description: aiResult.description || "No description available.",
          evidenceSnippet: aiResult.evidenceSnippet || "Extracted from uploaded document.",
          impactScore: score,
          vertical: aiResult.vertical || Vertical.GENERAL,
          trend: aiResult.trend || OpportunityTrend.STABLE,
          tags: aiResult.tags || ["Upload"],
          timeHorizon: aiResult.timeHorizon || "6-18 months",
          source: `Upload: ${file.name}`,
          dateDetected: new Date().toISOString().split('T')[0],
          sourceReliability: SourceReliability.MEDIUM,
          opportunityType: OpportunityType.TECH_GAP,
          geography: "Global",
          status: status
      };

      mockDb.addOpportunity(newOpportunity);
      setNewOpp(newOpportunity);
      setUploadState('complete');
  };

  const handleManualSubmit = async () => {
      if(!manualDescription) return;
      setManualState('analyzing');
      
      const aiResult = await analyzeManualEntry(manualDescription, manualVertical, manualType);
      
      const score = aiResult.impactScore || 60;
      const status = score >= 80 ? 'Active' : 'Staging';

      const newOpportunity: Opportunity = {
          id: `opp_${Date.now()}`,
          title: aiResult.title || "Draft Opportunity",
          description: aiResult.description || manualDescription,
          evidenceSnippet: aiResult.evidenceSnippet || manualDescription.substring(0,100),
          impactScore: score,
          vertical: manualVertical,
          trend: aiResult.trend || OpportunityTrend.STABLE,
          tags: aiResult.tags || ["Manual", "Draft"],
          timeHorizon: aiResult.timeHorizon || "6-18 months",
          source: `Manual Entry`,
          dateDetected: new Date().toISOString().split('T')[0],
          sourceReliability: SourceReliability.MEDIUM,
          opportunityType: manualType,
          geography: aiResult.geography || "Global",
          status: status
      };

      mockDb.addOpportunity(newOpportunity);
      setNewOpp(newOpportunity);
      setManualState('complete');
  };

  const handleApprove = (id: string) => {
      mockDb.updateOpportunity(id, { status: 'Active' });
      setStagingOpps(prev => prev.filter(o => o.id !== id));
  };

  const handleReject = (id: string) => {
      mockDb.deleteOpportunity(id);
      setStagingOpps(prev => prev.filter(o => o.id !== id));
  };

  const resetForms = () => {
      setUploadState('idle');
      setUploadedFile(null);
      setManualState('idle');
      setManualDescription('');
      setNewOpp(null);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto mb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Data Sources & Ingestion</h1>
        <p className="text-slate-500">Manage ingestion pipelines, public feeds, and process raw intelligence.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto">
        {['All', 'Staging', SourceType.PUBLIC, SourceType.LICENSED].map(tab => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab 
                    ? 'border-slate-900 text-slate-900' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
            >
                {tab === 'Staging' ? (
                    <span className="flex items-center gap-2">
                        Staging Queue
                        {stagingOpps.length > 0 && (
                            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold">
                                {stagingOpps.length}
                            </span>
                        )}
                    </span>
                ) : tab}
            </button>
        ))}
      </div>

      {activeTab === 'Staging' ? (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                  <h3 className="text-lg font-bold text-slate-900">Staging Queue</h3>
                  <p className="text-sm text-slate-500">Review low-confidence ({"<80"}) opportunities before they go live.</p>
              </div>
              
              {stagingOpps.length === 0 ? (
                  <div className="p-12 text-center text-slate-400">
                      <CheckCircle2 size={48} className="mx-auto mb-4 text-emerald-100" />
                      <p>All clear! No items waiting for review.</p>
                  </div>
              ) : (
                  <div className="divide-y divide-slate-100">
                      {stagingOpps.map(opp => (
                          <div key={opp.id} className="p-6 flex flex-col md:flex-row gap-6">
                              <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                      <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded border border-amber-100">
                                          Score: {opp.impactScore}
                                      </span>
                                      <span className="text-xs font-bold text-slate-400 uppercase">{opp.vertical}</span>
                                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{opp.source}</span>
                                  </div>
                                  <h4 className="text-lg font-bold text-slate-900 mb-2">{opp.title}</h4>
                                  <p className="text-sm text-slate-600 mb-3">{opp.description}</p>
                                  <div className="flex flex-wrap gap-2">
                                      {opp.tags.map(t => (
                                          <span key={t} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                              #{t}
                                          </span>
                                      ))}
                                  </div>
                              </div>
                              <div className="flex md:flex-col justify-center gap-2 min-w-[120px]">
                                  <button 
                                    onClick={() => handleApprove(opp.id)}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                                  >
                                      <Check size={16} /> Approve
                                  </button>
                                  <button 
                                    onClick={() => handleReject(opp.id)}
                                    className="flex-1 bg-white border border-slate-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-600 px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                                  >
                                      <X size={16} /> Reject
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Source List */}
            <div className="flex-1 space-y-4">
                {filteredSources.map(source => (
                    <div key={source.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${
                                source.type === SourceType.PUBLIC ? 'bg-blue-50 text-blue-600' : 
                                source.type === SourceType.LICENSED ? 'bg-purple-50 text-purple-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                                {source.type === SourceType.PUBLIC ? <Globe size={20} /> : 
                                source.type === SourceType.LICENSED ? <Lock size={20} /> : <FileText size={20} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{source.name}</h3>
                                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{source.type}</span>
                                    <span>Items: {source.itemCount}</span>
                                    <span>Last Sync: {source.lastSync}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                                {source.status === 'Syncing' ? (
                                    <span className="flex items-center gap-2 text-primary-600 text-sm font-medium animate-pulse">
                                        <RefreshCw size={16} className="animate-spin" /> Syncing...
                                    </span>
                                ) : (
                                    <button 
                                        onClick={() => handleSync(source.id)}
                                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                                        title="Refresh Feed"
                                    >
                                        <RefreshCw size={18} />
                                    </button>
                                )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Ingestion Sidebar */}
            <div className="w-full lg:w-[400px] flex flex-col gap-6">
                
                {/* 1. Manual Entry Card */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Plus size={20} className="text-primary-600" /> 
                        Manual Entry
                    </h2>
                    
                    {manualState === 'idle' ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Target Vertical</label>
                                <select 
                                    value={manualVertical}
                                    onChange={(e) => setManualVertical(e.target.value as Vertical)}
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                                >
                                    {Object.values(Vertical).map(v => <option key={v} value={v}>{v}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Opportunity Type</label>
                                <select 
                                    value={manualType}
                                    onChange={(e) => setManualType(e.target.value as OpportunityType)}
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                                >
                                    {Object.values(OpportunityType).map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Idea / Observation</label>
                                <textarea 
                                    value={manualDescription}
                                    onChange={(e) => setManualDescription(e.target.value)}
                                    placeholder="e.g. I noticed small banks struggling with the new ISO 20022 migration timelines..."
                                    className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none h-24 resize-none"
                                />
                            </div>
                            <button 
                                onClick={handleManualSubmit}
                                disabled={!manualDescription}
                                className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
                            >
                                Analyze & Create
                            </button>
                        </div>
                    ) : manualState === 'analyzing' ? (
                        <div className="text-center py-8">
                            <Loader2 size={32} className="mx-auto text-primary-600 animate-spin mb-4" />
                            <h3 className="font-medium text-slate-900">Structuring Opportunity...</h3>
                            <p className="text-xs text-slate-500 mt-2">Evaluating impact score and tagging.</p>
                        </div>
                    ) : (
                         <div className="text-center">
                             {newOpp?.status === 'Active' ? (
                                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg mb-4 border border-emerald-100">
                                    <div className="flex items-center justify-center gap-2 font-bold mb-1">
                                        <CheckCircle2 size={18} /> High Impact ({newOpp.impactScore})
                                    </div>
                                    <p className="text-xs">Opportunity is live on Dashboard.</p>
                                </div>
                             ) : (
                                <div className="bg-amber-50 text-amber-700 p-4 rounded-lg mb-4 border border-amber-100">
                                     <div className="flex items-center justify-center gap-2 font-bold mb-1">
                                        <AlertCircle size={18} /> Low Confidence ({newOpp?.impactScore})
                                    </div>
                                    <p className="text-xs">Sent to Staging Queue for review.</p>
                                </div>
                             )}
                             <button onClick={resetForms} className="text-sm font-medium text-slate-600 hover:text-slate-900 underline">
                                 Add Another
                             </button>
                         </div>
                    )}
                </div>

                {/* 2. File Upload Card */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <UploadCloud size={20} className="text-primary-600" /> 
                        File Upload
                    </h2>
                    
                    {uploadState === 'idle' && (
                        <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all group">
                            <div className="p-3 bg-slate-100 text-slate-400 rounded-full mb-3 group-hover:bg-primary-100 group-hover:text-primary-600">
                                <UploadCloud size={24} />
                            </div>
                            <span className="text-sm font-medium text-slate-900 mb-1">Click to upload</span>
                            <span className="text-xs text-slate-400">PDF, DOCX up to 10MB</span>
                            <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx,.txt" />
                        </label>
                    )}

                    {uploadState === 'uploading' && (
                        <div className="text-center py-8">
                             <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
                                <div className="bg-primary-500 h-2 rounded-full animate-[width_1.5s_ease-in-out_infinite]" style={{width: '60%'}}></div>
                            </div>
                            <p className="text-sm font-medium text-slate-600">Uploading document...</p>
                        </div>
                    )}

                    {uploadState === 'processing' && (
                        <div className="text-center py-8">
                             <Loader2 size={32} className="mx-auto text-purple-600 animate-spin mb-4" />
                             <h3 className="font-medium text-slate-900">AI Analysis in Progress</h3>
                             <p className="text-xs text-slate-500 mt-2">Extracting regulatory signals...</p>
                        </div>
                    )}

                    {uploadState === 'complete' && newOpp && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3 text-slate-700 font-bold text-sm">
                                <File size={16} /> {uploadedFile}
                            </div>
                            {newOpp.status === 'Active' ? (
                                <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mb-3">
                                    <CheckCircle2 size={14} /> Analysis Complete (Live)
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-amber-600 text-xs font-bold mb-3">
                                    <AlertCircle size={14} /> Sent to Staging
                                </div>
                            )}
                            <div className="flex gap-2">
                                <Link to={newOpp.status === 'Active' ? '/dashboard' : '/sources'} className="flex-1 bg-white border border-slate-300 text-slate-700 text-xs font-bold py-2 rounded-lg text-center hover:bg-slate-50 transition-colors">
                                    {newOpp.status === 'Active' ? 'View Dashboard' : 'View Queue'}
                                </Link>
                                <button onClick={resetForms} className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-700">
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
      )}
    </div>
  );
};