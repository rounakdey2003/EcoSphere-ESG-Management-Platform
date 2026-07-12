import * as React from "react";
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppLayout } from '@/components/layout/AppLayout';


import Dashboard from '@/pages/dashboard';
import EnvironmentalModule from '@/pages/environmental';
import SocialModule from '@/pages/social';
import GovernanceModule from '@/pages/governance';
import GamificationModule from '@/pages/gamification';
import ReportsPage from '@/pages/reports';
import SettingsPage from '@/pages/settings';
import NotificationsPage from '@/pages/notifications';
import WelcomePage from '@/pages/welcome';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
      <h1 className="text-4xl font-bold font-mono">404</h1>
      <p className="text-muted-foreground font-mono">Sector not found.</p>
    </div>
  );
}

function Router({ onDisconnect }: { onDisconnect: () => void }) {
  return (
    <AppLayout onDisconnect={onDisconnect}>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/environmental" component={EnvironmentalModule} />
        <Route path="/social" component={SocialModule} />
        <Route path="/governance" component={GovernanceModule} />
        <Route path="/gamification" component={GamificationModule} />
        <Route path="/reports" component={ReportsPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

const SESSION_KEY = "ecosphere_connected";

function App() {
  const [connected, setConnected] = React.useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );

  const handleConnect = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setConnected(true);
  };

  const handleDisconnect = () => {
    sessionStorage.removeItem(SESSION_KEY);
    queryClient.clear();
    setConnected(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {connected ? (
          <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '')}>
            <Router onDisconnect={handleDisconnect} />
          </WouterRouter>
        ) : (
          <WelcomePage onConnect={handleConnect} />
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;