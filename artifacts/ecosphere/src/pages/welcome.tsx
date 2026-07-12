import * as React from "react";
import { Hexagon, Zap, Leaf, ShieldCheck, Users, Award } from "lucide-react";

interface WelcomePageProps {
  onConnect: () => void;
}

export default function WelcomePage({ onConnect }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      {}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center space-y-8">
        {}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-primary flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20">
            <Hexagon className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-mono uppercase tracking-widest text-foreground">
              EcoSphere
            </h1>
            <p className="text-muted-foreground font-mono text-sm tracking-wider mt-1 uppercase">
              ESG Management Platform
            </p>
          </div>
        </div>

        {}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { icon: Leaf, label: "Environmental" },
            { icon: Users, label: "Social" },
            { icon: ShieldCheck, label: "Governance" },
            { icon: Award, label: "Gamification" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-border bg-card text-xs font-mono uppercase tracking-wider text-muted-foreground"
            >
              <Icon className="w-3 h-3" />
              {label}
            </div>
          ))}
        </div>

        {}
        <p className="text-muted-foreground font-mono text-sm leading-relaxed max-w-sm">
          Measure, manage and improve your organization's Environmental, Social
          and Governance performance — all in one unified dashboard.
        </p>

        {}
        <button
          onClick={onConnect}
          className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-all border border-primary/30 shadow-lg shadow-primary/20 hover:shadow-primary/40"
        >
          <Zap className="w-4 h-4 group-hover:animate-pulse" />
          Connect to EcoSphere
        </button>

        <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-wider">
          ESG · Carbon Accounting · Gamification · Compliance
        </p>
      </div>
    </div>
  );
}
