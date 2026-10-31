import { createFileRoute } from "@tanstack/react-router";
import { Brain, FileBarChart, Network, ArrowRight, Gem } from "lucide-react";
import dashboard from "@/assets/dashboard.jpg";

const BUY = "mailto:acquire@ceoagent.si?subject=CeoAgent.si%20domain%20inquiry";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CeoAgent.si — Super Intelligence for Strategic Leaders" },
      { name: "description", content: "An AI fractional CEO and strategic co-pilot for founders and C-level executives." },
      { property: "og:title", content: "CeoAgent.si — Super Intelligence for Strategic Leaders" },
      { property: "og:description", content: "An AI fractional CEO and strategic co-pilot for founders and executives." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Brain, title: "Strategic Decision Engine", text: "Model scenarios, weigh trade-offs and get board-grade recommendations in seconds." },
  { icon: FileBarChart, title: "Automated Board Reports", text: "Investor-ready decks and KPI summaries generated from your live company data." },
  { icon: Network, title: "Cross-Department Analytics", text: "Unify finance, sales, product and ops into a single source of executive truth." },
];

function BuyButton({ className = "" }: { className?: string }) {
  return (
    <a href={BUY} className={`inline-flex items-center gap-2 rounded-full bg-background px-5 py-2 text-sm font-semibold text-gold transition hover:scale-105 ${className}`}>
      Buy this Domain <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 bg-gold-gradient text-gold-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-2.5 text-center text-sm font-medium sm:flex-row sm:text-left">
          <span className="flex items-center gap-2"><Gem className="h-4 w-4 shrink-0" />CeoAgent.si is a premium digital asset currently available for acquisition.</span>
          <BuyButton className="py-1.5" />
        </div>
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-lg font-semibold tracking-tight">CeoAgent<span className="text-primary">.si</span></span>
        <a href="#access" className="text-sm text-muted-foreground transition hover:text-foreground">Early Access</a>
      </header>

      <section className="hero-bg px-6 pb-16 pt-16 text-center sm:pt-24">
        <div className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-gold">Your AI Fractional CEO</span>
          <h1 className="text-gradient mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-7xl">Super Intelligence for Strategic Leaders</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            CeoAgent is a strategic co-pilot that analyzes your entire business, anticipates risk, and delivers decisive, executive-level guidance — around the clock.
          </p>
          <a id="access" href={BUY} className="glow mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:scale-105">
            Request Early Access <ArrowRight className="h-5 w-5" />
          </a>
        </div>
        <div className="glass glow mx-auto mt-20 max-w-5xl overflow-hidden rounded-2xl p-2 transition duration-500 hover:-translate-y-1">
          <img src={dashboard} alt="CeoAgent CEO Dashboard with analytics, strategy insights and AI chat" className="w-full rounded-xl" width={1600} height={1000} />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-24 md:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="glass group rounded-2xl p-8 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition group-hover:glow">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section className="px-6 pb-24">
        <div className="bg-gold-gradient mx-auto max-w-5xl rounded-2xl p-10 text-center text-gold-foreground sm:p-16">
          <Gem className="mx-auto h-10 w-10" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">CeoAgent.si is a premium digital asset currently available for acquisition.</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-80">Secure a category-defining name for your AI leadership brand.</p>
          <BuyButton className="mt-8 px-8 py-3 text-base" />
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">© 2026 CeoAgent.si</footer>
    </div>
  );
}
