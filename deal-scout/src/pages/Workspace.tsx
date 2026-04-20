import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Plus, Search, Trash2, LayoutGrid, Inbox } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BankLogo } from "@/components/BankLogo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DealRoomRecord,
  DealStatus,
  STATUS_META,
  deleteDeal,
  listDeals,
} from "@/lib/workspace";

const FILTERS: { key: "all" | DealStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "draft", label: "Draft" },
  { key: "in_review", label: "In review" },
  { key: "shared", label: "Shared" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
];

const formatDate = (ts: number) => {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(ts).toLocaleDateString();
};

const Workspace = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState<DealRoomRecord[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | DealStatus>("all");

  useEffect(() => {
    const refresh = () => setDeals(listDeals());
    refresh();
    window.addEventListener("workspace:updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("workspace:updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: deals.length };
    for (const d of deals) c[d.status] = (c[d.status] ?? 0) + 1;
    return c;
  }, [deals]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return deals.filter((d) => {
      if (filter !== "all" && d.status !== filter) return false;
      if (q && !d.bank.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [deals, query, filter]);

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader>
        <Button asChild size="sm" className="bg-gradient-primary shadow-glow hover:opacity-95">
          <Link to="/">
            <Plus className="h-4 w-4" /> New deal room
          </Link>
        </Button>
      </AppHeader>

      <main className="flex-1 container py-10 animate-fade-in">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Forge</Link>
              <span>/</span>
              <span>Workspace</span>
            </div>
            <h1 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight flex items-center gap-3">
              <LayoutGrid className="h-7 w-7 text-primary" />
              Workspace
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Every Deal Room you've forged. Search, filter and pick up where you left off.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <StatPill label="Total" value={String(counts.all ?? 0)} />
            <StatPill label="Shared" value={String(counts.shared ?? 0)} />
            <StatPill label="Won" value={String(counts.won ?? 0)} tone="success" />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by bank or NBFC"
              className="w-full rounded-xl border border-border/60 bg-card/60 backdrop-blur-md pl-9 pr-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-primary/50 focus:shadow-glow transition-all"
              aria-label="Search deal rooms"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 rounded-xl border border-border/60 bg-card/60 p-1 backdrop-blur-md">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              const count = counts[f.key] ?? 0;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-secondary text-foreground shadow-elegant"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                  <span className={`rounded-full px-1.5 text-[10px] ${active ? "bg-background/60" : "bg-muted/40"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* List */}
        <div className="mt-6">
          {filtered.length === 0 ? (
            <EmptyState hasDeals={deals.length > 0} onClear={() => { setQuery(""); setFilter("all"); }} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((d) => {
                const meta = STATUS_META[d.status];
                return (
                  <div
                    key={d.id}
                    className="group relative rounded-2xl border border-border/60 bg-gradient-card p-5 shadow-card hover:border-primary/30 hover:shadow-glow transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/deal-room/${encodeURIComponent(d.bank)}`)}
                  >
                    <div className="flex items-start gap-3">
                      <BankLogo bank={d.bank} size={44} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-base truncate">{d.bank}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Updated {formatDate(d.updatedAt)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteDeal(d.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity rounded-md p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        aria-label="Delete deal room"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="outline" className={meta.cls}>
                        {meta.label}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Open <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <Link
                        to={`/dashboard/${encodeURIComponent(d.bank)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Dashboard
                      </Link>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <Link
                        to={`/deal-room/${encodeURIComponent(d.bank)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Deal Room
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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

const EmptyState = ({ hasDeals, onClear }: { hasDeals: boolean; onClear: () => void }) => (
  <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-12 text-center">
    <div className="mx-auto h-12 w-12 rounded-xl bg-secondary border border-border/60 grid place-items-center">
      <Inbox className="h-5 w-5 text-muted-foreground" />
    </div>
    <h3 className="mt-4 font-display text-lg font-semibold">
      {hasDeals ? "No deal rooms match your filters" : "No deal rooms yet"}
    </h3>
    <p className="mt-1.5 text-sm text-muted-foreground max-w-sm mx-auto">
      {hasDeals
        ? "Try clearing the search or switching to a different status."
        : "Forge your first deal room to see it appear here, neatly organized and searchable."}
    </p>
    <div className="mt-5 flex items-center justify-center gap-2">
      {hasDeals ? (
        <Button variant="outline" size="sm" onClick={onClear}>Clear filters</Button>
      ) : (
        <Button asChild size="sm" className="bg-gradient-primary shadow-glow hover:opacity-95">
          <Link to="/"><Plus className="h-4 w-4" /> New deal room</Link>
        </Button>
      )}
    </div>
  </div>
);

export default Workspace;
