import { describe, expect, it } from "vitest";
import { consoleReducer, PROCESSING_DURATION_MS, PROCESSING_STEP_MS } from "@/lib/console-state";
import { simulateEngine, simulationStages } from "@/lib/engine-simulation";
import { engines } from "@/lib/engines";

describe("Console lifecycle", () => {
  it("advances four stages every 800ms and completes after 3600ms", () => {
    expect(PROCESSING_STEP_MS).toBe(800);
    expect(PROCESSING_DURATION_MS).toBe(3600);
    expect(simulationStages).toHaveLength(4);
    let state = consoleReducer({ status: "idle" }, { type: "start" });
    for (const elapsed of [0, 800, 1600, 2400]) {
      state = consoleReducer(state, { type: "tick", elapsed });
      expect(state).toEqual({ status: "processing", elapsed });
    }
    const report = simulateEngine(engines[0], { value: 10000000, horizon: 6, scenario: 0 });
    state = consoleReducer(state, { type: "complete", report });
    expect(state).toEqual({ status: "success", report, deployed: false });
    expect(consoleReducer(state, { type: "deploy" })).toEqual({ status: "success", report, deployed: true });
  });
  it("ignores deployment without a result and duplicate starts", () => {
    expect(consoleReducer({ status: "idle" }, { type: "deploy" })).toEqual({ status: "idle" });
    expect(consoleReducer({ status: "processing", elapsed: 800 }, { type: "start" })).toEqual({ status: "processing", elapsed: 800 });
  });
  it("maps a ten-million input exactly to the chart origin", () => {
    const report = simulateEngine(engines[0], { value: 10000000, horizon: 6, scenario: 0 });
    expect(report.data[0]?.simulated).toBe(10000000);
    expect(report.final).toBe(Math.round(10000000 * 1.025 ** 6));
    expect(report.synthesis).toHaveLength(3);
  });
});