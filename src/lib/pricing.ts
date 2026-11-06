import { CONTACT_EMAIL } from "./brand";

export const offerDestination = `mailto:${CONTACT_EMAIL}`;
export const pricingTiers = [
  { name: "Pro", monthlyUSD: 999, price: "$999", cadence: "/mo", features: ["Eight strategic engines", "Scenario modeling", "Executive board reports"], acquisition: false },
  { name: "Enterprise", monthlyUSD: null, price: "Custom", cadence: "", features: ["Organization-wide intelligence", "Dedicated deployment planning", "Enterprise integration roadmap"], acquisition: false },
  { name: "Full Asset Acquisition", monthlyUSD: null, price: "Own the asset", cadence: "", features: ["CeoAgent.si brand & domain", "Interactive prototype source code", "Full handover scope by agreement"], acquisition: true },
] as const;