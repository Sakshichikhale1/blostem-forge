import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Building2, ShieldCheck, LineChart, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const Index = () => {
  const navigate = useNavigate();
  const [bank, setBank] = useState("");
  const [focused, setFocused] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = bank.trim();
    if (!value) return;
    navigate(`/processing/${encodeURIComponent(value)}`);
  };

  const examples = ["HDFC Bank", "Axis Bank", "Bajaj Finance", "Kotak Mahindra"];

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-primary/10 via-transparent to-transparent" aria-hidden />

      <header className="relative container flex h-16 items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#trust" className="hover:text-foreground transition-colors">Trust</a>
          <Button asChild size="sm" variant="outline" className="border-border/60">
            <Link to="/workspace"><LayoutGrid className="h-4 w-4" /> Workspace</Link>
          </Button>
        </div>
      </header>

      <section className="relative container flex flex-col items-center text-center pt-20 pb-12 md:pt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur-md animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>AI deal generation engine for fintech sales</span>
        </div>

        <h1 className="mt-7 font-display text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] animate-fade-in-up">
          Blostem <span className="gradient-text">Forge</span>
        </h1>

        <p className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "80ms" }}>
          Turn regulatory signals into enterprise deals. Generate a bank-specific
          business case in under sixty seconds.
        </p>

        <form
          onSubmit={submit}
          className="mt-12 w-full max-w-2xl animate-fade-in-up"
          style={{ animationDelay: "160ms" }}
        >
          <div
            className={`relative rounded-2xl border bg-card/60 backdrop-blur-xl transition-all duration-300 ${
              focused
                ? "border-primary/60 shadow-glow"
                : "border-border/60 shadow-elegant"
            }`}
          >
            <div className="flex items-center gap-3 p-2 pl-5">
              <Building2 className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter bank or NBFC name"
                className="flex-1 bg-transparent py-4 text-base md:text-lg outline-none placeholder:text-muted-foreground/70"
                aria-label="Bank or NBFC name"
              />
              <Button
                type="submit"
                size="lg"
                disabled={!bank.trim()}
                className="h-12 rounded-xl bg-gradient-primary hover:opacity-95 shadow-glow disabled:opacity-50 disabled:shadow-none transition-all duration-300 group"
              >
                Generate Deal Room
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="mr-1">Try:</span>
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setBank(ex)}
                className="rounded-full border border-border/60 bg-card/40 px-3 py-1.5 hover:border-primary/40 hover:text-foreground transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </form>
      </section>

      {/* Feature triplet */}
      <section id="how" className="relative container pb-24 pt-12">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Sparkles,
              title: "Signals, not search",
              body: "RBI circulars, earnings calls and hiring data fused into a live deal-readiness score.",
            },
            {
              icon: LineChart,
              title: "Stakeholder-ready",
              body: "Tailored views for CTO, business and compliance — generated, not templated.",
            },
            {
              icon: ShieldCheck,
              title: "Enterprise grade",
              body: "SOC 2, ISO 27001 and DPDP aligned. Your data never leaves your perimeter.",
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-border/60 bg-gradient-card p-6 shadow-card hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 80 + 200}ms` }}
            >
              <div className="h-10 w-10 rounded-lg bg-secondary border border-border/60 grid place-items-center mb-4 group-hover:bg-primary/10 group-hover:border-primary/40 transition-colors">
                <f.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-base">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer id="trust" className="relative container border-t border-border/60 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Blostem. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span>SOC 2 Type II</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>ISO 27001</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>DPDP Ready</span>
        </div>
      </footer>
    </main>
  );
};

export default Index;
