/**
 * Example Usage of StockSphere AI Research Agent System
 * Demonstrates all major features with real-world scenarios
 */

import {
  analyzeStock,
  parseQuery,
  analyzeSentiment,
  analyzeRisk,
  generateConsensus,
  formatResearchReport,
} from "./index";

// ═══════════════════════════════════════════════════════════════════════════
// Example 1: Simple Stock Analysis
// ═══════════════════════════════════════════════════════════════════════════

export async function example1_SimpleAnalysis() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Example 1: Simple Stock Analysis");
  console.log("═══════════════════════════════════════════════════════════\n");

  const query = "Should I buy TCS stock?";
  console.log(`Query: "${query}"\n`);

  const { queryInfo, report } = await analyzeStock(query);

  console.log("📊 Query Understanding:");
  console.log(`  Ticker: ${queryInfo.ticker}`);
  console.log(`  Company: ${queryInfo.company_name}`);
  console.log(`  Intent: ${queryInfo.user_intent}`);
  console.log(`  Emotional Signals: ${queryInfo.emotional_signals.join(", ") || "None"}\n`);

  console.log("🎭 Sentiment Expert:");
  console.log(`  Recommendation: ${report.sentiment_expert.suggestion}`);
  console.log(`  Confidence: ${report.sentiment_expert.confidence}%`);
  console.log(`  Overall Mood: ${report.sentiment_expert.metrics.overall_mood}\n`);

  console.log("🛡️ Risk Expert:");
  console.log(`  Recommendation: ${report.risk_expert.suggestion}`);
  console.log(`  Confidence: ${report.risk_expert.confidence}%`);
  console.log(`  Risk Level: ${report.risk_expert.risk_level}`);
  console.log(`  Key Risks: ${report.risk_expert.key_risks.length}\n`);

  const consensus = generateConsensus(report);
  console.log("🎯 Consensus:");
  console.log(`  Final Recommendation: ${consensus.final_suggestion}`);
  console.log(`  Consensus Confidence: ${consensus.consensus_confidence}%\n`);
}

// ═══════════════════════════════════════════════════════════════════════════
// Example 2: Query with Emotional Signals (FOMO Detection)
// ═══════════════════════════════════════════════════════════════════════════

export async function example2_EmotionalSignals() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Example 2: FOMO Detection");
  console.log("═══════════════════════════════════════════════════════════\n");

  const query = "Tesla stock is trending everywhere! Should I buy now before it moons? Everyone is buying!";
  console.log(`Query: "${query}"\n`);

  const { queryInfo, report } = await analyzeStock(query);

  console.log("⚠️ Emotional Signals Detected:");
  queryInfo.emotional_signals.forEach((signal) => {
    console.log(`  • ${signal}`);
  });
  console.log();

  console.log("📊 Analysis:");
  console.log(`  Ticker: ${queryInfo.ticker}`);
  console.log(`  Crowding Level: ${report.sentiment_expert.metrics.crowding_level}`);
  console.log(`  Sentiment Risk: ${report.risk_expert.metrics.sentiment_risk}`);
  console.log();

  if (queryInfo.emotional_signals.includes("FOMO")) {
    console.log("💡 AI Guidance:");
    console.log("  FOMO detected. Remember:");
    console.log("  • Don't invest based on what 'everyone' is doing");
    console.log("  • Avoid urgency-driven decisions");
    console.log("  • Focus on fundamentals, not hype");
    console.log("  • Consider waiting for emotional factors to subside\n");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Example 3: Query with Quantity
// ═══════════════════════════════════════════════════════════════════════════

export async function example3_QuantityAnalysis() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Example 3: Investment Amount Analysis");
  console.log("═══════════════════════════════════════════════════════════\n");

  const query = "I want to invest ₹50000 in Infosys. Is it a good idea?";
  console.log(`Query: "${query}"\n`);

  const queryInfo = parseQuery(query);

  console.log("📊 Investment Details:");
  console.log(`  Stock: ${queryInfo.company_name} (${queryInfo.ticker})`);
  if (queryInfo.quantity) {
    console.log(`  Amount: ₹${queryInfo.quantity.value.toLocaleString()}`);
    console.log(`  Type: ${queryInfo.quantity.type}`);
  }
  console.log();

  // Simulate fetching current price
  const currentPrice = 1450; // Example price
  const shares = queryInfo.quantity ? Math.floor(queryInfo.quantity.value / currentPrice) : 0;

  console.log("💰 Position Sizing:");
  console.log(`  Current Price: ₹${currentPrice}`);
  console.log(`  Shares to Buy: ${shares}`);
  console.log(`  Actual Investment: ₹${(shares * currentPrice).toLocaleString()}\n`);
}

// ═══════════════════════════════════════════════════════════════════════════
// Example 4: Complete Research Report
// ═══════════════════════════════════════════════════════════════════════════

export async function example4_CompleteReport() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Example 4: Complete Research Report");
  console.log("═══════════════════════════════════════════════════════════\n");

  const query = "Is Apple a good investment right now?";

  const { queryInfo, report } = await analyzeStock(query);
  const formattedReport = formatResearchReport(queryInfo, report, true);

  console.log(formattedReport);
}

// ═══════════════════════════════════════════════════════════════════════════
// Example 5: Individual Expert Analysis
// ═══════════════════════════════════════════════════════════════════════════

export async function example5_IndividualExperts() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Example 5: Running Individual Experts");
  console.log("═══════════════════════════════════════════════════════════\n");

  const ticker = "AAPL";

  console.log(`Analyzing ${ticker} with individual experts...\n`);

  // Run sentiment analysis only
  console.log("🎭 Running Sentiment Expert...");
  const sentimentResult = await analyzeSentiment(ticker);
  console.log(`  Result: ${sentimentResult.suggestion} (${sentimentResult.confidence}%)`);
  console.log(`  News Sentiment: ${(sentimentResult.metrics.news_sentiment_score * 100).toFixed(0)}%`);
  console.log(`  Social Sentiment: ${(sentimentResult.metrics.social_sentiment_score * 100).toFixed(0)}%`);
  console.log();

  // Run risk analysis only
  console.log("🛡️ Running Risk Expert...");
  const riskResult = await analyzeRisk(ticker);
  console.log(`  Result: ${riskResult.suggestion} (${riskResult.confidence}%)`);
  console.log(`  Risk Level: ${riskResult.risk_level}`);
  console.log(`  Volatility: ${riskResult.metrics.volatility_level} (${riskResult.metrics.volatility_value.toFixed(1)}%)`);
  console.log(`  Key Risks: ${riskResult.key_risks.length}`);
  riskResult.key_risks.forEach((risk, i) => {
    console.log(`    ${i + 1}. ${risk}`);
  });
  console.log();
}

// ═══════════════════════════════════════════════════════════════════════════
// Example 6: Multiple Stock Comparison
// ═══════════════════════════════════════════════════════════════════════════

export async function example6_MultipleStocks() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Example 6: Comparing Multiple Stocks");
  console.log("═══════════════════════════════════════════════════════════\n");

  const stocks = ["TCS", "Infosys", "Wipro"];

  console.log(`Comparing Indian IT stocks: ${stocks.join(", ")}\n`);

  const results = await Promise.all(
    stocks.map(async (stock) => {
      const { queryInfo, report } = await analyzeStock(`Analyze ${stock}`);
      const consensus = generateConsensus(report);
      return {
        stock: queryInfo.company_name,
        ticker: queryInfo.ticker,
        sentiment: report.sentiment_expert.suggestion,
        sentimentConf: report.sentiment_expert.confidence,
        risk: report.risk_expert.suggestion,
        riskLevel: report.risk_expert.risk_level,
        consensus: consensus.final_suggestion,
        consensusConf: consensus.consensus_confidence,
      };
    })
  );

  console.log("📊 Comparison Table:");
  console.log("─".repeat(100));
  console.log(
    "Stock".padEnd(30) +
      "Sentiment".padEnd(15) +
      "Risk".padEnd(15) +
      "Risk Level".padEnd(15) +
      "Consensus".padEnd(15)
  );
  console.log("─".repeat(100));

  results.forEach((r) => {
    console.log(
      r.stock.padEnd(30) +
        `${r.sentiment} (${r.sentimentConf}%)`.padEnd(15) +
        `${r.risk} (${r.riskLevel})`.padEnd(15) +
        r.riskLevel.padEnd(15) +
        `${r.consensus} (${r.consensusConf}%)`.padEnd(15)
    );
  });

  console.log("─".repeat(100));
  console.log();
}

// ═══════════════════════════════════════════════════════════════════════════
// Example 7: Handling Invalid Queries
// ═══════════════════════════════════════════════════════════════════════════

export async function example7_ErrorHandling() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Example 7: Error Handling");
  console.log("═══════════════════════════════════════════════════════════\n");

  const invalidQueries = [
    "What's the weather like?",
    "Tell me a joke",
    "Should I buy stock?", // No ticker
  ];

  for (const query of invalidQueries) {
    console.log(`Query: "${query}"`);

    try {
      const result = await analyzeStock(query);
      console.log(`  ✓ Successfully analyzed: ${result.queryInfo.ticker}\n`);
    } catch (error) {
      console.log(`  ✗ Error: ${(error as Error).message}\n`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Run All Examples
// ═══════════════════════════════════════════════════════════════════════════

export async function runAllExamples() {
  console.log("\n");
  console.log("╔═══════════════════════════════════════════════════════════════════════════╗");
  console.log("║                   StockSphere AI Agent System Examples                   ║");
  console.log("╚═══════════════════════════════════════════════════════════════════════════╝");
  console.log("\n");

  await example1_SimpleAnalysis();
  await example2_EmotionalSignals();
  await example3_QuantityAnalysis();
  // await example4_CompleteReport(); // Uncomment for full report
  await example5_IndividualExperts();
  // await example6_MultipleStocks(); // Uncomment for comparison
  await example7_ErrorHandling();

  console.log("═══════════════════════════════════════════════════════════");
  console.log("All examples completed!");
  console.log("═══════════════════════════════════════════════════════════\n");
}

// Uncomment to run examples
// runAllExamples().catch(console.error);
