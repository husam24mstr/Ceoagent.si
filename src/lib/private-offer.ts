import { z } from "zod";
import { CONTACT_EMAIL } from "@/lib/brand";

export const privateOfferSchema = z.object({
  name: z.string().trim().min(1, "Enter your name or company.").max(150),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  amount: z.string().trim().regex(/^\d{1,12}(\.\d{1,2})?$/, "Enter an offer in USD, with up to two decimal places.").refine((value) => Number(value) > 0, "Enter an offer greater than zero."),
});

export function privateOfferMailto(input: unknown) {
  const offer = privateOfferSchema.parse(input);
  const subject = "Confidential offer — CeoAgent.si";
  const body = `Name/Company: ${offer.name}\nEmail: ${offer.email}\nOffer Amount (USD): ${offer.amount}\n\nI would like to discuss the acquisition of CeoAgent.si.`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}