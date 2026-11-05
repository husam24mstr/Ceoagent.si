import type { simulateEngine } from "./engine-simulation";

export const PROCESSING_STEP_MS = 800;
export const PROCESSING_DURATION_MS = 3600;
export type EngineReport = ReturnType<typeof simulateEngine>;
export type ConsoleState =
  | { status: "idle" }
  | { status: "processing"; elapsed: number }
  | { status: "success"; report: EngineReport; deployed: boolean };
export type ConsoleAction = { type: "start" } | { type: "tick"; elapsed: number } | { type: "complete"; report: EngineReport } | { type: "deploy" };
export function consoleReducer(state: ConsoleState, action: ConsoleAction): ConsoleState {
  switch (action.type) {
    case "start": return state.status === "processing" ? state : { status: "processing", elapsed: 0 };
    case "tick": return state.status === "processing" ? { ...state, elapsed: action.elapsed } : state;
    case "complete": return state.status === "processing" ? { status: "success", report: action.report, deployed: false } : state;
    case "deploy": return state.status === "success" ? { ...state, deployed: true } : state;
  }
}