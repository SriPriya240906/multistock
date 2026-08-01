import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { SentimentBadge } from "@/components/Primitives";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { news } from "@/data/mock-data";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Market News — StockSphere AI" },
      {
        name: "description",
        content:
          "Sector-filtered market headlines with an AI sentiment badge on every story so you can read the mood, not just the news.",
      },
      { property: "og:title", content: "Market News — StockSphere AI" },
      {
        property: "og:description",
        content: "Sentiment-tagged market headlines filtered by sector.",
      },
    ],
  }),
  component: News,
});

const sectors = ["All", "Technology", "Financials", "Healthcare", "Energy", "Automotive"];

function News() {
  const [sector, setSector] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      news.filter(
        (n) =>
          (sector === "All" || n.sector === sector) &&
          (n.headline + n.summary).toLowerCase().includes(q.toLowerCase()),
      ),
    [sector, q],
  );

  return (
    <AppShell title="Market News" subtitle="Headlines scored for sentiment by the sentiment expert.">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search headlines" className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                sector === s
                  ? "border-primary bg-primary/12 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((n, i) => (
          <motion.article
            key={n.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="surface-card hover-lift flex flex-col overflow-hidden rounded-2xl"
          >
            <div
              className="h-36 w-full"
              style={{
                backgroundImage: `linear-gradient(135deg, oklch(0.62 0.15 ${n.hue}), oklch(0.34 0.09 ${n.hue + 40}))`,
              }}
            />
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary">{n.sector}</Badge>
                <SentimentBadge sentiment={n.sentiment} />
              </div>
              <h2 className="mt-3 text-base font-semibold leading-snug">{n.headline}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{n.summary}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                {n.source} · {n.time}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">No headlines match that filter.</p>
      )}
    </AppShell>
  );
}
