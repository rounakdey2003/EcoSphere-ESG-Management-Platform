import * as React from "react";
import { Link, useLocation } from "wouter";
import { 
  BarChart3, Leaf, Users, ShieldCheck, Award, FileText, 
  Settings, Bell, LogOut, Hexagon, Menu, X
} from "lucide-react";
import { useListNotifications } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/",              label: "Terminal",      icon: BarChart3   },
  { href: "/environmental", label: "Environmental", icon: Leaf        },
  { href: "/social",        label: "Social",        icon: Users       },
  { href: "/governance",    label: "Governance",    icon: ShieldCheck },
  { href: "/gamification",  label: "Gamification",  icon: Award       },
  { href: "/reports",       label: "Reports",       icon: FileText    },
  { href: "/settings",      label: "Settings",      icon: Settings    },
];

function NavLinks({ onNav }: { onNav?: () => void }) {
  const [location] = useLocation();
  return (
    <nav className="space-y-1 px-3">
      {links.map((link) => {
        const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
        return (
          <Link key={link.href} href={link.href} onClick={onNav} className="block">
            <div className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all group border-l-2",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground border-primary"
                : "border-transparent text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}>
              <link.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground")} />
              {link.label}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

function DisconnectButton({ onDisconnect }: { onDisconnect: () => void }) {
  return (
    <button
      onClick={onDisconnect}
      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10 cursor-pointer transition-colors rounded-sm"
    >
      <LogOut className="w-4 h-4" />
      Disconnect
    </button>
  );
}

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { data: notifications } = useListNotifications();
  const unreadCount = notifications?.filter(n => !n.isRead).length || 0;

  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur flex items-center justify-between px-4 md:px-6 z-10 sticky top-0">
      <div className="flex items-center gap-3">
        {}
        <button
          className="md:hidden p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-chart-1 animate-pulse rounded-full opacity-80" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider hidden sm:block">System Live</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/notifications" className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive border border-background rounded-full" />
          )}
        </Link>
        <div className="h-8 w-8 bg-muted border border-border flex items-center justify-center">
          <span className="text-xs font-mono font-bold">OP</span>
        </div>
      </div>
    </header>
  );
}

export function AppLayout({ children, onDisconnect }: { children: React.ReactNode; onDisconnect?: () => void }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDisconnect = React.useCallback(() => {
    if (!window.confirm("Disconnect from EcoSphere? You will return to the welcome screen.")) return;
    setMobileOpen(false);
    onDisconnect?.();
  }, [onDisconnect]);

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      {}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-sidebar-border bg-sidebar-primary/5">
          <div className="w-8 h-8 bg-primary rounded-none flex items-center justify-center border border-primary-border">
            <Hexagon className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight uppercase font-mono text-sidebar-foreground">EcoSphere</span>
        </div>
        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-4 text-xs font-mono text-sidebar-foreground/50 mb-4 uppercase tracking-wider">Modules</div>
          <NavLinks />
        </div>
        <div className="p-4 border-t border-sidebar-border">
          <DisconnectButton onDisconnect={handleDisconnect} />
        </div>
      </aside>

      {}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          {}
          <aside className="absolute left-0 top-0 h-full w-72 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-2xl">
            <div className="p-5 flex items-center justify-between border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-none flex items-center justify-center">
                  <Hexagon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg uppercase font-mono">EcoSphere</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1 text-sidebar-foreground/70 hover:text-sidebar-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-6">
              <div className="px-4 text-xs font-mono text-sidebar-foreground/50 mb-4 uppercase tracking-wider">Modules</div>
              <NavLinks onNav={() => setMobileOpen(false)} />
            </div>
            <div className="p-4 border-t border-sidebar-border">
              <DisconnectButton onDisconnect={handleDisconnect} />
            </div>
          </aside>
        </div>
      )}

      {}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

