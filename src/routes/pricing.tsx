import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, Gem } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { pricingTiers, offerDestination } from "@/lib/pricing";
import { EnterpriseDialog } from "@/components/enterprise-dialog";
import { LegalLinks } from "@/components/legal-links";

export const Route = createFileRoute("/pricing")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Pricing & Full Asset Acquisition | CeoAgent.si" },
    { name: "description", content: "Explore CeoAgent.si Pro and Enterprise concepts, or make an offer for full asset acquisition." },
    { property: "og:title", content: "Pricing & Full Asset Acquisition | CeoAgent.si" },
    { property: "og:description", content: "Pro, Enterprise, and full ownership of the CeoAgent.si digital asset." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://founder-strategy-copilot.lovable.app/pricing" },
  ], links: [{ rel: "canonical", href: "https://founder-strategy-copilot.lovable.app/pricing" }] }),
  component: PricingPage,
});

function PricingPage() {
  const [accessOpen, setAccessOpen] = useState(false);
  return <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-6xl px-6 pb-10 pt-16 sm:pt-24">
    <p className="text-xs font-semibold uppercase text-gold">Pricing & ownership</p><h1 className="mt-4 text-4xl font-semibold sm:text-5xl">CeoAgent.si</h1><p className="mt-5 max-w-xl text-lg text-muted-foreground">Executive intelligence. Complete ownership.</p>
    <p className="mt-6 text-sm text-muted-foreground">Pro and Enterprise are proposed service tiers. Subscriptions are not currently available.</p>
    <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">{pricingTiers.map(tier => <article key={tier.name} className={`relative flex min-w-0 flex-col rounded-lg border p-6 sm:p-8 ${tier.acquisition ? "border-gold/60 bg-card shadow-glow" : "border-border bg-surface"}`}>
      {tier.acquisition && <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase text-gold"><Gem className="h-4 w-4" /> Premium digital asset</p>}
      <h2 className={`text-xl font-semibold ${tier.acquisition ? "text-gold" : "text-foreground"}`}>{tier.name}</h2>
      <p className="mt-6 text-3xl font-semibold">{tier.price}<span className="text-sm font-normal text-muted-foreground">{tier.cadence}</span></p>
      <ul className="my-8 space-y-4">{tier.features.map(feature => <li key={feature} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${tier.acquisition ? "text-gold" : "text-primary"}`} />{feature}</li>)}</ul>
      {tier.acquisition ? <Button asChild variant="gold" className="mt-auto h-12 w-full"><a href={offerDestination}>Make an Offer<ArrowUpRight /></a></Button> : <Button variant="glass" className="mt-auto h-12 w-full" onClick={() => setAccessOpen(true)}>{tier.name === "Pro" ? "Request Pro Access" : "Request Enterprise Access"}</Button>}
    </article>)}</div>
    <footer className="mt-16 flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:justify-between"><p className="text-xs text-muted-foreground">© 2026 CeoAgent.si · Super Intelligence</p><LegalLinks /></footer>
    <EnterpriseDialog kind={accessOpen ? "access" : null} onClose={() => setAccessOpen(false)} />
  </motion.main>;
}