import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Activity, BrainCircuit, ShieldAlert, Wallet } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import {
  AllocationPieChart,
  CandlestickChart,
  ExpertRadarChart,
  PriceLineChart,
  ReturnsBarChart,
} from "@/components/Charts";
import { MetricCard, RecBadge, RiskBadge } from "@/components/Primitives";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { recentAnalyses } from "@/data/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — StockSphere AI" },
      {
        name: "description",
        content:
          "Track portfolio value, daily gain, risk score and AI confidence with live charts and your most recent multi-expert analyses.",
      },
      { property: "og:title", content: "Dashboard — StockSphere AI" },
      {
        property: "og:description",
        content: "Portfolio value, risk score, AI confidence and recent explainable stock analyses in one view.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell title="Dashboard" subtitle="Your portfolio health and the latest expert verdicts.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Portfolio Value" value="$248,610" delta="+12.4% YTD" positive icon={<Wallet className="h-[18px] w-[18px]" />} index={0} />
        <MetricCard label="Today's Gain / Loss" value="+$3,182" delta="+1.29% today" positive icon={<Activity className="h-[18px] w-[18px]" />} index={1} />
        <MetricCard label="Risk Score" value="46 / 100" delta="Moderate exposure" icon={<ShieldAlert className="h-[18px] w-[18px]" />} index={2} />
        <MetricCard label="AI Confidence" value="78%" delta="Conflict: Medium" positive icon={<BrainCircuit className="h-[18px] w-[18px]" />} index={3} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="surface-card rounded-2xl p-5 lg:col-span-2"
        >
          <header className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold">Portfolio vs benchmark</h2>
              <p className="text-xs text-muted-foreground">Trailing 12 months</p>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link to="/analyze">Analyze a stock</Link>
            </Button>
          </header>
          <PriceLineChart />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="surface-card rounded-2xl p-5"
        >
          <h2 className="text-base font-semibold">Sector allocation</h2>
          <p className="text-xs text-muted-foreground">By market value</p>
          <AllocationPieChart />
        </motion.section>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <section className="surface-card rounded-2xl p-5 lg:col-span-2">
          <h2 className="text-base font-semibold">Price action — AAPL</h2>
          <p className="text-xs text-muted-foreground">Daily candles, last two weeks</p>
          <CandlestickChart />
        </section>
        <section className="surface-card rounded-2xl p-5">
          <h2 className="text-base font-semibold">Monthly returns</h2>
          <p className="text-xs text-muted-foreground">Net of fees</p>
          <ReturnsBarChart />
        </section>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <section className="surface-card overflow-hidden rounded-2xl lg:col-span-2">
          <header className="border-b border-border p-5">
            <h2 className="text-base font-semibold">Recent analysis</h2>
            <p className="text-xs text-muted-foreground">Latest multi-expert runs</p>
          </header>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Recommendation</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAnalyses.map((r) => (
                  <TableRow key={r.ticker}>
                    <TableCell>
                      <span className="font-semibold">{r.ticker}</span>
                      <span className="block text-xs text-muted-foreground">{r.company}</span>
                    </TableCell>
                    <TableCell><RecBadge rec={r.recommendation} /></TableCell>
                    <TableCell className="tabular-nums">{r.confidence}%</TableCell>
                    <TableCell><RiskBadge risk={r.risk} /></TableCell>
                    <TableCell className="text-right text-xs tabular-nums text-muted-foreground">{r.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="surface-card rounded-2xl p-5">
          <h2 className="text-base font-semibold">Expert comparison</h2>
          <p className="text-xs text-muted-foreground">How each lens scores the book</p>
          <ExpertRadarChart />
        </section>
      </div>
    </AppShell>
  );
}
