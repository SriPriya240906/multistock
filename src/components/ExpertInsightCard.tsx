import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

import { Meter, RecBadge } from "@/components/Primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { ExpertItem } from "@/types";

export function ExpertInsightCard({ expert, index = 0 }: { expert: ExpertItem; index?: number }) {
  const toneClass = {
    primary: "text-primary border-primary/30 bg-primary/10",
    info: "text-info border-info/30 bg-info/10",
    warning: "text-warning border-warning/30 bg-warning/10",
    destructive: "text-destructive border-destructive/30 bg-destructive/10",
  }[expert.tone];

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="surface-card relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-card transition-all hover:border-primary/40"
    >
      <div>
        {/* Top Header: Expert Icon, Name, Role & PROMINENT Suggestion Badge */}
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary/80 text-xl shadow-inner">
              {expert.emoji}
            </span>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-foreground">{expert.name}</h3>
              <span className={`mt-0.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${toneClass}`}>
                {expert.role}
              </span>
            </div>
          </div>
          {/* Suggestion Badge - High Visibility */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Suggestion</span>
            <RecBadge rec={expert.suggestion} />
          </div>
        </header>

        {/* Short Summary Blurb */}
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{expert.blurb}</p>

        {/* Confidence Score Bar */}
        <div className="mt-4 rounded-xl border border-border/50 bg-secondary/30 p-3.5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground">Confidence Score</span>
            <span className="font-display font-bold tabular-nums text-primary">{expert.confidence}%</span>
          </div>
          <Meter value={expert.confidence} tone={expert.tone} />
        </div>

        {/* Key Metrics Grid */}
        <div className="mt-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Key Metrics</p>
          <dl className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            {expert.metrics.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-2 border-b border-border/40 pb-1.5 text-xs">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-semibold text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Sources Section */}
        <div className="mt-4 border-t border-border/50 pt-3.5">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Sources</p>
          <div className="flex flex-wrap gap-2">
            {expert.sources.map((src) => (
              <a
                key={src.name}
                href={src.url || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:border-primary hover:bg-secondary hover:text-primary"
              >
                <span>{src.name}</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Expandable Full Reasoning Section */}
      <Accordion type="single" collapsible className="mt-4 border-t border-border/60">
        <AccordionItem value="reasoning" className="border-b-0">
          <AccordionTrigger className="py-2.5 text-xs font-semibold text-primary hover:no-underline">
            Full Reasoning & Evidence
          </AccordionTrigger>
          <AccordionContent className="pt-2 text-xs text-muted-foreground">
            <ul className="space-y-2">
              {expert.fullReasoning.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.section>
  );
}
