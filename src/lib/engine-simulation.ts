import type { Engine } from "./engines";

export const simulationStages = ["Ingesting data...", "Running predictive models...", "Generating executive brief..."] as const;
export type SimulationInput = { value: number; horizon: number; scenario: number };
export function simulateEngine(engine: Engine, input: SimulationInput) {
  if (!Number.isFinite(input.value) || input.value <= 0 || input.value > 1e12) throw new Error("Enter a positive value up to 1 trillion.");
  if (![3, 6, 12].includes(input.horizon) || !Number.isInteger(input.scenario) || input.scenario < 0 || input.scenario >= engine.scenarios.length) throw new Error("Select a valid scenario and horizon.");
   const defensive = engine.slug === "risk-mitigation" || engine.slug === "capital-efficiency";
  const rate = defensive ? [-0.035, -0.06, -0.018][input.scenario] ?? -0.035 : [0.025, 0.045, 0.012][input.scenario] ?? 0.025;
  const data = Array.from({ length: input.horizon + 1 }, (_, month) => ({ month: `M${month}`, baseline: Math.round(input.value * Math.pow(1 + (defensive ? -0.055 : 0.01), month)), simulated: Math.round(input.value * Math.pow(1 + rate, month)) }));
  const final = data.at(-1);
  if (!final) throw new Error("No simulation data.");
  const change = ((final.simulated / input.value - 1) * 100);
  return { data, final: final.simulated, change, difference: final.simulated - final.baseline, scenario: engine.scenarios[input.scenario], horizon: input.horizon, inputValue: input.value, summary: `Under the ${engine.scenarios[input.scenario].toLowerCase()} scenario, ${engine.measure.toLowerCase()} is modeled at ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(final.simulated)} ${engine.unit} after ${input.horizon} months (${change >= 0 ? "+" : ""}${change.toFixed(1)}% versus the starting position). ${engine.action}` };
}