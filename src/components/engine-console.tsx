import { useEffect, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ClientOnly } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, Check, Cpu, Download, LoaderCircle, Play, Rocket, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Engine } from "@/lib/engines";
import { simulateEngine, simulationStages } from "@/lib/engine-simulation";
import { consoleReducer, PROCESSING_DURATION_MS, PROCESSING_STEP_MS, type EngineReport } from "@/lib/console-state";
import { exportBoardDeck } from "@/lib/board-deck";

const format = (value: number) => new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);

function Synthesis({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setCount(previous => Math.min(previous + 4, text.length)), 20);
    return () => clearInterval(timer);
  }, [text, reduced]);
  const displayed = reduced ? text : text.slice(0, count);
  return <p className="synthesis-copy mt-3 text-sm leading-relaxed text-muted-foreground"><span aria-hidden="true" className="invisible">{text}</span><span aria-hidden="true" className="absolute inset-0">{displayed}{displayed.length < text.length && <span className="text-primary">▍</span>}</span><span className="sr-only">{text}</span></p>;
}

export function EngineConsole({ engine }: { engine: Engine }) {
  const [value, setValue] = useState(String(engine.defaultValue));
  const [scenario, setScenario] = useState("0");
  const [horizon, setHorizon] = useState("6");
  const [state, dispatch] = useReducer(consoleReducer, { status: "idle" });
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const pending = useRef<EngineReport | null>(null);
  const busy = state.status === "processing";
  const stage = state.status === "processing" ? Math.min(3, Math.floor(state.elapsed / PROCESSING_STEP_MS)) : 0;
  useEffect(() => {
    if (!busy) return;
    const start = performance.now();
    const tick = setInterval(() => dispatch({ type: "tick", elapsed: performance.now() - start }), 50);
    const finish = setTimeout(() => {
      if (pending.current) dispatch({ type: "complete", report: pending.current });
      pending.current = null;
    }, PROCESSING_DURATION_MS);
    return () => { clearInterval(tick); clearTimeout(finish); };
  }, [busy]);
  function run(event: React.FormEvent) {
    event.preventDefault();
    if (busy || pending.current) return;
    try {
      pending.current = simulateEngine(engine, { value: Number(value), scenario: Number(scenario), horizon: Number(horizon) });
      setError("");
      dispatch({ type: "start" });
    } catch (err) { setError(err instanceof Error ? err.message : "Check your scenario inputs."); }
  }
  async function download() {
    if (state.status !== "success" || exporting) return;
    setExporting(true);
    try { exportBoardDeck(); }
    catch { setError("The PDF could not be exported. Please try again."); }
    finally { setExporting(false); }
  }
  return <section className="py-14" aria-labelledby="console-title">
    <div className="console-heading mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:flex sm:justify-between"><div className="min-w-0"><p className="text-xs font-medium uppercase text-primary">Interactive playground</p><h2 id="console-title" className="mt-3 text-2xl font-semibold sm:text-3xl">Simulation Console</h2></div><span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-primary" /><span>Sandbox</span></span></div>
    <div className="console-shell overflow-hidden rounded-lg border border-border bg-surface">
      <div className="console-toolbar grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-4"><span className="flex min-w-0 items-center gap-2 font-mono text-xs text-muted-foreground"><Terminal className="h-4 w-4 shrink-0 text-primary" /><span className="truncate">ceoagent / {engine.slug}</span></span><span className="shrink-0 text-xs text-primary">SI CORE • v1.0</span></div>
      <div className="console-grid grid md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]">
        <form onSubmit={run} className="min-w-0 space-y-6 border-b border-border p-5 sm:p-7 md:border-b-0 md:border-r">
          <div><p className="text-sm font-semibold">Scenario parameters</p><p className="mt-2 text-xs text-muted-foreground">Illustrative data · isolated session</p></div>
          <div><label htmlFor="scenario" className="mb-2 block text-xs font-medium text-muted-foreground">Strategic scenario</label><select id="scenario" className="engine-input" value={scenario} onChange={event => setScenario(event.target.value)} disabled={busy}>{engine.scenarios.map((item, index) => <option value={index} key={item}>{item}</option>)}</select></div>
          <div><label htmlFor="simulation-value" className="mb-2 block text-xs font-medium text-muted-foreground">{engine.input}</label><input id="simulation-value" className="engine-input" type="number" min="1" max="1000000000000" step="any" required value={value} onChange={event => setValue(event.target.value)} disabled={busy} aria-describedby={error ? "simulation-error" : undefined} aria-invalid={Boolean(error)} /></div>
          <div><label htmlFor="horizon" className="mb-2 block text-xs font-medium text-muted-foreground">Projection horizon</label><select id="horizon" className="engine-input" value={horizon} onChange={event => setHorizon(event.target.value)} disabled={busy}>{[3, 6, 12].map(months => <option key={months} value={months}>{months} months</option>)}</select></div>
          <Button type="submit" variant="premium" className="h-12 w-full" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" /> : <Play />}{busy ? "Processing scenario" : "Run SI Simulation"}</Button>
          <p className="text-xs leading-relaxed text-muted-foreground">Prototype simulation. No live data connections or real financial analysis.</p>
          <p id="simulation-error" role={error ? "alert" : undefined} className="min-h-10 text-sm text-gold">{error}</p>
        </form>
        <div className="console-output relative min-w-0" aria-busy={busy} data-state={state.status}>
          <AnimatePresence initial={false}>
            <motion.div key={state.status} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }} className="console-state absolute inset-0 overflow-y-auto p-5 sm:p-7">
              {state.status === "processing" ? <div className="flex h-full flex-col justify-center">
                <div className="mb-8 flex items-center gap-5"><div className="relative flex h-16 w-16 items-center justify-center"><LoaderCircle className="absolute h-16 w-16 animate-spin text-primary/40" /><Cpu className="h-7 w-7 text-primary" /></div><div><p className="text-xs uppercase text-muted-foreground">SI orchestration</p><p className="mt-2 text-lg font-medium">Processing your scenario</p></div></div>
                <div className="border-l-2 border-primary bg-background p-4 font-mono text-xs sm:text-sm"><p className="mb-3 text-muted-foreground">$ si-core execute --sandbox</p><p role="status" aria-live="polite" className="text-primary">&gt; {simulationStages[stage]}</p></div>
                <div className="mt-7 space-y-4">{simulationStages.map((text, index) => <div key={text} className={`flex items-center gap-3 text-xs sm:text-sm ${index <= stage ? "text-foreground" : "text-muted-foreground"}`}>{index < stage ? <Check className="h-4 w-4 shrink-0 text-primary" /> : <span className="h-4 w-4 shrink-0 rounded-full border border-border" />}{text}</div>)}</div>
                <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-accent" role="progressbar" aria-label="Simulation progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.min(99, Math.floor(state.elapsed / PROCESSING_DURATION_MS * 100))}><motion.div className="h-full origin-left bg-primary" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: PROCESSING_DURATION_MS / 1000, ease: "linear" }} /></div>
                <p className="mt-4 text-xs text-muted-foreground">Illustrative computation · No external datasets accessed</p>
              </div> : state.status === "success" ? <div>
                <div className="print-only mb-6"><p className="text-sm font-semibold">CeoAgent.si / Board Brief</p><h2 className="mt-3 text-2xl font-semibold">{engine.title}</h2><p className="mt-2 text-sm">Starting value: {state.report.inputValue.toLocaleString("en-US")} {engine.unit}</p><p className="mt-2 text-xs">ILLUSTRATIVE PROTOTYPE / NOT FINANCIAL ADVICE / NO LIVE DATASETS</p></div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3"><div className="min-w-0"><p role="status" className="flex items-center gap-2 text-xs text-primary"><Check className="h-4 w-4 shrink-0" /> Simulation complete</p><h3 className="mt-2 text-xl font-semibold">Output Report</h3></div><span className="shrink-0 border border-primary/25 bg-primary/10 px-2 py-2 text-xs text-primary">Confidence Score: 94.2%<span className="mt-1 block text-[10px] text-muted-foreground">Illustrative · not calibrated</span></span></div>
                <div className="my-5 grid grid-cols-2 gap-4 border-y border-border py-4"><div><p className="text-xs text-muted-foreground">{engine.measure}</p><p className="mt-2 text-2xl font-semibold sm:text-3xl">{engine.unit === "USD" ? "$" : ""}{format(state.report.final)}</p></div><div><p className="text-xs text-muted-foreground">Change from starting value</p><p className="mt-2 text-2xl font-semibold text-primary sm:text-3xl">{state.report.change >= 0 ? "+" : ""}{state.report.change.toFixed(1)}%</p></div></div>
                <div className="mb-3 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground"><span>{state.report.scenario} · {state.report.horizon} months</span><span className="flex gap-4"><span>— Baseline</span><span className="text-primary">— SI scenario</span></span></div>
                <div className="h-[220px] w-full min-w-0" role="img" aria-label={`${engine.measure} projection starting at ${state.report.inputValue} and ending at ${state.report.final} ${engine.unit}`}><ClientOnly><ResponsiveContainer width="100%" height="100%"><AreaChart data={state.report.data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}><CartesianGrid stroke="var(--border)" vertical={false} /><XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} /><YAxis tickFormatter={format} stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={50} domain={['auto', 'auto']} /><Tooltip contentStyle={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--foreground)", borderRadius: 6 }} formatter={(n: number) => `${engine.unit === "USD" ? "$" : ""}${new Intl.NumberFormat("en-US").format(n)}`} /><Area name="Baseline" dataKey="baseline" type="monotone" stroke="var(--muted-foreground)" fill="transparent" strokeDasharray="4 4" isAnimationActive={false} /><Area name="SI scenario" dataKey="simulated" type="monotone" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.12} strokeWidth={2} isAnimationActive={false} /></AreaChart></ResponsiveContainer></ClientOnly></div>
                <div className="mt-5 border-t border-border pt-5"><h4 className="flex items-center gap-2 text-sm font-semibold"><Cpu className="h-4 w-4 text-primary" /> SI Executive Synthesis</h4><Synthesis text={state.report.summary} /></div>
                <div className="report-actions mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><Button variant="premium" onClick={() => dispatch({ type: "deploy" })} disabled={state.deployed}>{state.deployed ? <Check /> : <Rocket />}{state.deployed ? "Strategy Staged" : "Deploy Strategy"}</Button><Button variant="outline" onClick={download} disabled={exporting}>{exporting ? <LoaderCircle className="animate-spin" /> : <Download />}Export Board Deck (PDF)</Button></div>
                <p role={state.deployed ? "status" : undefined} className="mt-3 min-h-9 text-xs leading-relaxed text-muted-foreground">{state.deployed ? "Strategy staged in this sandbox only. No live changes were made." : "SIMULATED OUTPUT / ILLUSTRATIVE ASSUMPTIONS / NOT FINANCIAL ADVICE"}</p>
              </div> : <div className="flex h-full flex-col items-center justify-center text-center"><div className="mb-6 flex h-20 w-20 items-center justify-center rounded-lg border border-primary/30 bg-primary/10"><engine.icon className="h-8 w-8 text-primary" /></div><h3 className="text-xl font-medium">Ready for your next decision.</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{engine.measure} · Scenario comparison · Executive brief</p><ArrowRight className="mt-7 h-5 w-5 text-primary" /></div>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  </section>;
}
