import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  MessagesSquare,
  Moon,
  Quote,
  Scale,
  Sparkle,
  Sun,
  Users,
} from "lucide-react";

import heroImage from "@/assets/hero-experts.jpg";
import { Logo } from "@/components/Logo";
import { Meter, RecBadge } from "@/components/Primitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { experts, testimonials } from "@/data/mock-data";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StockSphere AI — Multi-Expert AI Investment Decision Platform" },
      {
        name: "description",
        content:
          "Technical, Fundamental, Sentiment and Risk AI experts debate each stock and deliver a transparent BUY, SELL or WAIT call with confidence and reasoning.",
      },
      { property: "og:title", content: "StockSphere AI — Multi-Expert AI Investment Decision Platform" },
      {
        property: "og:description",
        content:
          "Technical, Fundamental, Sentiment and Risk AI experts debate each stock and deliver a transparent BUY, SELL or WAIT call with confidence and reasoning.",
      },
    ],
  }),
  component: Landing,
});

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53) % 100,
  top: (i * 37) % 100,
  delay: (i % 6) * 0.7,
  size: 3 + (i % 4),
}));

const workflow = [
  { title: "You enter a stock", desc: "Any ticker — AAPL, TSLA, INFY, RELIANCE.", icon: Sparkle },
  { title: "4 AI experts analyse", desc: "Technical, fundamental, sentiment and risk in parallel.", icon: Users },
  { title: "Collaborative discussion", desc: "Experts challenge each other's evidence, in the open.", icon: MessagesSquare },
  { title: "Conflict resolution", desc: "Disagreements are weighted, not hidden.", icon: Scale },
  { title: "BUY / SELL / WAIT", desc: "With confidence, conflict level and full reasoning.", icon: BrainCircuit },
];

function Landing() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#experts" className="transition-colors hover:text-foreground">Experts</a>
            <a href="#workflow" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#testimonials" className="transition-colors hover:text-foreground">Testimonials</a>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle dark mode">
              {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </Button>
            <Button asChild className="bg-gradient-brand text-primary-foreground hover:opacity-90">
              <Link to="/dashboard">Open app</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute rounded-full bg-primary/50"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -26, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 6 + p.delay, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
              Explainable AI · Decision support
            </Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              Multi-Expert AI <span className="text-gradient">Investment</span> Decision Platform
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Make informed stock decisions using Technical Analysis, Fundamentals, Sentiment Analysis,
              Risk Assessment and Explainable AI — with the disagreements shown, not smoothed over.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground glow hover:opacity-90">
                <Link to="/analyze">
                  Analyze Stock <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#workflow">Learn More</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Confidence scored", "Conflict aware", "Reasoning shown"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-primary" /> {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="glass-card overflow-hidden rounded-3xl p-2">
              <img
                src={heroImage}
                alt="Four AI experts collaborating around holographic stock charts"
                width={1280}
                height={960}
                className="w-full rounded-2xl object-cover"
              />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card absolute -bottom-6 left-4 rounded-2xl px-4 py-3 sm:left-8"
            >
              <p className="text-xs text-muted-foreground">Consensus</p>
              <p className="font-display text-xl font-semibold text-primary">BUY · 78%</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experts */}
      <section id="experts" className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">Four specialists, one transparent verdict</h2>
          <p className="mt-3 text-muted-foreground">
            Each expert brings a distinct lens. You see every lens, including the one that disagrees.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((e, i) => (
            <motion.article
              key={e.key}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="surface-card hover-lift flex flex-col justify-between rounded-2xl p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-xl">{e.emoji}</span>
                  <RecBadge rec={e.suggestion} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{e.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-primary font-medium">{e.role}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{e.blurb}</p>
              </div>
              <div className="mt-5 border-t border-border/60 pt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-semibold text-muted-foreground">Confidence</span>
                  <span className="font-bold text-primary">{e.confidence}%</span>
                </div>
                <Meter value={e.confidence} tone={e.tone} />
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.sources.map((s) => (
                    <span key={s.name} className="rounded bg-secondary/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/40">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="border-y border-border bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">How a decision is made</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A traceable pipeline from ticker to recommendation — every step is inspectable.
          </p>
          <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {workflow.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                className="glass-card relative rounded-2xl p-5"
              >
                <span className="bg-gradient-brand grid h-9 w-9 place-items-center rounded-lg text-primary-foreground">
                  <step.icon className="h-[18px] w-[18px]" />
                </span>
                <p className="mt-4 text-xs font-semibold tabular-nums text-muted-foreground">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <h2 className="text-3xl font-semibold sm:text-4xl">Trusted by transparent investors</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="surface-card rounded-2xl p-6"
            >
              <Quote className="h-5 w-5 text-primary" />
              <blockquote className="mt-4 text-sm leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <div className="surface-card glow flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Run your first multi-expert analysis</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No signal service. A second opinion you can interrogate.
            </p>
          </div>
          <Button asChild size="lg" className="bg-gradient-brand shrink-0 text-primary-foreground hover:opacity-90">
            <Link to="/analyze">
              Analyze Stock <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <Logo size="sm" />
            <p className="mt-3 max-w-md text-xs text-muted-foreground">
              StockSphere AI provides decision support and educational analysis only. It is not investment
              advice. Markets carry risk.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <Link to="/analyze" className="hover:text-foreground">Analyze</Link>
            <Link to="/portfolio" className="hover:text-foreground">Portfolio</Link>
            <Link to="/news" className="hover:text-foreground">Market News</Link>
            <Link to="/settings" className="hover:text-foreground">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
