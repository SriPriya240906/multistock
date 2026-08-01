# StockSphere AI Research Agent System

A comprehensive multi-agent system for financial research and stock analysis.

## Overview

The Research Agent System consists of three main components:

1. **Query Parser** - Understands natural language queries and extracts stock symbols, intent, quantity, and emotional signals
2. **Sentiment Expert** - Analyzes news and social sentiment from multiple sources
3. **Risk Expert** - Evaluates financial, technical, and market risks

## Architecture

```
User Query
    ↓
Query Parser (extracts ticker, intent, emotions)
    ↓
┌─────────────────┬─────────────────┐
│                 │                 │
Sentiment Expert  │  Risk Expert    │
│                 │                 │
(News, Social,    │  (Volatility,   │
Analyst data)     │  Fundamentals,  │
│                 │  Technical)     │
└─────────────────┴─────────────────┘
    ↓
Consensus Generator
    ↓
Final Recommendation
```

## Features

### Query Parser
- Extracts stock tickers (supports Indian NSE/BSE and US markets)
- Identifies user intent (buy, sell, risk check, etc.)
- Detects quantity (shares or amount)
- Flags emotional signals (FOMO, fear, greed, urgency)

### Sentiment Expert
Analyzes:
- News sentiment from Finnhub, Alpha Vantage, Economic Times
- Social sentiment from Reddit, StockTwits, Twitter
- Analyst ratings
- Mention volume and trends
- Crowding levels
- Key discussion themes

### Risk Expert
Evaluates:
- Price volatility
- Valuation metrics (P/E, P/B, etc.)
- Financial health (debt, profitability, liquidity)
- Sentiment-driven risks (overcrowding, euphoria)
- Technical indicators
- Overall risk level with key risk factors

## Usage

### Basic Usage

```typescript
import { analyzeStock, formatResearchReport } from "@/agents";

// Analyze a stock
const { queryInfo, report } = await analyzeStock("Should I buy TCS?");

// Generate readable report
const formattedReport = formatResearchReport(queryInfo, report);
console.log(formattedReport);
```

### Advanced Usage

```typescript
import { 
  parseQuery, 
  analyzeSentiment, 
  analyzeRisk, 
  generateConsensus 
} from "@/agents";

// Step 1: Parse query
const query = parseQuery("Should I invest ₹50000 in Tesla stock now?");
console.log("Ticker:", query.ticker);
console.log("Intent:", query.user_intent);
console.log("Emotional signals:", query.emotional_signals);

// Step 2: Run individual experts
const sentimentAnalysis = await analyzeSentiment(query.ticker);
const riskAnalysis = await analyzeRisk(query.ticker);

// Step 3: Generate consensus
const consensus = generateConsensus({
  sentiment_expert: sentimentAnalysis,
  risk_expert: riskAnalysis,
  query_info: {
    ticker: query.ticker,
    company_name: query.company_name,
    analyzed_at: new Date().toISOString(),
  },
});

console.log("Final recommendation:", consensus.final_suggestion);
console.log("Confidence:", consensus.consensus_confidence);
```

### React Component Integration

```typescript
import { useState } from "react";
import { analyzeStock } from "@/agents";

function StockAnalyzer() {
  const [query, setQuery] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeStock(query);
      setReport(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about any stock..."
      />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {report && (
        <div>
          <h3>Sentiment: {report.report.sentiment_expert.suggestion}</h3>
          <h3>Risk: {report.report.risk_expert.suggestion}</h3>
          <p>Overall Risk Level: {report.report.risk_expert.risk_level}</p>
        </div>
      )}
    </div>
  );
}
```

## Data Sources Integration

### Currently Supported (Placeholders)

The system is designed to integrate with these APIs:

**News & Sentiment:**
- Finnhub API
- Alpha Vantage News API
- Economic Times
- Moneycontrol

**Social Sentiment:**
- Reddit API (r/wallstreetbets, r/investing)
- StockTwits API
- Twitter/X API (if available)

**Price & Fundamentals:**
- Yahoo Finance (yfinance)
- Alpha Vantage
- Financial Modeling Prep

### Adding Real API Integration

To connect real data sources, edit `src/agents/data-sources/index.ts`:

```typescript
// Example: Integrating Finnhub
export async function fetchNewsSentiment(ticker: string) {
  const API_KEY = process.env.FINNHUB_API_KEY;
  const fromDate = getDateDaysAgo(30);
  const toDate = getTodayDate();
  
  const response = await fetch(
    `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${fromDate}&to=${toDate}&token=${API_KEY}`
  );
  
  const articles = await response.json();
  
  // Process and return
  return {
    articles: articles.map(a => ({
      title: a.headline,
      source: a.source,
      sentiment: calculateSentiment(a.headline, a.summary),
      publishedAt: a.datetime,
    })),
    average_sentiment: calculateAverageSentiment(articles),
    sources: ["Finnhub"],
  };
}
```

## Output Format

### Query Parser Output

```json
{
  "ticker": "TCS.NS",
  "company_name": "Tata Consultancy Services",
  "user_intent": "Should I buy analysis",
  "quantity": {
    "value": 10,
    "type": "shares"
  },
  "original_query": "Should I buy 10 shares of TCS?",
  "emotional_signals": ["FOMO"]
}
```

### Expert Analysis Output

```json
{
  "sentiment_expert": {
    "suggestion": "BUY",
    "confidence": 78,
    "summary": "Positive sentiment with low crowding...",
    "metrics": {
      "news_sentiment_score": 0.65,
      "social_sentiment_score": 0.42,
      "overall_mood": "Positive",
      "mention_volume": 1250,
      "crowding_level": "Medium",
      "analyst_ratings": {
        "buy": 15,
        "hold": 5,
        "sell": 2
      }
    },
    "sources_used": ["Finnhub", "Reddit", "Alpha Vantage"],
    "full_reasoning": "Detailed analysis..."
  },
  "risk_expert": {
    "suggestion": "HOLD",
    "confidence": 72,
    "risk_level": "Medium",
    "key_risks": [
      "Moderate volatility (28%)",
      "Stock near 52-week high"
    ],
    "summary": "Medium risk profile...",
    "metrics": {
      "volatility_level": "Medium",
      "volatility_value": 28.5,
      "valuation_risk": "Medium",
      "financial_health_risk": "Low"
    },
    "sources_used": ["Yahoo Finance", "Alpha Vantage"],
    "full_reasoning": "Risk analysis..."
  }
}
```

## Configuration

### Supported Stock Tickers

The system recognizes common stock names and tickers. See `query-parser.ts` for the full list.

**Indian Stocks:**
- TCS, Infosys, Reliance, HDFC Bank, ICICI Bank, SBI, Airtel, Tata Motors, ITC

**US Stocks:**
- AAPL, MSFT, GOOGL, AMZN, TSLA, META, NVDA, NFLX

To add more stocks, edit the `STOCK_MAPPINGS` in `query-parser.ts`.

### Emotional Signals

The system detects these emotional patterns:
- **FOMO** - Fear of missing out
- **URGENCY** - Time pressure
- **FEAR** - Anxiety about losses
- **GREED** - Unrealistic expectations
- **DOUBT** - Uncertainty
- **HYPE** - Excessive enthusiasm

## Best Practices

1. **Always validate the ticker** - Check that the parser correctly identified the stock
2. **Monitor emotional signals** - High emotional input suggests the user needs rational guidance
3. **Consider both experts** - Don't rely solely on sentiment or risk
4. **Use appropriate disclaimers** - This is not financial advice
5. **Handle API failures gracefully** - System returns conservative analysis when data is unavailable

## Future Enhancements

- [ ] Real-time data integration
- [ ] Technical analysis expert (MACD, RSI, moving averages)
- [ ] Fundamental analysis expert (DCF valuation, earnings analysis)
- [ ] Portfolio-level analysis
- [ ] Backtesting recommendations
- [ ] Multi-language support
- [ ] Sector-specific analysis
- [ ] Options strategy recommendations

## License

Part of StockSphere AI project.
