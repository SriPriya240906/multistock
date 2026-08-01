/**
 * Query Understanding Module for StockSphere AI
 * Extracts ticker, intent, quantity, and emotional signals from user queries
 */

interface QueryResult {
  ticker: string;
  company_name: string;
  user_intent: string;
  quantity: {
    value: number | null;
    type: "shares" | "amount" | null;
  } | null;
  original_query: string;
  emotional_signals: string[];
}

// Common stock ticker mappings (Indian and US markets)
const STOCK_MAPPINGS: Record<string, { ticker: string; name: string }> = {
  // Indian Stocks
  tcs: { ticker: "TCS.NS", name: "Tata Consultancy Services" },
  "tata consultancy": { ticker: "TCS.NS", name: "Tata Consultancy Services" },
  reliance: { ticker: "RELIANCE.NS", name: "Reliance Industries" },
  infosys: { ticker: "INFY.NS", name: "Infosys" },
  infy: { ticker: "INFY.NS", name: "Infosys" },
  wipro: { ticker: "WIPRO.NS", name: "Wipro" },
  hdfc: { ticker: "HDFCBANK.NS", name: "HDFC Bank" },
  "hdfc bank": { ticker: "HDFCBANK.NS", name: "HDFC Bank" },
  icici: { ticker: "ICICIBANK.NS", name: "ICICI Bank" },
  "icici bank": { ticker: "ICICIBANK.NS", name: "ICICI Bank" },
  sbi: { ticker: "SBIN.NS", name: "State Bank of India" },
  "state bank": { ticker: "SBIN.NS", name: "State Bank of India" },
  bharti: { ticker: "BHARTIARTL.NS", name: "Bharti Airtel" },
  airtel: { ticker: "BHARTIARTL.NS", name: "Bharti Airtel" },
  tata: { ticker: "TATAMOTORS.NS", name: "Tata Motors" },
  "tata motors": { ticker: "TATAMOTORS.NS", name: "Tata Motors" },
  "tata steel": { ticker: "TATASTEEL.NS", name: "Tata Steel" },
  adani: { ticker: "ADANIENT.NS", name: "Adani Enterprises" },
  itc: { ticker: "ITC.NS", name: "ITC Limited" },
  
  // US Stocks
  aapl: { ticker: "AAPL", name: "Apple Inc." },
  apple: { ticker: "AAPL", name: "Apple Inc." },
  msft: { ticker: "MSFT", name: "Microsoft Corporation" },
  microsoft: { ticker: "MSFT", name: "Microsoft Corporation" },
  googl: { ticker: "GOOGL", name: "Alphabet Inc." },
  google: { ticker: "GOOGL", name: "Alphabet Inc." },
  amzn: { ticker: "AMZN", name: "Amazon.com Inc." },
  amazon: { ticker: "AMZN", name: "Amazon.com Inc." },
  tsla: { ticker: "TSLA", name: "Tesla Inc." },
  tesla: { ticker: "TSLA", name: "Tesla Inc." },
  meta: { ticker: "META", name: "Meta Platforms Inc." },
  facebook: { ticker: "META", name: "Meta Platforms Inc." },
  nvda: { ticker: "NVDA", name: "NVIDIA Corporation" },
  nvidia: { ticker: "NVDA", name: "NVIDIA Corporation" },
  nflx: { ticker: "NFLX", name: "Netflix Inc." },
  netflix: { ticker: "NFLX", name: "Netflix Inc." },
};

// Emotional signal patterns
const EMOTIONAL_PATTERNS = {
  FOMO: /\b(fomo|everyone|missing out|trending|viral|hot stock|moon|rocket|skyrocket)\b/i,
  URGENCY: /\b(urgent|immediately|asap|quick|fast|now|today|hurry)\b/i,
  FEAR: /\b(afraid|scared|worried|anxious|panic|crash|dump|losing)\b/i,
  GREED: /\b(get rich|easy money|double|triple|10x|100x|guaranteed|sure thing)\b/i,
  DOUBT: /\b(confused|unsure|doubt|uncertain|risky|dangerous|safe)\b/i,
  HYPE: /\b(amazing|incredible|best|perfect|can't lose|sure win)\b/i,
};

// Intent patterns
const INTENT_PATTERNS = {
  "Should I buy analysis": /\b(should i buy|is it good|worth buying|good to buy|buy now)\b/i,
  "Should I sell analysis": /\b(should i sell|time to sell|exit|book profit|cut loss)\b/i,
  "Risk assessment": /\b(risk|risky|safe|dangerous|volatile|stable)\b/i,
  "Price prediction": /\b(target|price prediction|forecast|will it go|future price)\b/i,
  "General analysis": /\b(analyze|analysis|review|opinion|thoughts|view)\b/i,
  "Hold or sell decision": /\b(hold or sell|keep|continue holding)\b/i,
  "Entry timing": /\b(when to buy|best time|dip|correction|entry point)\b/i,
};

/**
 * Parse user query and extract structured information
 */
export function parseQuery(userQuery: string): QueryResult {
  const lowerQuery = userQuery.toLowerCase();
  
  // Extract ticker and company name
  let ticker = "";
  let companyName = "";
  
  // Check for known stock names/tickers
  for (const [key, value] of Object.entries(STOCK_MAPPINGS)) {
    if (lowerQuery.includes(key.toLowerCase())) {
      ticker = value.ticker;
      companyName = value.name;
      break;
    }
  }
  
  // Check for ticker patterns (e.g., "TCS.NS", "AAPL")
  if (!ticker) {
    const tickerMatch = userQuery.match(/\b([A-Z]{2,5}(?:\.[A-Z]{2})?)\b/);
    if (tickerMatch) {
      ticker = tickerMatch[1];
      companyName = ticker; // Use ticker as name if no mapping found
    }
  }
  
  // Extract quantity
  let quantity: QueryResult["quantity"] = null;
  
  // Check for share quantity (e.g., "10 shares", "100 stocks")
  const shareMatch = userQuery.match(/(\d+)\s*(shares?|stocks?|units?)/i);
  if (shareMatch) {
    quantity = {
      value: parseInt(shareMatch[1]),
      type: "shares",
    };
  }
  
  // Check for amount (e.g., "₹50000", "50000 rupees", "$1000")
  const amountMatch = userQuery.match(/(?:₹|rs\.?|rupees?|inr|\$|usd)\s*(\d+(?:,\d+)*)|(\d+(?:,\d+)*)\s*(?:₹|rs\.?|rupees?|inr|\$|usd)/i);
  if (amountMatch && !quantity) {
    const value = amountMatch[1] || amountMatch[2];
    quantity = {
      value: parseInt(value.replace(/,/g, "")),
      type: "amount",
    };
  }
  
  // Detect user intent
  let userIntent = "General analysis";
  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
    if (pattern.test(userQuery)) {
      userIntent = intent;
      break;
    }
  }
  
  // Detect emotional signals
  const emotionalSignals: string[] = [];
  for (const [signal, pattern] of Object.entries(EMOTIONAL_PATTERNS)) {
    if (pattern.test(userQuery)) {
      emotionalSignals.push(signal);
    }
  }
  
  return {
    ticker,
    company_name: companyName,
    user_intent: userIntent,
    quantity,
    original_query: userQuery,
    emotional_signals: emotionalSignals,
  };
}

/**
 * Format the parsed query result as a readable summary
 */
export function formatQuerySummary(result: QueryResult): string {
  let summary = `📊 Query Analysis:\n`;
  summary += `Stock: ${result.company_name} (${result.ticker})\n`;
  summary += `Intent: ${result.user_intent}\n`;
  
  if (result.quantity) {
    summary += `Quantity: ${result.quantity.value} ${result.quantity.type}\n`;
  }
  
  if (result.emotional_signals.length > 0) {
    summary += `⚠️ Emotional signals detected: ${result.emotional_signals.join(", ")}\n`;
  }
  
  return summary;
}
