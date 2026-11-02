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
    <form onSubmit={submit} noValidate className="mt-10 border-t border-gold-foreground/25 pt-8 text-left">
      <h3 className="flex items-center gap-2 text-xl font-semibold"><LockKeyhole className="h-5 w-5 shrink-0" /> Confidential Inquiry &amp; Offer</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {[
          { name: "name", label: "Name/Company", type: "text", autocomplete: "organization", maxLength: 150 },
          { name: "email", label: "Email", type: "email", autocomplete: "email", maxLength: 254 },
          { name: "amount", label: "Offer Amount (USD)", type: "text", autocomplete: "off", maxLength: 15 },
        ].map((field) => (
          <div key={field.name} className={field.name === "amount" ? "sm:col-span-2" : ""}>
            <label htmlFor={`offer-${field.name}`} className="mb-2 block text-sm font-medium">{field.label}</label>
            <input id={`offer-${field.name}`} name={field.name} type={field.type} autoComplete={field.autocomplete} maxLength={field.maxLength} inputMode={field.name === "amount" ? "decimal" : undefined} required aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} className="h-12 w-full min-w-0 rounded-md border border-gold-foreground/25 bg-background/95 px-4 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/40" />
            {errors[field.name] && <p id={`error-${field.name}`} className="mt-2 text-sm font-medium">{errors[field.name]}</p>}
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button variant="gold" type="submit" className="h-12 px-6">Submit Private Offer <ArrowUpRight /></Button>
        <p className="text-sm">Opens your email app. No offer is sent automatically.</p>
      </div>
      {prepared && <p role="status" className="mt-4 text-sm font-medium">Email draft requested. Send it from your email app to complete your inquiry.</p>}
    </form>
  );
}