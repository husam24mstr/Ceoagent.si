import { createFileRoute, Link, notFound, type ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { motion, MotionConfig } from "framer-motion";
import { ArrowLeft, ArrowRight, Database, Cpu, FileChartColumn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { engines, getEngine } from "@/lib/engines";
import { EngineConsole } from "@/components/engine-console";

export const Route = createFileRoute("/engines/$slug")({
  staticData: { sitemap: true, sitemapParams: engines.map(engine => ({ slug: engine.slug })) },
  loader: ({ params }) => { const engine = getEngine(params.slug); if (!engine) throw notFound(); return { slug: engine.slug }; },
  head: ({ loaderData }) => {
    const engine = loaderData ? getEngine(loaderData.slug) : undefined;
    const title = engine ? `${engine.title} | CeoAgent.si` : "Engine unavailable | CeoAgent.si";
    const description = engine?.summary ?? "Explore CeoAgent.si Super Intelligence engines.";
    const url = engine ? `https://founder-strategy-copilot.lovable.app/engines/${engine.slug}` : undefined;
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, ...(url ? [{ property: "og:url", content: url }] : [{ name: "robots", content: "noindex" }])], links: url ? [{ rel: "canonical", href: url }] : [] };
  },
  component: EnginePage,
  notFoundComponent: () => <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6"><h1 className="text-3xl font-semibold">Engine not found</h1><Button asChild variant="glass"><Link to="/"> <ArrowLeft /> Back to Dashboard</Link></Button></div>,
  errorComponent: EngineError,
});

function EngineError({ reset }: ErrorComponentProps) {
  const router = useRouter();
  return <div className="flex min-h-screen flex-col items-center justify-center gap-6"><h1 className="text-2xl">This engine couldn’t load.</h1><Button variant="premium" onClick={() => { void router.invalidate(); reset(); }}>Try again</Button><Button asChild variant="glass"><Link to="/">Back to Dashboard</Link></Button></div>;
}

function EnginePage() {
  const { slug } = Route.useLoaderData();
  const engine = getEngine(slug);
  if (!engine) return null;
  const Icon = engine.icon;
  const index = engines.findIndex(item => item.slug === slug);
  const next = engines[(index + 1) % engines.length];
  return <MotionConfig reducedMotion="user"><div className={`engine-page engine-theme-${engine.theme} min-h-screen bg-background`}>
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5"><Link to="/" className="ca-logo" aria-label="CeoAgent home">CA</Link><span className="hidden text-xs text-muted-foreground sm:block">CeoAgent.si / Intelligence workspace</span><Button asChild variant="glass"><Link to="/"><ArrowLeft /> Back to Dashboard</Link></Button></div></header>
    <motion.main key={slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }} className="mx-auto max-w-6xl px-6">
      <section className="border-b border-border pb-12 pt-12 sm:pt-16"><p className="flex items-center gap-3 text-xs font-medium uppercase text-primary"><Icon className="h-4 w-4" /> Engine {String(index + 1).padStart(2, "0")} / Executive intelligence</p><h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">{engine.title}</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{engine.summary}</p><div className="mt-7 flex flex-wrap gap-6 text-xs text-muted-foreground"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Isolated sandbox</span><span>Scenario-driven modeling</span><span>Executive output</span></div></section>
      <EngineConsole key={slug} engine={engine} />
      <section className="grid gap-10 border-t border-border py-14 md:grid-cols-2"><div><p className="text-xs font-medium uppercase text-primary">Inside the engine</p><h2 className="mt-3 text-2xl font-semibold">From signals to strategy.</h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">{engine.explanation}</p><p className="mt-5 text-sm leading-relaxed text-muted-foreground">This sandbox applies transparent scenario assumptions to your inputs. Production deployment would require verified source data and calibrated models.</p></div><div aria-label="Engine architecture" className="flex flex-col justify-center gap-3">{[{ icon: Database, title: engine.source, detail: "01 / INPUT LAYER" }, { icon: Cpu, title: engine.model, detail: "02 / SI MODELING" }, { icon: FileChartColumn, title: "Executive recommendations", detail: "03 / DECISION LAYER" }].map(({ icon: StepIcon, title, detail }, i) => <div key={title}><div className="flex items-center gap-4 border-l-2 border-primary bg-surface px-5 py-4"><StepIcon className="h-6 w-6 shrink-0 text-primary" /><div><p className="font-mono text-[10px] text-muted-foreground">{detail}</p><p className="mt-1 text-sm font-medium">{title}</p></div></div>{i < 2 && <div className="ml-8 h-3 border-l border-primary/30" />}</div>)}</div></section>
      <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-border py-8"><p className="text-xs text-muted-foreground">© 2026 CeoAgent.si · Super Intelligence</p>{next && <Button asChild variant="glass"><Link to="/engines/$slug" params={{ slug: next.slug }}>Next engine <ArrowRight /></Link></Button>}</footer>
    </motion.main>
  </div></MotionConfig>;
}