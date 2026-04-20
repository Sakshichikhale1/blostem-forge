import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Badge } from "@/components/ui/badge";

export const AppHeader = ({ children }: { children?: React.ReactNode }) => {
  const { pathname } = useLocation();
  const navItems = [
    { to: "/workspace", label: "Workspace" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <Badge variant="outline" className="hidden sm:inline-flex border-border/60 text-muted-foreground font-normal">
            Beta
          </Badge>
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {navItems.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                    active
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">{children}</div>
      </div>
    </header>
  );
};
