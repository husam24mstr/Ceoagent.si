import { describe, expect, it } from "vitest";
import { ACQUISITION_URL, CONTACT_EMAIL } from "@/lib/brand";

describe("Acquisition identity", () => {
  it("uses the exact requested Dynadot listing", () => {
    expect(ACQUISITION_URL).toBe("https://www.dynadot.com/market/user-listings/ceoagent.si");
  });
  it("uses the owner's private inquiry destination", () => {
    expect(CONTACT_EMAIL).toBe("houssamlahrazli16@gmail.com");
  });
});