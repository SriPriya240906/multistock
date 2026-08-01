import { Activity, BarChart3, Smile, ShieldAlert } from "lucide-react";
import type {
  ExpertItem,
  PriceDataPoint,
  CandleData,
  SectorAllocation,
  ExpertRadarData,
  MonthlyReturn,
  AnalysisRecord,
  Holding,
  NewsItem,
  DiscussionMessage,
  Testimonial,
  Recommendation,
} from "@/types";

export const experts: ExpertItem[] = [
  {
    key: "technical",
    name: "Chart & Technical Expert",
    role: "Price Action & Technical Indicators",
    icon: Activity,
    emoji: "📈",
    blurb: "Price is maintaining strong bullish momentum above the 50D and 200D moving averages with fresh MACD crossover confirmation.",
    tone: "primary",
    suggestion: "BUY",
    confidence: 88,
    sources: [
      { name: "TradingView", url: "https://www.tradingview.com" },
      { name: "Yahoo Finance", url: "https://finance.yahoo.com" },
      { name: "Alpha Vantage", url: "https://www.alphavantage.co" },
    ],
    metrics: [
      ["Trend Structure", "Bullish Uptrend"],
      ["Moving Averages", "Above 50D & 200D"],
      ["RSI (14)", "62 — Healthy"],
      ["MACD Signal", "Bullish Crossover"],
      ["Support Level", "$226.40"],
      ["Resistance Target", "$274.10"],
    ],
    fullReasoning: [
      "Breakout above $235 handle backed by 1.4x average daily trading volume.",
      "Moving Average Convergence Divergence (MACD) line crossed above the signal line on daily timeframe.",
      "Relative Strength Index (RSI) at 62 indicates strong upward momentum without being overbought (>70).",
      "Primary structural support established firmly at $226.40 with major target resistance near $274.10.",
    ],
  },
  {
    key: "fundamental",
    name: "News & Fundamental Expert",
    role: "Financials, Earnings & Valuation",
    icon: BarChart3,
    emoji: "📊",
    blurb: "Robust earnings momentum with EPS expanding +18% YoY and expanding high-margin services free cash flow.",
    tone: "info",
    suggestion: "BUY",
    confidence: 84,
    sources: [
      { name: "Company SEC Filing", url: "https://www.sec.gov" },
      { name: "Economic Times", url: "https://economictimes.indiatimes.com" },
      { name: "Moneycontrol", url: "https://www.moneycontrol.com" },
    ],
    metrics: [
      ["Revenue (TTM)", "$394.2B (+9.1%)"],
      ["EPS Growth", "$6.84 (+18% YoY)"],
      ["Forward P/E", "27.4x"],
      ["Debt / Equity", "0.42 — Comfortable"],
      ["Segment Growth", "Double-Digit Services"],
      ["Valuation Tier", "Fair Quality Premium"],
    ],
    fullReasoning: [
      "Services segment gross margin expanded 140 bps year-over-year, driving operating cash flow to $28.4B.",
      "Balance sheet resilience remains top-tier with liquid cash reserves well exceeding short-term debt.",
      "Forward P/E ratio of 27.4x represents a minor premium to sector peers, fully justified by superior ROE.",
      "Quarterly dividend coverage ratio stands strong at 3.8x, ensuring high capital allocation stability.",
    ],
  },
  {
    key: "sentiment",
    name: "Sentiment Expert",
    role: "News Flow & Social Market Mood",
    icon: Smile,
    emoji: "😊",
    blurb: "Media news flow is strongly positive (+0.71), but elevated social chatter suggests near-term retail crowding.",
    tone: "warning",
    suggestion: "HOLD",
    confidence: 74,
    sources: [
      { name: "Reddit (r/stocks)", url: "https://reddit.com" },
      { name: "StockTwits", url: "https://stocktwits.com" },
      { name: "Twitter / X Feed", url: "https://x.com" },
    ],
    metrics: [
      ["News Sentiment Index", "+0.71 Positive"],
      ["Social Media Tone", "+0.58 Constructive"],
      ["Analyst Consensus", "18 Buy / 5 Hold / 1 Sell"],
      ["Mention Velocity", "+34% week-on-week"],
      ["Crowding Index", "Elevated"],
      ["Overall Mood Score", "74 / 100"],
    ],
    fullReasoning: [
      "Wall Street institutional consensus is overwhelmingly positive with 18 Buy ratings against only 1 Sell call.",
      "Social media mention velocity jumped +34% over the last week, signaling rising retail investor attention.",
      "NLP sentiment scoring across Bloomberg and Reuters headline feeds registers a highly bullish +0.71 rating.",
      "Cautionary note: High retail crowding makes short-term price action susceptible to quick profit-taking dips.",
    ],
  },
  {
    key: "risk",
    name: "Risk Assessment Expert",
    role: "Volatility, Downside & Capital Preservation",
    icon: ShieldAlert,
    emoji: "⚠️",
    blurb: "34% annualized volatility and a 12% gap to the 200D average warrant cautious position sizing.",
    tone: "destructive",
    suggestion: "WAIT",
    confidence: 65,
    sources: [
      { name: "CBOE Volatility Data", url: "https://www.cboe.com" },
      { name: "Financial Statements", url: "https://www.sec.gov" },
      { name: "News Risk Feed", url: "https://news.google.com" },
    ],
    metrics: [
      ["30D Realised Volatility", "34% Annualized"],
      ["Assessed Risk Level", "Medium-High"],
      ["Market Beta", "1.18 (Elevated)"],
      ["Sector Concentration", "High Tech Weight"],
      ["Liquidity Profile", "Low Risk (Deep Book)"],
      ["200D Drawdown Buffer", "-12% Gap"],
    ],
    fullReasoning: [
      "Single-stock realised volatility of 34% significantly exceeds broad S&P 500 index volatility (16%).",
      "A Beta coefficient of 1.18 indicates amplified sensitivity to tech sector pullbacks and rate expectations.",
      "Historical price gap analysis highlights a ~12% drawdown risk down to the major 200-day moving average support.",
    ],
  },
];

export const priceSeries = [
  { date: "Jan", value: 168, benchmark: 160 },
  { date: "Feb", value: 175, benchmark: 163 },
  { date: "Mar", value: 171, benchmark: 166 },
  { date: "Apr", value: 184, benchmark: 170 },
  { date: "May", value: 192, benchmark: 175 },
  { date: "Jun", value: 188, benchmark: 178 },
  { date: "Jul", value: 205, benchmark: 183 },
  { date: "Aug", value: 214, benchmark: 187 },
  { date: "Sep", value: 209, benchmark: 190 },
  { date: "Oct", value: 226, benchmark: 195 },
  { date: "Nov", value: 238, benchmark: 199 },
  { date: "Dec", value: 251, benchmark: 204 },
];

export const candles = [
  { date: "Mon", open: 226, close: 234, low: 223, high: 237 },
  { date: "Tue", open: 234, close: 229, low: 227, high: 238 },
  { date: "Wed", open: 229, close: 241, low: 228, high: 243 },
  { date: "Thu", open: 241, close: 238, low: 235, high: 246 },
  { date: "Fri", open: 238, close: 249, low: 237, high: 252 },
  { date: "Mon", open: 249, close: 245, low: 242, high: 253 },
  { date: "Tue", open: 245, close: 256, low: 244, high: 258 },
  { date: "Wed", open: 256, close: 262, low: 252, high: 265 },
  { date: "Thu", open: 262, close: 258, low: 255, high: 266 },
  { date: "Fri", open: 258, close: 271, low: 257, high: 273 },
];

export const sectorAllocation = [
  { name: "Technology", value: 38 },
  { name: "Financials", value: 22 },
  { name: "Healthcare", value: 16 },
  { name: "Energy", value: 13 },
  { name: "Consumer", value: 11 },
];

export const expertRadar = [
  { metric: "Trend", technical: 88, fundamental: 62, sentiment: 74, risk: 41 },
  { metric: "Value", technical: 55, fundamental: 84, sentiment: 48, risk: 60 },
  { metric: "Momentum", technical: 91, fundamental: 58, sentiment: 82, risk: 38 },
  { metric: "Quality", technical: 60, fundamental: 88, sentiment: 55, risk: 72 },
  { metric: "Stability", technical: 52, fundamental: 70, sentiment: 44, risk: 35 },
];

export const monthlyReturns = [
  { month: "Jul", returns: 3.2 },
  { month: "Aug", returns: 5.1 },
  { month: "Sep", returns: -1.8 },
  { month: "Oct", returns: 4.4 },
  { month: "Nov", returns: 6.3 },
  { month: "Dec", returns: 2.7 },
];

export const recentAnalyses: {
  ticker: string;
  company: string;
  recommendation: Recommendation;
  confidence: number;
  risk: "Low" | "Medium" | "High";
  date: string;
}[] = [
  { ticker: "AAPL", company: "Apple Inc.", recommendation: "BUY", confidence: 82, risk: "Low", date: "2026-07-28" },
  { ticker: "TSLA", company: "Tesla Inc.", recommendation: "WAIT", confidence: 54, risk: "High", date: "2026-07-27" },
  { ticker: "INFY", company: "Infosys Ltd.", recommendation: "BUY", confidence: 76, risk: "Medium", date: "2026-07-25" },
  { ticker: "RELIANCE", company: "Reliance Industries", recommendation: "BUY", confidence: 71, risk: "Medium", date: "2026-07-22" },
  { ticker: "NFLX", company: "Netflix Inc.", recommendation: "SELL", confidence: 68, risk: "High", date: "2026-07-20" },
  { ticker: "MSFT", company: "Microsoft Corp.", recommendation: "BUY", confidence: 88, risk: "Low", date: "2026-07-18" },
  { ticker: "HDFCBANK", company: "HDFC Bank", recommendation: "WAIT", confidence: 49, risk: "Medium", date: "2026-07-15" },
];

export const holdings = [
  { ticker: "AAPL", company: "Apple Inc.", qty: 120, avg: 178.4, price: 232.1, rec: "BUY" as Recommendation },
  { ticker: "MSFT", company: "Microsoft Corp.", qty: 65, avg: 342.8, price: 421.5, rec: "BUY" as Recommendation },
  { ticker: "TSLA", company: "Tesla Inc.", qty: 80, avg: 265.2, price: 241.9, rec: "WAIT" as Recommendation },
  { ticker: "INFY", company: "Infosys Ltd.", qty: 300, avg: 16.1, price: 19.4, rec: "BUY" as Recommendation },
  { ticker: "RELIANCE", company: "Reliance Industries", qty: 150, avg: 32.6, price: 35.8, rec: "BUY" as Recommendation },
  { ticker: "NFLX", company: "Netflix Inc.", qty: 20, avg: 612.4, price: 578.2, rec: "SELL" as Recommendation },
];

export const news = [
  {
    id: 1,
    headline: "Apple's services margin hits record as AI features roll out globally",
    summary:
      "Services revenue grew 14% year over year, offsetting slower hardware upgrades and lifting gross margin above guidance.",
    sector: "Technology",
    sentiment: "Positive" as const,
    source: "Market Wire",
    time: "35m ago",
    hue: 162,
  },
  {
    id: 2,
    headline: "EV price war pressures margins for the second straight quarter",
    summary:
      "Analysts trim delivery estimates as discounting spreads across major markets, though battery costs continue falling.",
    sector: "Automotive",
    sentiment: "Negative" as const,
    source: "Global Finance Daily",
    time: "1h ago",
    hue: 22,
  },
  {
    id: 3,
    headline: "Indian IT majors guide cautiously despite strong deal wins",
    summary:
      "Order books remain healthy but clients are delaying discretionary spend, keeping near-term growth range-bound.",
    sector: "Technology",
    sentiment: "Neutral" as const,
    source: "Street Signal",
    time: "2h ago",
    hue: 80,
  },
  {
    id: 4,
    headline: "Banks rally as central bank signals a longer pause on rates",
    summary:
      "Net interest margin outlook improves, with lenders reporting stable asset quality across retail portfolios.",
    sector: "Financials",
    sentiment: "Positive" as const,
    source: "Capital Brief",
    time: "3h ago",
    hue: 264,
  },
  {
    id: 5,
    headline: "Refining spreads narrow as crude supply steadies",
    summary:
      "Energy majors face softer downstream economics while petrochemical demand shows early signs of recovery.",
    sector: "Energy",
    sentiment: "Neutral" as const,
    source: "Commodity Desk",
    time: "5h ago",
    hue: 200,
  },
  {
    id: 6,
    headline: "Healthcare M&A accelerates with two multi-billion dollar deals",
    summary:
      "Large caps buy late-stage pipelines to offset patent cliffs, pushing sector valuations to a two-year high.",
    sector: "Healthcare",
    sentiment: "Positive" as const,
    source: "Deal Room",
    time: "7h ago",
    hue: 300,
  },
];

export const discussion: {
  expert: ExpertKey;
  message: string;
  stance: "bullish" | "bearish" | "neutral";
}[] = [
  { expert: "technical", message: "Price is holding above the 50-day and 200-day moving averages with a fresh MACD crossover. Trend reads bullish.", stance: "bullish" },
  { expert: "fundamental", message: "Earnings quality supports it — EPS up 18% YoY, free cash flow expanding, debt/equity comfortable at 0.42.", stance: "bullish" },
  { expert: "risk", message: "I disagree on sizing. 30-day realised volatility is 34% and the stock has had two 9% single-day drops this quarter.", stance: "bearish" },
  { expert: "sentiment", message: "News flow is clearly positive (0.71) and social chatter is constructive, though it is starting to look crowded.", stance: "bullish" },
  { expert: "risk", message: "Crowded is my concern. If positioning unwinds, downside to the 200-day is roughly 12%.", stance: "bearish" },
  { expert: "technical", message: "Fair — support at 226 is the line that invalidates the setup. Above it, structure stays intact.", stance: "neutral" },
  { expert: "fundamental", message: "Valuation at 27x forward is above the 5-year median, so the upside case leans on execution, not re-rating.", stance: "neutral" },
];

export const historyRows = [
  ...recentAnalyses,
  { ticker: "GOOGL", company: "Alphabet Inc.", recommendation: "BUY" as Recommendation, confidence: 79, risk: "Low" as const, date: "2026-07-11" },
  { ticker: "AMZN", company: "Amazon.com Inc.", recommendation: "BUY" as Recommendation, confidence: 74, risk: "Medium" as const, date: "2026-07-08" },
  { ticker: "TCS", company: "Tata Consultancy", recommendation: "WAIT" as Recommendation, confidence: 51, risk: "Low" as const, date: "2026-07-02" },
  { ticker: "META", company: "Meta Platforms", recommendation: "SELL" as Recommendation, confidence: 63, risk: "High" as const, date: "2026-06-27" },
];

export const testimonials = [
  {
    name: "Ananya Rao",
    role: "Portfolio Manager, Vellore Capital",
    quote:
      "The disagreement between experts is the feature. I finally see why a call is a BUY instead of just being told it is.",
  },
  {
    name: "Daniel Okafor",
    role: "Independent trader",
    quote:
      "The conflict meter saved me from two crowded trades last quarter. Transparency changed how I size positions.",
  },
  {
    name: "Meera Iyer",
    role: "Retail investor",
    quote:
      "The emotion check caught my FOMO before I chased a breakout. It reads like a second opinion, not a signal service.",
  },
];

// AI Chat Mock Data
export const suggestedQuestions = [
  { id: "q1", text: "Why is the technical expert more bullish than the risk expert?", category: "technical" as const },
  { id: "q2", text: "What would make you change this to a SELL?", category: "risk" as const },
  { id: "q3", text: "How does the current P/E ratio compare to industry average?", category: "fundamental" as const },
  { id: "q4", text: "When is the best time to enter this position?", category: "timing" as const },
  { id: "q5", text: "What's the downside risk if earnings disappoint?", category: "risk" as const },
  { id: "q6", text: "Should I wait for a pullback or buy now?", category: "timing" as const },
];

export const chatResponses: Record<string, string> = {
  default: "Great question. Based on our multi-expert analysis, the key factors are: (1) Technical momentum remains strong above key moving averages, (2) Fundamental quality supports current valuation at 27.4x forward P/E, and (3) While sentiment is crowded, the risk-adjusted return still favors accumulation with proper position sizing. The main dissent comes from elevated 34% volatility, which suggests staggered entry rather than avoiding the position entirely.",
  q1: "The technical expert focuses purely on price action and momentum indicators, which are currently bullish with the stock above both 50D and 200D moving averages plus a fresh MACD crossover. The risk expert, however, looks at volatility (currently 34% annualized) and downside scenarios - they see a potential 12% drawdown to the 200D average. Both can be right: the trend is up, but the path may be volatile. This is why we recommend staggered entries rather than a full position at once.",
  q2: "Several scenarios would flip this to SELL: (1) Break below $226 support with high volume - invalidates the technical setup, (2) Quarterly earnings miss by >5% with lowered guidance - fundamentals deteriorate, (3) Sector rotation out of tech with rising rates - macro headwind, (4) Realized volatility spiking above 50% - risk becomes unmanageable. The key is watching these triggers, not trying to predict them. We'd downgrade to WAIT first if 2-3 yellow flags appear, then SELL if the setup fully breaks.",
  q3: "Current forward P/E of 27.4x is about 8% premium to the sector median of 25.3x. However, this is justified by: (1) Superior ROE (return on equity) - company generates 31% vs sector's 22%, (2) Consistent EPS growth - 18% YoY vs sector's 12%, (3) Strong balance sheet with debt/equity at 0.42 vs sector's 0.68. So while it's not 'cheap', it's a quality premium, not an overpayment. The fundamental expert rates this fairly valued, not expensive.",
  q4: "Optimal entry strategy for current conditions: (1) Deploy 40% of target position now around $238-$242 - capture the momentum, (2) Set limit orders for another 30% at $232-$235 (minor pullback zone), (3) Reserve final 30% for $226-$228 (major support test). This approach balances FOMO risk (missing the move) with drawdown risk (buying the top). With 34% volatility, you'll likely get at least one or two better entry points over the next 2-3 weeks. Avoid going all-in at current levels.",
  q5: "If earnings disappoint, here's the expected cascade: (1) Immediate reaction: -8% to -12% gap down, likely to $210-$215 zone, (2) Technical breakdown: loses 50D and 200D support, recommendation flips to SELL, (3) Confidence drops from 78% to ~35%, conflict rises as experts disagree on whether it's a buying opportunity or start of a larger decline. However, earnings beats have been consistent (last 5 quarters all beat estimates). The bigger risk isn't a miss, it's lowered guidance even with a beat - that typically causes -4% to -6% reaction.",
  q6: "Here's the tactical decision framework: BUY NOW IF: You want to capture momentum and are comfortable with 30-40% position size + can handle 8-10% drawdown. WAIT FOR PULLBACK IF: You prefer lower entry risk and can accept potentially missing the move if it runs away. Current setup favors a hybrid: start with 30-40% position now, keep powder dry for a dip to $230-$235 (healthy consolidation zone). The stock rarely gives perfect entries - trying to time the exact bottom usually means missing the trade entirely. Staggered entries solve this problem.",
  timing: "Given the current momentum and elevated social media attention, I'd suggest this timeline: (1) This week: Initial 30-40% position if price stays above $235, (2) Next 2 weeks: Watch for any dip toward $230-$232 to add another 30%, (3) Month 2: Final tranche only if the setup remains intact above $226. Avoid rushing in full size - the 34% volatility means you'll get opportunities to build the position over 3-6 weeks.",
  risk: "Primary risks in order of likelihood: (1) Volatility spike (34% could go to 45%+ on negative news) - manage with position sizing, (2) Technical breakdown below $226 support - would invalidate setup completely, (3) Sector rotation if rates rise unexpectedly - systematic risk affecting all tech, (4) Crowded positioning unwind - social mention velocity up 34% WoW suggests retail crowding. The risk expert isn't saying 'don't buy', they're saying 'buy smaller than you normally would and stage your entries'.",
  fundamental: "The fundamental case is solid: (1) Revenue growth 9.1% YoY with services expanding faster at double-digits, (2) Operating leverage improving - services margin up 140bps, (3) Balance sheet fortress with net cash position after accounting for short-term debt, (4) Capital returns strong - dividend coverage at 3.8x, plenty of room for buybacks. The 27.4x forward P/E is reasonable given the quality. Main risk is multiple compression if rates rise, but the earnings growth provides a cushion.",
  technical: "Technical picture is constructive: (1) Price structure: Higher highs and higher lows since July, (2) Volume confirmation: Breakout above $235 on 1.4x average volume, (3) Momentum: MACD bullish crossover, RSI at 62 (not overbought), (4) Support/Resistance: Strong support at $226, next resistance at $274. The setup stays valid above $226. Below that, risk increases significantly as the 200D average would be lost.",
};

// Action Plan Mock Data
export const actionPlan = {
  todaysAction: "Initiate position with 30-40% of target allocation",
  entryPrice: 238.5,
  targetPrice: 274.0,
  stopLoss: 226.0,
  positionSize: "2-3% of portfolio (below normal 4-5% due to elevated volatility)",
  timeHorizon: "6-9 months",
  notes: [
    "Stage remaining 60-70% over next 4-6 weeks on any pullbacks",
    "Consider adding at $232 (minor support) and $226 (major support)",
    "Exit if stock closes below $226 on high volume",
    "Take partial profits (30-40%) if price reaches $265-$270 zone",
    "Re-evaluate if volatility spikes above 45% or sector rotation begins",
  ],
};

// Confidence History Mock Data
export const confidenceHistory = [
  { period: "Yesterday" as const, confidence: 78, change: 0, recommendation: "BUY" as const },
  { period: "Last Week" as const, confidence: 82, change: -4, recommendation: "BUY" as const },
  { period: "Last Month" as const, confidence: 71, change: +7, recommendation: "WAIT" as const },
];

// Recommendation Scenarios Mock Data
export const recommendationScenarios = [
  {
    id: "scenario1",
    event: "Weak quarterly earnings",
    description: "EPS misses estimates by 8% with flat revenue growth",
    impact: "negative" as const,
    newRecommendation: "SELL" as const,
    newConfidence: 72,
    changeInConfidence: -6,
    likelihood: "Low" as const,
  },
  {
    id: "scenario2",
    event: "Interest rate increase",
    description: "Federal Reserve raises rates by 50bps unexpectedly",
    impact: "negative" as const,
    newRecommendation: "WAIT" as const,
    newConfidence: 54,
    changeInConfidence: -24,
    likelihood: "Medium" as const,
  },
  {
    id: "scenario3",
    event: "Negative guidance",
    description: "Company lowers forward revenue guidance by 5-7%",
    impact: "negative" as const,
    newRecommendation: "SELL" as const,
    newConfidence: 68,
    changeInConfidence: -10,
    likelihood: "Low" as const,
  },
  {
    id: "scenario4",
    event: "Volatility spike",
    description: "Market-wide volatility (VIX) spikes above 35",
    impact: "negative" as const,
    newRecommendation: "WAIT" as const,
    newConfidence: 45,
    changeInConfidence: -33,
    likelihood: "Medium" as const,
  },
  {
    id: "scenario5",
    event: "Strong earnings beat",
    description: "EPS beats by 12% with raised full-year guidance",
    impact: "positive" as const,
    newRecommendation: "BUY" as const,
    newConfidence: 91,
    changeInConfidence: +13,
    likelihood: "Medium" as const,
  },
  {
    id: "scenario6",
    event: "Sector rotation into tech",
    description: "Institutional money flows back into technology sector",
    impact: "positive" as const,
    newRecommendation: "BUY" as const,
    newConfidence: 86,
    changeInConfidence: +8,
    likelihood: "Medium" as const,
  },
];

// Enhanced Discussion with Natural Conversation Flow
export const enhancedDiscussion = [
  {
    id: "msg1",
    expert: "technical" as const,
    message: "Let me start with the technical picture. We have a clean breakout above $235 on strong volume - 1.4x the daily average. MACD just crossed bullish, RSI at 62 shows momentum without being overbought. The structure is clearly bullish with higher highs and higher lows since July.",
    stance: "bullish" as const,
    phase: "opening" as const,
  },
  {
    id: "msg2",
    expert: "fundamental" as const,
    message: "I agree the setup looks good, and fundamentals support it. EPS growth at 18% year-over-year, services margin expanding 140 basis points, and the balance sheet is rock solid. At 27.4x forward P/E, we're paying a modest premium, but the quality justifies it. Free cash flow is strong.",
    stance: "bullish" as const,
    phase: "opening" as const,
  },
  {
    id: "msg3",
    expert: "sentiment" as const,
    message: "Sentiment picture is constructive - news flow at +0.71 is clearly positive, analyst consensus is 18 Buy ratings versus only 1 Sell. But I'm seeing a yellow flag: social media mentions jumped 34% week-over-week. That velocity concerns me. When retail gets this excited, we're often near a local top.",
    stance: "bullish" as const,
    phase: "opening" as const,
  },
  {
    id: "msg4",
    expert: "risk" as const,
    message: "And that's exactly my concern. I disagree with the aggressive stance here. Yes, the trend is up, but look at the volatility - 34% annualized. That's double the S&P 500. We have a 12% gap down to the 200-day moving average. With a Beta of 1.18, this position will hurt in any tech selloff. The risk-reward at current prices doesn't justify a full position.",
    stance: "bearish" as const,
    respondsTo: "msg1",
    phase: "debate" as const,
  },
  {
    id: "msg5",
    expert: "technical" as const,
    message: "Fair point on volatility, but that's exactly why we have the $226 support level clearly marked. Above that line, the structure is intact. Below it, I'd flip bearish too. The MACD crossover and volume confirmation are real - this isn't a weak breakout. I'm not saying go all-in, but the trend is definitely our friend here.",
    stance: "bullish" as const,
    respondsTo: "msg4",
    phase: "debate" as const,
  },
  {
    id: "msg6",
    expert: "fundamental" as const,
    message: "The valuation supports a position too. We're not in bubble territory - forward P/E of 27x is reasonable given the 18% earnings growth and superior ROE. The company generates 31% return on equity versus the sector's 22%. That's not a small difference. Quality deserves a premium.",
    stance: "bullish" as const,
    respondsTo: "msg4",
    phase: "debate" as const,
  },
  {
    id: "msg7",
    expert: "risk" as const,
    message: "I'm not saying avoid it completely. I'm saying position size matters here. With 34% volatility, you should be at 60-70% of your normal single-name allocation, not 100%. And stage the entries - don't rush in all at once. If you get a pullback to $230-$232, that's a better entry. The setup works, but respect the volatility.",
    stance: "neutral" as const,
    respondsTo: "msg5",
    phase: "debate" as const,
  },
  {
    id: "msg8",
    expert: "sentiment" as const,
    message: "I can support that approach. The crowding I'm seeing isn't extreme yet, just elevated. A staggered entry strategy makes sense - start with 30-40% now while momentum is positive, keep dry powder for any dip. That balances FOMO risk with the legitimate volatility concerns.",
    stance: "neutral" as const,
    respondsTo: "msg7",
    phase: "consensus" as const,
  },
  {
    id: "msg9",
    expert: "technical" as const,
    message: "Agreed. As long as we're above $226, I'm comfortable with accumulation. The trend is intact. Just don't go all-in at once - that's fair risk management given the 34% vol. Start building the position, watch the $226 level, and scale in on any weakness toward $230.",
    stance: "bullish" as const,
    respondsTo: "msg8",
    phase: "consensus" as const,
  },
  {
    id: "msg10",
    expert: "fundamental" as const,
    message: "That's the synthesis then. BUY recommendation stands based on technical momentum, fundamental quality, and positive sentiment. But position sizing gets adjusted down due to volatility, and we advocate for staggered entries. The dissent is respected in the execution, not by flipping to WAIT.",
    stance: "bullish" as const,
    respondsTo: "msg8",
    phase: "consensus" as const,
  },
];
