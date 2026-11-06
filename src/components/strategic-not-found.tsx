import { Link } from "@tanstack/react-router";
import { Radar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StrategicNotFound() {
  return <main className="mx-auto flex min-h-[75vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center"><Radar className="h-14 w-14 text-gold" /><p className="mt-8 font-mono text-xs text-muted-foreground">CEOAGENT.SI / UNAVAILABLE NODE</p><h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">Error 404: Strategic Node Not Found</h1><Button asChild variant="premium" className="mt-8 h-12"><Link to="/"><ArrowLeft />Return to Dashboard</Link></Button></main>;
}