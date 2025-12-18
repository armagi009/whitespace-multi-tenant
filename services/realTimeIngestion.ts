/**
 * Real-Time Data Ingestion Service
 * 
 * This service handles real-time data ingestion from various sources
 * and processes them into actionable opportunities.
 */

import { DataSourceManager, DATA_SOURCE_CONFIGS } from './dataSourceIntegrations';
import { refinementEngine } from './opportunityRefinement';
import { mockDb } from './mockDb';

export class RealTimeIngestionService {
  private static instance: RealTimeIngestionService;
  private dataSourceManager: DataSourceManager;
  private isRunning: boolean = false;
  
  static getInstance(): RealTimeIngestionService {
    if (!RealTimeIngestionService.instance) {
      RealTimeIngestionService.instance = new RealTimeIngestionService();
    }
    return RealTimeIngestionService.instance;
  }
  
  constructor() {
    this.dataSourceManager = DataSourceManager.getInstance();
  }
  
  /**
   * Start the real-time ingestion system
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      console.log('Real-time ingestion already running');
      return;
    }
    
    console.log('Starting real-time data ingestion system...');
    
    try {
      // Initialize all data sources
      await this.dataSourceManager.initializeAllSources();
      
      // Start periodic refinement
      refinementEngine.startPeriodicRefinement(6); // Every 6 hours
      
      // Set up webhook listeners (for real-time sources)
      this.setupWebhookListeners();
      
      // Set up monitoring and health checks
      this.setupMonitoring();
      
      this.isRunning = true;
      console.log('✅ Real-time ingestion system started successfully');
      
    } catch (error) {
      console.error('❌ Failed to start real-time ingestion system:', error);
      throw error;
    }
  }
  
  /**
   * Stop the real-time ingestion system
   */
  async stop(): Promise<void> {
    if (!this.isRunning) {
      console.log('Real-time ingestion not running');
      return;
    }
    
    console.log('Stopping real-time data ingestion system...');
    
    // Stop all data sources
    const sources = this.dataSourceManager.getSourceStatus();
    for (const { config } of sources) {
      await this.dataSourceManager.stopDataSource(config.id);
    }
    
    this.isRunning = false;
    console.log('✅ Real-time ingestion system stopped');
  }
  
  /**
   * Get system status
   */
  getStatus(): {
    isRunning: boolean;
    activeSources: number;
    totalSources: number;
    lastUpdate: string;
    opportunitiesProcessed: number;
  } {
    const sources = this.dataSourceManager.getSourceStatus();
    const activeSources = sources.filter(s => s.isRunning).length;
    const opportunities = mockDb.getOpportunities();
    
    return {
      isRunning: this.isRunning,
      activeSources,
      totalSources: sources.length,
      lastUpdate: new Date().toISOString(),
      opportunitiesProcessed: opportunities.length
    };
  }
  
  /**
   * Manual trigger for specific data source
   */
  async triggerSourceSync(sourceId: string): Promise<void> {
    const config = DATA_SOURCE_CONFIGS.find(c => c.id === sourceId);
    if (!config) {
      throw new Error(`Data source not found: ${sourceId}`);
    }
    
    console.log(`Manually triggering sync for: ${config.name}`);
    await this.dataSourceManager.stopDataSource(sourceId);
    await this.dataSourceManager.startDataSource(config);
  }
  
  /**
   * Setup webhook listeners for real-time sources
   */
  private setupWebhookListeners(): void {
    // In a real implementation, this would set up Express.js routes
    // to handle webhooks from various sources like:
    // - GitHub for new repositories/issues
    // - Twitter API for mentions/trends
    // - News APIs for breaking news
    // - Government APIs for new regulations
    
    console.log('📡 Webhook listeners configured');
  }
  
  /**
   * Setup monitoring and health checks
   */
  private setupMonitoring(): void {
    // Health check every 5 minutes
    setInterval(() => {
      this.performHealthCheck();
    }, 5 * 60 * 1000);
    
    // Performance metrics every hour
    setInterval(() => {
      this.collectMetrics();
    }, 60 * 60 * 1000);
    
    console.log('📊 Monitoring and health checks configured');
  }
  
  /**
   * Perform health check on all data sources
   */
  private performHealthCheck(): void {
    const sources = this.dataSourceManager.getSourceStatus();
    const healthStatus = {
      timestamp: new Date().toISOString(),
      totalSources: sources.length,
      activeSources: sources.filter(s => s.isRunning).length,
      errorSources: sources.filter(s => !s.isRunning && s.config.enabled).length
    };
    
    console.log('🏥 Health Check:', healthStatus);
    
    // In a real implementation, this would:
    // - Send alerts if sources are down
    // - Restart failed sources
    // - Log metrics to monitoring system
  }
  
  /**
   * Collect performance metrics
   */
  private collectMetrics(): void {
    const opportunities = mockDb.getOpportunities();
    const sources = this.dataSourceManager.getSourceStatus();
    
    const metrics = {
      timestamp: new Date().toISOString(),
      totalOpportunities: opportunities.length,
      activeOpportunities: opportunities.filter(o => o.status === 'Active').length,
      stagingOpportunities: opportunities.filter(o => o.status === 'Staging').length,
      averageImpactScore: opportunities.reduce((sum, o) => sum + o.impactScore, 0) / opportunities.length,
      sourcesActive: sources.filter(s => s.isRunning).length,
      sourcesTotal: sources.length
    };
    
    console.log('📈 Performance Metrics:', metrics);
    
    // In a real implementation, this would send metrics to:
    // - DataDog, New Relic, or similar monitoring service
    // - Internal analytics dashboard
    // - Business intelligence tools
  }
}

// Export singleton instance
export const ingestionService = RealTimeIngestionService.getInstance();

// Auto-start in development (remove in production)
if (process.env.NODE_ENV === 'development') {
  // Delay startup to avoid overwhelming the system during development
  setTimeout(() => {
    ingestionService.start().catch(console.error);
  }, 5000); // 5 second delay
}