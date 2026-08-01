import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertTriangle,
  Activity,
  BarChart3,
  BrainCircuit,
  Clock3,
  Flame,
  Search,
  ShieldAlert,
  Smile,
  Sparkle,
  TrendingUp,
  Send,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  X,
} from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { CandlestickChart, ExpertRadarChart } from "@/components/Charts";
import { ExpertInsightCard } from "@/components/ExpertInsightCard";
import { CircularMeter, Meter, RecBadge } from "@/components/Primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  experts, 
  enhancedDiscussion,
  suggestedQuestions,
  chatResponses,
  actionPlan,
  confidenceHistory,
  recommendationScenarios,
} from "@/data/mock-data";
import type { ChatMessage } from "@/types";

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Analyze a Stock — StockSphere AI" },
      {
        name: "description",
        content: "Run four AI experts on any ticker and read the technical, fundamental, sentiment and risk verdicts plus their open debate.",
      },
      { property: "og:title", content: "Analyze a Stock — StockSphere AI" },
      {
        property: "og:description",
        content: "Enter a ticker and get a confidence-scored BUY, SELL or WAIT call with full expert reasoning.",
      },
    ],
  }),
  component: Analyze,
});

const toneClass = {
  primary: "text-primary",
  info: "text-info",
  warning: "text-warning",
  destructive: "text-destructive",
};

function Analyze() {
  const [symbol, setSymbol] = useState("AAPL");
  const [state, setState] = useState<"idle" | "loading" | "done">("done");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const run = () => {
    setState("loading");
    window.setTimeout(() => setState("done"), 1600);
  };

  const handleSendMessage = (text: string) => {
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
    
    setTimeout(() => {
      const questionId = suggestedQuestions.find(q => q.text === text)?.id;
      const responseText = questionId && chatResponses[questionId] 
        ? chatResponses[questionId] 
        : chatResponses.default;
      
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <AppShell title="Analyze Stock" subtitle="Four experts, one debate, one explainable verdict.">
      <section className="surface-card rounded-2xl p-5">
        <form
          className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
          onSubmit={(e) => {
            e.preventDefault();
            run();
          }}
        >
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="Stock symbol"
              aria-label="Stock symbol"
              className="h-11 pl-9 font-medium tracking-wide"
            />
          </div>
          <Button type="submit" size="lg" className="bg-gradient-brand text-primary-foreground hover:opacity-90">
            <Sparkle className="mr-1.5 h-4 w-4" /> Analyze
          </Button>
        </form>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          Examples:
          {["AAPL", "TSLA", "INFY", "RELIANCE"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSymbol(s);
                run();
              }}
              className="rounded-full border border-border px-2.5 py-1 font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {state === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5">
            <div className="surface-card flex items-center gap-4 rounded-2xl p-5">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                className="bg-gradient-brand grid h-10 w-10 place-items-center rounded-xl text-primary-foreground"
              >
                <BrainCircuit className="h-5 w-5" />
              </motion.span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">Convening the expert panel for {symbol}…</p>
                <p className="text-xs text-muted-foreground">
                  Reading price structure, filings, news flow and volatility surface.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {experts.map((e) => (
                <div key={e.key} className="surface-card space-y-3 rounded-2xl p-5">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/6" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {state === "done" && (
          <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-5">
            {/* Final recommendation */}
            <section className="surface-card glow grid gap-8 rounded-3xl p-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:p-8">
              <div className="flex flex-col items-center gap-4">
                <CircularMeter value={78} caption="AI confidence" />
                <RecBadge rec="BUY" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-3xl font-semibold">
                    {symbol} · <span className="text-success">BUY</span>
                  </h2>
                  <Badge variant="outline" className="border-warning/40 bg-warning/12 text-warning">
                    Conflict: Medium
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Three of four experts support accumulation; the risk expert dissents on position sizing.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <Meter label="Consensus" value={75} />
                  <Meter label="Conflict level" value={38} tone="warning" />
                  <Meter label="Risk exposure" value={54} tone="destructive" />
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  {[
                    "Trend structure intact above the 50D and 200D averages with a fresh MACD crossover.",
                    "EPS +18% YoY with expanding free cash flow and debt/equity at a comfortable 0.42.",
                    "News sentiment positive at +0.71, though mention growth suggests crowded positioning.",
                    "Dissent: 34% realised volatility implies a ~12% drawdown risk to the 200D average.",
                    "Suggested action: stagger entries, keep position size below your normal single-name cap.",
                  ].map((r) => (
                    <li key={r} className="flex gap-2.5 text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Expert cards */}
            <div className="grid gap-5 lg:grid-cols-2">
              {experts.map((e, i) => (
                <ExpertInsightCard key={e.key} expert={e} index={i} />
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <section className="surface-card rounded-2xl p-5 lg:col-span-2">
                <h2 className="text-base font-semibold">{symbol} price action</h2>
                <p className="text-xs text-muted-foreground">Daily candles with support at $226</p>
                <CandlestickChart />
              </section>
              <section className="surface-card rounded-2xl p-5">
                <h2 className="text-base font-semibold">Expert scorecard</h2>
                <p className="text-xs text-muted-foreground">Radar comparison</p>
                <ExpertRadarChart />
              </section>
            </div>

            {/* Emotion awareness check */}
            <section className="surface-card rounded-2xl p-5">
              <header className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-warning/15 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-semibold">Emotion awareness check</h2>
                  <p className="text-xs text-muted-foreground">Behavioural patterns detected in your activity</p>
                </div>
              </header>
              <TooltipProvider>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { icon: Flame, title: "FOMO detected", body: "You searched this ticker 6 times after a 9% single-day rally.", tone: "warning" as const },
                    { icon: TrendingUp, title: "Panic selling", body: "No panic exits detected in the last 30 days. Well held.", tone: "primary" as const },
                    { icon: Activity, title: "Overtrading", body: "14 trades this month vs your 6-trade average. Consider slowing down.", tone: "destructive" as const },
                    { icon: Clock3, title: "Long-term reminder", body: "Your best returns came from positions held over 9 months.", tone: "info" as const },
                  ].map((c) => (
                    <Tooltip key={c.title}>
                      <TooltipTrigger asChild>
                        <div className="rounded-xl border border-border bg-secondary/50 p-4 text-left">
                          <c.icon className={`h-[18px] w-[18px] ${toneClass[c.tone]}`} />
                          <p className="mt-3 text-sm font-semibold">{c.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{c.body}</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Based on your last 30 days of activity</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </section>

            {/* Confidence History */}
            <section className="surface-card rounded-2xl p-5">
              <header className="mb-5">
                <h2 className="text-base font-semibold">Confidence History</h2>
                <p className="text-xs text-muted-foreground">
                  How our recommendation confidence has evolved
                </p>
              </header>

              <div className="grid gap-4 sm:grid-cols-3">
                {confidenceHistory.map((item) => (
                  <div key={item.period} className="rounded-xl border border-border bg-secondary/50 p-4">
                    <p className="text-xs font-medium text-muted-foreground">{item.period}</p>
                    <div className="mt-3 flex items-baseline gap-2">
                      <p className="text-2xl font-bold">{item.confidence}%</p>
                      {item.change !== 0 && (
                        <span
                          className={`flex items-center text-xs font-semibold ${
                            item.change > 0 ? "text-success" : "text-destructive"
                          }`}
                        >
                          {item.change > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {Math.abs(item.change)}%
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <RecBadge rec={item.recommendation} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-3 text-xs text-muted-foreground">
                Confidence increased by 7 points over the past month as technical setup strengthened and earnings beat expectations.
              </div>
            </section>

            {/* Action Plan Card */}
            <section className="surface-card rounded-2xl p-5">
              <header className="mb-5 flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-success/15 text-success">
                  <Target className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-semibold">Action Plan</h2>
                  <p className="text-xs text-muted-foreground">Tactical execution strategy for {symbol}</p>
                </div>
              </header>

              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-xl border border-border bg-secondary/50 p-4">
                  <p className="text-xs font-medium text-muted-foreground">Today's Action</p>
                  <p className="mt-2 text-sm font-semibold">{actionPlan.todaysAction}</p>
                </div>
                
                <div className="rounded-xl border border-border bg-secondary/50 p-4">
                  <p className="text-xs font-medium text-muted-foreground">Entry Price</p>
                  <p className="mt-2 text-xl font-bold text-success">${actionPlan.entryPrice.toFixed(2)}</p>
                </div>

                <div className="rounded-xl border border-border bg-secondary/50 p-4">
                  <p className="text-xs font-medium text-muted-foreground">Target Price</p>
                  <p className="mt-2 text-xl font-bold text-primary">${actionPlan.targetPrice.toFixed(2)}</p>
                  <p className="mt-1 text-xs text-success">
                    +{(((actionPlan.targetPrice - actionPlan.entryPrice) / actionPlan.entryPrice) * 100).toFixed(1)}% upside
                  </p>
                </div>

                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                  <p className="text-xs font-medium text-muted-foreground">Stop Loss</p>
                  <p className="mt-2 text-xl font-bold text-destructive">${actionPlan.stopLoss.toFixed(2)}</p>
                  <p className="mt-1 text-xs text-destructive">
                    {(((actionPlan.stopLoss - actionPlan.entryPrice) / actionPlan.entryPrice) * 100).toFixed(1)}% risk
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-secondary/50 p-4">
                  <p className="text-xs font-medium text-muted-foreground">Position Size</p>
                  <p className="mt-2 text-sm font-semibold leading-snug">{actionPlan.positionSize}</p>
                </div>

                <div className="rounded-xl border border-border bg-secondary/50 p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs font-medium text-muted-foreground">Time Horizon</p>
                  </div>
                  <p className="mt-2 text-sm font-semibold">{actionPlan.timeHorizon}</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-info/20 bg-info/5 p-4">
                <p className="text-xs font-semibold text-info">Execution Notes:</p>
                <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                  {actionPlan.notes.map((note, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-info" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Recommendation Change Scenarios */}
            <section className="surface-card rounded-2xl p-5">
              <header className="mb-5 flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-warning/15 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-semibold">What could change this recommendation?</h2>
                  <p className="text-xs text-muted-foreground">
                    Scenario analysis — how different events would impact our view
                  </p>
                </div>
              </header>

              <div className="space-y-3">
                {recommendationScenarios.map((scenario) => (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`rounded-xl border p-4 ${
                      scenario.impact === "negative"
                        ? "border-destructive/20 bg-destructive/5"
                        : scenario.impact === "positive"
                          ? "border-success/20 bg-success/5"
                          : "border-border bg-secondary/50"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold">{scenario.event}</h3>
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${
                              scenario.likelihood === "High"
                                ? "border-destructive/40 bg-destructive/10 text-destructive"
                                : scenario.likelihood === "Medium"
                                  ? "border-warning/40 bg-warning/10 text-warning"
                                  : "border-border bg-secondary text-muted-foreground"
                            }`}
                          >
                            {scenario.likelihood} likelihood
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{scenario.description}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs font-medium text-muted-foreground">New Recommendation</p>
                          <div className="mt-1">
                            <RecBadge rec={scenario.newRecommendation} />
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-medium text-muted-foreground">Confidence</p>
                          <div className="mt-1 flex items-baseline gap-1">
                            <span className="text-lg font-bold">{scenario.newConfidence}%</span>
                            <span
                              className={`flex items-center text-[10px] font-semibold ${
                                scenario.changeInConfidence > 0 ? "text-success" : "text-destructive"
                              }`}
                            >
                              {scenario.changeInConfidence > 0 ? "+" : ""}
                              {scenario.changeInConfidence}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-info/20 bg-info/5 p-4 text-xs text-muted-foreground">
                <p className="font-semibold text-info">Monitoring Strategy:</p>
                <p className="mt-1">
                  We actively track these trigger events. If 2-3 yellow flags appear simultaneously, the recommendation
                  automatically downgrades to WAIT. Follow the "Confidence History" section to see updates in real-time.
                </p>
              </div>
            </section>

            {/* Collaborative AI Discussion */}
            <section className="surface-card rounded-2xl p-5">
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold">Collaborative AI discussion</h2>
                  <p className="text-xs text-muted-foreground">
                    Live expert debate — watch how they reach consensus
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <Meter label="Consensus" value={75} />
                  </div>
                  <div className="w-32">
                    <Meter label="Conflict" value={38} tone="warning" />
                  </div>
                </div>
              </header>

              <ol className="mt-6 space-y-4">
                {enhancedDiscussion.map((msg, i) => {
                  const e = experts.find((x) => x.key === msg.expert)!;
                  const mine = msg.expert === "risk";
                  const isResponse = msg.respondsTo !== undefined;
                  const phaseColor = msg.phase === "opening" ? "border-info/20 bg-info/5" : 
                                    msg.phase === "debate" ? "border-warning/20 bg-warning/5" :
                                    "border-success/20 bg-success/5";
                  
                  return (
                    <motion.li
                      key={msg.id}
                      initial={{ opacity: 0, x: mine ? 16 : -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      className={`flex max-w-2xl gap-3 ${mine ? "ml-auto flex-row-reverse text-right" : ""} ${isResponse ? "ml-8" : ""}`}
                    >
                      <Avatar className="h-9 w-9 shrink-0 border border-border">
                        <AvatarFallback className="bg-secondary text-sm">{e.emoji}</AvatarFallback>
                      </Avatar>
                      <div className={`min-w-0 rounded-2xl border px-4 py-3 ${phaseColor}`}>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold">
                            {e.name}
                          </p>
                          <span
                            className={`text-[10px] font-medium uppercase tracking-wider ${
                              msg.stance === "bullish"
                                ? "text-success"
                                : msg.stance === "bearish"
                                  ? "text-destructive"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {msg.stance}
                          </span>
                          {msg.phase === "consensus" && (
                            <Badge variant="outline" className="ml-auto border-success/40 bg-success/10 text-success text-[9px] px-1.5 py-0">
                              CONSENSUS
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1.5 text-sm text-muted-foreground">{msg.message}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>

              <div className="mt-6 rounded-xl border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-info/60" />
                    <span>Opening Arguments</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-warning/60" />
                    <span>Active Debate</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-success/60" />
                    <span>Consensus Reached</span>
                  </div>
                </div>
              </div>

              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="conflict">
                  <AccordionTrigger className="text-sm">How was the conflict resolved?</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      The risk expert's dissent lowers confidence from 91% to 78% and moves conflict to Medium.
                      Rather than overriding it, the platform keeps the BUY but attaches a sizing constraint.
                    </p>
                    <p>
                      Weighting: technical 30%, fundamental 30%, sentiment 15%, risk 25% — risk is given veto
                      power only when volatility exceeds 45%.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-primary" /> Technical</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5 text-info" /> Fundamental</span>
              <span className="flex items-center gap-1.5"><Smile className="h-3.5 w-3.5 text-warning" /> Sentiment</span>
              <span className="flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5 text-destructive" /> Risk</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isChatOpen && state === "done" && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-brand text-4xl shadow-lg transition-transform flex items-center justify-center"
            aria-label="Open AI Chat"
          >
            🤖
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            
            {/* Chat Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-full sm:max-w-md"
            >
              <div className="surface-card rounded-2xl p-5 shadow-2xl max-h-[600px] flex flex-col">
                {/* Header */}
                <header className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-gradient-brand grid h-10 w-10 shrink-0 place-items-center rounded-xl text-primary-foreground">
                      <BrainCircuit className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-base font-semibold">AI Investment Committee</h2>
                      <p className="text-xs text-muted-foreground">Ask follow-up questions</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsChatOpen(false)}
                    className="h-8 w-8 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </header>

                {/* Chat Messages */}
                {chatMessages.length > 0 && (
                  <div className="mb-4 flex-1 space-y-3 overflow-y-auto rounded-xl border border-border bg-secondary/30 p-4">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse text-right" : ""}`}
                      >
                        <Avatar className="h-8 w-8 shrink-0 border border-border">
                          <AvatarFallback className="bg-secondary text-xs">
                            {msg.role === "user" ? "👤" : "🤖"}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`min-w-0 max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${
                            msg.role === "user"
                              ? "bg-primary/10 border border-primary/20 text-foreground"
                              : "bg-secondary border border-border text-muted-foreground"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8 shrink-0 border border-border">
                          <AvatarFallback className="bg-secondary text-xs">🤖</AvatarFallback>
                        </Avatar>
                        <div className="rounded-xl border border-border bg-secondary px-3.5 py-2.5">
                          <div className="flex gap-1">
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                              className="h-2 w-2 rounded-full bg-muted-foreground"
                            />
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                              className="h-2 w-2 rounded-full bg-muted-foreground"
                            />
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                              className="h-2 w-2 rounded-full bg-muted-foreground"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Suggested Questions */}
                {chatMessages.length === 0 && (
                  <div className="mb-4 flex-1 overflow-y-auto">
                    <p className="mb-3 text-xs font-medium text-muted-foreground">Suggested questions:</p>
                    <div className="space-y-2">
                      {suggestedQuestions.slice(0, 4).map((q) => (
                        <button
                          key={q.id}
                          onClick={() => handleSuggestedQuestion(q.text)}
                          className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-left text-xs transition-colors hover:border-primary hover:bg-secondary"
                        >
                          {q.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chat Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(chatInput);
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about the recommendation..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button type="submit" size="icon" disabled={!chatInput.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
