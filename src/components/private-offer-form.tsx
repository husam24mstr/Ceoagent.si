import { useState, type FormEvent } from "react";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { privateOfferMailto, privateOfferSchema } from "@/lib/private-offer";

export function PrivateOfferForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prepared, setPrepared] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input = { name: data.get("name"), email: data.get("email"), amount: data.get("amount") };
    const parsed = privateOfferSchema.safeParse(input);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      setPrepared(false);
      return;
    }
    setErrors({});
    window.location.href = privateOfferMailto(parsed.data);
    setPrepared(true);
  }
  return (
    <form onSubmit={submit} noValidate className="mt-10 border-t border-border pt-8 text-left">
      <h3 className="flex items-center gap-2 text-xl font-semibold"><LockKeyhole className="h-5 w-5 shrink-0 text-gold icon-pulse" /> Confidential Inquiry &amp; Offer</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {[
          { name: "name", label: "Name/Company", type: "text", autocomplete: "organization", maxLength: 150 },
          { name: "email", label: "Email", type: "email", autocomplete: "email", maxLength: 254 },
          { name: "amount", label: "Offer Amount (USD)", type: "text", autocomplete: "off", maxLength: 15 },
        ].map((field) => (
          <div key={field.name} className={field.name === "amount" ? "sm:col-span-2" : ""}>
            <label htmlFor={`offer-${field.name}`} className="mb-2 block text-sm font-medium text-muted-foreground">{field.label}</label>
            <input id={`offer-${field.name}`} name={field.name} type={field.type} autoComplete={field.autocomplete} maxLength={field.maxLength} inputMode={field.name === "amount" ? "decimal" : undefined} required aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} className="glass-input h-12 w-full min-w-0 rounded-md px-4 text-base" />
            {errors[field.name] && <p id={`error-${field.name}`} className="mt-2 text-sm font-medium text-gold">{errors[field.name]}</p>}
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button variant="gold" type="submit" className="h-12 px-6 shadow-[0_0_24px_-6px_var(--gold)] hover:shadow-[0_0_36px_-4px_var(--gold)]">Submit Private Offer <ArrowUpRight /></Button>
        <p className="text-sm text-muted-foreground">Opens your email app. No offer is sent automatically.</p>
      </div>
      {prepared && <p role="status" className="mt-4 text-sm font-medium text-gold">Email draft requested. Send it from your email app to complete your inquiry.</p>}
    </form>
  );
}