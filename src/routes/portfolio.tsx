import { createFileRoute } from "@tanstack/react-router";
import { Coins, LineChart, TrendingUp } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { AllocationPieChart, PriceLineChart } from "@/components/Charts";
import { MetricCard, RecBadge } from "@/components/Primitives";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { holdings } from "@/data/mock-data";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — StockSphere AI" },
      {
        name: "description",
        content:
          "Review total investment, daily and overall profit, sector allocation and a per-holding AI recommendation.",
      },
      { property: "og:title", content: "Portfolio — StockSphere AI" },
      {
        property: "og:description",
        content: "Holdings, allocation and an AI verdict on every position you own.",
      },
    ],
  }),
  component: Portfolio,
});

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

function Portfolio() {
  const rows = holdings.map((h) => {
    const invested = h.qty * h.avg;
    const current = h.qty * h.price;
    return { ...h, invested, current, pnl: current - invested, pnlPct: ((current - invested) / invested) * 100 };
  });
  const invested = rows.reduce((s, r) => s + r.invested, 0);
  const current = rows.reduce((s, r) => s + r.current, 0);

  return (
    <AppShell title="Portfolio" subtitle="Positions, allocation and the AI view on each holding.">
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard label="Total Investment" value={money(invested)} icon={<Coins className="h-[18px] w-[18px]" />} index={0} />
        <MetricCard label="Today's Profit" value="+$3,182" delta="+1.29%" positive icon={<TrendingUp className="h-[18px] w-[18px]" />} index={1} />
        <MetricCard
          label="Overall Profit"
          value={money(current - invested)}
          delta={`${(((current - invested) / invested) * 100).toFixed(2)}% all time`}
          positive={current >= invested}
          icon={<LineChart className="h-[18px] w-[18px]" />}
          index={2}
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <section className="surface-card rounded-2xl p-5 lg:col-span-2">
          <h2 className="text-base font-semibold">Portfolio growth</h2>
          <p className="text-xs text-muted-foreground">Value vs benchmark</p>
          <PriceLineChart />
        </section>
        <section className="surface-card rounded-2xl p-5">
          <h2 className="text-base font-semibold">Allocation</h2>
          <p className="text-xs text-muted-foreground">By sector</p>
          <AllocationPieChart />
        </section>
      </div>

      <section className="surface-card mt-5 overflow-hidden rounded-2xl">
        <header className="border-b border-border p-5">
          <h2 className="text-base font-semibold">Holdings</h2>
          <p className="text-xs text-muted-foreground">{rows.length} positions</p>
        </header>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Avg price</TableHead>
                <TableHead className="text-right">Current</TableHead>
                <TableHead className="text-right">Profit / Loss</TableHead>
                <TableHead className="text-right">AI call</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.ticker}>
                  <TableCell>
                    <span className="font-semibold">{r.ticker}</span>
                    <span className="block text-xs text-muted-foreground">{r.company}</span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{r.qty}</TableCell>
                  <TableCell className="text-right tabular-nums">{money(r.avg)}</TableCell>
                  <TableCell className="text-right tabular-nums">{money(r.price)}</TableCell>
                  <TableCell
                    className={`text-right tabular-nums font-medium ${r.pnl >= 0 ? "text-success" : "text-destructive"}`}
                  >
                    {money(r.pnl)}
                    <span className="block text-xs font-normal">{r.pnlPct.toFixed(2)}%</span>
                  </TableCell>
                  <TableCell className="text-right"><RecBadge rec={r.rec} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </AppShell>
  );
}
