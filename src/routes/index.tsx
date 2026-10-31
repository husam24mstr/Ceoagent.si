import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  Cpu,
  Database,
  Gem,
  Hexagon,
  LineChart,
  Mail,
  Radar,
  ShieldAlert,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CeoAgent.si — The Super Intelligence Engine for C-Level Leaders" },
      {
        name: "description",
        content:
          "CeoAgent.si is a Super Intelligence engine that acts as a fractional CEO and strategic co-pilot for founders and C-level executives.",
      },
      { property: "og:title", content: "CeoAgent.si — The Super Intelligence Engine for C-Level Leaders" },
      {
        property: "og:description",
        content:
          "A Super Intelligence engine that acts as a fractional CEO and strategic co-pilot for founders and C-level executives.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const DYNADOT = "https://www.dynadot.com/domain/ceoagent.si";
const CONTACT = "mailto:houssamlahrazli16@gmail.com";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const capabilities = [
  {
    icon: Radar,
    title: "Predictive Market Dynamics",
    text: "Anticipates market shifts and competitor moves before they happen using advanced SI pattern recognition.",
    metric: { value: "94%", label: "forecast accuracy", delta: "+12 pts vs. analyst baseline" },
  },
  {
    icon: Boxes,
    title: "Autonomous Resource Allocation",
    text: "Optimizes budget and human capital dynamically across the organization.",
    metric: { value: "31%", label: "cost efficiency gained", delta: "reallocated in real time" },
  },
  {
    icon: BarChart3,
    title: "Automated Board Reporting",
    text: "Generates comprehensive, data-backed C-level reports and action items instantly.",
    metric: { value: "40 hrs", label: "saved per quarter", delta: "board-ready in seconds" },
  },
  {
    icon: ShieldAlert,
    title: "Risk & Crisis Mitigation",
    text: "Simulates potential business risks and provides preemptive strategic protocols.",
    metric: { value: "2,400+", label: "scenarios simulated", delta: "per strategic cycle" },
  },
  {
    icon: LineChart,
    title: "Real-time KPI Engine",
    text: "Monitors company-wide performance autonomously, identifying bottlenecks without human input.",
    metric: { value: "24/7", label: "autonomous monitoring", delta: "bottlenecks flagged instantly" },
  },
];

const trustedBy = [
  { icon: Hexagon, name: "Nexora Labs" },
  { icon: Zap, name: "Voltaic Systems" },
  { icon: Cpu, name: "Quantumleaf" },
  { icon: Workflow, name: "Arcline Ventures" },
  { icon: TrendingUp, name: "Meridian Capital" },
];

const steps = [
  {
    icon: Database,
    step: "01",
    title: "Data Ingestion",
    text: "CeoAgent securely connects to your finance, sales, product and operations data streams.",
  },
  {
    icon: BrainCircuit,
    step: "02",
    title: "SI Processing",
    text: "The Super Intelligence core models scenarios, detects patterns and weighs strategic trade-offs.",
  },
  {
    icon: ArrowUpRight,
    step: "03",
    title: "Strategic Output",
    text: "You receive decisive, board-grade recommendations, reports and action items — around the clock.",
  },
];

function Logo() {
  return (
    <a href="/" className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
        <span className="text-gradient text-lg font-extrabold tracking-tighter">CA</span>
      </span>
      <span className="text-lg font-semibold tracking-tight">
        CeoAgent<span className="text-primary">.si</span>
      </span>
    </a>
  );
}

function HeroGraphic() {
  return (
    <div className="glass glow relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl p-8 sm:p-12">
      <div className="hero-bg absolute inset-0" />
      <svg viewBox="0 0 600 260" className="relative w-full" fill="none" aria-hidden="true">
        {[
          { x1: 80, y1: 200, x2: 300, y2: 130 },
          { x1: 80, y1: 60, x2: 300, y2: 130 },
          { x1: 300, y1: 130, x2: 520, y2: 200 },
          { x1: 300, y1: 130, x2: 520, y2: 60 },
          { x1: 300, y1: 130, x2: 300, y2: 30 },
        ].map((l, i) => (
          <motion.line
            key={i}
            {...l}
            stroke="var(--primary)"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.15 }}
          />
        ))}
        {[
          { cx: 80, cy: 200, r: 7 },
          { cx: 80, cy: 60, r: 7 },
          { cx: 520, cy: 200, r: 7 },
          { cx: 520, cy: 60, r: 7 },
          { cx: 300, cy: 30, r: 6 },
        ].map((c, i) => (
          <motion.circle
            key={i}
            {...c}
            fill="var(--gold)"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
        <motion.circle
          cx="300"
          cy="130"
          r="46"
          stroke="var(--primary)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [1, 1.25], opacity: [0.7, 0] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          style={{ transformOrigin: "300px 130px" }}
        />
        <motion.circle
          cx="300"
          cy="130"
          r="26"
          fill="var(--primary)"
          fillOpacity="0.15"
          stroke="var(--primary)"
          strokeWidth="2"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: "300px 130px" }}
        />
        <text x="300" y="136" textAnchor="middle" fill="var(--foreground)" fontSize="15" fontWeight="800" letterSpacing="-1">
          SI
        </text>
      </svg>
      <div className="relative mt-4 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
        {["Ingesting", "Modeling", "Simulating", "Deciding"].map((s, i) => (
          <motion.span
            key={s}
            className="glass rounded-full px-3 py-1"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function Capabilities() {
  const [active, setActive] = useState(0);
  const current = capabilities[active]!;
  const MetricIcon = current.icon;

  return (
    <section id="capabilities" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div {...fadeUp} className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold">Capabilities</span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Five engines. One executive mind.</h2>
        <p className="mt-4 text-muted-foreground">
          Explore the core Super Intelligence services that run your company like a seasoned CEO.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <motion.div {...fadeUp} className="flex flex-col gap-3">
          {capabilities.map(({ icon: Icon, title }, i) => (
            <button
              key={title}
              onClick={() => setActive(i)}
              className={`glass flex items-center gap-4 rounded-xl px-5 py-4 text-left transition duration-300 ${
                i === active ? "border-primary/60 glow" : "hover:border-primary/30"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition ${
                  i === active ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className={`font-semibold ${i === active ? "text-foreground" : "text-muted-foreground"}`}>
                {title}
              </span>
              <ArrowRight
                className={`ml-auto h-4 w-4 transition ${i === active ? "text-primary" : "text-muted-foreground/40"}`}
              />
            </button>
          ))}
        </motion.div>

        <motion.div {...fadeUp} className="glass relative overflow-hidden rounded-2xl p-8">
          <div className="hero-bg absolute inset-0" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <MetricIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight">{current.title}</h3>
              <p className="mt-3 text-muted-foreground">{current.text}</p>
              <div className="glass mt-8 rounded-xl p-6">
                <motion.div
                  key={`m-${active}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
                >
                  <span className="text-gradient text-5xl font-extrabold tracking-tight">
                    {current.metric.value}
                  </span>
                </motion.div>
                <p className="mt-2 text-sm font-medium">{current.metric.label}</p>
                <p className="mt-1 text-xs text-gold">{current.metric.delta}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#services" className="transition hover:text-foreground">Services</a>
            <a href="#capabilities" className="transition hover:text-foreground">Capabilities</a>
            <a href="#about" className="transition hover:text-foreground">About SI</a>
            <a href="#contact" className="transition hover:text-foreground">Contact</a>
          </nav>
          <a
            href={DYNADOT}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 sm:inline-flex"
          >
            Acquire Domain
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="services" className="hero-bg px-6 pb-20 pt-20 text-center sm:pt-28">
        <div className="mx-auto max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-gold"
          >
            Your Fractional CEO, Powered by SI
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-gradient mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-7xl"
          >
            The Super Intelligence Engine for C-Level Leaders.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            CeoAgent acts as your fractional CEO and strategic co-pilot — analyzing your entire
            business, anticipating risk, and delivering decisive, executive-level guidance around
            the clock.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#capabilities"
              className="glow inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:scale-105"
            >
              Explore Capabilities <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition hover:-translate-y-0.5"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <HeroGraphic />
        </motion.div>
      </section>

      {/* Social proof */}
      <section className="border-y border-border px-6 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by forward-thinking startups
          </p>
          <motion.div
            {...fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
          >
            {trustedBy.map(({ icon: Icon, name }) => (
              <span
                key={name}
                className="flex items-center gap-2 text-lg font-semibold text-muted-foreground transition hover:text-foreground"
              >
                <Icon className="h-5 w-5 text-primary" />
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <Capabilities />

      {/* How it works */}
      <section id="about" className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">How It Works</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From raw data to executive decisions.
            </h2>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, step, title, text }, i) => (
              <motion.div
                key={title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.15 }}
                className="glass group relative rounded-2xl p-8 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="text-gradient text-sm font-bold tracking-widest">{step}</span>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition group-hover:glow">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-muted-foreground">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Acquisition banner & contact */}
      <section id="contact" className="px-6 pb-24">
        <motion.div
          {...fadeUp}
          className="bg-gold-gradient mx-auto max-w-5xl rounded-2xl p-10 text-center text-gold-foreground sm:p-16"
        >
          <Gem className="mx-auto h-10 w-10" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            CeoAgent.si is a premium digital asset.
          </h2>
          <p className="mx-auto mt-4 max-w-xl opacity-80">
            This exact domain is currently available for acquisition.
          </p>
          <a
            href={DYNADOT}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-base font-semibold text-gold transition hover:-translate-y-0.5 hover:scale-105"
          >
            Acquire on Dynadot <ArrowUpRight className="h-5 w-5" />
          </a>
          <p className="mt-8 text-sm opacity-80">
            For private inquiries, contact the owner directly:{" "}
            <a href={CONTACT} className="inline-flex items-center gap-1 font-semibold underline underline-offset-4">
              <Mail className="h-4 w-4" /> houssamlahrazli16@gmail.com
            </a>
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <Logo />
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition hover:text-foreground">Terms</a>
            <a href="#" className="transition hover:text-foreground">Privacy</a>
            <a href={CONTACT} className="transition hover:text-foreground">Contact</a>
          </nav>
          <p className="text-sm text-muted-foreground">© 2026 CeoAgent.si — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
