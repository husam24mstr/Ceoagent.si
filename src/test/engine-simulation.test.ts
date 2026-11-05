import { describe, expect, it } from "vitest";
import { engines, getEngine } from "@/lib/engines";
import { simulateEngine } from "@/lib/engine-simulation";

describe("Engine simulations", () => {
  it.each(engines)("produces a complete report for $slug", engine => {
    const report = simulateEngine(engine, { value: engine.defaultValue, horizon: 6, scenario: 0 });
    expect(report.data).toHaveLength(7);
    expect(report.data[0]?.simulated).toBe(engine.defaultValue);
    expect(report.final).toBe(report.data[6]?.simulated);
    expect(Number.isFinite(report.change)).toBe(true);
  });
  it("handles defensive scenarios using their distinct rate", () => {
    const engine = getEngine("risk-mitigation");
    if (!engine) throw new Error("Missing risk engine");
    expect(simulateEngine(engine, { value: 800000, horizon: 3, scenario: 0 }).final).toBe(Math.round(800000 * 0.965 ** 3));
  });
  it("rejects invalid inputs instead of producing a report", () => {
    const engine = engines[0];
    expect(() => simulateEngine(engine, { value: 0, horizon: 6, scenario: 0 })).toThrow();
    expect(() => simulateEngine(engine, { value: 100, horizon: 5, scenario: 0 })).toThrow();
    expect(() => simulateEngine(engine, { value: 100, horizon: 6, scenario: 3 })).toThrow();
  });
});