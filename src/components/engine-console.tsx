import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ClientOnly } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, Check, Cpu, Download, LoaderCircle, Play, Terminal, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Engine } from "@/lib/engines";
import { simulateEngine, simulationStages } from "@/lib/engine-simulation";

const format = (value: number) => new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);

export function EngineConsole({ engine }: { engine: Engine }) {
  const [value, setValue] = useState(String(engine.defaultValue));
  const [scenario, setScenario] = useState("0");
  const [horizon, setHorizon] = useState("6");
  const [stage, setStage] = useState<number | null>(null);
  const [report, setReport] = useState<ReturnType<typeof simulateEngine> | null>(null);
  const [error, setError] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const busy = stage !== null;
  function run(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    try {
      const next = simulateEngine(engine, { value: Number(value), scenario: Number(scenario), horizon: Number(horizon) });
      setError(""); setReport(null); setStage(0);
      timers.current.forEach(clearTimeout);
      timers.current = [setTimeout(() => setStage(1), 1000), setTimeout(() => setStage(2), 2200), setTimeout(() => { setReport(next); setStage(null); }, 3500)];
    } catch (err) { setError(err instanceof Error ? err.message : "Check your scenario inputs."); }
  }
  function download() {
    if (!report) return;
    const text = `${engine.title}\nSIMULATED PROTOTYPE REPORT\nScenario: ${report.scenario}\nStarting value: ${report.inputValue} ${engine.unit}\nHorizon: ${report.horizon} months\n\n${report.summary}\n\nIllustrative assumptions only. Not financial advice or real analysis.`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${engine.slug}-executive-brief.txt`; anchor.click(); URL.revokeObjectURL(url);
  }
  return <section className="py-14" aria-labelledby="console-title">
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-medium uppercase text-primary">Interactive playground</p><h2 id="console-title" className="mt-3 text-2xl font-semibold sm:text-3xl">Simulation Console</h2></div><span className="flex items-center gap-2 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-primary" /> Sandbox environment</span></div>
    <div className="console-shell overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4"><span className="flex items-center gap-2 font-mono text-xs text-muted-foreground"><Terminal className="h-4 w-4 text-primary" /> ceoagent / {engine.slug}</span><span className="text-xs text-primary">SI CORE • v1.0</span></div>
      <div className="grid lg:grid-cols-[320px_minmax(0,1fr)]">
        <form onSubmit={run} className="space-y-6 border-b border-border p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div><p className="text-sm font-semibold">Scenario parameters</p><p className="mt-2 text-xs text-muted-foreground">Illustrative data · isolated session</p></div>
          <div><label htmlFor="scenario" className="mb-2 block text-xs font-medium text-muted-foreground">Strategic scenario</label><select id="scenario" className="engine-input" value={scenario} onChange={event => setScenario(event.target.value)} disabled={busy}>{engine.scenarios.map((item, index) => <option value={index} key={item}>{item}</option>)}</select></div>
          <div><label htmlFor="simulation-value" className="mb-2 block text-xs font-medium text-muted-foreground">{engine.input}</label><input id="simulation-value" className="engine-input" type="number" min="1" max="1000000000000" step="any" required value={value} onChange={event => setValue(event.target.value)} disabled={busy} aria-describedby={error ? "simulation-error" : undefined} aria-invalid={Boolean(error)} /></div>
          <div><label htmlFor="horizon" className="mb-2 block text-xs font-medium text-muted-foreground">Projection horizon</label><select id="horizon" className="engine-input" value={horizon} onChange={event => setHorizon(event.target.value)} disabled={busy}>{[3, 6, 12].map(months => <option key={months} value={months}>{months} months</option>)}</select></div>
          {error && <p id="simulation-error" role="alert" className="text-sm text-gold">{error}</p>}
          <Button type="submit" variant="premium" className="h-12 w-full" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" /> : <Play />}{busy ? "Simulation in progress" : "Run SI Simulation"}</Button>
          <p className="text-xs leading-relaxed text-muted-foreground">Prototype simulation. No live data connections or real financial analysis.</p>
        </form>
        <div className="min-w-0 p-5 sm:p-7" aria-busy={busy}>
          <AnimatePresence mode="wait">
            {busy ? <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-[410px] flex-col justify-center">
              <Cpu className="mb-8 h-12 w-12 animate-pulse text-primary" /><div role="status" aria-live="polite" className="text-lg font-medium">{simulationStages[stage]}</div>
              <div className="mt-7 space-y-4">{simulationStages.map((text, index) => <div key={text} className={`flex items-center gap-3 text-sm ${index <= (stage ?? 0) ? "text-foreground" : "text-muted-foreground"}`}>{index < (stage ?? 0) ? <Check className="h-4 w-4 text-primary" /> : <span className="h-4 w-4 rounded-full border border-border" />}{text}</div>)}</div>
              <div className="mt-8 h-1 overflow-hidden rounded-full bg-accent"><motion.div className="h-full bg-primary" initial={{ width: "5%" }} animate={{ width: `${((stage ?? 0) + 1) * 32}%` }} /></div>
            </motion.div> : report ? <motion.div key="report" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-wrap items-center justify-between gap-3"><div><p role="status" className="flex items-center gap-2 text-xs text-primary"><Check className="h-4 w-4" /> Simulation complete</p><h3 className="mt-2 text-xl font-semibold">Output Report</h3></div><Button variant="glass" size="icon" title="Download executive brief" aria-label="Download executive brief" onClick={download}><Download /></Button></div>
              <div className="my-6 grid grid-cols-2 gap-5 border-y border-border py-5"><div><p className="text-xs text-muted-foreground">{engine.measure}</p><p className="mt-2 text-3xl font-semibold">{engine.unit === "USD" ? "$" : ""}{format(report.final)}</p></div><div><p className="text-xs text-muted-foreground">Change from starting value</p><p className="mt-2 text-3xl font-semibold text-primary">{report.change >= 0 ? "+" : ""}{report.change.toFixed(1)}%</p></div></div>
              <div className="mb-3 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground"><span>{report.scenario} · {report.horizon} months</span><span className="flex gap-4"><span>— Baseline</span><span className="text-primary">— SI scenario</span></span></div>
              <div className="h-[240px] w-full min-w-0" role="img" aria-label={`${engine.measure} projection: final simulated value ${report.final} ${engine.unit}, change ${report.change.toFixed(1)} percent`}><ClientOnly><ResponsiveContainer width="100%" height="100%"><AreaChart data={report.data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}><CartesianGrid stroke="var(--border)" vertical={false} /><XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} /><YAxis tickFormatter={format} stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={50} /><Tooltip contentStyle={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--foreground)", borderRadius: 6 }} formatter={(n: number) => `${engine.unit === "USD" ? "$" : ""}${new Intl.NumberFormat("en-US").format(n)}`} /><Area name="Baseline" dataKey="baseline" type="monotone" stroke="var(--muted-foreground)" fill="transparent" strokeDasharray="4 4" /><Area name="SI scenario" dataKey="simulated" type="monotone" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.12} strokeWidth={2} isAnimationActive={false} /></AreaChart></ResponsiveContainer></ClientOnly></div>
              <div className="mt-6 border-t border-border pt-5"><h4 className="flex items-center gap-2 text-sm font-semibold"><TrendingUp className="h-4 w-4 text-primary" /> Executive brief</h4><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{report.summary}</p><p className="mt-4 font-mono text-[11px] text-muted-foreground">SIMULATED OUTPUT / ILLUSTRATIVE ASSUMPTIONS / NOT FINANCIAL ADVICE</p></div>
            </motion.div> : <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-[410px] flex-col items-center justify-center text-center"><div className="architecture-core mb-6 flex h-20 w-20 items-center justify-center rounded-lg border border-primary/30 bg-primary/10"><engine.icon className="h-8 w-8 text-primary" /></div><h3 className="text-xl font-medium">Ready for your next decision.</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{engine.measure} · Scenario comparison · Executive brief</p><ArrowRight className="mt-7 h-5 w-5 text-primary" /></motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </section>;
}