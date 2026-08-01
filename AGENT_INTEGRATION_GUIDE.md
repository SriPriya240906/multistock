# Integrating AI Research Agents into StockSphere

## Quick Start

The AI Research Agent system is now fully integrated and ready to use. Here's how to connect it to your UI.

## File Structure

```
src/agents/
├── index.ts                    # Main exports
├── query-parser.ts             # Query understanding
├── sentiment-expert.ts         # Sentiment analysis
├── risk-expert.ts              # Risk assessment
├── orchestrator.ts             # Coordination & consensus
├── types.ts                    # TypeScript definitions
├── config.ts                   # Configuration
├── data-sources/
│   └── index.ts                # API integrations
├── example-usage.ts            # Usage examples
└── README.md                   # Documentation
```

## Integration Examples

### 1. Enhanced Analyze Page

Add real AI analysis to the existing analyze page:

```typescript
// src/routes/analyze.tsx

import { analyzeStock, generateConsensus } from "@/agents";
import type { ResearchReport } from "@/agents";

function Analyze() {
  const [symbol, setSymbol] = useState("AAPL");
  const [state, setState] = useState<"idle" | "loading" | "done">("done");
  const [aiReport, setAiReport] = useState<ResearchReport | null>(null);

  const runAIAnalysis = async () => {
    setState("loading");
    
    try {
      // Run AI agents
      const { queryInfo, report } = await analyzeStock(`Analyze ${symbol}`);
      setAiReport(report);
      
      // Generate consensus
      const consensus = generateConsensus(report);
      
      console.log("AI Analysis Complete:", {
        sentiment: report.sentiment_expert.suggestion,
        risk: report.risk_expert.suggestion,
        consensus: consensus.final_suggestion,
      });
      
      setState("done");
    } catch (error) {
      console.error("AI analysis failed:", error);
      setState("idle");
    }
  };

  return (
    <AppShell>
      {/* Existing UI */}
      
      {aiReport && (
        <section className="surface-card rounded-2xl p-5">
          <h2 className="text-base font-semibold">AI Research Analysis</h2>
          
          {/* Sentiment Expert */}
          <div className="mt-4">
            <h3>Sentiment Analysis</h3>
            <p>Recommendation: {aiReport.sentiment_expert.suggestion}</p>
            <p>Confidence: {aiReport.sentiment_expert.confidence}%</p>
            <p>Mood: {aiReport.sentiment_expert.metrics.overall_mood}</p>
          </div>
          
          {/* Risk Expert */}
          <div className="mt-4">
            <h3>Risk Assessment</h3>
            <p>Recommendation: {aiReport.risk_expert.suggestion}</p>
            <p>Risk Level: {aiReport.risk_expert.risk_level}</p>
            <p>Key Risks:</p>
            <ul>
              {aiReport.risk_expert.key_risks.map((risk, i) => (
                <li key={i}>{risk}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </AppShell>
  );
}
```

### 2. Smart Query Input with Emotional Detection

```typescript
// components/SmartQueryInput.tsx

import { parseQuery } from "@/agents";
import { AlertTriangle } from "lucide-react";

export function SmartQueryInput() {
  const [query, setQuery] = useState("");
  const [parsedQuery, setParsedQuery] = useState(null);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    
    if (text.length > 5) {
      const parsed = parseQuery(text);
      setParsedQuery(parsed);
    }
  };

  return (
    <div>
      <Input
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        placeholder="Ask about any stock..."
      />
      
      {parsedQuery?.emotional_signals.length > 0 && (
        <div className="mt-2 rounded-lg border border-warning/40 bg-warning/10 p-3">
          <div className="flex items-center gap-2 text-warning">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-semibold">
              Emotional signals detected: {parsedQuery.emotional_signals.join(", ")}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Consider making investment decisions based on facts, not emotions.
          </p>
        </div>
      )}
      
      {parsedQuery?.ticker && (
        <p className="mt-2 text-sm text-muted-foreground">
          Analyzing: {parsedQuery.company_name} ({parsedQuery.ticker})
        </p>
      )}
    </div>
  );
}
```

### 3. Floating Chatbot Integration

Enhance the existing floating chat to use real AI analysis:

```typescript
// In analyze.tsx - enhance the chat handler

const handleSendMessage = async (text: string) => {
  if (!text.trim()) return;
  
  const userMessage: ChatMessage = {
    id: `user-${Date.now()}`,
    role: "user",
    content: text,
    timestamp: new Date(),
  };
  
  setChatMessages(prev => [...prev, userMessage]);
  setChatInput("");
  setIsTyping(true);
  
  try {
    // Use AI agents for real analysis
    const { queryInfo, report } = await analyzeStock(text);
    const consensus = generateConsensus(report);
    
    // Generate intelligent response
    let responseText = `Based on AI analysis of ${queryInfo.company_name}:\n\n`;
    responseText += `**Sentiment Expert**: ${report.sentiment_expert.suggestion} (${report.sentiment_expert.confidence}% confidence)\n`;
    responseText += `${report.sentiment_expert.summary}\n\n`;
    responseText += `**Risk Expert**: ${report.risk_expert.suggestion} (${report.risk_expert.confidence}% confidence)\n`;
    responseText += `Risk Level: ${report.risk_expert.risk_level}\n\n`;
    responseText += `**Consensus**: ${consensus.final_suggestion} with ${consensus.consensus_confidence}% confidence\n`;
    
    if (queryInfo.emotional_signals.length > 0) {
      responseText += `\n⚠️ Note: Emotional signals detected (${queryInfo.emotional_signals.join(", ")}). Consider waiting for emotional factors to subside before making decisions.`;
    }
    
    const aiMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      role: "assistant",
      content: responseText,
      timestamp: new Date(),
    };
    
    setChatMessages(prev => [...prev, aiMessage]);
  } catch (error) {
    const errorMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      role: "assistant",
      content: "I encountered an error analyzing that stock. Please try again with a valid stock symbol.",
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};
```

### 4. Dashboard Widget - Quick Analysis

Add a quick analysis widget to the dashboard:

```typescript
// components/QuickAnalysisWidget.tsx

import { analyzeStock } from "@/agents";

export function QuickAnalysisWidget({ ticker }: { ticker: string }) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    async function runAnalysis() {
      setLoading(true);
      try {
        const { report } = await analyzeStock(`Analyze ${ticker}`);
        setAnalysis(report);
      } catch (error) {
        console.error("Analysis failed:", error);
      } finally {
        setLoading(false);
      }
    }
    
    runAnalysis();
  }, [ticker]);

  if (loading) return <Skeleton className="h-32 w-full" />;
  if (!analysis) return null;

  return (
    <div className="surface-card rounded-2xl p-4">
      <h3 className="text-sm font-semibold">{ticker} AI Analysis</h3>
      
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-muted-foreground">Sentiment</p>
          <RecBadge rec={analysis.sentiment_expert.suggestion} />
          <p className="text-xs mt-1">{analysis.sentiment_expert.confidence}%</p>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground">Risk</p>
          <Badge variant={
            analysis.risk_expert.risk_level === "Low" ? "default" :
            analysis.risk_expert.risk_level === "Medium" ? "secondary" : "destructive"
          }>
            {analysis.risk_expert.risk_level}
          </Badge>
        </div>
      </div>
      
      <p className="mt-3 text-xs text-muted-foreground">
        {analysis.sentiment_expert.summary}
      </p>
    </div>
  );
}
```

### 5. Batch Analysis - Portfolio View

Analyze multiple stocks at once:

```typescript
// src/routes/portfolio.tsx

import { analyzeStock } from "@/agents";

function analyzePortfolio(holdings: string[]) {
  const [analyses, setAnalyses] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    async function runBatchAnalysis() {
      const results = await Promise.allSettled(
        holdings.map(ticker => analyzeStock(`Analyze ${ticker}`))
      );
      
      const analysisMap = new Map();
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          analysisMap.set(holdings[index], result.value.report);
        }
      });
      
      setAnalyses(analysisMap);
    }
    
    runBatchAnalysis();
  }, [holdings]);

  return (
    <div className="grid gap-4">
      {holdings.map(ticker => {
        const analysis = analyses.get(ticker);
        if (!analysis) return <Skeleton key={ticker} />;
        
        return (
          <div key={ticker} className="surface-card p-4 rounded-xl">
            <h3>{ticker}</h3>
            <div className="flex gap-4 mt-2">
              <span>Sentiment: {analysis.sentiment_expert.suggestion}</span>
              <span>Risk: {analysis.risk_expert.risk_level}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

## Testing the Integration

### 1. Test Query Parser

```typescript
import { parseQuery } from "@/agents";

// Test various queries
const queries = [
  "Should I buy TCS?",
  "Is Tesla stock risky?",
  "Everyone is buying Apple, should I?",
  "Invest ₹50000 in Infosys",
];

queries.forEach(q => {
  const result = parseQuery(q);
  console.log(q, "=>", result);
});
```

### 2. Test Individual Experts

```typescript
import { analyzeSentiment, analyzeRisk } from "@/agents";

// Test sentiment
const sentiment = await analyzeSentiment("AAPL");
console.log("Sentiment:", sentiment);

// Test risk
const risk = await analyzeRisk("AAPL");
console.log("Risk:", risk);
```

### 3. Test Complete Analysis

```typescript
import { analyzeStock, formatResearchReport } from "@/agents";

const { queryInfo, report } = await analyzeStock("Should I buy Apple?");
const fullReport = formatResearchReport(queryInfo, report);
console.log(fullReport);
```

## Configuration for Production

### Enable Real APIs

1. Get API keys from:
   - Finnhub: https://finnhub.io
   - Alpha Vantage: https://www.alphavantage.co
   - Reddit: https://www.reddit.com/prefs/apps

2. Add to `.env`:
```bash
FINNHUB_API_KEY=your_key
ALPHA_VANTAGE_API_KEY=your_key
REDDIT_CLIENT_ID=your_id
REDDIT_CLIENT_SECRET=your_secret
```

3. Update config:
```typescript
// src/agents/config.ts
features: {
  use_real_apis: true,
}
```

4. Implement API calls in `src/agents/data-sources/index.ts`

## Performance Optimization

### Use Caching

```typescript
// Simple in-memory cache
const analysisCache = new Map();

async function getCachedAnalysis(ticker: string) {
  const cacheKey = `${ticker}-${Date.now() / (5 * 60 * 1000)}`; // 5-min buckets
  
  if (analysisCache.has(cacheKey)) {
    return analysisCache.get(cacheKey);
  }
  
  const result = await analyzeStock(`Analyze ${ticker}`);
  analysisCache.set(cacheKey, result);
  
  return result;
}
```

### Debounce User Input

```typescript
import { debounce } from "lodash";

const debouncedAnalysis = debounce(async (ticker: string) => {
  const result = await analyzeStock(`Analyze ${ticker}`);
  setAnalysis(result);
}, 500);
```

## Error Handling

```typescript
try {
  const { report } = await analyzeStock(query);
  // Use report
} catch (error) {
  if (error.message.includes("ticker")) {
    toast.error("Could not identify stock symbol");
  } else {
    toast.error("Analysis failed. Please try again.");
  }
}
```

## Next Steps

1. ✅ Agents are built and tested
2. ⏭️ Integrate into Analyze page
3. ⏭️ Add to floating chatbot
4. ⏭️ Connect real APIs (optional)
5. ⏭️ Add caching layer
6. ⏭️ Deploy and test

## Support

- Check `src/agents/README.md` for detailed docs
- Run examples in `src/agents/example-usage.ts`
- Review types in `src/agents/types.ts`
