import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, Loader2, Radio, BarChart3, Users, FileText } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { upsertDeal } from "@/lib/workspace";

const STEPS = [
  { key: "rbi", label: "Scanning RBI signals", desc: "Parsing circulars, notifications and master directions", icon: Radio },
  { key: "market", label: "Analyzing market data", desc: "Earnings calls, hiring patterns, peer benchmarks", icon: BarChart3 },
  { key: "stakeholders", label: "Mapping stakeholder priorities", desc: "CTO, business and compliance perspectives", icon: Users },
  { key: "case", label: "Building business case", desc: "Drafting executive summary and ROI model", icon: FileText },
];

const STEP_DURATION = 1100;

const Processing = () => {
  const { bank = "" } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Logic for the first 3 visual steps
    if (active < STEPS.length - 1) {
      const t = setTimeout(() => setActive((a) => a + 1), STEP_DURATION);
      return () => clearTimeout(t);
    }

    // 2. Logic for the final step + REAL API CALL
    const forgeDeal = async () => {
      const decoded = decodeURIComponent(bank);

      try {
        // Trigger the last step animation
        setActive(STEPS.length - 1);

        // API Call to your Python Backend
        const response = await fetch("https://blostem-forge-frontend.onrender.com/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bank_name: decoded }),
        });

        if (!response.ok) throw new Error("Forge Engine Offline");

        const aiData = await response.json();

        // Save to workspace history
        if (decoded.trim()) upsertDeal(decoded);

        // Small delay so the user sees the last step hit "Complete"
        setTimeout(() => {
          navigate(`/dashboard/${encodeURIComponent(bank)}`, {
            state: { dealData: aiData }
          });
        }, 800);

      } catch (err) {
        console.error("Forge Error:", err);
        setError("Connection to Forge Engine failed. Is the Python server running?");

        // Fallback: Still navigate after a delay so the demo doesn't hang
        setTimeout(() => {
          navigate(`/dashboard/${encodeURIComponent(bank)}`);
        }, 3000);
      }
    };

    if (active === STEPS.length - 1) {
      forgeDeal();
    }
  }, [active, bank, navigate]);

  const decoded = decodeURIComponent(bank);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <main className="flex-1 container max-w-3xl py-16 md:py-24">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Forging deal room
          </div>
          <h1 className="mt-5 font-display text-3xl md:text-4xl font-semibold tracking-tight">
            Generating insights for <span className="gradient-text">{decoded}</span>
          </h1>
          {error ? (
            <p className="mt-3 text-destructive font-medium">{error}</p>
          ) : (
            <p className="mt-3 text-muted-foreground">
              Our agents are working across regulatory, market and organizational signals.
            </p>
          )}
        </div>

        <ol className="mt-12 space-y-3">
          {STEPS.map((step, i) => {
            const state = i < active ? "done" : i === active ? "active" : "pending";
            return (
              <li
                key={step.key}
                className={`relative flex items-start gap-4 rounded-xl border p-4 md:p-5 transition-all duration-500 ${state === "active"
                  ? "border-primary/40 bg-card shadow-glow"
                  : state === "done"
                    ? "border-border/60 bg-card/60"
                    : "border-border/40 bg-card/30"
                  }`}
              >
                <div
                  className={`shrink-0 h-10 w-10 rounded-lg grid place-items-center border transition-colors ${state === "done"
                    ? "bg-success/15 border-success/30 text-success"
                    : state === "active"
                      ? "bg-primary/15 border-primary/40 text-primary"
                      : "bg-secondary border-border/60 text-muted-foreground"
                    }`}
                >
                  {state === "done" ? (
                    <Check className="h-5 w-5" />
                  ) : state === "active" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className={`font-medium ${state === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
                      {step.label}
                      {state === "active" && <span className="text-muted-foreground font-normal">…</span>}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {state === "done" ? "Complete" : state === "active" ? "Running" : "Queued"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{step.desc}</p>
                  {state === "active" && (
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full w-1/2 bg-gradient-primary animate-[shimmer_1.4s_ease-in-out_infinite]" style={{ backgroundSize: "200% 100%" }} />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 rounded-2xl border border-border/60 bg-gradient-card p-6 shadow-card opacity-50">
          <div className="flex items-center justify-between">
            <div className="h-3 w-32 rounded bg-muted animate-pulse" />
            <div className="h-3 w-16 rounded bg-muted animate-pulse" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 rounded bg-muted animate-pulse" />
                <div className="h-7 w-full rounded bg-muted animate-pulse" />
                <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Processing;
