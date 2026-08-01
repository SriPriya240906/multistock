/**
 * Research Agent Orchestrator
 * Coordinates the query parser and expert agents
 */

import { parseQuery } from "./query-parser";
import { analyzeSentiment } from "./sentiment-expert";
import { analyzeRisk } from "./risk-expert";
import type { ResearchReport } from "./types";

/**
 * Main entry point for the research agent system
 * Takes a user query and returns a complete research report
 */
export async function analyzeStock(userQuery: string): Promise<{
  queryInfo: ReturnType<typeof parseQuery>;
  report: ResearchReport;
}> {
  // Step 1: Parse the user query
  const queryInfo = parseQuery(userQuery);
  
  if (!queryInfo.ticker) {
    throw new Error("Could not identify stock ticker from query. Please specify a valid stock symbol.");
  }
  
  // Step 2: Run both experts in parallel
  const [sentimentAnalysis, riskAnalysis] = await Promise.all([
    analyzeSentiment(queryInfo.ticker),
    analyzeRisk(queryInfo.ticker),
  ]);
  
  // Step 3: Compile the research report
  const report: ResearchReport = {
    sentiment_expert: sentimentAnalysis,
    risk_expert: riskAnalysis,
    query_info: {
      ticker: queryInfo.ticker,
      company_name: queryInfo.company_name,
      analyzed_at: new Date().toISOString(),
    },
  };
  
  return {
    queryInfo,
    report,
  };
}

/**
 * Generate a consensus recommendation from both experts
 */
export function generateConsensus(report: ResearchReport): {
  final_suggestion: "BUY" | "SELL" | "WAIT" | "HOLD";
  consensus_confidence: number;
  reasoning: string;
} {
  const { sentiment_expert, risk_expert } = report;
  
  // Weighted scoring
  const sentimentWeight = 0.4;
  const riskWeight = 0.6;
  
  const suggestionScore = {
    BUY: 2,
    HOLD: 1,
    WAIT: 0,
    SELL: -1,
  };
  
  const sentimentScore =
    suggestionScore[sentiment_expert.suggestion] * sentimentWeight * (sentiment_expert.confidence / 100);
  const riskScore = suggestionScore[risk_expert.suggestion] * riskWeight * (risk_expert.confidence / 100);
  
  const totalScore = sentimentScore + riskScore;
  
  let final_suggestion: "BUY" | "SELL" | "WAIT" | "HOLD";
  if (totalScore > 0.8) final_suggestion = "BUY";
  else if (totalScore < -0.5) final_suggestion = "SELL";
  else if (totalScore > 0.3) final_suggestion = "HOLD";
  else final_suggestion = "WAIT";
  
  // Calculate consensus confidence
  const avgConfidence = (sentiment_expert.confidence + risk_expert.confidence) / 2;
  
  // Reduce confidence if experts disagree
  const agreement =
    sentiment_expert.suggestion === risk_expert.suggestion
      ? 1.0
      : sentiment_expert.suggestion === "WAIT" || risk_expert.suggestion === "WAIT"
        ? 0.7
        : 0.5;
  
  const consensus_confidence = Math.round(avgConfidence * agreement);
  
  // Build reasoning
  let reasoning = `**Consensus Analysis**\n\n`;
  reasoning += `Sentiment Expert: ${sentiment_expert.suggestion} (${sentiment_expert.confidence}% confidence)\n`;
  reasoning += `Risk Expert: ${risk_expert.suggestion} (${risk_expert.confidence}% confidence)\n\n`;
  
  if (agreement < 1.0) {
    reasoning += `⚠️ **Experts disagree.** Confidence adjusted from ${avgConfidence.toFixed(0)}% to ${consensus_confidence}%.\n\n`;
  }
  
  reasoning += `**Final Recommendation: ${final_suggestion}** (${consensus_confidence}% confidence)\n\n`;
  
  if (final_suggestion === "BUY") {
    reasoning += "Both sentiment and risk factors align favorably. ";
    if (risk_expert.risk_level === "Medium" || risk_expert.risk_level === "High") {
      reasoning += `However, note ${risk_expert.risk_level.toLowerCase()} risk level - consider position sizing carefully.`;
    }
  } else if (final_suggestion === "SELL") {
    reasoning += "Multiple risk factors or negative sentiment suggest reducing exposure.";
  } else if (final_suggestion === "WAIT") {
    reasoning += "Conditions are not favorable for entry. Wait for better risk/reward or clearer signals.";
  } else {
    reasoning += "Current position holders can maintain exposure with appropriate risk management.";
  }
  
  return {
    final_suggestion,
    consensus_confidence,
    reasoning,
  };
}

/**
 * Format the complete research report as readable text
 */
export function formatResearchReport(
  queryInfo: ReturnType<typeof parseQuery>,
  report: ResearchReport,
  includeConsensus = true
): string {
  let output = "";
  
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  output += `📊 STOCKSPHERE AI RESEARCH REPORT\n`;
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  output += `**Stock:** ${report.query_info.company_name} (${report.query_info.ticker})\n`;
  output += `**Analyzed:** ${new Date(report.query_info.analyzed_at).toLocaleString()}\n`;
  output += `**Query:** ${queryInfo.original_query}\n`;
  
  if (queryInfo.emotional_signals.length > 0) {
    output += `⚠️ **Emotional signals detected:** ${queryInfo.emotional_signals.join(", ")}\n`;
  }
  
  output += `\n`;
  
  // Sentiment Expert Section
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  output += `🎭 SENTIMENT EXPERT ANALYSIS\n`;
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  const sentiment = report.sentiment_expert;
  output += `**Recommendation:** ${sentiment.suggestion}\n`;
  output += `**Confidence:** ${sentiment.confidence}%\n`;
  output += `**Summary:** ${sentiment.summary}\n\n`;
  
  output += `**Key Metrics:**\n`;
  output += `• Overall Mood: ${sentiment.metrics.overall_mood}\n`;
  output += `• News Sentiment: ${(sentiment.metrics.news_sentiment_score * 100).toFixed(0)}%\n`;
  output += `• Social Sentiment: ${(sentiment.metrics.social_sentiment_score * 100).toFixed(0)}%\n`;
  output += `• Retail Sentiment: ${sentiment.metrics.retail_sentiment}\n`;
  output += `• Institutional Sentiment: ${sentiment.metrics.institutional_sentiment}\n`;
  output += `• Crowding Level: ${sentiment.metrics.crowding_level}\n`;
  
  if (sentiment.metrics.analyst_ratings) {
    output += `• Analyst Ratings: ${sentiment.metrics.analyst_ratings.buy} Buy, ${sentiment.metrics.analyst_ratings.hold} Hold, ${sentiment.metrics.analyst_ratings.sell} Sell\n`;
  }
  
  output += `\n**Sources Used:** ${sentiment.sources_used.join(", ") || "Mock data"}\n\n`;
  
  output += `**Detailed Reasoning:**\n${sentiment.full_reasoning}\n\n`;
  
  // Risk Expert Section
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  output += `🛡️ RISK EXPERT ANALYSIS\n`;
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  const risk = report.risk_expert;
  output += `**Recommendation:** ${risk.suggestion}\n`;
  output += `**Confidence:** ${risk.confidence}%\n`;
  output += `**Overall Risk Level:** ${risk.risk_level}\n`;
  output += `**Summary:** ${risk.summary}\n\n`;
  
  output += `**Key Risks:**\n`;
  risk.key_risks.forEach((r, i) => {
    output += `${i + 1}. ${r}\n`;
  });
  output += `\n`;
  
  output += `**Risk Metrics:**\n`;
  output += `• Volatility: ${risk.metrics.volatility_level} (${risk.metrics.volatility_value.toFixed(1)}%)\n`;
  output += `• Valuation Risk: ${risk.metrics.valuation_risk}\n`;
  output += `• Financial Health Risk: ${risk.metrics.financial_health_risk}\n`;
  output += `• Sentiment Risk: ${risk.metrics.sentiment_risk}\n`;
  output += `• Technical Weakness: ${risk.metrics.technical_weakness}\n`;
  
  if (risk.metrics.debt_to_equity) {
    output += `• Debt-to-Equity: ${risk.metrics.debt_to_equity.toFixed(2)}\n`;
  }
  if (risk.metrics.profit_margin !== undefined) {
    output += `• Profit Margin: ${risk.metrics.profit_margin.toFixed(1)}%\n`;
  }
  if (risk.metrics.current_ratio) {
    output += `• Current Ratio: ${risk.metrics.current_ratio.toFixed(2)}\n`;
  }
  
  output += `\n**Sources Used:** ${risk.sources_used.join(", ") || "Mock data"}\n\n`;
  
  output += `**Detailed Reasoning:**\n${risk.full_reasoning}\n\n`;
  
  // Consensus Section
  if (includeConsensus) {
    output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    output += `🎯 CONSENSUS RECOMMENDATION\n`;
    output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    const consensus = generateConsensus(report);
    output += consensus.reasoning;
    output += `\n\n`;
  }
  
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  output += `⚠️ DISCLAIMER: This analysis is for informational purposes only.\n`;
  output += `Always conduct your own research and consult a financial advisor.\n`;
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  
  return output;
}
