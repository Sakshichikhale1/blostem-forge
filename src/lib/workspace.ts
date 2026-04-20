export type DealStatus = "draft" | "in_review" | "shared" | "won" | "lost";

export interface DealRoomRecord {
  id: string;
  bank: string;
  status: DealStatus;
  createdAt: number;
  updatedAt: number;
}

const KEY = "blostem.workspace.deals";

const read = (): DealRoomRecord[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DealRoomRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const write = (deals: DealRoomRecord[]) => {
  localStorage.setItem(KEY, JSON.stringify(deals));
  window.dispatchEvent(new Event("workspace:updated"));
};

export const listDeals = (): DealRoomRecord[] =>
  read().sort((a, b) => b.updatedAt - a.updatedAt);

export const upsertDeal = (bank: string): DealRoomRecord => {
  const trimmed = bank.trim();
  const deals = read();
  const existing = deals.find((d) => d.bank.toLowerCase() === trimmed.toLowerCase());
  const now = Date.now();
  if (existing) {
    existing.updatedAt = now;
    write(deals);
    return existing;
  }
  const rec: DealRoomRecord = {
    id: crypto.randomUUID(),
    bank: trimmed,
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
  write([rec, ...deals]);
  return rec;
};

export const updateStatus = (id: string, status: DealStatus) => {
  const deals = read();
  const d = deals.find((x) => x.id === id);
  if (!d) return;
  d.status = status;
  d.updatedAt = Date.now();
  write(deals);
};

export const deleteDeal = (id: string) => {
  write(read().filter((d) => d.id !== id));
};

export const STATUS_META: Record<DealStatus, { label: string; cls: string }> = {
  draft: { label: "Draft", cls: "bg-muted/40 text-muted-foreground border-border/60" },
  in_review: { label: "In review", cls: "bg-warning/15 text-warning border-warning/30" },
  shared: { label: "Shared", cls: "bg-primary/15 text-primary border-primary/30" },
  won: { label: "Won", cls: "bg-success/15 text-success border-success/30" },
  lost: { label: "Lost", cls: "bg-destructive/15 text-destructive border-destructive/30" },
};

// Deterministic gradient for bank logo avatar
export const bankColors = (bank: string): { from: string; to: string; initials: string } => {
  const palettes = [
    { from: "hsl(217 91% 60%)", to: "hsl(265 89% 66%)" },
    { from: "hsl(265 89% 66%)", to: "hsl(330 81% 60%)" },
    { from: "hsl(199 89% 55%)", to: "hsl(217 91% 60%)" },
    { from: "hsl(160 84% 45%)", to: "hsl(199 89% 55%)" },
    { from: "hsl(35 92% 55%)", to: "hsl(0 84% 60%)" },
    { from: "hsl(280 80% 60%)", to: "hsl(217 91% 60%)" },
  ];
  let hash = 0;
  for (let i = 0; i < bank.length; i++) hash = (hash * 31 + bank.charCodeAt(i)) >>> 0;
  const p = palettes[hash % palettes.length];
  const initials = bank
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "?";
  return { ...p, initials };
};
