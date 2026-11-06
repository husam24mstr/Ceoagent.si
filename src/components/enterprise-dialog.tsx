import { AnimatePresence, motion } from "framer-motion";
import { LockKeyhole, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ACQUISITION_URL, CONTACT_EMAIL } from "@/lib/brand";

export type EnterpriseDialogKind = "access" | "privacy" | "terms";
const legal = {
  privacy: { title: "Privacy Policy", sections: [
    ["Information you provide", "This prototype does not store simulation inputs or reports on a server. Confidential offer forms prepare an email draft; sending that draft shares the information you include with the acquisition contact."],
    ["Analytics and third parties", "Hosting and analytics providers may process technical information, including browser and visit data. External acquisition links and your email provider operate under their own privacy policies."],
    ["Your choices", `Avoid entering sensitive business or personal information. For privacy questions or requests concerning information you have emailed, contact ${CONTACT_EMAIL}.`],
  ] },
  terms: { title: "Terms of Service", sections: [
    ["Prototype use", "CeoAgent.si is an illustrative interactive prototype. Outputs use deterministic assumptions, not live datasets, and are not financial, investment, legal, or professional advice. No subscription or enterprise service is currently offered through this site."],
    ["Acceptable use and ownership", "Use this site lawfully and do not attempt unauthorized access or interfere with its operation. Access to this demonstration does not transfer intellectual property or grant rights to its source code or brand."],
    ["Acquisition and limitations", `Any asset sale, source-code handover, database delivery, warranties, and support require a separate written agreement. No transaction is completed by this site. The prototype is provided as-is, subject to applicable law. Inquiries: ${CONTACT_EMAIL}.`],
  ] },
};

export function EnterpriseDialog({ kind, onClose }: { kind: EnterpriseDialogKind | null; onClose: () => void }) {
  const content = kind && kind !== "access" ? legal[kind] : null;
  return <Dialog open={Boolean(kind)} onOpenChange={open => { if (!open) onClose(); }}>
    <AnimatePresence>
      {kind && <DialogPortal forceMount>
        <DialogOverlay forceMount asChild><motion.div className="enterprise-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /></DialogOverlay>
        <DialogPrimitive.Content forceMount asChild>
          <motion.div className="enterprise-dialog" initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .98 }} transition={{ duration: .2 }}>
            <DialogClose asChild><Button variant="ghost" size="icon" aria-label="Close dialog" className="absolute right-3 top-3"><X /></Button></DialogClose>
            <LockKeyhole className="mb-5 h-7 w-7 text-gold" />
            <DialogTitle className="pr-8 text-2xl leading-tight">{content?.title ?? "Restricted Area"}</DialogTitle>
            <DialogDescription className="mt-4 leading-relaxed">{content ? "CeoAgent.si · Interactive prototype" : "Restricted Area. Enterprise access is currently locked. Acquire CeoAgent.si to unlock full source code and database."}</DialogDescription>
            {content ? <div className="mt-6 space-y-6">{content.sections.map(([title, text]) => <section key={title}><h3 className="text-sm font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></section>)}</div> : <Button asChild variant="premium" className="mt-7 h-12"><a href={ACQUISITION_URL} target="_blank" rel="noopener noreferrer">Acquire CeoAgent.si</a></Button>}
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPortal>}
    </AnimatePresence>
  </Dialog>;
}