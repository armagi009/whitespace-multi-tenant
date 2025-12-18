
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, DollarSign, CheckCircle, Users } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; delay: number }> = ({ icon, title, description, delay }) => (
  <div 
    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl hover:border-sky-500/50 transition-all duration-300"
    style={{ 
      animation: `fadeIn 0.6s ease-out ${delay}s both`
    }}
  >
    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4 text-sky-400">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-sky-500/30">
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center" style={{ animation: 'fadeIn 0.6s ease-out 0.1s both' }}>
        <div className="flex items-center gap-3">
          <img src="/logo-square.png" alt="WhiteSpace Logo" className="w-16 h-16" />
          <div className="text-2xl font-extrabold tracking-tight">
            WhiteSpace
          </div>
        </div>
        <Link 
          to="/login"
          className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Log In
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8" style={{ animation: 'fadeIn 0.8s ease-out 0.3s both' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/30 border border-sky-700/50 text-sky-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Now with Gemini 2.5 Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Turn Noise into <br className="hidden md:block" />
            <span className="text-sky-400 text-shadow-glow">Strategic Opportunity</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A single, repeatable workflow that transforms public domain corpus into a living feed of high-value business signals for Strategy & BD teams.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg shadow-sky-900/20 text-center"
            >
              Launch Workspace
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-lg transition-all border border-slate-700">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            delay={0.2}
            icon={<CheckCircle className="w-6 h-6" />}
            title="Automated Curation"
            description="Ingest millions of data points from regulatory filings, news, and market reports. Our AI filters noise to find high-confidence signals."
          />
          <FeatureCard 
            delay={0.4}
            icon={<DollarSign className="w-6 h-6" />}
            title="Commercial Impact"
            description="Every signal is scored by potential revenue impact. We map the money trail so you can focus on high-ROI opportunities."
          />
          <FeatureCard 
            delay={0.6}
            icon={<TrendingUp className="w-6 h-6" />}
            title="Living Trend Feed"
            description="Static reports are dead. WhiteSpace provides a real-time, living feed of trends classified by horizon and acceleration."
          />
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-sky-900/10 skew-y-3 transform origin-bottom-right"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">Domains Covered</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-emerald-400 mb-2">98%</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">Signal Accuracy</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-white mb-2">$12B</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">Opportunity Identified</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-sky-400 mb-2">Real-time</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} WhiteSpace Intelligence.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
