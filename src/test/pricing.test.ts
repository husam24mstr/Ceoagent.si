import { describe, expect, it, vi } from "vitest";
import { pricingTiers, offerDestination } from "@/lib/pricing";
import { exportBoardDeck } from "@/lib/board-deck";

describe("Enterprise acquisition rules", () => {
  it("prices Pro at 999 USD per month", () => {
    expect(pricingTiers.find(tier => tier.name === "Pro")?.monthlyUSD).toBe(999);
  });
  it("keeps Enterprise custom-priced", () => {
    expect(pricingTiers.find(tier => tier.name === "Enterprise")?.price).toBe("Custom");
  });
  it("routes full asset offers to the requested email", () => {
    expect(pricingTiers.find(tier => tier.acquisition)?.name).toBe("Full Asset Acquisition");
    expect(offerDestination).toBe("mailto:houssamlahrazli16@gmail.com");
  });
  it("opens native browser printing for a board report", () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => undefined);
    exportBoardDeck();
    expect(print).toHaveBeenCalledOnce();
    print.mockRestore();
  });
});