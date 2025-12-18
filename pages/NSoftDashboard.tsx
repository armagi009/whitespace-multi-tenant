import React, { useState } from 'react';
import { Building2, MapPin, Users, TrendingUp, Zap, Wifi, Database, ExternalLink, ArrowRight, Clock, Target, Wrench, Bookmark, TrendingDown, Minus, ShieldCheck } from 'lucide-react';
import { Opportunity, OpportunityTrend, Vertical, OpportunityType, SourceReliability } from '../types';
import { useMockAuth } from '../hooks/useMockAuth';
import { DeepDiveModal } from '../components/DeepDiveModal';

export const NSoftDashboard: React.FC = () => {
  const { user, toggleBookmark } = useMockAuth();
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);

  // NSoft-specific curated opportunities (Zone 2)
  const nsoftOpportunities: Opportunity[] = [
    {
      id: 'NSOFT-001',
      title: 'India Smart Grid Mandate Acceleration',
      vertical: Vertical.CLEANTECH,
      impactScore: 95,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Government mandates 250M smart meters by 2026. NSoft\'s patented low-cost conversion technology positions them perfectly for this massive retrofit opportunity.',
      source: 'Ministry of Power, India',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2024-12-15',
      tags: ['Smart Grid', 'Government Mandate', 'IoT', 'Revenue Maximization'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'India',
      status: 'Active',
      details: {
        whyItMatters: 'NSoft\'s patented IoT modules can convert existing meters at 70% lower cost than conventional smart meters, creating massive competitive advantage in government tenders.',
        evidenceHighlights: [
          'Government targets 250M smart meter installations by 2026',
          'NSoft\'s conversion technology costs 70% less than new smart meters',
          'First-mover advantage in state utility partnerships available'
        ],
        moneyTrail: 'Market size: ₹50,000 Cr. Capturing 5-10% = ₹2,500-5,000 Cr revenue opportunity.',
        keyPlayers: ['Schneider Electric', 'Itron', 'Landis+Gyr', 'Secure Meters'],
        riskFlags: ['Government tender competition', 'Technology standardization requirements']
      },
      curation: {
        status: 'Published',
        confidence: 95,
        humanReviewer: 'AI Model & Utilities Expert'
      }
    },
    {
      id: 'NSOFT-002',
      title: 'EV Charging Infrastructure Boom',
      vertical: Vertical.CLEANTECH,
      impactScore: 88,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Government targets 1M charging stations by 2030. NSoft\'s existing EV charging backend software + IoT expertise creates natural expansion path.',
      source: 'NITI Aayog EV Policy',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2024-12-10',
      tags: ['EV Charging', 'Infrastructure', 'IoT', 'Municipal Partnerships'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'India',
      status: 'Active',
      details: {
        whyItMatters: 'Diversify beyond utilities into mobility sector. Leverage existing municipal relationships for charging infrastructure partnerships.',
        evidenceHighlights: [
          'Government targets 1M charging stations by 2030',
          'NSoft already has EV charging backend software',
          'Existing municipal utility relationships provide entry point'
        ],
        moneyTrail: 'EV charging market projected ₹18,000 Cr by 2030. Software + services = 20-30% of total market.',
        keyPlayers: ['Tata Power', 'Fortum', 'ChargePoint', 'ABB'],
        riskFlags: ['High competition from established players', 'Charging standard fragmentation']
      },
      curation: {
        status: 'Published',
        confidence: 88,
        humanReviewer: 'AI Model & Mobility Expert'
      }
    },
    {
      id: 'NSOFT-003',
      title: 'Rural Water Supply Digitization',
      vertical: Vertical.GOVTECH,
      impactScore: 82,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'Jal Jeevan Mission allocates ₹3.6L Cr for rural water connections. NSoft\'s automated water supply systems align perfectly with mission goals.',
      source: 'Jal Jeevan Mission Guidelines',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2024-12-08',
      tags: ['Water Supply', 'Rural', 'IoT', 'Government Mission'],
      timeHorizon: '18+ months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'India',
      status: 'Active',
      details: {
        whyItMatters: 'Scale from urban utilities to rural markets. Establish presence in 600+ districts across India with government backing.',
        evidenceHighlights: [
          'Jal Jeevan Mission: ₹3.6L Cr budget allocation',
          'Target: Tap water connection to every rural household',
          'NSoft\'s automated water supply systems directly applicable'
        ],
        moneyTrail: 'Rural water digitization market: ₹25,000 Cr over 5 years. Technology component: 15-20%.',
        keyPlayers: ['Larsen & Toubro', 'Megha Engineering', 'VA Tech Wabag', 'Suez'],
        riskFlags: ['Long government approval cycles', 'Rural connectivity challenges']
      },
      curation: {
        status: 'Published',
        confidence: 82,
        humanReviewer: 'AI Model & Water Expert'
      }
    },
    {
      id: 'NSOFT-004',
      title: 'Industrial Energy Management Expansion',
      vertical: Vertical.MANUFACTURING,
      impactScore: 91,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Rising energy costs (22% YoY) + PAT scheme penalties create urgent demand for energy optimization. NSoft\'s sub-metering expertise is directly applicable.',
      source: 'Ministry of Power & BEE Reports',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2024-12-12',
      tags: ['Energy Management', 'Industrial', 'PAT Scheme', 'Sub-metering'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'India',
      status: 'Active',
      details: {
        whyItMatters: 'Expand from utilities to industrial customers. Each large factory represents ₹2-5 Cr annual contract value for energy optimization.',
        evidenceHighlights: [
          'Energy costs up 22% YoY across industries',
          'PAT scheme penalties: ₹10-50 Cr for non-compliance',
          'NSoft\'s sub-metering + TRM expertise directly applicable'
        ],
        moneyTrail: 'Industrial energy management market: ₹8,000 Cr. High-margin software + services opportunity.',
        keyPlayers: ['Schneider Electric', 'Siemens', 'ABB', 'Zenatix'],
        riskFlags: ['Complex industrial system integration', 'Long sales cycles with industrial customers']
      },
      curation: {
        status: 'Published',
        confidence: 91,
        humanReviewer: 'AI Model & Energy Expert'
      }
    },
    // Global expansion opportunities
    {
      id: 'NSOFT-GLOBAL-001',
      title: 'Southeast Asia Smart Meter Retrofit Wave',
      vertical: Vertical.CLEANTECH,
      impactScore: 92,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Thailand, Vietnam, and Philippines mandating smart meter rollouts by 2027. NSoft\'s low-cost conversion technology could capture significant market share against expensive Western solutions.',
      source: 'ASEAN Energy Market Integration Report',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2024-12-16',
      tags: ['ASEAN', 'Smart Meters', 'Cost Advantage', 'Retrofit'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'Southeast Asia',
      status: 'Active',
      details: {
        whyItMatters: 'NSoft\'s patented low-cost meter conversion technology offers 60-70% cost savings vs Western competitors in price-sensitive ASEAN markets.',
        evidenceHighlights: [
          'Thailand targeting 24M smart meters by 2027',
          'Vietnam\'s EVN planning 15M meter upgrades',
          'Philippines NGCP mandating AMI for all utilities'
        ],
        moneyTrail: 'ASEAN smart meter market: $8B by 2027. Cost-effective solutions can capture 15-20% share.',
        keyPlayers: ['Itron', 'Landis+Gyr', 'Schneider Electric', 'Local system integrators'],
        riskFlags: ['Currency fluctuation risks', 'Local partnership requirements', 'Regulatory variations by country']
      },
      curation: {
        status: 'Published',
        confidence: 92,
        humanReviewer: 'AI Model & ASEAN Energy Expert'
      }
    },
    {
      id: 'NSOFT-GLOBAL-002',
      title: 'African Utility Revenue Recovery Crisis',
      vertical: Vertical.CLEANTECH,
      impactScore: 88,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Sub-Saharan utilities lose 20-40% revenue to theft and billing inefficiencies. NSoft\'s TRM + IoT solution directly addresses this pain point with proven ROI.',
      source: 'World Bank Africa Energy Sector Report',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2024-12-14',
      tags: ['Africa', 'Revenue Recovery', 'Utility Losses', 'TRM'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'Sub-Saharan Africa',
      status: 'Active',
      details: {
        whyItMatters: 'African utilities desperately need revenue recovery solutions. NSoft\'s proven TRM system can deliver immediate ROI in high-loss environments.',
        evidenceHighlights: [
          'Nigerian utilities lose $2B annually to theft and billing errors',
          'Kenya Power seeking smart metering solutions for slum areas',
          'South African municipalities facing revenue collection crisis'
        ],
        moneyTrail: 'African utility software market: $1.2B. Revenue management solutions command premium pricing.',
        keyPlayers: ['Conlog', 'Hexing', 'Kamstrup', 'Local system integrators'],
        riskFlags: ['Political instability', 'Currency devaluation', 'Infrastructure challenges']
      },
      curation: {
        status: 'Published',
        confidence: 88,
        humanReviewer: 'AI Model & Africa Energy Expert'
      }
    },
    {
      id: 'NSOFT-GLOBAL-003',
      title: 'Latin America Water Digitization Push',
      vertical: Vertical.GOVTECH,
      impactScore: 85,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'Brazil, Mexico, and Colombia investing $15B in water infrastructure digitization. NSoft\'s automated water supply systems proven in rural Indian deployments.',
      source: 'Inter-American Development Bank Infrastructure Report',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2024-12-12',
      tags: ['Latin America', 'Water Management', 'Rural Digitization', 'IoT'],
      timeHorizon: '18+ months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'Latin America',
      status: 'Active',
      details: {
        whyItMatters: 'NSoft\'s rural water automation expertise from India directly applicable to Latin American challenges with similar infrastructure constraints.',
        evidenceHighlights: [
          'Brazil\'s Marco Legal do Saneamento driving water digitization',
          'Mexico targeting 95% water coverage by 2030',
          'Colombia\'s rural water projects seeking IoT solutions'
        ],
        moneyTrail: 'Latin America water tech market: $3.5B. Rural automation solutions growing at 25% CAGR.',
        keyPlayers: ['Suez', 'Veolia', 'Xylem', 'Local engineering firms'],
        riskFlags: ['Language barriers', 'Local content requirements', 'Regulatory complexity']
      },
      curation: {
        status: 'Published',
        confidence: 85,
        humanReviewer: 'AI Model & LatAm Water Expert'
      }
    },
    {
      id: 'NSOFT-GLOBAL-004',
      title: 'Middle East Smart City Infrastructure Boom',
      vertical: Vertical.CLEANTECH,
      impactScore: 90,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'UAE, Saudi Arabia, and Qatar investing $50B in smart city projects. NSoft\'s integrated IoT ecosystem for utilities aligns with Vision 2030 goals.',
      source: 'GCC Smart Cities Initiative Report',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2024-12-13',
      tags: ['Middle East', 'Smart Cities', 'Vision 2030', 'Integrated IoT'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.COMPETITIVE_VOID,
      geography: 'Middle East',
      status: 'Active',
      details: {
        whyItMatters: 'Middle East smart city projects need integrated utility solutions. NSoft\'s complete IoT ecosystem (meters + water + EV charging) offers one-stop solution.',
        evidenceHighlights: [
          'Saudi NEOM project requiring integrated utility management',
          'UAE smart city initiatives in Dubai and Abu Dhabi',
          'Qatar World Cup legacy projects continuing expansion'
        ],
        moneyTrail: 'GCC smart city market: $12B by 2027. Integrated solutions command premium pricing.',
        keyPlayers: ['Siemens', 'Schneider Electric', 'Honeywell', 'IBM'],
        riskFlags: ['High competition from global players', 'Stringent quality requirements', 'Cultural adaptation needs']
      },
      curation: {
        status: 'Published',
        confidence: 90,
        humanReviewer: 'AI Model & Middle East Expert'
      }
    }
  ];

  // NSoft prototype opportunities (Zone 3) - opportunities with prototypes already built
  const prototypeOpportunities: Opportunity[] = [
    {
      id: 'NSOFT-PROTO-001',
      title: 'Municipal ERP User Experience Crisis',
      vertical: Vertical.GOVTECH,
      impactScore: 87,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Municipal clerks spend 40% of time navigating complex ERP interfaces. Support calls cost utilities ₹15-25L annually. Natural language interfaces can reduce training time by 80%.',
      source: 'Municipal IT Survey & NSoft Support Data',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2024-12-14',
      tags: ['ERP', 'User Experience', 'Municipal', 'AI Interface'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'India',
      status: 'Active',
      details: {
        whyItMatters: 'Poor ERP usability creates massive support overhead and user frustration. NSoft can differentiate by making complex systems feel simple through conversational AI.',
        evidenceHighlights: [
          'Municipal clerks spend 40% of time just navigating ERP menus',
          'NSoft support calls dropped 70% in pilot with conversational interface',
          'Natural language queries reduce training time from weeks to hours'
        ],
        moneyTrail: 'ERP usability market: ₹2,000 Cr. Conversational interfaces can command 20-30% premium pricing.',
        keyPlayers: ['SAP', 'Oracle', 'Microsoft Dynamics', 'Tally'],
        riskFlags: ['Integration complexity with legacy systems', 'Accuracy of natural language processing']
      },
      curation: {
        status: 'Published',
        confidence: 87,
        humanReviewer: 'AI Model & ERP Expert'
      }
    },
    {
      id: 'NSOFT-PROTO-002',
      title: 'Water System Predictive Maintenance Gap',
      vertical: Vertical.GOVTECH,
      impactScore: 84,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Water utilities lose ₹50-100L annually to reactive maintenance. Field engineers get alerts but lack actionable insights. AI-powered daily briefings can prevent 60% of emergency repairs.',
      source: 'Water Utility Operations Study',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2024-12-13',
      tags: ['Water Management', 'Predictive Maintenance', 'WhatsApp', 'Field Operations'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'India',
      status: 'Active',
      details: {
        whyItMatters: 'Water utilities are drowning in data but starving for insights. Simple WhatsApp briefings can transform reactive operations into predictive maintenance.',
        evidenceHighlights: [
          'Water utilities lose ₹50-100L annually to emergency repairs',
          'Field engineers prefer WhatsApp over complex dashboards',
          'Predictive insights can prevent 60% of system failures'
        ],
        moneyTrail: 'Water management software market: ₹3,500 Cr. Predictive maintenance solutions command premium pricing.',
        keyPlayers: ['Schneider Electric', 'Siemens', 'ABB', 'Honeywell'],
        riskFlags: ['Data quality from legacy SCADA systems', 'Field team adoption of new workflows']
      },
      curation: {
        status: 'Published',
        confidence: 84,
        humanReviewer: 'AI Model & Water Expert'
      }
    },
    {
      id: 'NSOFT-PROTO-003',
      title: 'Smart Meter Anomaly Analysis Bottleneck',
      vertical: Vertical.CLEANTECH,
      impactScore: 89,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Smart meter deployments generate 1000x more data than utilities can analyze. Anomaly detection exists but root cause analysis takes 2-3 days. AI can provide instant explanations with 90% accuracy.',
      source: 'Smart Grid Analytics Report',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2024-12-11',
      tags: ['Smart Meters', 'Anomaly Detection', 'AI Analysis', 'TRM Integration'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'India',
      status: 'Active',
      details: {
        whyItMatters: 'Smart meters create data explosion but utilities lack tools to understand anomalies quickly. NSoft can sell clarity and speed, not just detection.',
        evidenceHighlights: [
          'Smart meter data volume increased 1000x but analysis capacity only 10x',
          'Root cause analysis currently takes 2-3 days per anomaly',
          'AI can provide instant explanations with 90% accuracy'
        ],
        moneyTrail: 'Smart grid analytics market: ₹4,000 Cr. AI-powered analysis tools can command 40-50% premium.',
        keyPlayers: ['Itron', 'Landis+Gyr', 'Schneider Electric', 'Oracle Utilities'],
        riskFlags: ['Integration with diverse meter communication protocols', 'Accuracy requirements for billing disputes']
      },
      curation: {
        status: 'Published',
        confidence: 89,
        humanReviewer: 'AI Model & Smart Grid Expert'
      }
    }
  ];

  // Prototype links mapping
  const prototypeLinks: { [key: string]: { url: string; name: string; status: string } } = {
    'NSOFT-PROTO-001': {
      url: 'https://erp-dost-rho.vercel.app',
      name: 'ERP-Dost',
      status: 'Ready to Deploy'
    },
    'NSOFT-PROTO-002': {
      url: 'https://jalbot-brief.vercel.app',
      name: 'JalBot Brief',
      status: 'Needs Integration'
    },
    'NSOFT-PROTO-003': {
      url: 'https://ami-reason-bot.vercel.app',
      name: 'AMI-Reason Bot',
      status: 'Ready to Deploy'
    }
  };

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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">NSoft Smart Utilities</h1>
              <p className="text-slate-600 text-lg">Customer Intelligence Dashboard</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">Last Updated</div>
              <div className="text-slate-900 font-medium">Dec 18, 2024</div>
            </div>
          </div>
        </div>

        {/* Zone 1: Company Context Snapshot */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-900">Company Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Overview */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Business Focus</h3>
                <p className="text-slate-700">Utility Revenue Maximization for distribution utilities through smart technology solutions. Helps utilities increase revenue, profits, and productivity while reducing losses.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Core Technologies</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Zap className="w-4 h-4" />
                      Patented Smart IoT Modules
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Wifi className="w-4 h-4" />
                      Multi-protocol Communication (RF/WiFi/GSM)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Database className="w-4 h-4" />
                      TRM Head-end Software
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Target Markets</h4>
                  <div className="space-y-1">
                    <div className="text-sm text-slate-600">• Electricity distribution utilities</div>
                    <div className="text-sm text-slate-600">• Water supply utilities</div>
                    <div className="text-sm text-slate-600">• Gas utilities</div>
                    <div className="text-sm text-slate-600">• EV charging networks</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Key Metrics */}
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Location</span>
                </div>
                <div className="text-slate-900">Bengaluru, Karnataka</div>
                <div className="text-sm text-slate-500">Banashankari 3rd Stage</div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Business Model</span>
                </div>
                <div className="text-sm text-slate-600">End-to-end technology partner providing complete solutions rather than just products</div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Key Innovation</span>
                </div>
                <div className="text-sm text-slate-600">Converts standard DLMS meters into smart meters at significantly lower cost than conventional solutions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Zone 2: Curated Opportunities */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-semibold text-slate-900">Strategic Opportunities</h2>
          </div>

          {/* Billing Protection Opportunities */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-red-500 rounded"></div>
              Core Business Protection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  id: 'NSOFT-BILLING-001',
                  title: 'ESCOM TRM License Defense Against Low-Cost Rivals',
                  vertical: Vertical.CLEANTECH,
                  impactScore: 96,
                  trend: OpportunityTrend.ACCELERATING,
                  evidenceSnippet: 'Chinese and local competitors offering TRM solutions at 40-60% lower cost. NSoft must add AI-powered value to justify premium pricing and protect ₹X per meter annual licensing revenue.',
                  source: 'ESCOM Tender Analysis & Competitor Intelligence',
                  sourceReliability: SourceReliability.HIGH,
                  dateDetected: '2024-12-18',
                  tags: ['TRM Defense', 'Billing Protection', 'AI Value-Add', 'License Retention'],
                  timeHorizon: '0-6 months' as const,
                  opportunityType: OpportunityType.COMPETITIVE_VOID,
                  geography: 'India',
                  status: 'Active' as const,
                  details: {
                    whyItMatters: 'Core billing revenue (₹X per meter/year) under threat from cheaper competitors. AI features must create defensible moat to protect license renewals.',
                    evidenceHighlights: [
                      'BESCOM evaluating 50% cheaper TRM alternatives in 2025 tender',
                      'HESCOM demanding AI-powered SLA commitments for renewals',
                      'MESCOM requiring <2hr anomaly resolution for tender bonus points'
                    ],
                    moneyTrail: 'Protecting ₹50-100 Cr annual TRM licensing revenue. Each lost ESCOM = ₹10-20 Cr annual recurring loss.',
                    keyPlayers: ['Chinese TRM vendors', 'Local system integrators', 'Tata Power SED', 'L&T'],
                    riskFlags: ['Price-sensitive ESCOM procurement', 'AI implementation complexity', 'SLA performance risks']
                  },
                  curation: {
                    status: 'Published' as const,
                    confidence: 96,
                    humanReviewer: 'AI Model & ESCOM Billing Expert'
                  }
                },
                {
                  id: 'NSOFT-BILLING-002',
                  title: 'AI-Powered ESCOM Compliance Automation',
                  vertical: Vertical.GOVTECH,
                  impactScore: 93,
                  trend: OpportunityTrend.ACCELERATING,
                  evidenceSnippet: 'ESCOMs spending ₹5-15 Cr annually on manual compliance reporting. Auto-generated audit trails and ISO documentation can become mandatory tender requirement, locking in TRM renewals.',
                  source: 'ESCOM Compliance Cost Analysis',
                  sourceReliability: SourceReliability.HIGH,
                  dateDetected: '2024-12-17',
                  tags: ['Compliance Automation', 'Audit Trails', 'ISO Documentation', 'Tender Lock-in'],
                  timeHorizon: '0-6 months' as const,
                  opportunityType: OpportunityType.CUSTOMER_PAIN,
                  geography: 'India',
                  status: 'Active' as const,
                  details: {
                    whyItMatters: 'ESCOMs hate manual compliance work. Auto-generating audit trails creates sticky feature that makes TRM switching painful, protecting billing revenue.',
                    evidenceHighlights: [
                      'ESCOMs spend ₹5-15 Cr annually on compliance consultants',
                      'Manual audit trail generation takes 200+ man-hours per quarter',
                      'ISO 27001 documentation requirements increasing across all ESCOMs'
                    ],
                    moneyTrail: 'Compliance automation can justify 20-30% TRM premium. Creates switching cost barrier worth ₹10-25 Cr per ESCOM.',
                    keyPlayers: ['Compliance consultants', 'Manual audit teams', 'ISO certification bodies'],
                    riskFlags: ['Regulatory requirement changes', 'Audit accuracy requirements', 'Integration complexity']
                  },
                  curation: {
                    status: 'Published' as const,
                    confidence: 93,
                    humanReviewer: 'AI Model & Compliance Expert'
                  }
                },
                {
                  id: 'NSOFT-BILLING-003',
                  title: 'Scoreable SLA Framework for ESCOM Tenders',
                  vertical: Vertical.CLEANTECH,
                  impactScore: 94,
                  trend: OpportunityTrend.ACCELERATING,
                  evidenceSnippet: 'ESCOMs adding performance-based scoring in tenders. "AI anomaly clearance <2hrs" and "99.9% billing accuracy" becoming mandatory. NSoft needs measurable AI commitments for tender wins.',
                  source: 'Recent ESCOM Tender Documents Analysis',
                  sourceReliability: SourceReliability.HIGH,
                  dateDetected: '2024-12-16',
                  tags: ['SLA Framework', 'Tender Scoring', 'Performance Metrics', 'AI Commitments'],
                  timeHorizon: '0-6 months' as const,
                  opportunityType: OpportunityType.REG_DRIVEN,
                  geography: 'India',
                  status: 'Active' as const,
                  details: {
                    whyItMatters: 'ESCOMs shifting from price-only to performance-based tenders. Measurable AI SLAs can win tenders and justify premium pricing for TRM licenses.',
                    evidenceHighlights: [
                      'BESCOM 2025 tender includes 30% weightage for AI performance metrics',
                      'HESCOM requiring <2hr anomaly resolution SLA commitments',
                      'MESCOM demanding 99.9% billing accuracy with AI verification'
                    ],
                    moneyTrail: 'SLA-based tender wins protect ₹15-30 Cr per ESCOM contract. Performance bonuses add 10-15% revenue upside.',
                    keyPlayers: ['Traditional TRM vendors without AI', 'Manual operations teams', 'Tender evaluation committees'],
                    riskFlags: ['SLA penalty clauses', 'Performance measurement disputes', 'AI system reliability']
                  },
                  curation: {
                    status: 'Published' as const,
                    confidence: 94,
                    humanReviewer: 'AI Model & Tender Expert'
                  }
                },
                {
                  id: 'NSOFT-BILLING-004',
                  title: 'TRM Cost-of-Ownership Reduction Through AI',
                  vertical: Vertical.CLEANTECH,
                  impactScore: 91,
                  trend: OpportunityTrend.ACCELERATING,
                  evidenceSnippet: 'ESCOMs evaluating total cost of ownership, not just license fees. AI-powered automation reducing manual operations by 60-80% creates compelling TCO story to justify TRM renewals.',
                  source: 'ESCOM Operations Cost Analysis',
                  sourceReliability: SourceReliability.MEDIUM,
                  dateDetected: '2024-12-15',
                  tags: ['TCO Reduction', 'Operations Automation', 'Manual Cost Savings', 'License Justification'],
                  timeHorizon: '6-18 months' as const,
                  opportunityType: OpportunityType.CUSTOMER_PAIN,
                  geography: 'India',
                  status: 'Active' as const,
                  details: {
                    whyItMatters: 'ESCOMs under pressure to reduce operational costs. AI that cuts manual work by 60-80% makes higher TRM license fees look like bargain.',
                    evidenceHighlights: [
                      'ESCOMs spend ₹20-40 Cr annually on manual meter reading and billing operations',
                      'AI automation can reduce field staff requirements by 60-80%',
                      'TCO analysis becoming standard in ESCOM procurement decisions'
                    ],
                    moneyTrail: 'TCO savings of ₹15-25 Cr per ESCOM justifies 2-3x higher TRM license fees. Protects and grows billing revenue.',
                    keyPlayers: ['Manual operations teams', 'Field service contractors', 'Cost-conscious ESCOM management'],
                    riskFlags: ['Union resistance to automation', 'Change management challenges', 'ROI measurement complexity']
                  },
                  curation: {
                    status: 'Published' as const,
                    confidence: 91,
                    humanReviewer: 'AI Model & TCO Expert'
                  }
                }
              ].map((opp) => (
                <div 
                  key={opp.id} 
                  onClick={() => setSelectedOpp(opp)}
                  className="bg-white rounded-xl border-2 border-red-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col h-full group relative"
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
                    
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3 italic border-l-2 border-red-200 pl-3">
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

                  <div className="p-4 border-t border-slate-100 bg-red-50/50 rounded-b-xl flex justify-between items-center">
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
          </div>

          {/* Other India Opportunities */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded"></div>
              India Market Expansion
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nsoftOpportunities.slice(0, 4).map((opp) => (
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
          </div>

          {/* Global Opportunities */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-500 rounded"></div>
              Global Expansion Potential
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nsoftOpportunities.slice(4).map((opp) => (
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
          </div>
        </div>

        {/* Zone 3: Factory Artifacts & Prototypes */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-slate-900">Built Prototypes & Demos</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prototypeOpportunities.map((opp) => {
              const prototypeInfo = prototypeLinks[opp.id];
              return (
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

                  {/* Prototype Link Button */}
                  {prototypeInfo && (
                    <a
                      href={prototypeInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-4 left-4 p-2 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors z-10"
                      title={`View ${prototypeInfo.name} Demo`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}

                  <div className="p-6 flex-1 pt-12">
                    <div className="flex justify-between items-start mb-4">
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
                    
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3 italic border-l-2 border-purple-200 pl-3">
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

                    {/* Prototype Status */}
                    {prototypeInfo && (
                      <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="text-xs font-medium text-purple-700 mb-1">Prototype Built:</div>
                        <div className="text-sm font-semibold text-purple-900">{prototypeInfo.name}</div>
                        <div className="text-xs text-purple-600 mt-1">Status: {prototypeInfo.status}</div>
                      </div>
                    )}
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
              );
            })}
          </div>
        </div>

      </div>

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