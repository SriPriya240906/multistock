import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { candles, expertRadar, monthlyReturns, priceSeries, sectorAllocation } from "@/data/mock-data";

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    background: "var(--color-popover)",
    border: "1px solid var(--color-border)",
    borderRadius: "12px",
    color: "var(--color-popover-foreground)",
    fontSize: "12px",
  },
  labelStyle: { color: "var(--color-muted-foreground)" },
};

export function PriceLineChart({ height = 280 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={priceSeries} margin={{ left: -18, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
            <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="date" {...axis} />
        <YAxis {...axis} />
        <Tooltip {...tooltipStyle} />
        <Area
          type="monotone"
          dataKey="value"
          name="Portfolio"
          stroke="var(--color-chart-1)"
          strokeWidth={2.5}
          fill="url(#fillValue)"
        />
        <Line
          type="monotone"
          dataKey="benchmark"
          name="Benchmark"
          stroke="var(--color-chart-2)"
          strokeWidth={2}
          strokeDasharray="5 4"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function Candle(props: {
  x?: number;
  width?: number;
  height?: number;
  y?: number;
  payload?: { open: number; close: number; high: number; low: number };
  background?: { y: number; height: number };
  yAxis?: unknown;
}) {
  const { x = 0, width = 0, payload, background } = props;
  if (!payload || !background) return null;
  const { open, close, high, low } = payload;
  const min = Math.min(...candles.map((c) => c.low)) - 3;
  const max = Math.max(...candles.map((c) => c.high)) + 3;
  const scale = (v: number) => background.y + background.height - ((v - min) / (max - min)) * background.height;
  const up = close >= open;
  const color = up ? "var(--color-chart-1)" : "var(--color-chart-4)";
  const bodyTop = scale(Math.max(open, close));
  const bodyH = Math.max(2, Math.abs(scale(open) - scale(close)));
  const cx = x + width / 2;
  return (
    <g>
      <line x1={cx} x2={cx} y1={scale(high)} y2={scale(low)} stroke={color} strokeWidth={1.5} />
      <rect x={x + width * 0.2} y={bodyTop} width={width * 0.6} height={bodyH} fill={color} rx={2} />
    </g>
  );
}

export function CandlestickChart({ height = 280 }: { height?: number }) {
  const min = Math.min(...candles.map((c) => c.low)) - 3;
  const max = Math.max(...candles.map((c) => c.high)) + 3;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={candles} margin={{ left: -18, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="date" {...axis} />
        <YAxis domain={[min, max]} {...axis} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="high" shape={<Candle />} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function AllocationPieChart({ height = 280 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Tooltip {...tooltipStyle} />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: "12px", color: "var(--color-muted-foreground)" }}
        />
        <Pie
          data={sectorAllocation}
          dataKey="value"
          nameKey="name"
          innerRadius="52%"
          outerRadius="80%"
          paddingAngle={3}
          stroke="var(--color-card)"
        >
          {sectorAllocation.map((_, i) => (
            <Cell key={i} fill={`var(--color-chart-${i + 1})`} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ReturnsBarChart({ height = 240 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={monthlyReturns} margin={{ left: -22, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="month" {...axis} />
        <YAxis {...axis} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="returns" radius={[6, 6, 0, 0]}>
          {monthlyReturns.map((m, i) => (
            <Cell key={i} fill={m.returns >= 0 ? "var(--color-chart-1)" : "var(--color-chart-4)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ExpertRadarChart({ height = 300 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={expertRadar} outerRadius="72%">
        <PolarGrid stroke="var(--color-border)" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
        <Tooltip {...tooltipStyle} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: "12px", color: "var(--color-muted-foreground)" }}
        />
        <Radar name="Technical" dataKey="technical" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.18} />
        <Radar name="Fundamental" dataKey="fundamental" stroke="var(--color-chart-2)" fill="var(--color-chart-2)" fillOpacity={0.14} />
        <Radar name="Sentiment" dataKey="sentiment" stroke="var(--color-chart-3)" fill="var(--color-chart-3)" fillOpacity={0.12} />
        <Radar name="Risk" dataKey="risk" stroke="var(--color-chart-4)" fill="var(--color-chart-4)" fillOpacity={0.12} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function MiniSparkline({ height = 60 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={priceSeries}>
        <Line type="monotone" dataKey="value" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
