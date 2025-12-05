import { User, Tenant, Opportunity, UserRole, OpportunityTrend, Vertical, AuditLog, DataSource, SourceType, OpportunityType, SourceReliability, SavedOpportunity } from '../types';

const STORAGE_KEY = 'whitespace_db_v1';

interface DB {
  users: User[];
  tenants: Tenant[];
  opportunities: Opportunity[];
  auditLogs: AuditLog[];
  dataSources: DataSource[];
}

const INITIAL_DB: DB = {
  users: [
    {
      id: 'u_1',
      email: 'platform@saas.local',
      name: 'Super Admin',
      role: UserRole.PLATFORM_ADMIN,
      tenantSlug: 'platform',
      bookmarks: [],
      savedItems: [],
    },
    {
      id: 'u_2',
      email: 'admin@fintech.com',
      name: 'Sarah Fintech',
      role: UserRole.TENANT_ADMIN,
      tenantSlug: 'fintech-innovators',
      bookmarks: ['opp_1'],
      savedItems: [
        { oppId: 'opp_1', note: 'Discussed with legal team, this is a priority.', personalConfidence: 95, savedAt: '2023-10-25T10:00:00Z' }
      ],
    },
    {
      id: 'u_3',
      email: 'user@fintech.com',
      name: 'John Analyst',
      role: UserRole.TENANT_USER,
      tenantSlug: 'fintech-innovators',
      bookmarks: [],
      savedItems: [],
    },
  ],
  tenants: [
    {
      id: 't_1',
      name: 'Platform HQ',
      slug: 'platform',
      plan: 'Enterprise',
      mrr: 0,
      userCount: 1,
    },
    {
      id: 't_2',
      name: 'FinTech Innovators',
      slug: 'fintech-innovators',
      plan: 'Growth',
      mrr: 5000,
      userCount: 2,
    },
    {
      id: 't_3',
      name: 'MedTech Scouts',
      slug: 'medtech-scouts',
      plan: 'Enterprise',
      mrr: 12000,
      userCount: 5,
    },
  ],
  opportunities: [
    {
      id: 'CLIMATE-001',
      title: 'Scope 3 Emissions Tracking for Export-Driven Manufacturers',
      vertical: Vertical.GENERAL,
      impactScore: 91,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'EU Carbon Border Tax (CBAM) enforcement begins 2026; exporters face tariffs without carbon accounting...',
      source: 'EU Commission Report',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-10-24',
      tags: ['Sustainability', 'Compliance', 'Supply Chain', 'CBAM'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'Global',
      description: 'EU Carbon Border Tax (CBAM) enforcement begins 2026; exporters face tariffs without carbon accounting...',
      status: 'Active',
      details: {
        whyItMatters: 'Failure to comply with CBAM will result in significant tariffs, making exports uncompetitive in the EU market. This creates an urgent need for robust carbon accounting solutions.',
        evidenceHighlights: [
          'CBAM reporting requirements start in 2024, with financial penalties from 2026.',
          'Many Asian exporters lack automated systems for tracking Scope 3 emissions.',
          'First-mover solution providers can capture a significant market share.',
        ],
        moneyTrail: 'Market for carbon accounting software projected to grow from $12B to $50B by 2028. Early adopters are raising Series B rounds.',
        keyPlayers: ['SAP', 'Salesforce (Net Zero Cloud)', 'Persefoni', 'Watershed'],
        riskFlags: ['Complex data collection from suppliers', 'Evolving regulatory standards'],
      },
      curation: {
        status: 'Published',
        confidence: 95,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'opp_2',
      title: 'AI-Driven Triage Reimbursement',
      vertical: Vertical.MEDTECH,
      impactScore: 85,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'CMS proposes new CPT codes for "AI-augmented diagnostic analysis" in 2025 schedule.',
      source: 'CMS Physician Fee Schedule',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-11-02',
      tags: ['Reimbursement', 'AI', 'Diagnostics'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'USA',
      description: 'New billing pathways are opening for software-as-a-medical-device (SaMD) that performs triage. Hospitals are currently under-equipped to track utilization of these specific tools for claim submission.',
      status: 'Active',
      details: {
        whyItMatters: 'Hospitals are missing out on reimbursements for AI triage tools because they lack proper tracking and documentation systems.',
        evidenceHighlights: [
          'CMS is introducing new CPT codes for AI diagnostic tools in 2025.',
          'Hospitals lose an average of $2M annually in unclaimed reimbursements.',
          'AI triage can reduce emergency room wait times by 30%.',
        ],
        moneyTrail: 'Healthcare AI reimbursement market expected to reach $6B by 2027. Multiple startups have received FDA clearance for triage tools.',
        keyPlayers: ['Tempus AI', 'PathAI', 'Aidoc', 'Viz.ai'],
        riskFlags: ['Regulatory approval delays', 'Integration with hospital EHR systems'],
      },
      curation: {
        status: 'Under Review',
        confidence: 82,
      }
    },
    {
      id: 'opp_3',
      title: 'Smart City Traffic Grid Modernization',
      vertical: Vertical.GOVTECH,
      impactScore: 78,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'DOT announces $500M grant specifically for V2X (Vehicle-to-Everything) infrastructure.',
      source: 'DOT Press Release',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-10-15',
      tags: ['Infrastructure', 'IoT', 'Grants'],
      timeHorizon: '18+ months',
      opportunityType: OpportunityType.COMPETITIVE_VOID,
      geography: 'USA',
      description: 'Large incumbents have legacy hardware lock-in, but the new grant language favors open-standard interoperability, creating a wedge for software-first players to layer on top of existing traffic controllers.',
      status: 'Active',
      details: {
        whyItMatters: 'Cities are struggling to modernize traffic systems due to legacy infrastructure, but new federal grants create opportunities for innovative solutions.',
        evidenceHighlights: [
          'DOT allocated $500M for V2X infrastructure modernization.',
          'Legacy traffic systems in most US cities are over 20 years old.',
          'Open-standard solutions can reduce implementation costs by 40%.',
        ],
        moneyTrail: 'Smart city infrastructure market projected to grow from $200B to $700B globally by 2030. Municipal grants are accelerating adoption.',
        keyPlayers: ['Siemens', 'Cisco', 'Kapsch TrafficCom', 'Iteris'],
        riskFlags: ['Complex procurement processes for government contracts', 'Interoperability with existing systems'],
      },
      curation: {
        status: 'New',
        confidence: 75,
      }
    },
    {
      id: 'opp_4',
      title: 'Cross-Border Stablecoin Settlement',
      vertical: Vertical.FINTECH,
      impactScore: 88,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'EU MiCA regulation clarifies e-money token issuance, reducing legal ambiguity.',
      source: 'Official Journal of the EU',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-11-10',
      tags: ['Crypto', 'Forex', 'Regulation'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'Europe',
      description: 'With MiCA providing clarity, B2B cross-border payment flows using euro-backed stablecoins are becoming viable for treasury management, bypassing traditional SWIFT delays.',
      status: 'Active',
      details: {
        whyItMatters: 'Traditional cross-border payments are slow and expensive. Stablecoins offer a faster, cheaper alternative now that regulations are clear.',
        evidenceHighlights: [
          'MiCA regulation provides legal clarity for stablecoin operations in EU.',
          'SWIFT payments can take 1-3 days and cost 5-15% in fees.',
          'Stablecoin settlements can be completed in minutes with <1% fees.',
        ],
        moneyTrail: 'Cross-border payments market is $150T annually. Stablecoin solutions could capture 10-20% share in B2B transactions.',
        keyPlayers: ['Circle', 'Tether', 'Coinbase', 'Bitstamp'],
        riskFlags: ['Regulatory uncertainty outside EU', 'Volatility concerns despite pegging'],
      },
      curation: {
        status: 'Published',
        confidence: 90,
        humanReviewer: 'John Smith',
      }
    },
     {
      id: 'opp_5',
      title: 'Remote Patient Monitoring (RPM) Audit Risks',
      vertical: Vertical.MEDTECH,
      impactScore: 65,
      trend: OpportunityTrend.COOLING,
      evidenceSnippet: 'OIG report highlights "significant fraud" in RPM billing; audits expected to triple.',
      source: 'OIG Work Plan Update',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-09-20',
      tags: ['Compliance', 'Audit', 'Risk'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'USA',
      description: 'Healthcare providers are pulling back on RPM programs due to audit fears. There is a white space for compliance-verification platforms that automatically document "medical necessity" for every RPM claim.',
      status: 'Active',
      details: {
        whyItMatters: 'Healthcare providers face massive penalties for RPM billing errors. Automated compliance tools are needed to reduce audit risks.',
        evidenceHighlights: [
          'OIG expects RPM audit volume to triple in the next 12 months.',
          'Average penalty for RPM fraud is $1M per provider.',
          'Proper documentation can reduce audit success rate by 80%.',
        ],
        moneyTrail: 'RPM market was $2B in 2023 and expected to grow to $5B by 2026 despite increased scrutiny. Compliance tools represent a $500M opportunity.',
        keyPlayers: ['Philips Healthcare', 'Medtronic', 'ResMed', 'BioTelemetry'],
        riskFlags: ['Changing Medicare reimbursement rules', 'Provider resistance to additional documentation burden'],
      },
      curation: {
        status: 'Under Review',
        confidence: 78,
      }
    },
    {
      id: 'opp_6',
      title: 'Zero Trust Architecture for BFSI Under DPDPA Compliance',
      vertical: Vertical.FINTECH,
      impactScore: 93,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Up to ₹250 Cr penalty risk under new data law; legacy perimeter security is now insufficient.',
      source: 'DPDPA Act 2023',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-11-15',
      tags: ['Cybersecurity', 'Compliance', 'BFSI', 'Zero Trust'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'India',
      description: 'The Digital Personal Data Protection Act (DPDPA) mandates stringent data protection measures. Financial institutions are primary targets for both regulators and attackers.',
      status: 'Active',
      details: {
        whyItMatters: 'Indian banks face massive penalties for data breaches. Zero Trust architecture is now legally required but largely unimplemented.',
        evidenceHighlights: [
          'DPDPA penalties can reach ₹250 Cr for data breaches.',
          '80% of Indian banks still use traditional perimeter security.',
          'Zero Trust reduces breach probability by over 50%.',
        ],
        moneyTrail: 'Indian banks expected to increase cybersecurity spending by 35% in next 24 months, focusing on data-centric security.',
        keyPlayers: ['Zscaler', 'Palo Alto Networks', 'Fortinet', 'CrowdStrike'],
        riskFlags: ['High implementation complexity', 'Resistance to change from internal IT teams'],
      },
      curation: {
        status: 'Published',
        confidence: 95,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'opp_7',
      title: 'Predictive Maintenance for Automotive Tier-2 Suppliers',
      vertical: Vertical.FINTECH,
      impactScore: 88,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Major OEMs tightening quality penalties; unplanned downtime costing suppliers ₹2-5 Cr per year per plant.',
      source: 'Auto Components Manufacturing Association',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-11-20',
      tags: ['Manufacturing', 'IoT', 'Predictive Analytics', 'Automotive'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'Asia-Pacific',
      description: 'Just-in-time supply chains in auto industry mean downtime at a supplier can halt entire OEM assembly lines, leading to massive penalties.',
      status: 'Active',
      details: {
        whyItMatters: 'Tier-2 suppliers face severe financial penalties from OEMs for production delays. Predictive maintenance can prevent costly downtime.',
        evidenceHighlights: [
          'Equipment failure rate 12% higher in Tier-2 vs Tier-1 suppliers.',
          'Predictive maintenance can reduce downtime by up to 70%.',
          'OEMs beginning to mandate digital twin capabilities.',
        ],
        moneyTrail: 'Industrial IoT platform investments growing at 25% CAGR. Automotive-focused VCs funding predictive maintenance startups.',
        keyPlayers: ['Siemens', 'GE Digital', 'Uptake', 'C3.ai'],
        riskFlags: ['Significant upfront CAPEX required for sensors', 'Lack of skilled data scientists in manufacturing'],
      },
      curation: {
        status: 'Under Review',
        confidence: 85,
      }
    },
    {
      id: 'FINTECH-001',
      title: 'AI-Powered Compliance Cost Delta Calculator for Banks',
      vertical: Vertical.RETAIL,
      impactScore: 78,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'FDIC bulletins and CFPB regulations are increasing compliance overhead by 15% year-over-year...',
      source: 'FDIC Bulletin Q2',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-11-25',
      tags: ['FinTech', 'RegTech', 'AI', 'Compliance'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'USA',
      description: 'FDIC bulletins and CFPB regulations are increasing compliance overhead by 15% year-over-year...',
      status: 'Active',
      details: {
        whyItMatters: 'Banks are struggling to quantify the financial impact of new regulations before they are implemented, leading to reactive and inefficient compliance spending.',
        evidenceHighlights: [
          'Manual analysis of a single new regulation can take over 500 man-hours.',
          'AI can analyze and summarize regulatory impact in near real-time.',
          'Cost of non-compliance is 2.71 times higher than the cost of maintaining compliance.',
        ],
        moneyTrail: 'The global RegTech market is expected to reach $55 billion by 2025. VCs are actively funding startups that offer quantifiable ROI.',
        keyPlayers: ['Ascent', 'Hummingbird', 'Continuity', 'Quantexa'],
        riskFlags: ['Accuracy of AI models is critical', 'Integration with legacy banking systems can be challenging'],
      },
      curation: {
        status: 'Under Review',
        confidence: 78,
      }
    },
    {
      id: 'RETAIL-001',
      title: 'Hyper-Local Inventory Visibility for Tier-2 City Retailers',
      vertical: Vertical.RETAIL,
      impactScore: 82,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Quick commerce is expanding beyond metros; tier-2 retailers are losing foot traffic to delivery apps...',
      source: 'National Retail Federation Report',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-11-30',
      tags: ['Retail', 'Inventory', 'AI', 'Regional'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.COMPETITIVE_VOID,
      geography: 'Global Emerging Markets',
      description: 'Quick commerce is expanding beyond metros; tier-2 retailers are losing foot traffic to delivery apps...',
      status: 'Active',
      details: {
        whyItMatters: 'Tier-2 city retailers lack the technology to compete with the instant delivery promises of large e-commerce players, leading to market share erosion.',
        evidenceHighlights: [
          '70% of online shoppers in Tier-2 cities abandon carts if delivery is >2 days.',
          'Real-time inventory sync between physical store and online presence can boost sales by 20%.',
          'Current solutions are too expensive for smaller, regional retailers.',
        ],
        moneyTrail: 'Investment in retail SaaS for SMBs is up 40% YoY. A huge untapped market exists outside major metropolitan areas.',
        keyPlayers: ['Shopify', 'Olisto', 'Fynd', 'Unicommerce'],
        riskFlags: ['Low tech adoption rates among traditional retailers', 'Price sensitivity of the target market'],
      },
      curation: {
        status: 'New',
        confidence: 75,
      }
    },
    {
      id: 'HRTECH-001',
      title: 'AI-Driven Attrition Prediction for IT Services Firms',
      vertical: Vertical.EDTECH,
      impactScore: 78,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'Annual attrition of 22% is costing large firms over ₹15 Cr in backfill costs alone...',
      source: 'NASSCOM IT Services Report',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-01',
      tags: ['HRTech', 'AI', 'Retention', 'IT Services'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'Global',
      description: 'Annual attrition of 22% is costing large firms over ₹15 Cr in backfill costs alone...',
      status: 'Active',
      details: {
        whyItMatters: 'High attrition in IT services directly impacts project delivery, client satisfaction, and margins. Identifying flight risks early allows for proactive retention efforts.',
        evidenceHighlights: [
          'Predictive models can identify potential exits with 85% accuracy up to 90 days in advance.',
          'Cost of replacing an employee is estimated to be 1.5x their annual salary.',
          'Companies using retention analytics have seen a 15% reduction in voluntary turnover.',
        ],
        moneyTrail: 'The market for employee engagement and retention software is projected to reach $3.5 billion by 2026. Seed rounds are focusing on AI-first platforms.',
        keyPlayers: ['Eightfold.ai', 'Glint (LinkedIn)', 'Visier', 'inFeedo'],
        riskFlags: ['Data privacy concerns with employee data', 'Need for high-quality training data'],
      },
      curation: {
        status: 'Under Review',
        confidence: 82,
      }
    },
    {
      id: 'MEDTECH-001',
      title: 'Time-to-reimbursement Estimator for New Medical Devices',
      vertical: Vertical.MEDTECH,
      impactScore: 85,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Navigating CMS reimbursement pathways adds an average of 18 months to go-to-market time for 510(k) cleared devices...',
      source: 'FDA 510(k) Database Analysis',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-12-02',
      tags: ['MedTech', 'Reimbursement', 'AI', 'Market Access'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'USA',
      description: 'Navigating CMS reimbursement pathways adds an average of 18 months to go-to-market time for 510(k) cleared devices...',
      status: 'Active',
      details: {
        whyItMatters: 'For MedTech startups, the time it takes to secure reimbursement codes is often more critical than the time it takes to get regulatory approval. Predictability is key for investor confidence and financial planning.',
        evidenceHighlights: [
          'Incorrectly filed reimbursement applications have a 60% initial rejection rate.',
          'AI platforms analyzing historical CMS decisions can predict approval probability and timeline with 90% accuracy.',
          'A 6-month delay in reimbursement can erode 20% of a product\'s peak sales potential.',
        ],
        moneyTrail: 'The health economics and outcomes research (HEOR) services market is a $10B industry. Tech-enabled solutions are a key growth area.',
        keyPlayers: ['IQVIA', 'Syneos Health', 'EVERSANA', 'Clarivate'],
        riskFlags: ['CMS policies are subject to political change', 'Access to clean, structured historical data is a major challenge'],
      },
      curation: {
        status: 'Published',
        confidence: 88,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'LOGISTICS-001',
      title: 'Real-Time Container Tracking for EXIM-Heavy Manufacturers',
      vertical: Vertical.INSURTECH,
      impactScore: 79,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'Average port dwell time is up 40% post-pandemic; visibility gaps are causing frequent stockouts and production halts...',
      source: 'Drewry World Container Index',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-03',
      tags: ['Logistics', 'IoT', 'Visibility', 'Supply Chain'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'Global',
      description: 'Average port dwell time is up 40% post-pandemic; visibility gaps are causing frequent stockouts and production halts...',
      status: 'Active',
      details: {
        whyItMatters: 'For manufacturers with global supply chains, not knowing the precise location and ETA of containers leads to excessive buffer stock, high expediting costs, and lost sales.',
        evidenceHighlights: [
          'Manual tracking methods have an error rate of over 15%.',
          'IoT-based trackers combined with predictive ETAs can reduce safety stock requirements by 25%.',
          'Major shipping lines are starting to offer API-based tracking, but a unified platform is needed.',
        ],
        moneyTrail: 'The supply chain visibility market is projected to grow to $25 billion by 2027. Companies offering carrier-agnostic platforms are attracting significant investment.',
        keyPlayers: ['project44', 'FourKites', 'Tive', 'Descartes'],
        riskFlags: ['Hardware (IoT tracker) costs and reverse logistics', 'Data sharing reluctance from some freight carriers'],
      },
      curation: {
        status: 'Under Review',
        confidence: 80,
      }
    },
    {
      id: 'FINTECH-002',
      title: 'Embedded Insurance APIs for Vertical SaaS Platforms',
      vertical: Vertical.FINTECH,
      impactScore: 84,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Vertical SaaS companies are seeking to increase ARPU by 20-30%; embedded finance is the leading path...',
      source: 'a16z Fintech Newsletter',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-04',
      tags: ['FinTech', 'InsurTech', 'API', 'SaaS', 'Embedded Finance'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'Global',
      description: 'Vertical SaaS companies are seeking to increase ARPU by 20-30%; embedded finance is the leading path...',
      status: 'Active',
      details: {
        whyItMatters: 'Small businesses prefer to buy insurance from providers they already trust (like their scheduling or invoicing software), but SaaS platforms lack the expertise to become insurers. An API-first approach bridges this gap.',
        evidenceHighlights: [
          'SMB insurance is a $100B+ market in the US alone.',
          'Embedded insurance boasts a 5-10x lower customer acquisition cost compared to traditional channels.',
          'Toast (restaurant POS) and Shopify (e-commerce) have proven the model with payments and lending.',
        ],
        moneyTrail: 'InsurTech infrastructure startups like Socotra and Bindable are raising significant rounds to power these experiences.',
        keyPlayers: ['Stripe', 'Plaid', 'Socotra', 'Cover Genius'],
        riskFlags: ['Complex state-by-state regulatory compliance', 'Requires deep partnership with incumbent carriers'],
      },
      curation: {
        status: 'Published',
        confidence: 87,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'FINTECH-003',
      title: 'Tokenization Platform for Illiquid Alternative Assets',
      vertical: Vertical.FINTECH,
      impactScore: 89,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'High-net-worth individuals are allocating over 25% to alternatives, but secondary liquidity remains a major challenge...',
      source: 'BlackRock Investor Report',
      sourceReliability: SourceReliability.LOW,
      dateDetected: '2023-12-05',
      tags: ['FinTech', 'Blockchain', 'WealthTech', 'RWA'],
      timeHorizon: '18+ months',
      opportunityType: OpportunityType.COMPETITIVE_VOID,
      geography: 'Global Hubs',
      description: 'High-net-worth individuals are allocating over 25% to alternatives, but secondary liquidity remains a major challenge...',
      status: 'Active',
      details: {
        whyItMatters: 'Tokenizing assets like private equity stakes, fine art, or venture fund holdings can create secondary markets, unlocking trillions in value and providing much-needed liquidity for investors.',
        evidenceHighlights: [
          'Boston Consulting Group projects the tokenized asset market to reach $16 trillion by 2030.',
          'Regulatory sandboxes for digital assets are emerging in several financial hubs.',
          'Current solutions are fragmented and lack institutional-grade custody and compliance.',
        ],
        moneyTrail: 'Major banks like JP Morgan and Goldman Sachs are actively experimenting with on-chain asset issuance. Startups like Securitize are building the infrastructure.',
        keyPlayers: ['Securitize', 'Polymath', 'Onyx by JP Morgan', 'Figure Technologies'],
        riskFlags: ['Unclear global regulatory landscape', 'Security of smart contracts and digital wallets is paramount'],
      },
      curation: {
        status: 'Under Review',
        confidence: 85,
      }
    },
    {
      id: 'MEDTECH-002',
      title: 'AI-Powered Triage for Rural Telemedicine Platforms',
      vertical: Vertical.MEDTECH,
      impactScore: 81,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Rural primary care physician shortages are set to worsen by 2030, increasing reliance on remote care...',
      source: 'World Health Organization Report',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-06',
      tags: ['MedTech', 'AI', 'Telemedicine', 'Rural Health'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'Global',
      description: 'Rural primary care physician shortages are set to worsen by 2030, increasing reliance on remote care...',
      status: 'Active',
      details: {
        whyItMatters: 'Telemedicine platforms are often overwhelmed with non-urgent cases, preventing doctors from focusing on patients who need immediate attention. AI can pre-screen patients based on symptoms and vitals, routing them appropriately.',
        evidenceHighlights: [
          'AI triage can reduce unnecessary virtual consultations by up to 40%.',
          'Improves early detection of critical conditions like sepsis or stroke.',
          'Allows a single doctor to oversee a larger patient population more effectively.',
        ],
        moneyTrail: 'Digital health funding remains strong post-pandemic, with a focus on solutions that improve efficiency. Companies like Babylon Health have pioneered this space.',
        keyPlayers: ['Babylon Health', 'Ada Health', 'K Health', '98point6'],
        riskFlags: ['Regulatory approval (SaMD - Software as a Medical Device)', 'Patient data privacy and HIPAA compliance', 'Risk of misdiagnosis'],
      },
      curation: {
        status: 'Published',
        confidence: 86,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'MEDTECH-003',
      title: 'VR Surgical Simulation for Complex Robotic Procedures',
      vertical: Vertical.MEDTECH,
      impactScore: 87,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'The learning curve for robotic surgery can be up to 200 cases; simulation can reduce this by 50%...',
      source: 'Journal of the American Medical Association (JAMA)',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-12-07',
      tags: ['MedTech', 'VR', 'Surgical Tech', 'Robotics'],
      timeHorizon: '18+ months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'Developed Markets',
      description: 'The learning curve for robotic surgery can be up to 200 cases; simulation can reduce this by 50%...',
      status: 'Active',
      details: {
        whyItMatters: 'As surgical robots become more common, there is a critical need for safe, repeatable, and realistic training methods that dont involve patients. VR offers a cost-effective and scalable solution.',
        evidenceHighlights: [
          'Reduces costly errors in the operating room.',
          'Allows surgeons to practice rare and complex procedures on-demand.',
          'Hospitals can save millions in training costs and OR time.',
        ],
        moneyTrail: 'The surgical simulation market is expected to exceed $2.5B by 2027. Companies like Osso VR and FundamentalVR are leaders in the space.',
        keyPlayers: ['Intuitive Surgical (Da Vinci)', 'Osso VR', 'FundamentalVR', 'Medtronic'],
        riskFlags: ['High cost of developing hyper-realistic simulations', 'Requires powerful hardware (VR headsets)', 'Integration with hospital training curricula'],
      },
      curation: {
        status: 'Published',
        confidence: 89,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'GOVTECH-001',
      title: 'AI-Powered Grant Application and Fraud Detection System',
      vertical: Vertical.GOVTECH,
      impactScore: 83,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Federal agencies report that up to 10% of grant funds are lost to fraud, waste, and abuse annually...',
      source: 'U.S. Government Accountability Office (GAO)',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-12-08',
      tags: ['GovTech', 'AI', 'Public Finance', 'Compliance'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'USA',
      description: 'Federal agencies report that up to 10% of grant funds are lost to fraud, waste, and abuse annually...',
      status: 'Active',
      details: {
        whyItMatters: 'Government agencies manage billions in grants, but legacy systems make it difficult to assess eligibility efficiently and monitor fund usage, leading to significant financial losses and suboptimal outcomes.',
        evidenceHighlights: [
          'AI can analyze applicant data to score eligibility and risk in real-time.',
          'Pattern recognition can flag suspicious fund usage across multiple recipients.',
          'Reduces administrative burden on grant officers, allowing them to focus on impact.',
        ],
        moneyTrail: 'The U.S. government has earmarked funds for modernizing IT infrastructure under the Technology Modernization Fund (TMF). Companies like Palantir have built large businesses on government data analysis.',
        keyPlayers: ['Palantir', 'Tyler Technologies', 'Accenture', 'Deloitte'],
        riskFlags: ['Long government procurement cycles', 'Concerns over algorithmic bias in decision-making', 'Data integration challenges across agencies'],
      },
      curation: {
        status: 'Published',
        confidence: 87,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'EDTECH-001',
      title: 'AI-Powered Corporate L&D for Critical Skills Gaps',
      vertical: Vertical.EDTECH,
      impactScore: 80,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: '87% of executives say they are experiencing skill gaps now or expect them within a few years...',
      source: 'McKinsey Global Survey',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-12-09',
      tags: ['EdTech', 'HRTech', 'AI', 'Corporate Training'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'Global',
      description: '87% of executives say they are experiencing skill gaps now or expect them within a few years...',
      status: 'Active',
      details: {
        whyItMatters: 'Companies are struggling to upskill and reskill their workforce to keep pace with technological change (e.g., AI, data science). Generic e-learning platforms are ineffective; personalized, adaptive learning paths are needed.',
        evidenceHighlights: [
          'Personalized learning can improve employee engagement by over 50%.',
          'AI can identify an individual\'s skill gaps and recommend specific micro-learning modules.',
          'Reduces time-to-competency for new hires and promoted employees.',
        ],
        moneyTrail: 'The corporate L&D market is over $300B annually. VC funding is flowing into platforms that can demonstrate measurable impact on skills, not just course completion.',
        keyPlayers: ['Degreed', 'Cornerstone', '360Learning', 'Guild Education'],
        riskFlags: ['Integration with existing HRIS and LMS systems', 'Content creation can be a bottleneck', 'Difficult to prove direct ROI'],
      },
      curation: {
        status: 'Published',
        confidence: 85,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'INSURTECH-001',
      title: 'Parametric Insurance for SMBs Against Climate Events',
      vertical: Vertical.FINTECH,
      impactScore: 90,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Traditional business interruption insurance claims after natural disasters can take 6-12 months to pay out...',
      source: 'Insurance Information Institute',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-10',
      tags: ['InsurTech', 'ClimateTech', 'Parametric', 'SMB'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.COMPETITIVE_VOID,
      geography: 'Climate-vulnerable regions',
      description: 'Traditional business interruption insurance claims after natural disasters can take 6-12 months to pay out...',
      status: 'Active',
      details: {
        whyItMatters: 'Small businesses often fail while waiting for traditional insurance payouts after a hurricane, flood, or wildfire. Parametric insurance pays out automatically and instantly when a pre-defined trigger is met (e.g., wind speed hits 100 mph at a specific location).',
        evidenceHighlights: [
          'Eliminates the need for lengthy and costly claims adjustment processes.',
          'Provides immediate liquidity for businesses to begin recovery.',
          'Data from government agencies (NOAA, USGS) can be used as objective triggers.',
        ],
        moneyTrail: 'The parametric insurance market is growing rapidly. Startups like Arbol and Descartes Underwriting have raised significant capital to apply this model to climate risk.',
        keyPlayers: ['Swiss Re', 'Arbol', 'Descartes Underwriting', 'FloodFlash'],
        riskFlags: ['High cost of reinsurance capital', 'Basis risk (when the trigger doesn\'t perfectly match the actual loss)', 'Customer education is required for a new product category'],
      },
      curation: {
        status: 'Published',
        confidence: 92,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'PROPTECH-001',
      title: 'Digital Twin Platform for Commercial Building Operations',
      vertical: Vertical.AGRITECH,
      impactScore: 86,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Commercial buildings account for nearly 40% of global energy consumption; efficiency gains are a top priority...',
      source: 'UN Environment Programme',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-11',
      tags: ['PropTech', 'Digital Twin', 'IoT', 'Sustainability'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'Global Metros',
      description: 'Commercial buildings account for nearly 40% of global energy consumption; efficiency gains are a top priority...',
      status: 'Active',
      details: {
        whyItMatters: 'Managing large commercial properties is complex and inefficient. A digital twin—a real-time virtual model of a building—allows operators to simulate changes, predict maintenance needs, and optimize energy usage, saving millions.',
        evidenceHighlights: [
          'Digital twins can reduce building energy costs by up to 30%.',
          'Improves tenant comfort and safety by simulating airflow and emergency evacuations.',
          'Provides a single source of truth for all building data (BIM, IoT sensors, work orders).',
        ],
        moneyTrail: 'The digital twin market is projected to reach $48B by 2026. Major software and industrial players are investing heavily in this space.',
        keyPlayers: ['Siemens', 'Johnson Controls', 'Willow', 'Matterport'],
        riskFlags: ['High upfront cost of 3D modeling and sensor deployment', 'Requires integration of multiple legacy building systems (HVAC, lighting, security)'],
      },
      curation: {
        status: 'Published',
        confidence: 88,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'AGRITECH-001',
      title: 'Supply Chain Traceability for High-Value Export Crops',
      vertical: Vertical.RETAIL,
      impactScore: 82,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'New EU and US regulations on deforestation and food safety require end-to-end traceability from farm to fork...',
      source: 'EU Deforestation Regulation (EUDR)',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-12-12',
      tags: ['AgriTech', 'Supply Chain', 'Compliance', 'Blockchain'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'Emerging Markets',
      description: 'New EU and US regulations on deforestation and food safety require end-to-end traceability from farm to fork...',
      status: 'Active',
      details: {
        whyItMatters: 'Producers of coffee, cocoa, and palm oil in developing nations risk losing access to premium markets without robust systems to prove their products are sustainably and ethically sourced. This creates a huge demand for traceability solutions.',
        evidenceHighlights: [
          'EUDR compliance is mandatory from 2025 for many commodities.',
          'Blockchain can provide an immutable record of a product\'s journey.',
          'Traceability can unlock premium pricing for certified sustainable goods.',
        ],
        moneyTrail: 'The food traceability market is expected to double in the next 5 years. Startups are raising funds to provide SaaS platforms to farmer cooperatives and exporters.',
        keyPlayers: ['CropIn', 'Farmforce', 'Sourcemap', 'IBM Food Trust'],
        riskFlags: ['Low tech literacy among smallholder farmers', 'Ensuring data integrity at the first mile of the supply chain', 'Cost of implementation for cooperatives'],
      },
      curation: {
        status: 'Published',
        confidence: 86,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'RETAIL-002',
      title: 'Dynamic Pricing Engines for Fashion E-Commerce',
      vertical: Vertical.RETAIL,
      impactScore: 78,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Myntra case studies show dynamic pricing increases margin by 8-12% while maintaining conversion rates...',
      source: 'Retail Tech Report',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-13',
      tags: ['Retail', 'Fashion', 'Dynamic Pricing', 'AI', 'E-Commerce'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'India',
      description: 'Myntra case studies show dynamic pricing increases margin by 8-12% while maintaining conversion rates...',
      status: 'Active',
      details: {
        whyItMatters: 'Fashion D2C brands are losing significant margin by using static pricing. AI-driven dynamic pricing, as used by giants like Flipkart and Amazon, can optimize prices in real-time based on demand, leading to substantial profit increases.',
        evidenceHighlights: [
          'E-commerce leaders adjust prices every 15 minutes based on demand signals.',
          'Peak season pricing optimization can add ₹5-10 Cr to the top-line for mid-sized brands.',
          'Reduces need for end-of-season sales by better matching price to demand throughout the product lifecycle.',
        ],
        moneyTrail: 'The market for AI-powered pricing engines is rapidly expanding. SaaS solutions integrating with major e-commerce platforms like Shopify and Magento are gaining traction.',
        keyPlayers: ['ClearDemand', 'Pricefx', 'Wiser', 'Competera'],
        riskFlags: ['Requires clean, real-time data on inventory, demand, and competitor pricing.', 'Potential for negative customer perception if not implemented carefully.', 'Algorithmic complexity.'],
      },
      curation: {
        status: 'Under Review',
        confidence: 80,
      }
    },
    {
      id: 'RETAIL-003',
      title: 'Contactless Checkout for High-Footfall Stores',
      vertical: Vertical.RETAIL,
      impactScore: 75,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'Post-pandemic customer surveys show 58% prefer contactless checkout, but implementation costs have been prohibitive.',
      source: 'Consumer Behaviour Study',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-14',
      tags: ['Retail', 'Checkout', 'Computer Vision', 'AI', 'Customer Experience'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'Global Urban Centers',
      description: 'Post-pandemic customer surveys show 58% prefer contactless checkout, but implementation costs have been prohibitive.',
      status: 'Active',
      details: {
        whyItMatters: 'Long checkout queues are a major pain point for customers in high-footfall stores like supermarkets. "Just Walk Out" technology eliminates this friction, improving customer experience and increasing throughput.',
        evidenceHighlights: [
          'New computer vision solutions are emerging at 1/3rd the cost of Amazon Go technology.',
          'Stores report a 30% reduction in checkout time.',
          'Frictionless payment leads to a 15% increase in impulse purchases near the exit.',
        ],
        moneyTrail: 'Venture funding is flowing into startups that offer more affordable and scalable alternatives to Amazon\'s "Just Walk Out" tech. Major retailers like Reliance are piloting these solutions.',
        keyPlayers: ['Amazon Go', 'Standard AI', 'AiFi', 'Trigo'],
        riskFlags: ['High upfront CAPEX for cameras and sensors.', 'Accuracy of item recognition is critical to prevent shrinkage.', 'Customer privacy concerns.'],
      },
      curation: {
        status: 'Under Review',
        confidence: 78,
      }
    },
    {
      id: 'RETAIL-004',
      title: 'Customer Data Platforms for Personalized Marketing',
      vertical: Vertical.RETAIL,
      impactScore: 80,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'New DPDPA regulations require explicit consent for data usage, forcing retailers to rebuild customer engagement.',
      source: 'DPDPA Act',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-12-15',
      tags: ['Retail', 'DPDPA', 'Personalization', 'Customer Data', 'Compliance'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'India',
      description: 'New DPDPA regulations require explicit consent for data usage, forcing retailers to rebuild customer engagement.',
      status: 'Active',
      details: {
        whyItMatters: 'With stringent data privacy laws like DPDPA, retailers can no longer rely on third-party data. A Customer Data Platform (CDP) that unifies first-party data is essential for compliant, personalized marketing and building direct customer relationships.',
        evidenceHighlights: [
          'Retailers with unified CDPs report 3x better consent rates and 40% higher repeat purchase rates.',
          'Tata Digital\'s NeuPass program shows how first-party data drives ₹200-400 higher annual customer value.',
          'Non-compliant companies face severe penalties (up to ₹250 Cr).',
        ],
        moneyTrail: 'The CDP market is experiencing explosive growth. Companies that specialize in compliant data unification and activation are prime acquisition targets for larger marketing clouds.',
        keyPlayers: ['Segment', 'Twilio', 'Tealium', 'Adobe Experience Platform', 'CleverTap'],
        riskFlags: ['Integration with legacy retail systems can be complex.', 'Requires a clear data governance strategy.', 'Risk of data silos persisting if not implemented correctly.'],
      },
      curation: {
        status: 'Published',
        confidence: 84,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'RETAIL-005',
      title: 'Supply Chain Visibility for FMCG Distributors',
      vertical: Vertical.MANUFACTURING,
      impactScore: 77,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'FMCG companies are reducing distributor margins while demanding better service levels, squeezing profitability.',
      source: 'FMCG Industry Report',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-16',
      tags: ['FMCG', 'Distribution', 'Supply Chain', 'Mobile', 'SaaS'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'India',
      description: 'FMCG companies are reducing distributor margins while demanding better service levels, squeezing profitability.',
      status: 'Active',
      details: {
        whyItMatters: 'FMCG distributors operate on thin margins and face pressure from manufacturers. Lack of real-time stock visibility across their network leads to stock-outs and lost revenue, making efficiency tools critical for survival and growth.',
        evidenceHighlights: [
          'Distributors lack real-time stock visibility, leading to 12-18% stock-out rates and significant annual revenue loss.',
          'Cloud-based Distributor Management Systems (DMS) with mobile apps for sales reps show a 25% efficiency improvement.',
          'Improved visibility helps in demand forecasting and reduces inventory holding costs.',
        ],
        moneyTrail: 'The market for distributor management SaaS is growing, with a focus on mobile-first solutions tailored for the Indian market. Companies providing affordable, easy-to-deploy solutions are seeing rapid adoption.',
        keyPlayers: ['Bizom', 'FieldAssist', 'GoFrugal', 'Unicommerce'],
        riskFlags: ['Low tech adoption among traditional distributors.', 'Requires behavior change from field sales teams.', 'Internet connectivity issues in rural areas.'],
      },
      curation: {
        status: 'Under Review',
        confidence: 79,
      }
    },
    {
      id: 'MANUF-002',
      title: 'Quality Automation with Computer Vision Inspection',
      vertical: Vertical.MANUFACTURING,
      impactScore: 85,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Indian manufacturers face 30-50% lower margins due to higher rejection rates compared to global competitors.',
      source: 'Manufacturing Excellence Survey',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-17',
      tags: ['Manufacturing', 'Quality', 'Computer Vision', 'AI', 'Precision'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'India',
      description: 'Indian manufacturers face 30-50% lower margins due to higher rejection rates compared to global competitors.',
      status: 'Active',
      details: {
        whyItMatters: 'Manual quality inspection is slow, error-prone, and a major bottleneck in high-volume production. AI-powered computer vision systems provide superhuman accuracy and speed, drastically reducing defects and improving profitability.',
        evidenceHighlights: [
          'AI vision systems can achieve 99.5% defect detection vs. 95-97% for manual inspection.',
          'Early adopters in precision components report ROI in just 6-9 months.',
          'Government PLI schemes offer subsidies for Industry 4.0 investments, including quality automation.',
        ],
        moneyTrail: 'AI in manufacturing is a hot investment area. Startups providing easy-to-train vision AI platforms that don\'t require deep learning expertise are gaining traction.',
        keyPlayers: ['Cognex', 'Keyence', 'Qualitas Technologies', 'LMI Technologies'],
        riskFlags: ['Requires high-quality cameras and consistent lighting conditions.', 'Model training requires a large dataset of good and bad parts.', 'Integration with existing production line hardware.'],
      },
      curation: {
        status: 'Published',
        confidence: 88,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'MANUF-003',
      title: 'Energy Optimization for Process Industries',
      vertical: Vertical.MANUFACTURING,
      impactScore: 83,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Electricity costs are up 22% YoY, and for energy-intensive industries, it accounts for 30-50% of operating costs.',
      source: 'Ministry of Power Data',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-12-18',
      tags: ['Manufacturing', 'Energy', 'Sustainability', 'IoT', 'AI'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'India',
      description: 'Electricity costs are up 22% YoY, and for energy-intensive industries, it accounts for 30-50% of operating costs.',
      status: 'Active',
      details: {
        whyItMatters: 'For process industries like steel, cement, and chemicals, rising energy costs are severely impacting margins. AI-based energy management systems can deliver significant savings, making them a high-priority investment.',
        evidenceHighlights: [
          'AI systems can deliver 15-20% consumption reduction by optimizing process parameters in real-time.',
          'Perform, Achieve, Trade (PAT) scheme penalties for non-compliance can reach ₹10-50 Cr for large manufacturers.',
          'Early adopter case studies show ₹8-15 Cr in annual savings.',
        ],
        moneyTrail: 'ClimateTech and industrial IoT are converging. VCs are funding startups that provide a clear ROI through energy savings while also improving a company\'s ESG score.',
        keyPlayers: ['Schneider Electric', 'Siemens', 'ABB', 'Zenatix'],
        riskFlags: ['Requires integration with legacy operational technology (OT) systems.', 'Change management is needed to ensure adoption by plant operators.', 'Security of connected industrial systems.'],
      },
      curation: {
        status: 'Published',
        confidence: 86,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'MANUF-004',
      title: 'Digital Twin for Production Line Optimization',
      vertical: Vertical.MANUFACTURING,
      impactScore: 79,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Pharma and electronics manufacturers are losing 15-20% throughput due to suboptimal line configurations.',
      source: 'Industrial Engineering Journal',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-19',
      tags: ['Manufacturing', 'Digital Twin', 'Simulation', 'Optimization', 'Pharma'],
      timeHorizon: '18+ months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'Global',
      description: 'Pharma and electronics manufacturers are losing 15-20% throughput due to suboptimal line configurations.',
      status: 'Active',
      details: {
        whyItMatters: 'Physically reconfiguring a complex production line is expensive and time-consuming. A digital twin allows manufacturers to simulate changes virtually, identifying the optimal layout and process flow before making any physical changes, saving time and money.',
        evidenceHighlights: [
          'Digital twin technology can reduce physical reconfiguration costs by 80%.',
          'Case studies from L&T and Siemens show 18-25% throughput improvement.',
          'The technology is becoming more accessible, with costs dropping significantly in recent years.',
        ],
        moneyTrail: 'The industrial metaverse is a major focus for large tech companies and VCs. Platforms that can accurately simulate complex physical processes are highly valued.',
        keyPlayers: ['NVIDIA (Omniverse)', 'Siemens', 'Dassault Systèmes', 'Ansys'],
        riskFlags: ['High computational requirements for accurate simulation.', 'Requires skilled engineers to build and maintain the digital twin.', 'Data integration from various sources (CAD, PLC, MES) is a major challenge.'],
      },
      curation: {
        status: 'Under Review',
        confidence: 81,
      }
    },
    {
      id: 'MANUF-005',
      title: 'Supplier Quality Management Platforms',
      vertical: Vertical.MANUFACTURING,
      impactScore: 76,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'Manufacturers discover defects from suppliers only at incoming inspection, causing 3-5 day production stoppages.',
      source: 'Supply Chain Management Review',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-20',
      tags: ['Manufacturing', 'Supply Chain', 'Quality', 'SaaS', 'Collaboration'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'Global',
      description: 'Manufacturers discover defects from suppliers only at incoming inspection, causing 3-5 day production stoppages.',
      status: 'Active',
      details: {
        whyItMatters: 'Upstream quality issues from suppliers can have a cascading effect, halting production and delaying customer shipments. Cloud-based Supplier Quality Management (SQM) platforms provide real-time visibility into supplier quality, enabling proactive issue resolution.',
        evidenceHighlights: [
          'Production stoppages due to supplier quality cost ₹20-40L per incident.',
          'Leading manufacturers report a 60% reduction in supplier-caused line stoppages after implementing an SQM.',
          'Supplier portals enable seamless collaboration and data sharing on quality metrics.',
        ],
        moneyTrail: 'The market for supply chain software is robust. Niche SaaS players focusing on specific aspects like supplier quality are being acquired by larger ERP and SCM providers.',
        keyPlayers: ['Veeva Systems', 'Sparta Systems (Honeywell)', 'MasterControl', 'Plex'],
        riskFlags: ['Requires buy-in and adoption from a diverse supplier base.', 'Data standardization across suppliers can be difficult.', 'Integration with internal ERP/MES systems.'],
      },
      curation: {
        status: 'Under Review',
        confidence: 78,
      }
    },
    {
      id: 'EDTECH-002',
      title: 'AI-Powered Placement Analytics for Tier-3 Engineering Colleges',
      vertical: Vertical.EDTECH,
      impactScore: 76,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'NEP 2020 mandates outcome-based accreditation, with placement data as a key metric. NAAC is de-accrediting colleges with <60% placement.',
      source: 'UGC Notification',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-12-21',
      tags: ['EdTech', 'Higher Education', 'Placements', 'AI', 'Analytics'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'India',
      description: 'NEP 2020 mandates outcome-based accreditation, with placement data as a key metric. NAAC is de-accrediting colleges with <60% placement.',
      status: 'Active',
      details: {
        whyItMatters: 'For thousands of Tier-3 engineering colleges, low placement rates are an existential threat. AI platforms that can bridge the gap between student skills and industry demands are critical for their survival and for improving student outcomes.',
        evidenceHighlights: [
          'AI platforms analyzing skill gaps and matching students to jobs show 30-40% placement rate improvement.',
          'Colleges paying ₹50-80L/year to placement consultants can save 60% with a tech platform.',
          'Improves institutional rankings and attracts more student enrollments.',
        ],
        moneyTrail: 'The Indian EdTech market is shifting focus from K-12 to higher education and employability. Startups that can deliver measurable placement outcomes are attracting investor interest.',
        keyPlayers: ['upGrad', 'Great Learning', 'Simplilearn', 'Coursera for Campus'],
        riskFlags: ['Sales cycles with educational institutions can be long.', 'Requires integration with student information systems.', 'Data quality of student skill profiles is crucial.'],
      },
      curation: {
        status: 'Published',
        confidence: 80,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'EDTECH-003',
      title: 'Learning Management Systems for Hybrid K-12 Schools',
      vertical: Vertical.EDTECH,
      impactScore: 73,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'Post-pandemic, 45% of urban schools continue hybrid models but most use fragmented tools like Zoom and WhatsApp.',
      source: 'School Management Survey',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-22',
      tags: ['EdTech', 'K-12', 'LMS', 'Hybrid Learning', 'SaaS'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'India',
      description: 'Post-pandemic, 45% of urban schools continue hybrid models but most use fragmented tools like Zoom and WhatsApp.',
      status: 'Active',
      details: {
        whyItMatters: 'Parents and teachers are frustrated with the disconnected experience of using multiple apps for hybrid learning. A unified Learning Management System (LMS) streamlines communication, assignments, and progress tracking, creating a better experience for all stakeholders.',
        evidenceHighlights: [
          'Integrated LMS platforms report a 25% improvement in parent satisfaction.',
          'Reduces teacher administrative time by 15%.',
          'Provides a single source of truth for student performance data.',
        ],
        moneyTrail: 'The school-focused SaaS market in India is large but fragmented. Companies that can build a comprehensive, easy-to-use platform and an effective distribution model can capture significant market share.',
        keyPlayers: ['LEAD School', 'Extramarks', 'Teachmint', 'Google Classroom'],
        riskFlags: ['Highly price-sensitive market.', 'Requires significant teacher training and support for adoption.', 'Competition from free tools like Google Classroom.'],
      },
      curation: {
        status: 'Under Review',
        confidence: 76,
      }
    },
    {
      id: 'EDTECH-004',
      title: 'Corporate L&D Platforms for IT Services Firms',
      vertical: Vertical.EDTECH,
      impactScore: 80,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'IT services firms face 22% annual attrition, with "lack of learning opportunities" cited by 68% of exits.',
      source: 'NASSCOM Report',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-23',
      tags: ['EdTech', 'Corporate Learning', 'IT Services', 'AI', 'Retention'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'India',
      description: 'IT services firms face 22% annual attrition, with "lack of learning opportunities" cited by 68% of exits.',
      status: 'Active',
      details: {
        whyItMatters: 'For IT services giants, talent is their only product. Continuously upskilling their massive workforce in emerging technologies is a strategic imperative to stay relevant and combat high attrition rates. Traditional training methods are not scalable or effective.',
        evidenceHighlights: [
          'AI-powered microlearning platforms show 75%+ completion rates compared to <40% for a traditional courses.',
          'Platform-based learning offers a 50% cost reduction compared to classroom training.',
          'Top IT firms like TCS and Infosys are spending ₹500-1000 Cr/year on L&D.',
        ],
        moneyTrail: 'The B2B EdTech market is booming. Platforms that can provide personalized learning paths at scale and demonstrate impact on employee retention are highly sought after.',
        keyPlayers: ['Pluralsight', 'Udemy for Business', 'A Cloud Guru', 'Degreed'],
        riskFlags: ['Content needs to be constantly updated to keep pace with technology.', 'Integration with internal project allocation and performance management systems.', 'Measuring the direct impact on business outcomes is challenging.'],
      },
      curation: {
        status: 'Published',
        confidence: 83,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'EDTECH-005',
      title: 'Exam Proctoring Solutions for Online Certifications',
      vertical: Vertical.EDTECH,
      impactScore: 71,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'The online certification market is growing 35% YoY, but fraud in remote exams threatens credential integrity.',
      source: 'EdTech Market Analysis',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-24',
      tags: ['EdTech', 'Exams', 'Proctoring', 'AI', 'Certification'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'Global',
      description: 'The online certification market is growing 35% YoY, but fraud in remote exams threatens credential integrity.',
      status: 'Active',
      details: {
        whyItMatters: 'The value of an online certification is based on trust. AI-powered remote proctoring is essential to prevent cheating and maintain the credibility of online qualifications, enabling the market to grow.',
        evidenceHighlights: [
          'AI proctoring (face recognition, behavior analysis) is becoming mandatory for high-stakes professional certifications.',
          'AI solutions cost ₹50-100 per exam, a significant saving compared to manual proctoring at ₹200-500.',
          'Automated proctoring allows for on-demand testing, improving the candidate experience.',
        ],
        moneyTrail: 'The remote proctoring market saw a huge surge during the pandemic and continues to grow. Companies that can provide reliable, scalable, and non-intrusive solutions are leading the market.',
        keyPlayers: ['ProctorU', 'Examity', 'Honorlock', 'Mercer Mettl'],
        riskFlags: ['Student privacy concerns are a major issue.', 'Risk of false positives from AI algorithms.', 'Requires stable internet connection for candidates.'],
      },
      curation: {
        status: 'Under Review',
        confidence: 74,
      }
    },
    {
      id: 'EDTECH-006',
      title: 'Virtual Labs for Science Education (Tier-2 Schools/Colleges)',
      vertical: Vertical.EDTECH,
      impactScore: 68,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'Tier-2/3 schools lack science lab infrastructure, which costs ₹50L-1Cr. NEP 2020 emphasizes experiential learning.',
      source: 'NEP 2020 Policy Document',
      sourceReliability: SourceReliability.LOW,
      dateDetected: '2023-12-25',
      tags: ['EdTech', 'Virtual Labs', 'K-12', 'AR/VR', 'Tier-2'],
      timeHorizon: '18+ months',
      opportunityType: OpportunityType.COMPETITIVE_VOID,
      geography: 'India',
      description: 'Tier-2/3 schools lack science lab infrastructure, which costs ₹50L-1Cr. NEP 2020 emphasizes experiential learning.',
      status: 'Active',
      details: {
        whyItMatters: 'Millions of students in India are deprived of hands-on science education due to a lack of physical labs. Virtual labs using AR/VR simulations can provide an immersive, safe, and cost-effective alternative, democratizing access to quality science education.',
        evidenceHighlights: [
          'Virtual lab platforms offer a 90% cost saving compared to setting up physical labs.',
          'Early studies show equivalent learning outcomes in conceptual understanding.',
          'The government may subsidize such solutions under the Samagra Shiksha scheme.',
        ],
        moneyTrail: 'While still nascent, the educational AR/VR market is attracting interest. Companies that can create a large library of curriculum-aligned simulations have a first-mover advantage.',
        keyPlayers: ['Labster', 'PraxiLabs', 'OLabs', 'Veative'],
        riskFlags: ['Requires schools to have adequate digital infrastructure (computers, internet).', 'High cost of content development.', 'AR/VR hardware is still expensive for most schools.'],
      },
      curation: {
        status: 'New',
        confidence: 71,
      }
    },
    {
      id: 'CLIMATE-002',
      title: 'Renewable Energy Procurement Platforms for Corporates',
      vertical: Vertical.CLEANTECH,
      impactScore: 84,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'SEBI mandates ESG disclosures for top 1000 listed companies, driving them toward 100% renewable energy.',
      source: 'SEBI Mandate',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-12-26',
      tags: ['Sustainability', 'Renewable Energy', 'ESG', 'Corporate', 'Procurement'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'India',
      description: 'SEBI mandates ESG disclosures for top 1000 listed companies, driving them toward 100% renewable energy.',
      status: 'Active',
      details: {
        whyItMatters: 'Large corporations are under pressure from investors and regulators to adopt renewable energy, but navigating the complex Power Purchase Agreement (PPA) market is a major challenge. Digital platforms are needed to simplify and accelerate this process.',
        evidenceHighlights: [
          'Corporate PPAs have complex negotiation cycles of 18-24 months.',
          'Digital platforms can reduce procurement time by 40% and costs by 10-15%.',
          'Eliminates the need for expensive traditional consultants who charge ₹20-50L per PPA.',
        ],
        moneyTrail: 'The B2B renewable energy market is massive. Tech platforms that can act as a marketplace and streamline transactions are highly attractive to VCs.',
        keyPlayers: ['LevelTen Energy', 'Zeigo (acquired by Schneider Electric)', 'RenewableChoice', 'reo.Dev'],
        riskFlags: ['Regulatory landscape for open access renewable energy varies by state.', 'Requires building a critical mass of both energy buyers and sellers.', 'Complexities of grid integration and energy scheduling.'],
      },
      curation: {
        status: 'Published',
        confidence: 87,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'CLIMATE-003',
      title: 'EV Fleet Management for Last-Mile Delivery',
      vertical: Vertical.MANUFACTURING,
      impactScore: 79,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'E-commerce giants like Flipkart and Amazon are committed to deploying tens of thousands of EVs for last-mile delivery.',
      source: 'Corporate ESG Reports',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-27',
      tags: ['Sustainability', 'EV', 'Fleet Management', 'Logistics', 'IoT'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'India',
      description: 'E-commerce giants like Flipkart and Amazon are committed to deploying tens of thousands of EVs for last-mile delivery.',
      status: 'Active',
      details: {
        whyItMatters: 'Operating a large EV fleet is very different from a traditional one. Fleet operators need specialized software to manage charging, predict range, and optimize battery health to ensure operational efficiency and maximize the lifespan of their expensive assets.',
        evidenceHighlights: [
          'Lack of optimization leads to 15-20% utilization loss for EV fleets.',
          'EV fleet management platforms can improve efficiency by 25-30% and extend battery life by 18 months.',
          'Charging cost optimization alone can save ₹8-12L/year per 100-vehicle fleet.',
        ],
        moneyTrail: 'The EV ecosystem is a major investment theme. SaaS companies providing the software layer for fleet management are critical enablers and are seeing strong investor demand.',
        keyPlayers: ['Samsara', 'Geotab', 'ChargePoint', 'Numocity'],
        riskFlags: ['Interoperability issues with different EV models and charging hardware.', 'Accurate battery degradation modeling is complex.', 'Reliability of public charging infrastructure.'],
      },
      curation: {
        status: 'Published',
        confidence: 82,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'CLIMATE-004',
      title: 'Water Consumption Monitoring for Industrial Clusters',
      vertical: Vertical.MANUFACTURING,
      impactScore: 77,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'State governments are implementing water stress regulations, mandating 20-30% consumption reduction for industries in drought zones.',
      source: 'State Water Authority Directives',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-12-28',
      tags: ['Sustainability', 'Water', 'IoT', 'Compliance', 'Manufacturing'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'India',
      description: 'State governments are implementing water stress regulations, mandating 20-30% consumption reduction for industries in drought zones.',
      status: 'Active',
      details: {
        whyItMatters: 'For water-intensive industries like textiles and chemicals, water scarcity is a major operational risk. IoT-based monitoring helps them comply with regulations, avoid penalties, and reduce costs by identifying and fixing leaks and process inefficiencies.',
        evidenceHighlights: [
          'Smart water metering with AI analytics can deliver 15-25% consumption reduction.',
          'Non-compliance penalties include fines of ₹5-20 Cr and the risk of production curtailment.',
          'Granular water usage data is the first step towards effective water recycling and reuse programs.',
        ],
        moneyTrail: 'Water technology is a growing sub-sector of ClimateTech. Startups providing end-to-end solutions (hardware + software) for industrial water management are well-positioned.',
        keyPlayers: ['Grundfos', 'Xylem', 'SUEZ', 'WEGoT'],
        riskFlags: ['Hardware installation can be disruptive to plant operations.', 'Requires integration with existing industrial control systems.', 'Price sensitivity in some industrial sectors.'],
      },
      curation: {
        status: 'Under Review',
        confidence: 79,
      }
    },
    {
      id: 'CLIMATE-005',
      title: 'Green Bond Issuance Platforms for Infrastructure Projects',
      vertical: Vertical.GENERAL,
      impactScore: 72,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'SEBI\'s new green bond guidelines are opening the market for mid-sized issuers, creating a need for accessible issuance tools.',
      source: 'SEBI Green Bond Guidelines 2023',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2023-12-29',
      tags: ['Sustainability', 'Green Finance', 'ESG', 'Infrastructure', 'Bonds'],
      timeHorizon: '18+ months',
      opportunityType: OpportunityType.COMPETITIVE_VOID,
      geography: 'India',
      description: 'SEBI\'s new green bond guidelines are opening the market for mid-sized issuers, creating a need for accessible issuance tools.',
      status: 'Active',
      details: {
        whyItMatters: 'Issuing a green bond is a complex process that has traditionally been accessible only to large corporations. Digital platforms can democratize access to this growing pool of capital by simplifying ESG impact measurement, reporting, and investor matching for mid-sized developers.',
        evidenceHighlights: [
          'The Indian green bond market is projected to grow from $15B in 2024 to $40B by 2027.',
          'Digital platforms can reduce issuance costs by 30-40% compared to traditional consultant fees.',
          'Automated reporting tools are crucial for attracting institutional investors who require robust ESG data.',
        ],
        moneyTrail: 'FinTech and ClimateTech are intersecting in the green finance space. Platforms that can build trust and transparency in the green bond market are highly valuable.',
        keyPlayers: ['Clarity AI', 'Sustainalytics', 'MSCI', 'Local Indian Fintechs'],
        riskFlags: ['Building credibility and trust with institutional investors.', 'Keeping up with evolving green finance taxonomies and regulations.', 'Requires expertise in both finance and sustainability.'],
      },
      curation: {
        status: 'New',
        confidence: 75,
      }
    },
    {
      id: 'INSURTECH-002',
      title: 'Instant Claims Settlement for Motor Insurance (AI-Powered)',
      vertical: Vertical.INSURTECH,
      impactScore: 85,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Customer churn in motor insurance is at 30% due to slow claims (15-30 days average). Digital-first insurers offer 60-minute claims.',
      source: 'IRDAI Annual Report',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-12-30',
      tags: ['Insurance', 'Motor', 'Claims', 'AI', 'Customer Experience'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'India',
      description: 'Customer churn in motor insurance is at 30% due to slow claims (15-30 days average). Digital-first insurers offer 60-minute claims.',
      status: 'Active',
      details: {
        whyItMatters: 'The claims experience is the most critical touchpoint in insurance. Incumbent insurers with slow, manual processes are losing customers to digital-native competitors. AI-powered claims automation is no longer an option but a necessity for survival.',
        evidenceHighlights: [
          'IRDAI is pushing for faster settlements in its 2024 guidelines.',
          'AI photo-based damage assessment combined with fraud detection is the core technology.',
          'Early adopters report a 50% reduction in claims processing costs and a 40% improvement in customer retention.',
        ],
        moneyTrail: 'InsurTech funding is heavily focused on AI for claims and underwriting. B2B SaaS companies providing these AI modules to incumbent insurers have a large addressable market.',
        keyPlayers: ['Tractable', 'Claim Genius', 'Solera', 'Acko', 'Digit Insurance'],
        riskFlags: ['Accuracy of AI damage assessment models is critical.', 'Fraudsters may try to exploit automated systems.', 'Integration with legacy core insurance systems.'],
      },
      curation: {
        status: 'Published',
        confidence: 88,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'INSURTECH-003',
      title: 'Usage-Based Insurance (UBI) Platforms via Telematics',
      vertical: Vertical.GENERAL,
      impactScore: 82,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'IRDAI is now allowing usage-based and pay-as-you-drive policies, opening up a new product category.',
      source: 'IRDAI Circular 2024',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-12-31',
      tags: ['Insurance', 'Motor', 'Telematics', 'IoT', 'UBI'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'India',
      description: 'IRDAI is now allowing usage-based and pay-as-you-drive policies, opening up a new product category.',
      status: 'Active',
      details: {
        whyItMatters: 'Traditional motor insurance uses crude proxies for risk (age, car model). Usage-Based Insurance (UBI) uses real-time driving data (from telematics) to price risk accurately, allowing insurers to reward safe drivers with lower premiums and attract profitable customer segments.',
        evidenceHighlights: [
          'Insurers can offer 30-50% discounts to safe drivers, improving loss ratios by 15-20 percentage points.',
          'Telematics adoption is less than 5% in India, representing a huge growth opportunity.',
          'UBI is highly attractive to young drivers (18-25) who are often penalized with high premiums.',
        ],
        moneyTrail: 'The telematics and UBI platform market is well-established globally. The opening of the Indian market presents a significant opportunity for both global players and local startups.',
        keyPlayers: ['Cambridge Mobile Telematics', 'Verisk', 'The Floow', 'Paytm Insurance'],
        riskFlags: ['Customer concerns about data privacy and tracking.', 'Cost of telematics hardware (though smartphone-as-sensor models are emerging).', 'Requires robust data analytics capabilities to price risk effectively.'],
      },
      curation: {
        status: 'Published',
        confidence: 85,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'INSURTECH-004',
      title: 'Embedded Insurance for E-Commerce & Fintech',
      vertical: Vertical.INSURTECH,
      impactScore: 80,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Fintech apps like PhonePe and Paytm are becoming massive distributors of micro-insurance products.',
      source: 'Fintech Industry News',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2024-01-01',
      tags: ['Insurance', 'Embedded', 'API', 'E-Commerce', 'Distribution'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.COMPETITIVE_VOID,
      geography: 'India',
      description: 'Fintech apps like PhonePe and Paytm are becoming massive distributors of micro-insurance products.',
      status: 'Active',
      details: {
        whyItMatters: 'Traditional insurance distribution channels (agents, brokers) are expensive and have limited reach. Embedding insurance at the point of sale on digital platforms offers a low-cost, high-volume distribution channel to reach millions of new customers.',
        evidenceHighlights: [
          'The embedded insurance market in India is projected to reach ₹10K Cr by 2026.',
          'Attach rates of 8-12% on e-commerce platforms generate ₹500-1000 Cr in annual premiums for partnering insurers.',
          'Insurers need API-first platforms for instant, low-friction policy issuance.',
        ],
        moneyTrail: 'B2B "Insurance-as-a-Service" platforms are attracting significant VC funding. They provide the technology layer that connects large digital platforms with incumbent insurers.',
        keyPlayers: ['Cover Genius', 'Bolttech', 'Tint', 'Zopper'],
        riskFlags: ['Channel conflict with existing agent networks.', 'Ensuring the product is sold responsibly and not just as a forced add-on.', 'Requires highly scalable and reliable API infrastructure.'],
      },
      curation: {
        status: 'Published',
        confidence: 83,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'INSURTECH-005',
      title: 'Fraud Detection for Health Insurance Claims',
      vertical: Vertical.GENERAL,
      impactScore: 78,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'Health insurance fraud is estimated at 10-15% of all claims, amounting to ₹5K-8K Cr annually.',
      source: 'Insurance Industry estimates',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2024-01-02',
      tags: ['Insurance', 'Health', 'Fraud Detection', 'AI', 'Claims'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'India',
      description: 'Health insurance fraud is estimated at 10-15% of all claims, amounting to ₹5K-8K Cr annually.',
      status: 'Active',
      details: {
        whyItMatters: 'Fraud inflates costs for everyone and threatens the viability of health insurance. Manual fraud detection is ineffective. AI is essential to analyze vast amounts of claims data to identify suspicious patterns and protect insurers from losses.',
        evidenceHighlights: [
          'AI-based fraud detection systems can achieve 70-80% detection rates, compared to <30% for manual methods.',
          'Each 1% reduction in fraud saves the industry ₹500-800 Cr.',
          'IRDAI is mandating stronger fraud control measures from all health insurers.',
        ],
        moneyTrail: 'AI in healthcare is a major investment area. Companies that can build sophisticated fraud detection models using both structured and unstructured data (like doctor\'s notes) are highly valuable.',
        keyPlayers: ['Shift Technology', 'FRISS', 'Quantexa', 'SAS'],
        riskFlags: ['Access to large, high-quality historical claims data is necessary for model training.', 'Risk of false positives that may delay legitimate claims.', 'Fraud patterns constantly evolve, requiring continuous model updates.'],
      },
      curation: {
        status: 'Published',
        confidence: 81,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'INSURTECH-006',
      title: 'Parametric Insurance for Agriculture (Weather-Based)',
      vertical: Vertical.AGRITECH,
      impactScore: 74,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'Traditional crop insurance claim settlement takes 6-12 months due to manual loss assessment, causing farmer distress.',
      source: 'Ministry of Agriculture Data',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2024-01-03',
      tags: ['Insurance', 'Agriculture', 'Parametric', 'Weather', 'IoT'],
      timeHorizon: '18+ months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'India',
      description: 'Traditional crop insurance claim settlement takes 6-12 months due to manual loss assessment, causing farmer distress.',
      status: 'Active',
      details: {
        whyItMatters: 'Delayed claim payments defeat the purpose of crop insurance, which is to provide timely relief to farmers. Parametric insurance solves this by using objective data triggers (e.g., rainfall below a certain level) to automate payouts, ensuring farmers get money when they need it most.',
        evidenceHighlights: [
          'Parametric insurance enables claim settlements in 3-7 days.',
          'Modernization of the government\'s PMFBY scheme is creating opportunities for tech-based solutions.',
          'Insurers need platforms that can integrate weather station data and satellite imagery to design and manage parametric products.',
        ],
        moneyTrail: 'AgriTech and InsurTech are converging. Startups that can provide the data infrastructure for parametric insurance are critical enablers for this new market.',
        keyPlayers: ['WRMS', 'Skymet', 'IBISA Network', 'Arbol'],
        riskFlags: ['Basis risk (when the data trigger does not perfectly correlate with the farmer\'s actual loss).', 'Requires a dense network of reliable weather stations or high-resolution satellite data.', 'Farmer education is needed for a new and complex product.'],
      },
      curation: {
        status: 'Under Review',
        confidence: 77,
      }
    },
    {
      id: 'LOGISTICS-002',
      title: 'Route Optimization for B2B Distribution Networks',
      vertical: Vertical.GENERAL,
      impactScore: 76,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'FMCG/pharma distributors run 20-50 delivery routes daily with manual planning, leading to 20-25% inefficiency.',
      source: 'Logistics Sector Report',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2024-01-04',
      tags: ['Logistics', 'Distribution', 'Route Optimization', 'AI', 'Last-Mile'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'India',
      description: 'FMCG/pharma distributors run 20-50 delivery routes daily with manual planning, leading to 20-25% inefficiency.',
      status: 'Active',
      details: {
        whyItMatters: 'With rising fuel costs and pressure on margins, B2B distributors can no longer afford inefficient delivery routes. AI-powered route optimization software provides a clear and immediate ROI by reducing distance traveled, saving fuel, and improving vehicle utilization.',
        evidenceHighlights: [
          'AI optimization reduces distance traveled by 15-20%.',
          'Improves on-time delivery from 70% to over 90%.',
          'Distributors can save ₹20-40L per year in fuel and vehicle costs.',
        ],
        moneyTrail: 'Logistics tech (LogiTech) is a well-funded space. SaaS companies offering route optimization solutions with a fast ROI are seeing strong demand.',
        keyPlayers: ['Locus', 'FarEye', 'LogiNext', 'Tookan'],
        riskFlags: ['Resistance to change from drivers and dispatchers used to manual processes.', 'Requires accurate data on traffic patterns and delivery time windows.', 'Integration with existing order management systems.'],
      },
      curation: {
        status: 'Under Review',
        confidence: 78,
      }
    },
    {
      id: 'LOGISTICS-003',
      title: 'Warehouse Management Systems for 3PL Providers',
      vertical: Vertical.LOGISTICS,
      impactScore: 81,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'The 3PL market is growing 12% CAGR, but e-commerce clients demand 99.5%+ accuracy, which legacy systems cannot provide.',
      source: '3PL Market Analysis',
      sourceReliability: SourceReliability.MEDIUM,
      dateDetected: '2024-01-05',
      tags: ['Logistics', 'Warehousing', '3PL', 'WMS', 'E-Commerce'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.TECH_GAP,
      geography: 'India',
      description: 'The 3PL market is growing 12% CAGR, but e-commerce clients demand 99.5%+ accuracy, which legacy systems cannot provide.',
      status: 'Active',
      details: {
        whyItMatters: 'For Third-Party Logistics (3PL) providers, efficiency and accuracy are everything. Modern, cloud-based Warehouse Management Systems (WMS) are essential to meet the demanding service levels of e-commerce clients and to profitably manage multi-client operations.',
        evidenceHighlights: [
          'Cloud WMS with barcode scanning and pick-path optimization delivers 99.7%+ accuracy and a 30% improvement in labor productivity.',
          '3PLs using manual/legacy WMS achieve only 95-97% accuracy, leading to lost contracts.',
          'Implementation ROI is typically seen in 8-12 months.',
        ],
        moneyTrail: 'The warehouse automation and software market is booming. SaaS WMS providers that are built for the specific needs of 3PLs (multi-client, flexible billing) are well-positioned.',
        keyPlayers: ['Unicommerce', 'Vinculum', 'Logiwa', 'Fishbowl'],
        riskFlags: ['Implementation can be complex and disruptive.', 'Requires training for warehouse staff.', 'Integration with various client ERPs and e-commerce platforms.'],
      },
      curation: {
        status: 'Published',
        confidence: 84,
        humanReviewer: 'AI Model & Jane Doe',
      }
    },
    {
      id: 'LOGISTICS-004',
      title: 'Freight Rate Management Platforms for Shippers',
      vertical: Vertical.GENERAL,
      impactScore: 73,
      trend: OpportunityTrend.STABLE,
      evidenceSnippet: 'Freight rates are highly volatile post-pandemic, and shippers without access to market data are overpaying by 15-25%.',
      source: 'Freight Industry Report',
      sourceReliability: SourceReliability.LOW,
      dateDetected: '2024-01-06',
      tags: ['Logistics', 'Freight', 'Procurement', 'Marketplace', 'Cost Optimization'],
      timeHorizon: '6-18 months',
      opportunityType: OpportunityType.CUSTOMER_PAIN,
      geography: 'India',
      description: 'Freight rates are highly volatile post-pandemic, and shippers without access to market data are overpaying by 15-25%.',
      status: 'Active',
      details: {
        whyItMatters: 'Freight is a major cost center for manufacturers and retailers. Digital freight marketplaces provide price transparency and automate the procurement process, helping shippers to reduce costs and secure capacity in a volatile market.',
        evidenceHighlights: [
          'Shippers spending ₹50-200 Cr/year on freight can save ₹8-30 Cr through better rate negotiation.',
          'Digital platforms provide access to a wider pool of verified carriers.',
          'Automates the process of getting quotes, booking trucks, and tracking shipments.',
        ],
        moneyTrail: 'Digital freight platforms have attracted massive funding globally. The Indian market is large and fragmented, offering a significant opportunity for tech platforms to drive efficiency.',
        keyPlayers: ['BlackBuck', 'Rivigo', 'WheelsEye', 'Delhivery'],
        riskFlags: ['Building a critical mass of both shippers and carriers is a classic marketplace challenge.', 'Ensuring carrier reliability and service quality.', 'Competition is intense.'],
      },
      curation: {
        status: 'Under Review',
        confidence: 76,
      }
    },
    {
      id: 'LOGISTICS-005',
      title: 'Cold Chain Monitoring for Pharma & Food',
      vertical: Vertical.MEDTECH,
      impactScore: 84,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: '8-12% of pharma/food products are spoiled due to temperature excursions in the cold chain. FSSAI and Drug Controller are increasing traceability rules.',
      source: 'Regulatory Filings',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2024-01-07',
      tags: ['Logistics', 'Cold Chain', 'Pharma', 'Food Safety', 'IoT'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'India',
      description: '8-12% of pharma/food products are spoiled due to temperature excursions in the cold chain. FSSAI and Drug Controller are increasing traceability rules.',
      status: 'Active',
      details: {
        whyItMatters: 'Maintaining the integrity of the cold chain is critical for patient safety (vaccines, biologics) and food safety. IoT-based real-time monitoring is becoming a regulatory requirement and is essential to prevent massive financial losses from spoilage.',
        evidenceHighlights: [
          'IoT monitoring can reduce spoilage to less than 2%.',
          'Pharma companies distributing ₹500+ Cr of temperature-sensitive products can save ₹25-50 Cr annually.',
          'Automated compliance documentation is needed to meet export requirements (e.g., to the EU).',
        ],
        moneyTrail: 'The IoT-based asset tracking market is growing rapidly. Niche players focusing on the specific needs and validation requirements of the pharma industry are highly sought after.',
        keyPlayers: ['Roambee', 'TagBox', 'Tive', 'Emerson'],
        riskFlags: ['Cost and reverse logistics of IoT sensors.', 'Ensuring sensor accuracy and calibration.', 'Integration with existing logistics and ERP systems.'],
      },
      curation: {
        status: 'Published',
        confidence: 87,
        humanReviewer: 'AI Model & Jane Doe',
      }
    }
  ],
  auditLogs: [],
  dataSources: [
    { id: 'ds_1', name: 'Federal Register (Daily)', type: SourceType.PUBLIC, status: 'Active', lastSync: '10 mins ago', itemCount: 1240 },
    { id: 'ds_2', name: 'ClinicalTrials.gov', type: SourceType.PUBLIC, status: 'Active', lastSync: '2 hours ago', itemCount: 8500 },
    { id: 'ds_3', name: 'Bloomberg Terminal API', type: SourceType.LICENSED, status: 'Active', lastSync: '1 min ago', itemCount: 420 },
    { id: 'ds_4', name: 'Pitchbook VC Feed', type: SourceType.LICENSED, status: 'Syncing', lastSync: '1 day ago', itemCount: 150 },
  ]
};

// Initialize DB
const getDb = (): DB => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DB));
    return INITIAL_DB;
  }
  return JSON.parse(stored);
};

const saveDb = (db: DB) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const mockDb = {
  getUsers: () => getDb().users,
  getTenants: () => getDb().tenants,
  getOpportunities: () => getDb().opportunities,
  getAuditLogs: () => getDb().auditLogs,
  getDataSources: () => getDb().dataSources,
  
  findUserByEmail: (email: string) => getDb().users.find(u => u.email === email),
  
  createUser: (email: string, tenantSlug: string, role: UserRole) => {
    const db = getDb();
    const newUser: User = {
      id: `u_${Date.now()}`,
      email,
      name: email.split('@')[0],
      role,
      tenantSlug,
      bookmarks: [],
      savedItems: []
    };
    db.users.push(newUser);
    
    // Update tenant count
    const tenantIndex = db.tenants.findIndex(t => t.slug === tenantSlug);
    if (tenantIndex >= 0) {
      db.tenants[tenantIndex].userCount += 1;
    }
    
    saveDb(db);
    return newUser;
  },

  createTenant: (name: string) => {
    const db = getDb();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newTenant: Tenant = {
      id: `t_${Date.now()}`,
      name,
      slug,
      plan: 'Starter',
      mrr: 0,
      userCount: 1, // Assumes creator is first user
    };
    db.tenants.push(newTenant);
    saveDb(db);
    return newTenant;
  },

  toggleBookmark: (userId: string, oppId: string) => {
    const db = getDb();
    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return null;

    const user = db.users[userIndex];
    if (user.bookmarks.includes(oppId)) {
        user.bookmarks = user.bookmarks.filter(id => id !== oppId);
    } else {
        user.bookmarks.push(oppId);
        // Initialize saved item if not exists
        if (!user.savedItems.some(item => item.oppId === oppId)) {
            user.savedItems.push({
                oppId,
                note: '',
                personalConfidence: 50,
                savedAt: new Date().toISOString()
            });
        }
    }
    
    db.users[userIndex] = user;
    saveDb(db);
    return user;
  },

  updateSavedItem: (userId: string, oppId: string, updates: Partial<SavedOpportunity>) => {
      const db = getDb();
      const userIndex = db.users.findIndex(u => u.id === userId);
      if (userIndex === -1) return null;

      const user = db.users[userIndex];
      const itemIndex = user.savedItems.findIndex(i => i.oppId === oppId);

      if (itemIndex >= 0) {
          user.savedItems[itemIndex] = { ...user.savedItems[itemIndex], ...updates };
      } else {
          user.savedItems.push({
              oppId,
              note: '',
              personalConfidence: 50,
              savedAt: new Date().toISOString(),
              ...updates
          });
          if(!user.bookmarks.includes(oppId)) user.bookmarks.push(oppId);
      }

      db.users[userIndex] = user;
      saveDb(db);
      return user;
  },

  createAuditLog: (userId: string, tenantSlug: string, action: string, meta: any) => {
      const db = getDb();
      const newLog: AuditLog = {
          id: `log_${Date.now()}`,
          userId,
          tenantSlug,
          action,
          timestamp: new Date().toISOString(),
          meta
      };
      db.auditLogs.push(newLog);
      saveDb(db);
      return newLog;
  },

  addOpportunity: (opp: Opportunity) => {
    const db = getDb();
    // Add to beginning of list
    db.opportunities.unshift(opp);
    saveDb(db);
    return opp;
  },

  updateOpportunity: (id: string, updates: Partial<Opportunity>) => {
      const db = getDb();
      const idx = db.opportunities.findIndex(o => o.id === id);
      if (idx !== -1) {
          db.opportunities[idx] = { ...db.opportunities[idx], ...updates };
          saveDb(db);
          return db.opportunities[idx];
      }
      return null;
  },

  deleteOpportunity: (id: string) => {
      const db = getDb();
      db.opportunities = db.opportunities.filter(o => o.id !== id);
      saveDb(db);
  }
};