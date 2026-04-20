import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, Cpu, TrendingUp, ShieldCheck, ExternalLink } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildDeal } from "@/lib/dealData";

const Dashboard = () => {
  const { bank = "" } = useParams();
  const decoded = decodeURIComponent(bank);
  const deal = useMemo(() => buildDeal(decoded), [decoded]);

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader>
        <Button asChild size="sm" className="bg-gradient-primary shadow-glow hover:opacity-95">
          <Link to={`/deal-room/${encodeURIComponent(deal.bank)}`}>
            Open Deal Room <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </AppHeader>

      <main className="flex-1 container py-10 animate-fade-in">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Forge</Link>
              <span>/</span>
              <span>Deal</span>
            </div>
            <h1 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight">
              {deal.bank}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <Badge className="bg-success/15 text-success border-success/30 hover:bg-success/15">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Deal Generated
              </Badge>
              <span className="text-xs text-muted-foreground">Refreshed just now</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <StatPill label="Deal score" value="A+" tone="success" />
            <StatPill label="Est. ARR" value="₹42 Cr" />
            <StatPill label="Time to close" value="~9 wks" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="cto" className="mt-10">
          <TabsList className="bg-card/60 border border-border/60 p-1 h-auto">
            <TabsTrigger value="cto" className="data-[state=active]:bg-secondary data-[state=active]:shadow-elegant gap-2 px-4 py-2">
              <Cpu className="h-4 w-4" /> CTO View
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-secondary data-[state=active]:shadow-elegant gap-2 px-4 py-2">
              <TrendingUp className="h-4 w-4" /> Business Case
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-secondary data-[state=active]:shadow-elegant gap-2 px-4 py-2">
              <ShieldCheck className="h-4 w-4" /> Compliance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cto" className="mt-6 animate-fade-in">
            <div className="grid md:grid-cols-3 gap-4">
              {deal.cto.map((c) => (
                <InsightCard key={c.title} title={c.title} body={c.body} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="business" className="mt-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-4">
              {deal.business.map((b) => (
                <Card
                  key={b.title}
                  className="bg-gradient-card border-border/60 shadow-card hover:border-primary/30 hover:shadow-glow transition-all duration-300"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-base font-display">{b.title}</CardTitle>
                      {b.metric && (
                        <span className="font-mono text-sm font-semibold gradient-text">
                          {b.metric}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-4">
              {deal.compliance.map((c) => (
                <Card
                  key={c.title}
                  className="bg-gradient-card border-border/60 shadow-card hover:border-primary/30 transition-all duration-300"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-base font-display">{c.title}</CardTitle>
                      <SeverityBadge severity={c.severity} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Signals strip */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Live signals</h2>
            <span className="text-xs text-muted-foreground">Updated continuously</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {deal.signals.map((s) => (
              <div
                key={s.source + s.insight}
                className="rounded-xl border border-border/60 bg-card/60 p-4 hover:border-primary/30 hover:bg-card transition-all"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{s.source}</span>
                  <span>{s.date}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed">{s.insight}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-2xl border border-border/60 bg-gradient-subtle p-6 md:p-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold">Ready to share with the account team?</h3>
            <p className="text-sm text-muted-foreground mt-1">Open the polished, investor-grade Deal Room.</p>
          </div>
          <Button asChild size="lg" className="bg-gradient-primary shadow-glow hover:opacity-95">
            <Link to={`/deal-room/${encodeURIComponent(deal.bank)}`}>
              Open Deal Room <ExternalLink className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

const StatPill = ({ label, value, tone }: { label: string; value: string; tone?: "success" }) => (
  <div className="rounded-xl border border-border/60 bg-card/60 px-4 py-2.5 backdrop-blur-md">
    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
    <div className={`font-display font-semibold ${tone === "success" ? "text-success" : ""}`}>{value}</div>
  </div>
);

const InsightCard = ({ title, body }: { title: string; body: string }) => (
  <Card className="bg-gradient-card border-border/60 shadow-card hover:border-primary/30 hover:shadow-glow transition-all duration-300">
    <CardHeader className="pb-2">
      <CardTitle className="text-base font-display">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-sm leading-relaxed">{body}</CardDescription>
    </CardContent>
  </Card>
);

const SeverityBadge = ({ severity }: { severity: "low" | "med" | "high" }) => {
  const map = {
    low: { label: "Low risk", cls: "bg-success/15 text-success border-success/30" },
    med: { label: "Review", cls: "bg-warning/15 text-warning border-warning/30" },
    high: { label: "High risk", cls: "bg-destructive/15 text-destructive border-destructive/30" },
  } as const;
  const m = map[severity];
  return <Badge className={`${m.cls} hover:${m.cls}`} variant="outline">{m.label}</Badge>;
};

export default Dashboard;
