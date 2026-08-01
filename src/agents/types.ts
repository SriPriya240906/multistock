/**
 * Type definitions for the AI Research Agent system
 */

export interface SentimentMetrics {
  news_sentiment_score: number; // -1 to 1
  social_sentiment_score: number; // -1 to 1
  overall_mood: "Positive" | "Neutral" | "Negative";
  mention_volume: number;
  mention_change_pct: number;
  retail_sentiment: "Bullish" | "Neutral" | "Bearish";
  institutional_sentiment: "Bullish" | "Neutral" | "Bearish";
  crowding_level: "Low" | "Medium" | "High";
  analyst_ratings?: {
    buy: number;
    hold: number;
    sell: number;
  };
  key_themes: string[];
  sample_opinions: string[];
}

export interface RiskMetrics {
  volatility_level: "Low" | "Medium" | "High";
  volatility_value: number; // Actual volatility percentage
  valuation_risk: "Low" | "Medium" | "High";
  financial_health_risk: "Low" | "Medium" | "High";
  sentiment_risk: "Low" | "Medium" | "High";
  technical_weakness: "Low" | "Medium" | "High";
  debt_to_equity?: number;
  profit_margin?: number;
  current_ratio?: number;
}

export interface ExpertAnalysis {
  suggestion: "BUY" | "SELL" | "WAIT" | "HOLD";
  confidence: number; // 0-100
  summary: string;
  full_reasoning: string;
  sources_used: string[];
  timestamp: string;
}

export interface SentimentExpertOutput extends ExpertAnalysis {
  metrics: SentimentMetrics;
}

export interface RiskExpertOutput extends ExpertAnalysis {
  risk_level: "Low" | "Medium" | "High";
  key_risks: string[];
  metrics: RiskMetrics;
}

export interface ResearchReport {
  sentiment_expert: SentimentExpertOutput;
  risk_expert: RiskExpertOutput;
  query_info: {
    ticker: string;
    company_name: string;
    analyzed_at: string;
  };
}

// Data source response types
export interface NewsArticle {
  title: string;
  source: string;
  sentiment: number; // -1 to 1
  url?: string;
  publishedAt: string;
}

export interface SocialPost {
  platform: "Reddit" | "StockTwits" | "Twitter";
  text: string;
  sentiment: number;
  engagement: number;
  createdAt: string;
}

export interface PriceData {
  current: number;
  change_pct: number;
  volatility: number;
  high_52w: number;
  low_52w: number;
  volume: number;
  avg_volume: number;
}

export interface FundamentalData {
  market_cap?: number;
  pe_ratio?: number;
  debt_to_equity?: number;
  profit_margin?: number;
  roe?: number;
  current_ratio?: number;
  quick_ratio?: number;
  revenue_growth?: number;
  earnings_growth?: number;
}

export interface AnalystRating {
  analyst_name?: string;
  rating: "Strong Buy" | "Buy" | "Hold" | "Sell" | "Strong Sell";
  target_price?: number;
  date: string;
}
