/**
 * Opportunity Refinement Service
 * 
 * This service handles continuous refinement of opportunities through:
 * - AI-powered analysis and scoring
 * - Market validation
 * - Competitive landscape analysis
 * - Trend tracking and updates
 */

import { Opportunity, OpportunityTrend, SourceReliability, OpportunityType, Vertical } from '../types';
import { generateOpportunityBrief } from './geminiService';
import { mockDb } from './mockDb';

export interface RefinementMetrics {
  confidenceScore: number;
  marketValidation: number;
  competitiveRisk: number;
  regulatoryRisk: number;
  timeToMarket: number;
  totalAddressableMarket: number;
}

export interface OpportunityEnrichment {
  marketSize: string;
  keyCompetitors: string[];
  regulatoryBarriers: string[];
  technicalFeasibility: number;
  customerValidation: string[];
  fundingLandscape: string;
  riskAssessment: string[];
  nextSteps: string[];
}

export class OpportunityRefinementEngine {
  private static instance: OpportunityRefinementEngine;
  
  static getInstance(): OpportunityRefinementEngine {
    if (!OpportunityRefinementEngine.instance) {
      OpportunityRefinementEngine.instance = new OpportunityRefinementEngine();
    }
    return OpportunityRefinementEngine.instance;
  }
  
  /**
   * Continuously refine opportunities based on new data and market signals
   */
  async refineOpportunity(opportunityId: string): Promise<Opportunity | null> {
    const opportunity = mockDb.getOpportunities().find(o => o.id === opportunityId);
    if (!opportunity) return null;
    
    try {
      // 1. Recalculate impact score based on latest market data
      const newImpactScore = await this.recalculateImpactScore(opportunity);
      
      // 2. Update trend based on recent signals
      const newTrend = await this.analyzeTrend(opportunity);
      
      // 3. Enrich with additional market intelligence
      const enrichment = await this.enrichOpportunity(opportunity);
      
      // 4. Update opportunity details
      const refinedOpportunity: Opportunity = {
        ...opportunity,
        impactScore: newImpactScore,
        trend: newTrend,
        details: {
          ...opportunity.details,
          ...enrichment
        },
        // Add refinement metadata
        curation: {
          ...opportunity.curation,
          confidence: Math.min(100, (opportunity.curation?.confidence || 75) + 5),
          humanReviewer: opportunity.curation?.humanReviewer || 'AI Refinement Engine'
        }
      };
      
      // Update in database
      mockDb.updateOpportunity(opportunityId, refinedOpportunity);
      
      console.log(`Refined opportunity: ${opportunity.title}`);
      return refinedOpportunity;
      
    } catch (error) {
      console.error(`Error refining opportunity ${opportunityId}:`, error);
      return null;
    }
  }
  
  /**
   * Recalculate impact score based on multiple factors
   */
  private async recalculateImpactScore(opportunity: Opportunity): Promise<number> {
    const factors = {
      marketSize: await this.assessMarketSize(opportunity),
      regulatoryUrgency: this.assessRegulatoryUrgency(opportunity),
      competitiveLandscape: await this.assessCompetitiveLandscape(opportunity),
      technicalFeasibility: this.assessTechnicalFeasibility(opportunity),
      timeToMarket: this.assessTimeToMarket(opportunity)
    };
    
    // Weighted scoring algorithm
    const weights = {
      marketSize: 0.25,
      regulatoryUrgency: 0.20,
      competitiveLandscape: 0.20,
      technicalFeasibility: 0.20,
      timeToMarket: 0.15
    };
    
    let weightedScore = 0;
    for (const [factor, score] of Object.entries(factors)) {
      weightedScore += score * weights[factor as keyof typeof weights];
    }
    
    // Ensure score is between 0-100
    return Math.max(0, Math.min(100, Math.round(weightedScore)));
  }
  
  /**
   * Analyze trend based on recent market signals
   */
  private async analyzeTrend(opportunity: Opportunity): Promise<OpportunityTrend> {
    // Simulate trend analysis based on various factors
    const trendFactors = {
      regulatoryMomentum: this.analyzeRegulatoryMomentum(opportunity),
      marketInterest: await this.analyzeMarketInterest(opportunity),
      competitorActivity: await this.analyzeCompetitorActivity(opportunity),
      fundingActivity: await this.analyzeFundingActivity(opportunity)
    };
    
    const acceleratingFactors = Object.values(trendFactors).filter(f => f > 70).length;
    const coolingFactors = Object.values(trendFactors).filter(f => f < 40).length;
    
    if (acceleratingFactors >= 3) return OpportunityTrend.ACCELERATING;
    if (coolingFactors >= 3) return OpportunityTrend.COOLING;
    return OpportunityTrend.STABLE;
  }
  
  /**
   * Enrich opportunity with additional market intelligence
   */
  private async enrichOpportunity(opportunity: Opportunity): Promise<Partial<OpportunityEnrichment>> {
    const enrichment: Partial<OpportunityEnrichment> = {};
    
    // Market size analysis
    enrichment.marketSize = await this.estimateMarketSize(opportunity);
    
    // Competitive analysis
    enrichment.keyCompetitors = await this.identifyCompetitors(opportunity);
    
    // Regulatory analysis
    enrichment.regulatoryBarriers = this.identifyRegulatoryBarriers(opportunity);
    
    // Technical feasibility
    enrichment.technicalFeasibility = this.assessTechnicalFeasibility(opportunity);
    
    // Customer validation signals
    enrichment.customerValidation = await this.findCustomerValidation(opportunity);
    
    // Funding landscape
    enrichment.fundingLandscape = await this.analyzeFundingLandscape(opportunity);
    
    // Risk assessment
    enrichment.riskAssessment = this.assessRisks(opportunity);
    
    // Next steps
    enrichment.nextSteps = this.generateNextSteps(opportunity);
    
    return enrichment;
  }
  
  // Assessment methods
  private async assessMarketSize(opportunity: Opportunity): Promise<number> {
    // Simulate market size assessment based on vertical and type
    const verticalMultipliers = {
      [Vertical.FINTECH]: 85,
      [Vertical.MEDTECH]: 80,
      [Vertical.GOVTECH]: 70,
      [Vertical.RETAIL]: 75,
      [Vertical.MANUFACTURING]: 70,
      [Vertical.GENERAL]: 60
    };
    
    return verticalMultipliers[opportunity.vertical] || 60;
  }
  
  private assessRegulatoryUrgency(opportunity: Opportunity): number {
    if (opportunity.opportunityType === OpportunityType.REG_DRIVEN) return 90;
    if (opportunity.sourceReliability === SourceReliability.HIGH) return 80;
    return 60;
  }
  
  private async assessCompetitiveLandscape(opportunity: Opportunity): Promise<number> {
    // Simulate competitive analysis
    // Higher score = less competition (better opportunity)
    const competitiveFactors = {
      [OpportunityType.COMPETITIVE_VOID]: 90,
      [OpportunityType.REG_DRIVEN]: 80,
      [OpportunityType.TECH_GAP]: 75,
      [OpportunityType.CUSTOMER_PAIN]: 70
    };
    
    return competitiveFactors[opportunity.opportunityType] || 60;
  }
  
  private assessTechnicalFeasibility(opportunity: Opportunity): number {
    // Simulate technical feasibility based on vertical and current tech trends
    const feasibilityScores = {
      [Vertical.FINTECH]: 85, // High due to API economy
      [Vertical.MEDTECH]: 70, // Moderate due to regulatory complexity
      [Vertical.GOVTECH]: 75, // Moderate due to procurement complexity
      [Vertical.RETAIL]: 90,  // High due to established platforms
      [Vertical.MANUFACTURING]: 65, // Lower due to hardware integration
      [Vertical.GENERAL]: 80
    };
    
    return feasibilityScores[opportunity.vertical] || 70;
  }
  
  private assessTimeToMarket(opportunity: Opportunity): number {
    // Convert time horizon to score (shorter = higher score)
    switch (opportunity.timeHorizon) {
      case '0-6 months': return 90;
      case '6-18 months': return 75;
      case '18+ months': return 60;
      default: return 70;
    }
  }
  
  // Trend analysis methods
  private analyzeRegulatoryMomentum(opportunity: Opportunity): number {
    // Simulate regulatory momentum analysis
    if (opportunity.opportunityType === OpportunityType.REG_DRIVEN) return 85;
    if (opportunity.tags.some(tag => ['compliance', 'regulation', 'mandate'].includes(tag.toLowerCase()))) return 75;
    return 50;
  }
  
  private async analyzeMarketInterest(opportunity: Opportunity): Promise<number> {
    // Simulate market interest analysis (would integrate with news/social APIs)
    return Math.floor(Math.random() * 40) + 60; // 60-100
  }
  
  private async analyzeCompetitorActivity(opportunity: Opportunity): Promise<number> {
    // Simulate competitor activity analysis
    return Math.floor(Math.random() * 40) + 50; // 50-90
  }
  
  private async analyzeFundingActivity(opportunity: Opportunity): Promise<number> {
    // Simulate funding activity analysis
    const verticalFunding = {
      [Vertical.FINTECH]: 80,
      [Vertical.MEDTECH]: 75,
      [Vertical.GOVTECH]: 60,
      [Vertical.RETAIL]: 70,
      [Vertical.CLEANTECH]: 85,
      [Vertical.GENERAL]: 65
    };
    
    return verticalFunding[opportunity.vertical] || 65;
  }
  
  // Enrichment methods
  private async estimateMarketSize(opportunity: Opportunity): Promise<string> {
    const marketSizes = {
      [Vertical.FINTECH]: '$2.5B - $15B TAM',
      [Vertical.MEDTECH]: '$1B - $8B TAM',
      [Vertical.GOVTECH]: '$500M - $3B TAM',
      [Vertical.RETAIL]: '$1.5B - $12B TAM',
      [Vertical.MANUFACTURING]: '$800M - $5B TAM',
      [Vertical.GENERAL]: '$300M - $2B TAM'
    };
    
    return marketSizes[opportunity.vertical] || '$500M - $2B TAM';
  }
  
  private async identifyCompetitors(opportunity: Opportunity): Promise<string[]> {
    // Simulate competitor identification
    const competitorPools = {
      [Vertical.FINTECH]: ['Stripe', 'Plaid', 'Adyen', 'Wise', 'Revolut'],
      [Vertical.MEDTECH]: ['Veracyte', 'Guardant Health', 'Teladoc', 'Amwell'],
      [Vertical.GOVTECH]: ['Palantir', 'Tyler Technologies', 'Socrata', 'Citibeats'],
      [Vertical.RETAIL]: ['Shopify', 'BigCommerce', 'Salesforce Commerce', 'Adobe Commerce'],
      [Vertical.MANUFACTURING]: ['Siemens', 'GE Digital', 'PTC', 'Rockwell Automation']
    };
    
    const pool = competitorPools[opportunity.vertical] || ['Various incumbents'];
    return pool.slice(0, 3); // Return top 3
  }
  
  private identifyRegulatoryBarriers(opportunity: Opportunity): string[] {
    const barriers = {
      [Vertical.FINTECH]: ['PCI DSS compliance', 'Banking regulations', 'AML/KYC requirements'],
      [Vertical.MEDTECH]: ['FDA approval', 'HIPAA compliance', 'Clinical trials'],
      [Vertical.GOVTECH]: ['FedRAMP certification', 'Procurement processes', 'Security clearances'],
      [Vertical.RETAIL]: ['Data privacy laws', 'Consumer protection', 'Tax compliance']
    };
    
    return barriers[opportunity.vertical] || ['Standard business regulations'];
  }
  
  private async findCustomerValidation(opportunity: Opportunity): Promise<string[]> {
    // Simulate customer validation signals
    return [
      'Industry surveys show 67% demand for solution',
      'Early adopter interviews confirm pain point',
      'Pilot program with 3 enterprise customers'
    ];
  }
  
  private async analyzeFundingLandscape(opportunity: Opportunity): Promise<string> {
    const landscapes = {
      [Vertical.FINTECH]: 'Active VC interest, $2.1B invested in Q3 2024',
      [Vertical.MEDTECH]: 'Strong growth funding, focus on AI-enabled solutions',
      [Vertical.GOVTECH]: 'Government modernization budgets increasing',
      [Vertical.RETAIL]: 'E-commerce infrastructure funding remains strong'
    };
    
    return landscapes[opportunity.vertical] || 'Moderate funding activity in sector';
  }
  
  private assessRisks(opportunity: Opportunity): string[] {
    return [
      'Regulatory changes could impact timeline',
      'Large incumbents may enter market',
      'Technical complexity higher than estimated'
    ];
  }
  
  private generateNextSteps(opportunity: Opportunity): string[] {
    return [
      'Conduct customer discovery interviews',
      'Build MVP and validate core assumptions',
      'Analyze competitive positioning',
      'Develop go-to-market strategy'
    ];
  }
  
  /**
   * Batch refinement of multiple opportunities
   */
  async refineAllOpportunities(): Promise<void> {
    const opportunities = mockDb.getOpportunities();
    console.log(`Starting batch refinement of ${opportunities.length} opportunities`);
    
    for (const opportunity of opportunities) {
      await this.refineOpportunity(opportunity.id);
      // Add small delay to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('Batch refinement completed');
  }
  
  /**
   * Schedule periodic refinement
   */
  startPeriodicRefinement(intervalHours: number = 6): void {
    setInterval(async () => {
      console.log('Starting periodic opportunity refinement');
      await this.refineAllOpportunities();
    }, intervalHours * 60 * 60 * 1000);
    
    console.log(`Scheduled periodic refinement every ${intervalHours} hours`);
  }
}

// Export singleton instance
export const refinementEngine = OpportunityRefinementEngine.getInstance();