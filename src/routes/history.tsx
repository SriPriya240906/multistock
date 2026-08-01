import { createFileRoute } from "@tanstack/react-router";
import { Download, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { RecBadge, RiskBadge } from "@/components/Primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { historyRows } from "@/data/mock-data";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Analysis History — StockSphere AI" },
      {
        name: "description",
        content:
          "Search and filter every past multi-expert analysis by ticker, date or recommendation, then export the record as a PDF.",
      },
      { property: "og:title", content: "Analysis History — StockSphere AI" },
      {
        property: "og:description",
        content: "A searchable audit trail of every AI recommendation you have run.",
      },
    ],
  }),
  component: History,
});

function History() {
  const [q, setQ] = useState("");
  const [rec, setRec] = useState("all");
  const [sort, setSort] = useState("newest");

  const rows = useMemo(() => {
    const out = historyRows.filter(
      (r) =>
        (rec === "all" || r.recommendation === rec) &&
        (r.ticker + r.company).toLowerCase().includes(q.toLowerCase()),
    );
    return out.sort((a, b) =>
      sort === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
  }, [q, rec, sort]);

  return (
    <AppShell title="History" subtitle="Every analysis you have run, with the verdict it produced.">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] lg:items-center">
        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ticker or company" className="pl-9" />
        </div>
        <Select value={rec} onValueChange={setRec}>
          <SelectTrigger className="w-full lg:w-44">
            <SelectValue placeholder="Recommendation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All recommendations</SelectItem>
            <SelectItem value="BUY">BUY</SelectItem>
            <SelectItem value="SELL">SELL</SelectItem>
            <SelectItem value="WAIT">WAIT</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full lg:w-40">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => toast.success("Export queued", { description: `${rows.length} analyses will be exported as PDF.` })}>
          <Download className="mr-1.5 h-4 w-4" /> Export PDF
        </Button>
      </div>

      <section className="surface-card mt-5 overflow-hidden rounded-2xl">
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
              {rows.map((r) => (
                <TableRow key={`${r.ticker}-${r.date}`}>
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
        {rows.length === 0 && (
          <p className="p-10 text-center text-sm text-muted-foreground">No analyses match those filters.</p>
        )}
      </section>
    </AppShell>
  );
}
