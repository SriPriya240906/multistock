/**
 * Configuration for StockSphere AI Research Agents
 * Stores API keys, thresholds, and system settings
 */

export const CONFIG = {
  // API Keys (use environment variables in production)
  api_keys: {
    finnhub: process.env.FINNHUB_API_KEY || "",
    alpha_vantage: process.env.ALPHA_VANTAGE_API_KEY || "",
    reddit: {
      client_id: process.env.REDDIT_CLIENT_ID || "",
      client_secret: process.env.REDDIT_CLIENT_SECRET || "",
    },
    stocktwits: process.env.STOCKTWITS_API_KEY || "",
    twitter: process.env.TWITTER_BEARER_TOKEN || "",
  },

  // Analysis thresholds
  thresholds: {
    sentiment: {
      positive: 0.2, // Sentiment > 0.2 is considered positive
      negative: -0.2, // Sentiment < -0.2 is considered negative
    },
    volatility: {
      low: 20, // Annualized volatility < 20% is low
      high: 40, // Annualized volatility > 40% is high
    },
    crowding: {
      medium: 1000, // Mention volume > 1000 is medium
      high: 10000, // Mention volume > 10000 is high
    },
    valuation: {
      pe_fair: 15, // P/E < 15 is considered fair value
      pe_expensive: 30, // P/E > 30 is considered expensive
    },
    financial_health: {
      debt_acceptable: 1, // Debt-to-equity < 1 is acceptable
      debt_high: 2, // Debt-to-equity > 2 is concerning
      profit_margin_low: 5, // Profit margin < 5% is low
      current_ratio_min: 1, // Current ratio < 1 is liquidity concern
    },
  },

  // Data source settings
  data_sources: {
    news: {
      enabled: true,
      lookback_days: 30,
      sources: ["finnhub", "alpha_vantage", "economic_times"],
    },
    social: {
      enabled: true,
      lookback_days: 7,
      platforms: ["reddit", "stocktwits", "twitter"],
      reddit_subreddits: ["wallstreetbets", "investing", "stocks", "IndiaInvestments"],
    },
    price: {
      enabled: true,
      provider: "yahoo_finance", // or 'alpha_vantage'
    },
    fundamentals: {
      enabled: true,
      provider: "alpha_vantage", // or 'financial_modeling_prep'
    },
    analysts: {
      enabled: true,
      provider: "finnhub",
    },
  },

  // Recommendation weights
  weights: {
    sentiment_expert: 0.4,
    risk_expert: 0.6,
  },

  // Consensus rules
  consensus: {
    // Reduce confidence if experts disagree
    disagreement_penalty: 0.5,
    // Minimum confidence for BUY recommendation
    min_buy_confidence: 60,
    // Minimum confidence for any recommendation
    min_confidence: 30,
  },

  // Cache settings
  cache: {
    enabled: true,
    ttl: 300, // Cache results for 5 minutes (300 seconds)
  },

  // Rate limiting
  rate_limits: {
    finnhub: {
      calls_per_minute: 60,
    },
    alpha_vantage: {
      calls_per_minute: 5,
    },
    reddit: {
      calls_per_minute: 60,
    },
  },

  // Feature flags
  features: {
    use_real_apis: false, // Set to true when API keys are configured
    enable_caching: true,
    enable_rate_limiting: true,
    log_api_calls: false,
  },
};

/**
 * Validate configuration
 */
export function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (CONFIG.features.use_real_apis) {
    // Check if required API keys are present
    if (!CONFIG.api_keys.finnhub) {
      errors.push("Finnhub API key is missing");
    }
    if (!CONFIG.api_keys.alpha_vantage) {
      errors.push("Alpha Vantage API key is missing");
    }
  }

  // Validate thresholds
  if (CONFIG.thresholds.sentiment.positive <= CONFIG.thresholds.sentiment.negative) {
    errors.push("Sentiment thresholds are invalid");
  }

  if (CONFIG.weights.sentiment_expert + CONFIG.weights.risk_expert !== 1.0) {
    errors.push("Expert weights must sum to 1.0");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get configuration summary
 */
export function getConfigSummary(): string {
  const validation = validateConfig();

  let summary = "StockSphere AI Configuration:\n";
  summary += `─`.repeat(50) + "\n";
  summary += `Real APIs Enabled: ${CONFIG.features.use_real_apis ? "Yes" : "No (Mock mode)"}\n`;
  summary += `Caching: ${CONFIG.features.enable_caching ? "Enabled" : "Disabled"}\n`;
  summary += `Rate Limiting: ${CONFIG.features.enable_rate_limiting ? "Enabled" : "Disabled"}\n`;
  summary += `\n`;
  summary += `Data Sources:\n`;
  summary += `  News: ${CONFIG.data_sources.news.enabled ? "✓" : "✗"} (${CONFIG.data_sources.news.lookback_days} days)\n`;
  summary += `  Social: ${CONFIG.data_sources.social.enabled ? "✓" : "✗"} (${CONFIG.data_sources.social.lookback_days} days)\n`;
  summary += `  Price Data: ${CONFIG.data_sources.price.enabled ? "✓" : "✗"} (${CONFIG.data_sources.price.provider})\n`;
  summary += `  Fundamentals: ${CONFIG.data_sources.fundamentals.enabled ? "✓" : "✗"} (${CONFIG.data_sources.fundamentals.provider})\n`;
  summary += `  Analyst Ratings: ${CONFIG.data_sources.analysts.enabled ? "✓" : "✗"} (${CONFIG.data_sources.analysts.provider})\n`;
  summary += `\n`;
  summary += `Expert Weights:\n`;
  summary += `  Sentiment: ${(CONFIG.weights.sentiment_expert * 100).toFixed(0)}%\n`;
  summary += `  Risk: ${(CONFIG.weights.risk_expert * 100).toFixed(0)}%\n`;
  summary += `\n`;
  summary += `Configuration Status: ${validation.valid ? "✓ Valid" : "✗ Invalid"}\n`;

  if (!validation.valid) {
    summary += `\nErrors:\n`;
    validation.errors.forEach((error) => {
      summary += `  • ${error}\n`;
    });
  }

  summary += `─`.repeat(50) + "\n";

  return summary;
}
