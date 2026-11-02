import { describe, expect, it } from "vitest";
import { privateOfferMailto, privateOfferSchema } from "@/lib/private-offer";

describe("Private offers", () => {
  it("prepares a confidential offer to the requested owner", () => {
    const url = new URL(privateOfferMailto({ name: "Founder & Company", email: "buyer@example.com", amount: "200000.50" }));
    expect(url.pathname).toBe("houssamlahrazli16@gmail.com");
    expect(url.searchParams.get("body")).toContain("Offer Amount (USD): 200000.50");
    expect(url.searchParams.get("body")).toContain("Name/Company: Founder & Company");
    expect(url.searchParams.get("subject")).toBe("Confidential offer — CeoAgent.si");
  });
  it("rejects malformed email addresses", () => {
    expect(privateOfferSchema.safeParse({ name: "Buyer", email: "invalid", amount: "100" }).success).toBe(false);
  });
  it("rejects zero or negative USD offers", () => {
    for (const amount of ["0", "-1", "0.00"]) expect(privateOfferSchema.safeParse({ name: "Buyer", email: "buyer@example.com", amount }).success).toBe(false);
  });
});