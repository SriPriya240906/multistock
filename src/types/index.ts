import type { LucideIcon } from "lucide-react";

// Expert types
export type ExpertKey = "technical" | "fundamental" | "sentiment" | "risk";
export type Recommendation = "BUY" | "SELL" | "WAIT" | "HOLD";

export interface ExpertSource {
  name: string;
  url?: string;
}

export interface ExpertItem {
  key: ExpertKey;
  name: string;
  role: string;
  icon: LucideIcon;
  emoji: string;
  blurb: string;
  tone: "primary" | "info" | "warning" | "destructive";
  suggestion: Recommendation;
  confidence: number;
  sources: ExpertSource[];
  metrics: [string, string][];
  fullReasoning: string[];
}

// Analysis types
export interface AnalysisRecord {
  ticker: string;
  company: string;
  recommendation: Recommendation;
  confidence: number;
  risk: "Low" | "Medium" | "High";
  date: string;
}

// Portfolio types
export interface Holding {
  ticker: string;
  company: string;
  qty: number;
  avg: number;
  price: number;
  rec: Recommendation;
}

// News types
export interface NewsItem {
  id: number;
  headline: string;
  summary: string;
  sector: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  source: string;
  time: string;
  hue: number;
}

// Chart data types
export interface PriceDataPoint {
  date: string;
  value: number;
  benchmark: number;
}

export interface CandleData {
  date: string;
  open: number;
  close: number;
  low: number;
  high: number;
}

export interface SectorAllocation {
  name: string;
  value: number;
}

export interface ExpertRadarData {
  metric: string;
  technical: number;
  fundamental: number;
  sentiment: number;
  risk: number;
}

export interface MonthlyReturn {
  month: string;
  returns: number;
}

// Discussion types
export interface DiscussionMessage {
  expert: ExpertKey;
  message: string;
  stance: "bullish" | "bearish" | "neutral";
}

// Testimonial types
export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

// AI Chat types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
  category: "technical" | "fundamental" | "risk" | "timing";
}

// Action Plan types
export interface ActionPlan {
  todaysAction: string;
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  positionSize: string;
  timeHorizon: string;
  notes: string[];
}

// Confidence History types
export interface ConfidenceHistory {
  period: "Yesterday" | "Last Week" | "Last Month";
  confidence: number;
  change: number;
  recommendation: Recommendation;
}

// Recommendation Scenario types
export interface RecommendationScenario {
  id: string;
  event: string;
  description: string;
  impact: "negative" | "positive" | "neutral";
  newRecommendation: Recommendation;
  newConfidence: number;
  changeInConfidence: number;
  likelihood: "Low" | "Medium" | "High";
}

// Enhanced Discussion Message
export interface EnhancedDiscussionMessage {
  id: string;
  expert: ExpertKey;
  message: string;
  stance: "bullish" | "bearish" | "neutral";
  respondsTo?: string; // ID of message this responds to
  phase: "opening" | "debate" | "consensus";
}
