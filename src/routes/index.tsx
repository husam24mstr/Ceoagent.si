import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
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
  Handshake,
  Coins,
  ScanSearch,
  ShieldCheck,
  LockKeyhole,
  Fingerprint,
  Menu,
  X,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ACQUISITION_URL, CONTACT_EMAIL } from "@/lib/brand";
import infrastructure from "@/assets/enterprise-infrastructure.jpg";

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

const DYNADOT = ACQUISITION_URL;
const CONTACT = `mailto:${CONTACT_EMAIL}`;

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
  {
    icon: Handshake,
    title: "M&A Deal Flow Analysis",
    text: "Evaluates mergers and acquisitions instantly using global market datasets.",
    metric: { value: "M&A", label: "deal intelligence", delta: "Global datasets. Decisive perspective." },
  },
  {
    icon: Coins,
    title: "Capital Efficiency Simulator",
    text: "Models cash flow and runway across thousands of economic scenarios.",
    metric: { value: "Runway", label: "scenario modeling", delta: "Capital decisions, stress-tested." },
  },
  {
    icon: ScanSearch,
    title: "Competitor Reverse-Engineering",
    text: "Decodes rival strategies by analyzing public data and supply chain signals.",
    metric: { value: "Signals", label: "competitive intelligence", delta: "A sharper view of your market." },
  },
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
  return <a href="/" aria-label="CeoAgent home" className="ca-logo">CA</a>;
}

function Capabilities() {
  const [active, setActive] = useState(0);
  const current = capabilities[active];
  if (!current) return null;
  const MetricIcon = current.icon;

  return (
    <section id="capabilities" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div {...fadeUp} className="max-w-2xl">
        <span className="text-xs font-semibold uppercase  text-gold">Capabilities</span>
        <h2 className="mt-3 text-3xl font-bold  sm:text-4xl">Eight engines. One executive mind.</h2>
        <p className="mt-4 text-muted-foreground">
          Strategic clarity across every dimension of your business.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <motion.div {...fadeUp} className="flex flex-col gap-3">
          {capabilities.map(({ icon: Icon, title }, i) => (
            <button
              key={title}
              onClick={() => setActive(i)}
              className={`h-auto min-h-16 w-full justify-start whitespace-normal rounded-lg px-4 py-3 text-left ${
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
            </Button>
          ))}
        </motion.div>

        <motion.div {...fadeUp} className="glass relative overflow-hidden rounded-lg p-8">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <MetricIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-bold ">{current.title}</h3>
              <p className="mt-3 text-muted-foreground">{current.text}</p>
              <div className="mt-8 border-t border-border pt-6">
                <motion.div
                  key={`m-${active}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
                >
                  <span className="text-foreground text-4xl font-bold">
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
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [["Capabilities", "capabilities"], ["Integrations", "integrations"], ["Security", "security"]];
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-6 py-5">
          <Logo />
          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="nav-link">{label}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="glass" className="h-10 px-4 sm:px-5"><a href={DYNADOT} target="_blank" rel="noopener noreferrer">Acquire Domain <ArrowUpRight /></a></Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav aria-label="Mobile navigation" className="flex flex-col gap-5 border-t border-border px-6 py-5 md:hidden">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="nav-link">{label}</a>)}</nav>}
      </header>

      <section id="services" className="enterprise-hero relative isolate overflow-hidden border-b border-border">
        <img src={infrastructure} alt="Precision-engineered enterprise server infrastructure" width={1920} height={1024} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-right" />
        <div className="hero-shade absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <motion.div {...fadeUp} className="max-w-2xl">
            <span className="flex items-center gap-3 text-xs font-medium uppercase text-gold"><span className="h-px w-8 bg-gold" /> SI Fractional CEO</span>
            <h1 className="mt-7 text-6xl font-semibold leading-none sm:text-7xl">CeoAgent<span className="text-gold">.si</span></h1>
            <h2 className="mt-7 max-w-xl text-3xl font-medium leading-tight sm:text-4xl">The Super Intelligence Engine for C-Level Leaders.</h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">Your fractional CEO and strategic co-pilot — anticipating risk, connecting the signals, and delivering decisive executive guidance.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="premium" className="h-12 px-6"><a href="#capabilities">Explore Capabilities <ArrowRight /></a></Button>
              <Button asChild variant="glass" className="h-12 px-6"><a href="#contact">Contact Us <ArrowUpRight /></a></Button>
            </div>
            <div className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-6 text-xs text-muted-foreground"><span>Executive-grade intelligence</span><span>Global strategic perspective</span><span>Always-on analysis</span></div>
          </motion.div>
        </div>
      </section>

      <section id="integrations" className="border-b border-border px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div><p className="text-xs font-semibold uppercase text-gold">Enterprise integrations</p><h2 className="mt-3 text-lg font-medium">Connected to your enterprise ecosystem.</h2></div>
            <div className="integration-strip grid grid-cols-2 items-center gap-x-12 gap-y-7 text-muted-foreground sm:grid-cols-4"><span className="text-3xl font-extrabold italic">SAP</span><span className="text-xl font-medium uppercase">Oracle</span><span className="text-xl font-semibold">Salesforce</span><span className="flex items-center gap-2 text-xl font-medium"><span aria-hidden="true">✳</span> Snowflake</span></div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <Capabilities />

      {/* How it works */}
      <section id="about" className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="max-w-2xl">
            <span className="text-xs font-semibold uppercase  text-gold">How It Works</span>
            <h2 className="mt-3 text-3xl font-bold  sm:text-4xl">
              From raw data to executive decisions.
            </h2>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, step, title, text }, i) => (
              <motion.div
                key={title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.15 }}
                className="glass group relative rounded-lg p-8 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="text-gradient text-sm font-bold ">{step}</span>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary transition group-hover:glow">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-muted-foreground">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="border-y border-border bg-surface px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_1fr]">
          <motion.div {...fadeUp}>
            <ShieldCheck className="h-9 w-9 text-gold" />
            <p className="mt-6 text-xs font-semibold uppercase text-gold">Enterprise security</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Military-Grade Security</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">Military-Grade Security: SOC-2 Type II Compliant, End-to-End Encryption, and Zero-Data Retention SI Models.</p>
          </motion.div>
          <div className="divide-y divide-border">
            {[[ShieldCheck, "SOC-2 Type II Compliant", "A rigorous standard for enterprise trust."], [LockKeyhole, "End-to-End Encryption", "Confidentiality at every stage."], [Fingerprint, "Zero-Data Retention", "Your strategic intelligence stays yours."]].map(([Icon, title, text]) => {
              const SecurityIcon = Icon as typeof ShieldCheck;
              return <div key={String(title)} className="flex gap-5 py-6 first:pt-0 last:pb-0"><SecurityIcon className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><h3 className="font-medium">{String(title)}</h3><p className="mt-2 text-sm text-muted-foreground">{String(text)}</p></div></div>;
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="acquisition-band px-6 py-20 text-gold-foreground sm:py-24">
        <motion.div {...fadeUp} className="mx-auto max-w-5xl text-center">
          <Gem className="mx-auto h-8 w-8" />
          <p className="mt-6 text-xs font-semibold uppercase">An exceptional digital asset</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">CeoAgent.si is a premium digital asset currently available for acquisition.</h2>
          <Button asChild variant="gold" className="mt-9 h-12 px-8"><a href={DYNADOT} target="_blank" rel="noopener noreferrer">Buy this Domain <ArrowUpRight /></a></Button>
          <p className="mt-7 text-sm leading-relaxed">For private inquiries or direct offers, contact: <a href={CONTACT} className="inline-block font-semibold underline underline-offset-4 break-all">{CONTACT_EMAIL}</a></p>
        </motion.div>
      </section>

      <footer className="px-6 pb-8 pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 pb-16 md:grid-cols-[2fr_1fr_1fr_1fr]">
            <div><Logo /><p className="mt-5 text-xl font-semibold">CeoAgent.si</p><p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">Super Intelligence.<br />Executive perspective.</p><a href={CONTACT} className="mt-6 inline-flex items-center gap-2 text-sm text-gold"><Mail className="h-4 w-4" /> Private inquiries <ArrowUpRight className="h-3 w-3" /></a></div>
            <div><h3 className="text-xs font-semibold uppercase text-muted-foreground">Platform</h3><nav aria-label="Platform" className="mt-6 flex flex-col gap-4 text-sm"><a className="nav-link" href="#capabilities">Capabilities</a><a className="nav-link" href="#integrations">Integrations</a><a className="nav-link" href="#about">How It Works</a><a className="nav-link" href="#security">Enterprise Security</a></nav></div>
            <div><h3 className="text-xs font-semibold uppercase text-muted-foreground">Company</h3><nav aria-label="Company" className="mt-6 flex flex-col gap-4 text-sm"><a className="nav-link" href="#contact">Contact</a><a className="nav-link" href={DYNADOT} target="_blank" rel="noopener noreferrer">Acquire Domain ↗</a></nav></div>
            <div><h3 className="text-xs font-semibold uppercase text-muted-foreground">Trust & Legal</h3><nav aria-label="Trust and legal" className="mt-6 flex flex-col gap-4 text-sm">{["Privacy Policy", "Terms of Service", "Security", "System Status"].map(label => <a href="#" onClick={event => event.preventDefault()} key={label} className="nav-link">{label}</a>)}</nav></div>
          </div>
          <div className="flex flex-col justify-between gap-5 border-t border-border pt-7 text-xs text-muted-foreground sm:flex-row"><p>© 2026 CeoAgent.si. All rights reserved.</p><p>San Francisco • Dubai • London</p></div>
        </div>
      </footer>
    </div>
    </MotionConfig>
  );
}
