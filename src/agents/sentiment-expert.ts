/**
 * Sentiment Expert Agent
 * Analyzes news and social sentiment to provide buy/sell recommendations
 */

import type { SentimentExpertOutput, SentimentMetrics } from "./types";
import { aggregateAllData } from "./data-sources";

/**
 * Analyze sentiment from all available sources
 */
export async function analyzeSentiment(ticker: string): Promise<SentimentExpertOutput> {
  const timestamp = new Date().toISOString();
  
  try {
    // Fetch all data sources
    const data = await aggregateAllData(ticker);
    
    // Calculate sentiment metrics
    const metrics: SentimentMetrics = {
      news_sentiment_score: data.news.average_sentiment,
      social_sentiment_score: data.social.average_sentiment,
      overall_mood: determineOverallMood(
        data.news.average_sentiment,
        data.social.average_sentiment
      ),
      mention_volume: data.social.mention_volume,
      mention_change_pct: 0, // Would compare to previous period
      retail_sentiment: classifySentiment(data.social.average_sentiment),
      institutional_sentiment: classifySentiment(data.news.average_sentiment),
      crowding_level: determineCrowdingLevel(data.social.mention_volume),
      analyst_ratings: data.analysts.consensus,
      key_themes: extractKeyThemes(data.news.articles, data.social.posts),
      sample_opinions: extractSampleOpinions(data.social.posts),
    };
    
    // Generate recommendation based on sentiment analysis
    const { suggestion, confidence, summary, reasoning } = generateSentimentRecommendation(
      metrics,
      data
    );
    
    return {
      suggestion,
      confidence,
      summary,
      metrics,
      sources_used: data.all_sources,
      full_reasoning: reasoning,
      timestamp,
    };
  } catch (error) {
    console.error("Error in sentiment analysis:", error);
    
    // Return a conservative analysis if data fetch fails
    return {
      suggestion: "WAIT",
      confidence: 0,
      summary: "Unable to perform sentiment analysis due to data unavailability.",
      metrics: getDefaultMetrics(),
      sources_used: [],
      full_reasoning: "Data sources were unavailable. Cannot provide reliable sentiment analysis.",
      timestamp,
    };
  }
}

function determineOverallMood(
  newsSentiment: number,
  socialSentiment: number
): "Positive" | "Neutral" | "Negative" {
  const avgSentiment = (newsSentiment + socialSentiment) / 2;
  
  if (avgSentiment > 0.2) return "Positive";
  if (avgSentiment < -0.2) return "Negative";
  return "Neutral";
}

function classifySentiment(score: number): "Bullish" | "Neutral" | "Bearish" {
  if (score > 0.2) return "Bullish";
  if (score < -0.2) return "Bearish";
  return "Neutral";
}

function determineCrowdingLevel(mentionVolume: number): "Low" | "Medium" | "High" {
  // Thresholds would be calibrated based on historical data
  if (mentionVolume > 10000) return "High";
  if (mentionVolume > 1000) return "Medium";
  return "Low";
}

function extractKeyThemes(articles: any[], posts: any[]): string[] {
  // In production, use NLP to extract themes
  // For now, return placeholder
  return [];
}

function extractSampleOpinions(posts: any[]): string[] {
  // Extract representative opinions from social media
  return posts.slice(0, 3).map((p) => p.text || "");
}

function generateSentimentRecommendation(
  metrics: SentimentMetrics,
  data: any
): {
  suggestion: "BUY" | "SELL" | "WAIT" | "HOLD";
  confidence: number;
  summary: string;
  reasoning: string;
} {
  let suggestion: "BUY" | "SELL" | "WAIT" | "HOLD" = "WAIT";
  let confidence = 50;
  let reasoning = "";
  
  const { overall_mood, crowding_level, analyst_ratings } = metrics;
  
  // Analyze sentiment signals
  const positiveSignals: string[] = [];
  const negativeSignals: string[] = [];
  
  if (overall_mood === "Positive") {
    positiveSignals.push("Overall market sentiment is positive");
    confidence += 15;
  } else if (overall_mood === "Negative") {
    negativeSignals.push("Overall market sentiment is negative");
    confidence += 15;
  }
  
  if (crowding_level === "High") {
    negativeSignals.push("High crowding suggests potential reversal risk");
    confidence -= 10;
  }
  
  if (analyst_ratings && analyst_ratings.buy > analyst_ratings.sell) {
    positiveSignals.push(`Analysts favor buy (${analyst_ratings.buy} buy vs ${analyst_ratings.sell} sell)`);
    confidence += 10;
  } else if (analyst_ratings && analyst_ratings.sell > analyst_ratings.buy) {
    negativeSignals.push(`Analysts favor sell (${analyst_ratings.sell} sell vs ${analyst_ratings.buy} buy)`);
    confidence += 10;
  }
  
  // Determine recommendation
  if (positiveSignals.length > negativeSignals.length + 1) {
    suggestion = "BUY";
  } else if (negativeSignals.length > positiveSignals.length + 1) {
    suggestion = "SELL";
  } else if (positiveSignals.length > 0 && overall_mood === "Positive") {
    suggestion = "HOLD";
  }
  
  // Build reasoning
  reasoning = "Sentiment Analysis:\n\n";
  
  if (positiveSignals.length > 0) {
    reasoning += "Positive Signals:\n" + positiveSignals.map((s) => `• ${s}`).join("\n") + "\n\n";
  }
  
  if (negativeSignals.length > 0) {
    reasoning += "Negative Signals:\n" + negativeSignals.map((s) => `• ${s}`).join("\n") + "\n\n";
  }
  
  reasoning += `\nBased on the sentiment analysis, the recommendation is ${suggestion} with ${confidence}% confidence.`;
  
  if (crowding_level === "High") {
    reasoning += "\n\n⚠️ Warning: High social media activity detected. This could indicate FOMO-driven trading.";
  }
  
  const summary = `${overall_mood} sentiment with ${crowding_level.toLowerCase()} crowding. ${positiveSignals.length} positive, ${negativeSignals.length} negative signals.`;
  
  return { suggestion, confidence: Math.min(95, Math.max(5, confidence)), summary, reasoning };
}

function getDefaultMetrics(): SentimentMetrics {
  return {
    news_sentiment_score: 0,
    social_sentiment_score: 0,
    overall_mood: "Neutral",
    mention_volume: 0,
    mention_change_pct: 0,
    retail_sentiment: "Neutral",
    institutional_sentiment: "Neutral",
    crowding_level: "Low",
    key_themes: [],
    sample_opinions: [],
  };
}
