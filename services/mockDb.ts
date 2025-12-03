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
      id: 'opp_1',
      title: 'Real-time Payments Compliance Gap',
      vertical: Vertical.FINTECH,
      impactScore: 92,
      trend: OpportunityTrend.ACCELERATING,
      evidenceSnippet: 'New CFPB rule 1033 regarding personal financial data rights requires 99.9% uptime APIs.',
      source: 'CFPB Federal Register',
      sourceReliability: SourceReliability.HIGH,
      dateDetected: '2023-10-24',
      tags: ['Regulation', 'API', 'Compliance'],
      timeHorizon: '0-6 months',
      opportunityType: OpportunityType.REG_DRIVEN,
      geography: 'US',
      description: 'The finalized Rule 1033 mandates that data providers must make covered data available in a machine-readable format. There is a significant gap in middleware solutions for mid-sized banks to meet the uptime and latency requirements without overhauling core legacy systems.',
      status: 'Active'
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
      geography: 'US',
      description: 'New billing pathways are opening for software-as-a-medical-device (SaMD) that performs triage. Hospitals are currently under-equipped to track utilization of these specific tools for claim submission.',
      status: 'Active'
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
      geography: 'US',
      description: 'Large incumbents have legacy hardware lock-in, but the new grant language favors open-standard interoperability, creating a wedge for software-first players to layer on top of existing traffic controllers.',
      status: 'Active'
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
      geography: 'EU',
      description: 'With MiCA providing clarity, B2B cross-border payment flows using euro-backed stablecoins are becoming viable for treasury management, bypassing traditional SWIFT delays.',
      status: 'Active'
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
      geography: 'US',
      description: 'Healthcare providers are pulling back on RPM programs due to audit fears. There is a white space for compliance-verification platforms that automatically document "medical necessity" for every RPM claim.',
      status: 'Active'
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