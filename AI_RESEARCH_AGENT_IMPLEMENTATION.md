# AI Research Agent System - Implementation Guide

## Overview

A complete multi-agent financial research system for StockSphere AI that analyzes stocks using real-time data from multiple sources.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Query                                │
│              "Should I buy 10 shares of TCS?"                   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Query Parser                                 │
│  • Extracts ticker (TCS.NS)                                     │
│  • Identifies intent (Should I buy analysis)                    │
│  • Detects quantity (10 shares)                                 │
│  • Flags emotions (FOMO, Urgency, etc.)                        │
└─────────────────────┬───────────────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
┌─────────────────────┐    ┌─────────────────────┐
│  Sentiment Expert   │    │    Risk Expert      │
├─────────────────────┤    ├─────────────────────┤
│ Data Sources:       │    │ Data Sources:       │
│ • News (Finnhub,    │    │ • Price volatility  │
│   Alpha Vantage)    │    │ • Financial ratios  │
│ • Social (Reddit,   │    │ • Debt levels       │
│   StockTwits)       │    │ • Technical signals │
│ • Analyst ratings   │    │ • Valuation metrics │
│                     │    │                     │
│ Output:             │    │ Output:             │
│ • BUY/SELL/WAIT    │    │ • BUY/SELL/WAIT    │
│ • Confidence 0-100  │    │ • Confidence 0-100  │
│ • Sentiment metrics │    │ • Risk level        │
│ • Key themes        │    │ • Key risks         │
└─────────────────────┘    └─────────────────────┘
        │                           │
        └─────────────┬─────────────┘
                      ▼
        ┌─────────────────────────────┐
        │   Consensus Generator       │
        │ • Weighs both experts       │
        │ • Adjusts for disagreement  │
        │ • Generates final verdict   │
        └─────────────┬───────────────┘
                      ▼
        ┌─────────────────────────────┐
        │    Final Recommendation     │
        │    with detailed report     │
        └─────────────────────────────┘
```

## Files Created

### Core Agent Files

1. **`src/agents/query-parser.ts`**
   - Parses natural language queries
   - Extracts ticker symbols (Indian NSE/BSE + US markets)
   - Detects user intent and emotional signals
   - Identifies quantity (shares or amount)

2. **`src/agents/sentiment-expert.ts`**
   - Analyzes news sentiment
   - Evaluates social media discussions
   - Considers analyst ratings
   - Detects crowding/FOMO patterns
   - Outputs: BUY/SELL/WAIT/HOLD with confidence

3. **`src/agents/risk-expert.ts`**
   - Evaluates volatility risk
   - Assesses financial health (debt, profitability, liquidity)
   - Checks valuation risk (P/E ratios)
   - Identifies technical weaknesses
   - Outputs: BUY/SELL/WAIT/HOLD with risk level

4. **`src/agents/orchestrator.ts`**
   - Coordinates all agents
   - Runs experts in parallel
   - Generates consensus recommendation
   - Formats complete research report

5. **`src/agents/types.ts`**
   - TypeScript type definitions
   - Interface specifications for all data structures

6. **`src/agents/config.ts`**
   - Configuration management
   - API key storage (environment variables)
   - Analysis thresholds and weights
   - Feature flags

### Data Integration

7. **`src/agents/data-sources/index.ts`**
   - Data fetching layer
   - API integrations (Finnhub, Alpha Vantage, Reddit, etc.)
   - Error handling and fallbacks
   - Aggregates data from all sources

### Documentation & Examples

8. **`src/agents/README.md`**
   - Complete usage guide
   - API integration instructions
   - Best practices

9. **`src/agents/example-usage.ts`**
   - 7 practical examples
   - Demonstrates all features
   - Error handling patterns

10. **`src/agents/index.ts`**
    - Main export file
    - Clean public API

## Key Features

### 1. Query Understanding

```typescript
const result = parseQuery("Should I buy 10 shares of TCS urgently?");
// Returns:
{
  ticker: "TCS.NS",
  company_name: "Tata Consultancy Services",
  user_intent: "Should I buy analysis",
  quantity: { value: 10, type: "shares" },
  emotional_signals: ["URGENCY"]
}
```

**Supported Patterns:**
- Stock names: "TCS", "Reliance", "Apple", "Tesla"
- Ticker symbols: "AAPL", "TSLA", "TCS.NS"
- Quantities: "10 shares", "₹50000", "$1000"
- Emotional signals: FOMO, Urgency, Fear, Greed, Doubt, Hype

### 2. Sentiment Analysis

Analyzes from multiple sources:
- **News**: Finnhub, Alpha Vantage, Economic Times
- **Social**: Reddit (r/wallstreetbets, r/investing), StockTwits, Twitter
- **Analysts**: Buy/Hold/Sell ratings

Output includes:
- News sentiment score (-1 to 1)
- Social sentiment score (-1 to 1)
- Overall mood (Positive/Neutral/Negative)
- Mention volume and trends
- Crowding level (Low/Medium/High)
- Key discussion themes

### 3. Risk Assessment

Evaluates:
- **Volatility**: Price fluctuation analysis
- **Financial Health**: Debt-to-equity, profit margins, liquidity ratios
- **Valuation**: P/E ratio vs sector averages
- **Sentiment Risk**: Overcrowding, euphoria detection
- **Technical**: Price structure, volume analysis

Output includes:
- Overall risk level (Low/Medium/High)
- 3-5 key risks with details
- Risk score (0-100)
- Position sizing recommendations

### 4. Consensus Generation

Combines both experts:
- Weighted scoring (40% sentiment, 60% risk)
- Confidence adjustment for disagreement
- Final recommendation with reasoning
- Clear explanation of expert views

## Usage Examples

### Basic Usage

```typescript
import { analyzeStock } from "@/agents";

const { queryInfo, report } = await analyzeStock("Should I buy Apple stock?");

console.log("Sentiment:", report.sentiment_expert.suggestion);
console.log("Risk:", report.risk_expert.suggestion);
console.log("Risk Level:", report.risk_expert.risk_level);
```

### With Emotional Detection

```typescript
const query = "Tesla is mooning! Should I buy now?";
const { queryInfo, report } = await analyzeStock(query);

if (queryInfo.emotional_signals.includes("FOMO")) {
  console.log("⚠️ FOMO detected - suggesting caution");
}
```

### Individual Expert Analysis

```typescript
import { analyzeSentiment, analyzeRisk } from "@/agents";

// Run sentiment only
const sentiment = await analyzeSentiment("AAPL");
console.log(sentiment.metrics.overall_mood);

// Run risk only
const risk = await analyzeRisk("AAPL");
console.log(risk.key_risks);
```

### Complete Report

```typescript
import { analyzeStock, formatResearchReport } from "@/agents";

const { queryInfo, report } = await analyzeStock("Analyze TCS");
const fullReport = formatResearchReport(queryInfo, report);

console.log(fullReport); // Formatted text report
```

## JSON Output Format

### Complete Response Structure

```json
{
  "sentiment_expert": {
    "suggestion": "BUY",
    "confidence": 78,
    "summary": "Positive sentiment with moderate crowding",
    "metrics": {
      "news_sentiment_score": 0.65,
      "social_sentiment_score": 0.42,
      "overall_mood": "Positive",
      "mention_volume": 1250,
      "mention_change_pct": 15.3,
      "retail_sentiment": "Bullish",
      "institutional_sentiment": "Bullish",
      "crowding_level": "Medium",
      "analyst_ratings": {
        "buy": 15,
        "hold": 5,
        "sell": 2
      },
      "key_themes": ["Earnings beat", "AI expansion", "Cloud growth"],
      "sample_opinions": [
        "Strong fundamentals with solid earnings",
        "Good entry point after recent dip",
        "Long-term hold for sure"
      ]
    },
    "sources_used": ["Finnhub", "Reddit", "StockTwits", "Alpha Vantage"],
    "full_reasoning": "Detailed analysis text...",
    "timestamp": "2026-08-01T14:30:00Z"
  },
  "risk_expert": {
    "suggestion": "HOLD",
    "confidence": 72,
    "risk_level": "Medium",
    "key_risks": [
      "Moderate volatility (28.5%) suggests price swings",
      "Stock trading near 52-week high",
      "Elevated social media activity indicates potential crowding"
    ],
    "summary": "Medium risk profile with 3 key factors",
    "metrics": {
      "volatility_level": "Medium",
      "volatility_value": 28.5,
      "valuation_risk": "Medium",
      "financial_health_risk": "Low",
      "sentiment_risk": "Medium",
      "technical_weakness": "Low",
      "debt_to_equity": 0.42,
      "profit_margin": 18.5,
      "current_ratio": 1.85
    },
    "sources_used": ["Yahoo Finance", "Alpha Vantage"],
    "full_reasoning": "Detailed risk analysis...",
    "timestamp": "2026-08-01T14:30:00Z"
  }
}
```

## API Integration Setup

### Step 1: Get API Keys

Required APIs:
- **Finnhub**: https://finnhub.io (Free tier: 60 calls/min)
- **Alpha Vantage**: https://www.alphavantage.co (Free tier: 5 calls/min)
- **Reddit**: https://www.reddit.com/prefs/apps (OAuth required)
- **StockTwits**: https://api.stocktwits.com (Free tier available)

### Step 2: Set Environment Variables

Create `.env` file:
```bash
FINNHUB_API_KEY=your_finnhub_key
ALPHA_VANTAGE_API_KEY=your_alphavantage_key
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_secret
STOCKTWITS_API_KEY=your_stocktwits_key
```

### Step 3: Enable Real APIs

In `src/agents/config.ts`:
```typescript
features: {
  use_real_apis: true, // Change to true
}
```

### Step 4: Implement API Calls

Edit `src/agents/data-sources/index.ts` to add real API implementations:

```typescript
// Example: Finnhub News Integration
export async function fetchNewsSentiment(ticker: string) {
  const API_KEY = process.env.FINNHUB_API_KEY;
  const fromDate = getDateDaysAgo(30);
  const toDate = getTodayDate();
  
  const response = await fetch(
    `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${fromDate}&to=${toDate}&token=${API_KEY}`
  );
  
  const data = await response.json();
  
  return {
    articles: data.map(article => ({
      title: article.headline,
      source: article.source,
      sentiment: calculateSentiment(article),
      publishedAt: new Date(article.datetime * 1000).toISOString(),
    })),
    average_sentiment: calculateAverage(data),
    sources: ["Finnhub"],
  };
}
```

## Configuration Options

### Analysis Thresholds

```typescript
thresholds: {
  sentiment: {
    positive: 0.2,  // Score > 0.2 = Positive
    negative: -0.2  // Score < -0.2 = Negative
  },
  volatility: {
    low: 20,   // < 20% annualized
    high: 40   // > 40% annualized
  },
  crowding: {
    medium: 1000,  // > 1000 mentions
    high: 10000    // > 10000 mentions
  }
}
```

### Expert Weights

```typescript
weights: {
  sentiment_expert: 0.4,  // 40% weight
  risk_expert: 0.6        // 60% weight (risk prioritized)
}
```

## Supported Stock Markets

### Indian Stocks (NSE)
- TCS, Infosys, Wipro, Reliance, HDFC Bank, ICICI Bank, SBI, Airtel, Tata Motors, ITC

### US Stocks
- AAPL, MSFT, GOOGL, AMZN, TSLA, META, NVDA, NFLX

**To add more stocks**, edit `STOCK_MAPPINGS` in `query-parser.ts`.

## Testing

### Run Examples

```typescript
import { runAllExamples } from "@/agents/example-usage";

// Run all 7 examples
await runAllExamples();
```

### Test Individual Components

```typescript
// Test query parser
import { parseQuery } from "@/agents";
const result = parseQuery("Buy 100 shares of Tesla now!");
console.log(result);

// Test sentiment
import { analyzeSentiment } from "@/agents";
const sentiment = await analyzeSentiment("AAPL");
console.log(sentiment);

// Test risk
import { analyzeRisk } from "@/agents";
const risk = await analyzeRisk("AAPL");
console.log(risk);
```

## Integration with Analyze Page

To integrate with the existing Analyze page:

```typescript
// In src/routes/analyze.tsx
import { analyzeStock } from "@/agents";

async function handleAnalyze(symbol: string) {
  setState("loading");
  
  try {
    const { queryInfo, report } = await analyzeStock(`Analyze ${symbol}`);
    
    // Update UI with real data
    setExpertRecommendations({
      sentiment: report.sentiment_expert,
      risk: report.risk_expert,
    });
    
    setState("done");
  } catch (error) {
    console.error("Analysis failed:", error);
    setState("idle");
  }
}
```

## Best Practices

1. **Always validate tickers** before API calls
2. **Handle API failures gracefully** - system returns conservative analysis
3. **Monitor emotional signals** - warn users about FOMO-driven decisions
4. **Use caching** to reduce API calls (5-minute TTL recommended)
5. **Rate limit API calls** to avoid hitting limits
6. **Consider both experts** - don't rely on sentiment alone
7. **Add disclaimers** - this is not financial advice

## Future Enhancements

- [ ] Technical analysis expert (MACD, RSI, Bollinger Bands)
- [ ] Fundamental analysis expert (DCF valuation)
- [ ] Portfolio-level analysis
- [ ] Backtesting engine
- [ ] Real-time alerts
- [ ] Multi-language support
- [ ] Options strategy recommendations
- [ ] Sector rotation analysis
- [ ] Macro-economic factor integration

## Troubleshooting

### "Could not identify stock ticker"
- Ensure stock name is spelled correctly
- Add custom mappings to `STOCK_MAPPINGS` in `query-parser.ts`

### "Data sources unavailable"
- Check API keys in environment variables
- Verify `use_real_apis` is true in config
- Check API rate limits

### Low confidence scores
- May indicate conflicting signals between experts
- Check individual expert reasoning for details
- Consider waiting for clearer market conditions

## License

Part of StockSphere AI project.

## Support

For issues or questions, check:
- `src/agents/README.md` - Detailed usage guide
- `src/agents/example-usage.ts` - Code examples
- Configuration in `src/agents/config.ts`
