export interface DealData {
  bank: string;
  summary: string;
  cto: { title: string; body: string }[];
  business: { title: string; body: string; metric?: string }[];
  compliance: { title: string; body: string; severity: "low" | "med" | "high" }[];
  signals: { source: string; date: string; insight: string }[];
}

export const buildDeal = (bankRaw: string): DealData => {
  const bank = bankRaw.trim() || "Acme Bank";
  return {
    bank,
    summary: `${bank} is operating in a tightening regulatory environment with growing pressure on digital onboarding compliance and credit risk transparency. Recent RBI circulars on co-lending and digital lending guidelines create an immediate window to deploy AI-led decisioning. Blostem's platform aligns with ${bank}'s stated digital-first roadmap and unlocks an estimated ₹38–52 Cr in incremental annual revenue within 12 months.`,
    cto: [
      {
        title: "Integration surface",
        body: `REST + event-streaming integration over ${bank}'s existing core banking gateway. Estimated 6–8 week implementation with zero data egress — runs in your VPC.`,
      },
      {
        title: "Infrastructure footprint",
        body: "Stateless inference workers, autoscaled. P95 latency under 240ms at 2k TPS. Compatible with on-prem Kubernetes and major Indian cloud regions.",
      },
      {
        title: "Security posture",
        body: "ISO 27001, SOC 2 Type II, and DPDP-ready. Tokenized PII, BYOK encryption, and per-tenant audit trails fed into your SIEM.",
      },
    ],
    business: [
      { title: "Revenue uplift", body: "Higher approval rates on thin-file customers without raising delinquency.", metric: "+₹42 Cr / yr" },
      { title: "Conversion improvement", body: "Reduced drop-off in digital onboarding via real-time decisioning.", metric: "+18.4%" },
      { title: "Cost-to-serve", body: "Manual underwriting effort reduced through AI-prioritized queues.", metric: "-31%" },
      { title: "Time to decision", body: "Median credit decision time drops from 38h to under 4 minutes.", metric: "-99%" },
    ],
    compliance: [
      { title: "RBI Digital Lending Guidelines", body: "Full alignment with FLDG caps, KFS disclosures, and direct-to-borrower disbursement.", severity: "low" },
      { title: "Co-lending 2.0 readiness", body: "Built-in partner reconciliation, eligible asset tagging, and reporting templates.", severity: "low" },
      { title: "Model governance", body: "Explainability reports per decision; aligned with RBI's draft framework on responsible AI.", severity: "med" },
      { title: "DPDP exposure", body: "Consent artifact storage and purpose-binding required prior to go-live.", severity: "med" },
    ],
    signals: [
      { source: "RBI Circular", date: "Mar 2025", insight: "New norms on default loss guarantee — accelerates partner-led lending stack reviews." },
      { source: "Earnings call", date: "Q4 FY25", insight: `${bank} CFO highlighted "digital throughput" as the #1 growth lever for FY26.` },
      { source: "Hiring signal", date: "Last 90 days", insight: "12 open roles for AI/ML and risk decisioning — clear internal mandate." },
      { source: "Market", date: "Live", insight: "Two top-5 peers announced AI underwriting partnerships in the last quarter." },
    ],
  };
};
