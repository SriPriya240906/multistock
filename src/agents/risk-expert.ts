/**
 * Risk Expert Agent
 * Evaluates multiple risk factors to provide risk-adjusted recommendations
 */

import type { RiskExpertOutput, RiskMetrics } from "./types";
import { aggregateAllData } from "./data-sources";

/**
 * Perform comprehensive risk analysis
 */
export async function analyzeRisk(ticker: string): Promise<RiskExpertOutput> {
  const timestamp = new Date().toISOString();
  
  try {
    // Fetch all data sources
    const data = await aggregateAllData(ticker);
    
    // Calculate risk metrics
    const metrics: RiskMetrics = {
      volatility_level: classifyVolatility(data.price.data?.volatility || 0),
      volatility_value: data.price.data?.volatility || 0,
      valuation_risk: assessValuationRisk(data.fundamentals.data),
      financial_health_risk: assessFinancialHealthRisk(data.fundamentals.data),
      sentiment_risk: assessSentimentRisk(data.news.average_sentiment, data.social.mention_volume),
      technical_weakness: assessTechnicalWeakness(data.price.data),
      debt_to_equity: data.fundamentals.data?.debt_to_equity,
      profit_margin: data.fundamentals.data?.profit_margin,
      current_ratio: data.fundamentals.data?.current_ratio,
    };
    
    // Generate risk assessment and recommendation
    const { suggestion, confidence, riskLevel, keyRisks, summary, reasoning } =
      generateRiskRecommendation(metrics, data);
    
    return {
      suggestion,
      confidence,
      risk_level: riskLevel,
      key_risks: keyRisks,
      summary,
      metrics,
      sources_used: data.all_sources,
      full_reasoning: reasoning,
      timestamp,
    };
  } catch (error) {
    console.error("Error in risk analysis:", error);
    
    // Return conservative analysis on error
    return {
      suggestion: "WAIT",
      confidence: 0,
      risk_level: "High",
      key_risks: ["Unable to assess risk due to data unavailability"],
      summary: "Cannot perform risk analysis without reliable data.",
      metrics: getDefaultRiskMetrics(),
      sources_used: [],
      full_reasoning: "Data sources unavailable. Risk cannot be reliably assessed.",
      timestamp,
    };
  }
}

function classifyVolatility(volatility: number): "Low" | "Medium" | "High" {
  // Annualized volatility thresholds
  if (volatility < 20) return "Low";
  if (volatility < 40) return "Medium";
  return "High";
}

function assessValuationRisk(fundamentals: any): "Low" | "Medium" | "High" {
  if (!fundamentals || !fundamentals.pe_ratio) return "Medium";
  
  const peRatio = fundamentals.pe_ratio;
  
  // Generic thresholds - should be sector-specific in production
  if (peRatio < 15) return "Low";
  if (peRatio < 30) return "Medium";
  return "High";
}

function assessFinancialHealthRisk(fundamentals: any): "Low" | "Medium" | "High" {
  if (!fundamentals) return "Medium";
  
  const risks: string[] = [];
  
  // Check debt-to-equity ratio
  if (fundamentals.debt_to_equity !== undefined) {
    if (fundamentals.debt_to_equity > 2) risks.push("high_debt");
    else if (fundamentals.debt_to_equity > 1) risks.push("moderate_debt");
  }
  
  // Check profitability
  if (fundamentals.profit_margin !== undefined) {
    if (fundamentals.profit_margin < 0) risks.push("unprofitable");
    else if (fundamentals.profit_margin < 5) risks.push("low_margin");
  }
  
  // Check liquidity
  if (fundamentals.current_ratio !== undefined) {
    if (fundamentals.current_ratio < 1) risks.push("liquidity_concern");
    else if (fundamentals.current_ratio < 1.5) risks.push("moderate_liquidity");
  }
  
  if (risks.length >= 2) return "High";
  if (risks.length === 1) return "Medium";
  return "Low";
}

function assessSentimentRisk(
  sentiment: number,
  mentionVolume: number
): "Low" | "Medium" | "High" {
  // Extreme sentiment + high volume = risk
  if (Math.abs(sentiment) > 0.7 && mentionVolume > 10000) return "High";
  if (Math.abs(sentiment) > 0.5 && mentionVolume > 5000) return "Medium";
  return "Low";
}

function assessTechnicalWeakness(priceData: any): "Low" | "Medium" | "High" {
  if (!priceData) return "Medium";
  
  const weaknessSignals: string[] = [];
  
  // Check if price is near 52-week low
  if (priceData.current && priceData.low_52w && priceData.high_52w) {
    const range = priceData.high_52w - priceData.low_52w;
    const position = (priceData.current - priceData.low_52w) / range;
    
    if (position < 0.2) weaknessSignals.push("near_52w_low");
    else if (position > 0.8) weaknessSignals.push("near_52w_high");
  }
  
  // Check volume
  if (priceData.volume && priceData.avg_volume) {
    if (priceData.volume < priceData.avg_volume * 0.5) {
      weaknessSignals.push("low_volume");
    }
  }
  
  if (weaknessSignals.length >= 2) return "High";
  if (weaknessSignals.length === 1) return "Medium";
  return "Low";
}

function generateRiskRecommendation(
  metrics: RiskMetrics,
  data: any
): {
  suggestion: "BUY" | "SELL" | "WAIT" | "HOLD";
  confidence: number;
  riskLevel: "Low" | "Medium" | "High";
  keyRisks: string[];
  summary: string;
  reasoning: string;
} {
  const keyRisks: string[] = [];
  let riskScore = 0;
  let reasoning = "Risk Analysis:\n\n";
  
  // Evaluate each risk dimension
  
  // 1. Volatility Risk
  if (metrics.volatility_level === "High") {
    keyRisks.push(
      `High volatility (${metrics.volatility_value.toFixed(1)}%) suggests potential for sharp price swings`
    );
    riskScore += 30;
    reasoning += `⚠️ Volatility: HIGH (${metrics.volatility_value.toFixed(1)}%)\n`;
    reasoning += "   The stock has experienced significant price fluctuations.\n\n";
  } else if (metrics.volatility_level === "Medium") {
    keyRisks.push(`Moderate volatility (${metrics.volatility_value.toFixed(1)}%)`);
    riskScore += 15;
    reasoning += `⚠️ Volatility: MEDIUM (${metrics.volatility_value.toFixed(1)}%)\n\n`;
  } else {
    reasoning += `✓ Volatility: LOW (${metrics.volatility_value.toFixed(1)}%)\n\n`;
  }
  
  // 2. Valuation Risk
  if (metrics.valuation_risk === "High") {
    keyRisks.push("Stock appears overvalued based on fundamental metrics");
    riskScore += 25;
    reasoning += "⚠️ Valuation: HIGH - Stock trading at elevated multiples\n\n";
  } else if (metrics.valuation_risk === "Medium") {
    riskScore += 10;
    reasoning += "⚠️ Valuation: MEDIUM - Fair valuation\n\n";
  } else {
    reasoning += "✓ Valuation: LOW - Stock appears reasonably valued\n\n";
  }
  
  // 3. Financial Health Risk
  if (metrics.financial_health_risk === "High") {
    const details: string[] = [];
    if (metrics.debt_to_equity && metrics.debt_to_equity > 2) {
      details.push(`High debt-to-equity ratio (${metrics.debt_to_equity.toFixed(2)})`);
    }
    if (metrics.profit_margin !== undefined && metrics.profit_margin < 0) {
      details.push("Company is unprofitable");
    }
    if (metrics.current_ratio && metrics.current_ratio < 1) {
      details.push(`Liquidity concerns (current ratio: ${metrics.current_ratio.toFixed(2)})`);
    }
    
    keyRisks.push(`Financial health concerns: ${details.join(", ")}`);
    riskScore += 30;
    reasoning += "⚠️ Financial Health: HIGH\n";
    reasoning += details.map((d) => `   • ${d}`).join("\n") + "\n\n";
  } else if (metrics.financial_health_risk === "Medium") {
    keyRisks.push("Moderate financial health concerns");
    riskScore += 15;
    reasoning += "⚠️ Financial Health: MEDIUM\n\n";
  } else {
    reasoning += "✓ Financial Health: STRONG - Company fundamentals are solid\n\n";
  }
  
  // 4. Sentiment Risk
  if (metrics.sentiment_risk === "High") {
    keyRisks.push("Extreme sentiment and high social media activity suggests potential overcrowding");
    riskScore += 20;
    reasoning += "⚠️ Sentiment Risk: HIGH - Potential FOMO-driven trading\n\n";
  } else if (metrics.sentiment_risk === "Medium") {
    riskScore += 10;
  }
  
  // 5. Technical Weakness
  if (metrics.technical_weakness === "High") {
    keyRisks.push("Technical indicators show weakness in price action");
    riskScore += 15;
    reasoning += "⚠️ Technical: WEAK - Price structure shows deterioration\n\n";
  } else if (metrics.technical_weakness === "Low") {
    reasoning += "✓ Technical: STRONG - Price structure intact\n\n";
  }
  
  // Determine overall risk level
  let riskLevel: "Low" | "Medium" | "High";
  if (riskScore > 60) riskLevel = "High";
  else if (riskScore > 30) riskLevel = "Medium";
  else riskLevel = "Low";
  
  // Generate recommendation
  let suggestion: "BUY" | "SELL" | "WAIT" | "HOLD";
  let confidence: number;
  
  if (riskLevel === "High") {
    suggestion = keyRisks.length >= 3 ? "SELL" : "WAIT";
    confidence = 75;
    reasoning += `\n🛑 Overall Risk Level: HIGH\n`;
    reasoning += `Risk Score: ${riskScore}/100\n\n`;
    reasoning += `Recommendation: ${suggestion}\n`;
    reasoning += `The risk profile is elevated. ${suggestion === "SELL" ? "Consider reducing exposure." : "Wait for better risk/reward."}`;
  } else if (riskLevel === "Medium") {
    suggestion = "HOLD";
    confidence = 60;
    reasoning += `\n⚠️ Overall Risk Level: MEDIUM\n`;
    reasoning += `Risk Score: ${riskScore}/100\n\n`;
    reasoning += "Recommendation: HOLD\n";
    reasoning += "Moderate risk. Suitable for investors with medium risk tolerance.";
  } else {
    suggestion = "BUY";
    confidence = 80;
    reasoning += `\n✓ Overall Risk Level: LOW\n`;
    reasoning += `Risk Score: ${riskScore}/100\n\n`;
    reasoning += "Recommendation: BUY\n";
    reasoning += "Low risk profile. Suitable for conservative investors.";
  }
  
  // Add position sizing advice
  if (riskLevel === "High") {
    reasoning += "\n\n💡 Position Sizing: If proceeding, keep position size below 2% of portfolio.";
  } else if (riskLevel === "Medium") {
    reasoning += "\n\n💡 Position Sizing: Consider limiting to 3-5% of portfolio.";
  }
  
  const summary = `${riskLevel} risk profile with ${keyRisks.length} key risk factors identified. Risk score: ${riskScore}/100.`;
  
  return { suggestion, confidence, riskLevel, keyRisks, summary, reasoning };
}

function getDefaultRiskMetrics(): RiskMetrics {
  return {
    volatility_level: "Medium",
    volatility_value: 0,
    valuation_risk: "Medium",
    financial_health_risk: "Medium",
    sentiment_risk: "Medium",
    technical_weakness: "Medium",
  };
}
