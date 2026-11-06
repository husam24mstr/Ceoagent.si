import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ACQUISITION_URL } from "@/lib/brand";
import { EnterpriseDialog } from "./enterprise-dialog";

export function SiteHeader() {
  const [accessOpen, setAccessOpen] = useState(false);
  return <>
    <header className="site-header sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:flex sm:justify-between sm:px-6">
        <Link to="/" className="ca-logo shrink-0" aria-label="CeoAgent home">CA</Link>
        <nav aria-label="Main navigation" className="flex min-w-0 items-center justify-end gap-2 sm:gap-4">
          <Button asChild variant="ghost" className="px-2 sm:px-4"><Link to="/pricing">Pricing</Link></Button>
          <Button variant="ghost" onClick={() => setAccessOpen(true)} className="px-2 sm:px-4"><LockKeyhole className="hidden sm:block" /><span className="sm:hidden">Sign In</span><span className="hidden sm:inline">Client Portal</span></Button>
          <Button asChild variant="premium" className="h-10 px-3 sm:px-5"><a href={ACQUISITION_URL} target="_blank" rel="noopener noreferrer"><span className="sm:hidden">Acquire</span><span className="hidden sm:inline">Acquire CeoAgent.si</span><ArrowUpRight /></a></Button>
        </nav>
      </div>
    </header>
    <EnterpriseDialog kind={accessOpen ? "access" : null} onClose={() => setAccessOpen(false)} />
  </>;
}