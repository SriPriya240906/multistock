import { motion } from "motion/react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "@/types";

export function MetricCard({
  label,
  value,
  delta,
  positive,
  icon,
  index = 0,
}: {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  icon: ReactNode;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="surface-card hover-lift rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
          {icon}
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-semibold tabular-nums">{value}</p>
      {delta && (
        <p className={`mt-1 text-xs font-medium ${positive ? "text-success" : "text-destructive"}`}>{delta}</p>
      )}
    </motion.div>
  );
}

export function Meter({
  value,
  label,
  tone = "primary",
}: {
  value: number;
  label?: string;
  tone?: "primary" | "warning" | "destructive" | "info";
}) {
  const bg =
    tone === "warning"
      ? "bg-warning"
      : tone === "destructive"
        ? "bg-destructive"
        : tone === "info"
          ? "bg-info"
          : "bg-primary";
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>{label}</span>
          <span className="tabular-nums">{value}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${bg}`}
        />
      </div>
    </div>
  );
}

export function CircularMeter({
  value,
  caption,
  size = 168,
}: {
  value: number;
  caption?: string;
  size?: number;
}) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="fill-none stroke-secondary" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          strokeLinecap="round"
          className="fill-none stroke-primary"
          initial={{ strokeDasharray: `0 ${c}` }}
          animate={{ strokeDasharray: `${(value / 100) * c} ${c}` }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-3xl font-semibold tabular-nums">{value}%</p>
        {caption && <p className="text-xs text-muted-foreground">{caption}</p>}
      </div>
    </div>
  );
}

export function RecBadge({ rec }: { rec: Recommendation }) {
  const cls =
    rec === "BUY"
      ? "border-success/40 bg-success/15 text-success"
      : rec === "SELL"
        ? "border-destructive/40 bg-destructive/15 text-destructive"
        : "border-warning/40 bg-warning/15 text-warning";
  return (
    <Badge variant="outline" className={`${cls} font-semibold tracking-wide`}>
      {rec}
    </Badge>
  );
}

export function RiskBadge({ risk }: { risk: "Low" | "Medium" | "High" }) {
  const cls =
    risk === "Low"
      ? "border-success/40 bg-success/12 text-success"
      : risk === "Medium"
        ? "border-warning/40 bg-warning/12 text-warning"
        : "border-destructive/40 bg-destructive/12 text-destructive";
  return (
    <Badge variant="outline" className={cls}>
      {risk}
    </Badge>
  );
}

export function SentimentBadge({ sentiment }: { sentiment: "Positive" | "Neutral" | "Negative" }) {
  const cls =
    sentiment === "Positive"
      ? "border-success/40 bg-success/15 text-success"
      : sentiment === "Negative"
        ? "border-destructive/40 bg-destructive/15 text-destructive"
        : "border-info/40 bg-info/15 text-info";
  return (
    <Badge variant="outline" className={cls}>
      {sentiment}
    </Badge>
  );
}
