export enum UserRole {
  PLATFORM_ADMIN = 'Platform Admin',
  TENANT_ADMIN = 'Tenant Admin',
  TENANT_USER = 'Tenant User',
}

export interface SavedOpportunity {
  oppId: string;
  note: string;
  personalConfidence: number; // 0-100
  savedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantSlug: string;
  bookmarks: string[];
  savedItems: SavedOpportunity[];
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: 'Free' | 'Starter' | 'Growth' | 'Enterprise';
  mrr: number;
  userCount: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  tenantSlug: string;
  action: string;
  timestamp: string;
  meta: any;
}

export enum OpportunityTrend {
  ACCELERATING = 'Accelerating',
  STABLE = 'Stable',
  COOLING = 'Cooling',
}

export enum Vertical {
  FINTECH = 'FinTech',
  MEDTECH = 'MedTech',
  GOVTECH = 'GovTech',
  RETAIL = 'Retail',
  MANUFACTURING = 'Manufacturing',
  AGRITECH = 'AgriTech',
  EDTECH = 'EdTech',
  PROPTECH = 'PropTech',
  CLEANTECH = 'CleanTech',
  INSURTECH = 'InsurTech',
  LOGISTICS = 'Logistics',
  GENERAL = 'General',
}

export enum OpportunityType {
  REG_DRIVEN = 'Reg-Driven',
  TECH_GAP = 'Tech Gap',
  CUSTOMER_PAIN = 'Customer Pain',
  COMPETITIVE_VOID = 'Competitive Void',
}

export enum SourceReliability {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export enum SourceType {
  PUBLIC = 'Public Web',
  LICENSED = 'Licensed Feed',
  UPLOAD = 'User Upload',
  MANUAL = 'Manual Entry',
}

export interface DataSource {
  id: string;
  name: string;
  type: SourceType;
  status: 'Active' | 'Error' | 'Syncing';
  lastSync: string;
  itemCount: number;
  icon?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  vertical: Vertical;
  impactScore: number; // 1-100
  trend: OpportunityTrend;
  evidenceSnippet: string;
  source: string;
  sourceReliability: SourceReliability;
  dateDetected: string;
  tags: string[];
  description?: string; 
  timeHorizon: '0-6 months' | '6-18 months' | '18+ months';
  opportunityType: OpportunityType;
  geography: string;
  status: 'Active' | 'Staging';
  details?: {
    whyItMatters: string;
    evidenceHighlights: string[];
    moneyTrail: string;
    keyPlayers: string[];
    riskFlags: string[];
  };
  curation?: {
    status: 'New' | 'Under Review' | 'Published';
    confidence: number; // 0-100
    humanReviewer?: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}