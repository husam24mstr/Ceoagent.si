import { useEffect, useState } from "react";
import { ArrowRight, BrainCircuit, RotateCcw, Terminal, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const prompt = "Analyze our Q3 burn rate vs competitor benchmarks.";
const answer = "Calculating... Q3 burn is 12% below industry baseline, extending runway by 4.2 months. Recommend reallocating $200k to R&D.";
const CALCULATING_MS = 1500;
const TYPE_MS = 28;

export function SIChatDemo() {
  const [typedPrompt, setTypedPrompt] = useState(prompt);
  const [typedAnswer, setTypedAnswer] = useState(answer);
  const [phase, setPhase] = useState<"idle" | "typing" | "calculating" | "answering">("idle");

  useEffect(() => {
    if (phase === "idle") return;
    if (phase === "typing") {
      let i = 0;
      setTypedPrompt("");
      setTypedAnswer("");
      const timer = window.setInterval(() => {
        i += 1;
        setTypedPrompt(prompt.slice(0, i));
        if (i >= prompt.length) {
          window.clearInterval(timer);
          setPhase("calculating");
        }
      }, TYPE_MS);
      return () => window.clearInterval(timer);
    }
    if (phase === "calculating") {
      const calcTimer = window.setTimeout(() => setPhase("answering"), CALCULATING_MS);
      return () => window.clearTimeout(calcTimer);
    }
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setTypedAnswer(answer.slice(0, i));
      if (i >= answer.length) {
        window.clearInterval(timer);
        setPhase("idle");
      }
    }, TYPE_MS);
    return () => window.clearInterval(timer);
  }, [phase]);

  const replay = () => setPhase("typing");
  const busy = phase !== "idle";

  return (
    <section aria-labelledby="si-demo-title" className="border-b border-border px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase text-gold">Executive intelligence</p><h2 id="si-demo-title" className="mt-3 text-3xl font-semibold sm:text-4xl">Your next strategic decision.</h2></div>
          <span className="text-xs font-medium uppercase text-muted-foreground">Illustrative demo</span>
        </div>
        <div className="glass float-depth overflow-hidden rounded-lg">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-surface/70 px-4 py-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3"><Terminal className="h-4 w-4 shrink-0 text-gold" /><h3 className="text-sm font-medium">CeoAgent / SI Terminal</h3></div>
            <Button variant="ghost" size="icon" aria-label="Replay SI demo" title="Replay SI demo" onClick={replay} disabled={busy}><RotateCcw className="h-4 w-4" /></Button>
          </div>
          <div className="space-y-8 px-5 py-8 sm:px-8">
<div className="flex gap-4"><User className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" /><div><p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">User</p><p className="min-h-6 text-base leading-relaxed">{typedPrompt}{phase === "typing" && <span className="text-primary">▌</span>}</p></div></div>
            <div className="flex min-h-40 gap-4 sm:min-h-32"><BrainCircuit className={`mt-1 h-5 w-5 shrink-0 text-primary ${busy ? "icon-pulse" : ""}`} /><div className="max-w-3xl"><p className="mb-2 text-xs font-semibold uppercase text-primary">SI Agent</p><p role="status" aria-live="polite" className="text-base leading-relaxed">{phase === "calculating" ? "Calculating..." : typedAnswer}{phase === "answering" && <span className="text-primary">▌</span>}</p>{!busy && <p className="mt-4 flex items-center gap-2 text-xs text-gold"><ArrowRight className="h-3 w-3" /> Strategic recommendation ready</p>}</div></div>
          </div>
          <div className="border-t border-border px-5 py-4 text-xs text-muted-foreground sm:px-8">Simulated conversation · Illustrative figures · No company data connected</div>
        </div>
      </div>
    </section>
  );
}
