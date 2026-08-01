// MINIMAL WORKING VERSION - Use this as reference to rebuild analyze.tsx
// This file contains the basic structure. You'll need to add all the enhanced features.

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
} from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { CandlestickChart, ExpertRadarChart } from "@/components/Charts";
import { ExpertInsightCard } from "@/components/ExpertInsightCard";
import { CircularMeter, Meter, RecBadge } from "@/components/Primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { experts } from "@/data/mock-data";

export const Route = createFileRoute("/analyze-BACKUP")({
  head: () => ({
    meta: [
      { title: "Analyze a Stock — StockSphere AI" },
      {
        name: "description",
        content:
          "Run four AI experts on any ticker and read the technical, fundamental, sentiment and risk verdicts plus their open debate.",
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

  const run = () => {
    setState("loading");
    window.setTimeout(() => setState("done"), 1600);
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

            {/* Emotion awareness */}
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

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-primary" /> Technical</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5 text-info" /> Fundamental</span>
              <span className="flex items-center gap-1.5"><Smile className="h-3.5 w-3.5 text-warning" /> Sentiment</span>
              <span className="flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5 text-destructive" /> Risk</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
