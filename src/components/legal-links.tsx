import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EnterpriseDialog, type EnterpriseDialogKind } from "./enterprise-dialog";

export function LegalLinks() {
  const [kind, setKind] = useState<EnterpriseDialogKind | null>(null);
  return <><div className="flex flex-wrap gap-x-4 gap-y-2"><Button variant="link" className="h-auto justify-start whitespace-normal p-0 text-sm text-muted-foreground" onClick={() => setKind("privacy")}>Privacy Policy</Button><Button variant="link" className="h-auto justify-start whitespace-normal p-0 text-sm text-muted-foreground" onClick={() => setKind("terms")}>Terms of Service</Button></div><EnterpriseDialog kind={kind} onClose={() => setKind(null)} /></>;
}