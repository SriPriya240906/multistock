/**
 * Unit tests for Query Parser
 * Run with: npm test (when test framework is set up)
 */

import { parseQuery } from "../query-parser";

describe("Query Parser", () => {
  describe("Stock Ticker Extraction", () => {
    test("should extract Indian stock tickers", () => {
      const result = parseQuery("Should I buy TCS stock?");
      expect(result.ticker).toBe("TCS.NS");
      expect(result.company_name).toBe("Tata Consultancy Services");
    });

    test("should extract US stock tickers", () => {
      const result = parseQuery("Is Apple a good investment?");
      expect(result.ticker).toBe("AAPL");
      expect(result.company_name).toBe("Apple Inc.");
    });

    test("should handle ticker symbols directly", () => {
      const result = parseQuery("Analyze TSLA");
      expect(result.ticker).toBe("TSLA");
    });

    test("should recognize company names", () => {
      const result = parseQuery("Tell me about Microsoft");
      expect(result.ticker).toBe("MSFT");
      expect(result.company_name).toBe("Microsoft Corporation");
    });
  });

  describe("Intent Detection", () => {
    test("should detect buy intent", () => {
      const result = parseQuery("Should I buy Reliance?");
      expect(result.user_intent).toBe("Should I buy analysis");
    });

    test("should detect sell intent", () => {
      const result = parseQuery("Should I sell my HDFC shares?");
      expect(result.user_intent).toBe("Should I sell analysis");
    });

    test("should detect risk assessment intent", () => {
      const result = parseQuery("Is Tesla stock risky?");
      expect(result.user_intent).toBe("Risk assessment");
    });

    test("should detect general analysis intent", () => {
      const result = parseQuery("Analyze Amazon stock");
      expect(result.user_intent).toBe("General analysis");
    });
  });

  describe("Quantity Extraction", () => {
    test("should extract share quantity", () => {
      const result = parseQuery("Should I buy 10 shares of TCS?");
      expect(result.quantity).toEqual({ value: 10, type: "shares" });
    });

    test("should extract rupee amount", () => {
      const result = parseQuery("I want to invest ₹50000 in Infosys");
      expect(result.quantity).toEqual({ value: 50000, type: "amount" });
    });

    test("should extract dollar amount", () => {
      const result = parseQuery("Invest $1000 in Tesla");
      expect(result.quantity).toEqual({ value: 1000, type: "amount" });
    });

    test("should handle queries without quantity", () => {
      const result = parseQuery("Should I buy Apple?");
      expect(result.quantity).toBeNull();
    });
  });

  describe("Emotional Signal Detection", () => {
    test("should detect FOMO", () => {
      const result = parseQuery("Everyone is buying Tesla, should I?");
      expect(result.emotional_signals).toContain("FOMO");
    });

    test("should detect urgency", () => {
      const result = parseQuery("Should I buy now immediately?");
      expect(result.emotional_signals).toContain("URGENCY");
    });

    test("should detect fear", () => {
      const result = parseQuery("I'm worried about losing money on this stock");
      expect(result.emotional_signals).toContain("FEAR");
    });

    test("should detect greed", () => {
      const result = parseQuery("This stock will 10x guaranteed!");
      expect(result.emotional_signals).toContain("GREED");
    });

    test("should detect multiple signals", () => {
      const result = parseQuery("Everyone says this will moon, should I buy now?");
      expect(result.emotional_signals.length).toBeGreaterThan(1);
      expect(result.emotional_signals).toContain("FOMO");
      expect(result.emotional_signals).toContain("HYPE");
    });

    test("should return empty array for neutral queries", () => {
      const result = parseQuery("Analyze TCS fundamentals");
      expect(result.emotional_signals).toEqual([]);
    });
  });

  describe("Edge Cases", () => {
    test("should handle lowercase input", () => {
      const result = parseQuery("should i buy tcs?");
      expect(result.ticker).toBe("TCS.NS");
    });

    test("should handle mixed case", () => {
      const result = parseQuery("Should I BUY ApPlE?");
      expect(result.ticker).toBe("AAPL");
    });

    test("should preserve original query", () => {
      const query = "Should I buy 10 shares of TCS urgently?";
      const result = parseQuery(query);
      expect(result.original_query).toBe(query);
    });
  });
});
