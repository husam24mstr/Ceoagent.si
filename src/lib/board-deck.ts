import type { Engine } from "./engines";
import type { EngineReport } from "./console-state";

export async function exportBoardDeck(engine: Engine, report: EngineReport) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.text("CeoAgent.si / Board Brief", 20, 25);
  doc.setFontSize(14);
  doc.text(engine.title, 20, 39);
  doc.setFontSize(10);
  doc.text("ILLUSTRATIVE PROTOTYPE / NOT FINANCIAL ADVICE", 20, 50);
  doc.text(`Scenario: ${report.scenario} | Horizon: ${report.horizon} months`, 20, 61);
  doc.text(`Starting value: ${report.inputValue.toLocaleString("en-US")} ${engine.unit}`, 20, 70);
  doc.text(`Projected value: ${report.final.toLocaleString("en-US")} ${engine.unit} (${report.change.toFixed(1)}%)`, 20, 79);
  doc.text("Confidence Score: 94.2% (illustrative, not calibrated)", 20, 88);
  doc.setFontSize(14);
  doc.text("SI Executive Synthesis", 20, 103);
  doc.setFontSize(11);
  const lines = doc.splitTextToSize(report.summary, 170);
  doc.text(lines, 20, 115);
  doc.addPage();
  doc.setFontSize(18);
  doc.text("Scenario projection", 20, 25);
  doc.setFontSize(10);
  doc.text(`Month          Baseline (${engine.unit})          SI scenario (${engine.unit})`, 20, 42);
  report.data.forEach((row, i) => doc.text(`${row.month}                ${row.baseline.toLocaleString("en-US")}                ${row.simulated.toLocaleString("en-US")}`, 20, 55 + i * 10));
  doc.text("Deterministic assumptions only. No live datasets or statistical confidence model.", 20, 210);
  doc.save(`${engine.slug}-board-deck.pdf`);
}