import * as React from "react";
import {
  useListNotifications,
  useMarkNotificationRead,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bell, ShieldAlert, CheckCircle2, Trophy, AlertTriangle, Info, MailCheck,
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const typeIcon: Record<string, React.ElementType> = {
  compliance_alert: ShieldAlert,
  challenge_approved: Trophy,
  challenge_pending: Info,
  participation_approved: CheckCircle2,
  participation_pending: Info,
  badge_awarded: Trophy,
  policy_reminder: MailCheck,
  system: Bell,
};

const typeBadgeVariant: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
  compliance_alert: "destructive",
  challenge_approved: "outline",
  participation_approved: "outline",
  badge_awarded: "outline",
  system: "secondary",
};

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useListNotifications();
  const markRead = useMarkNotificationRead();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [filter, setFilter] = React.useState<"all" | "unread">("all");

  const unreadCount = notifications?.filter(n => !n.isRead).length || 0;

  const filtered = React.useMemo(() => {
    const list = notifications || [];
    return filter === "unread" ? list.filter(n => !n.isRead) : list;
  }, [notifications, filter]);

  const handleMarkRead = async (id: number) => {
    try {
      await markRead.mutateAsync({ id });
      queryClient.invalidateQueries();
    } catch {
      toast({ title: "Failed to mark as read.", variant: "destructive" });
    }
  };

  const handleMarkAllRead = async () => {
    const unread = notifications?.filter(n => !n.isRead) || [];
    try {
      await Promise.all(unread.map(n => markRead.mutateAsync({ id: n.id })));
      queryClient.invalidateQueries();
      toast({ title: `Marked ${unread.length} notifications as read.` });
    } catch {
      toast({ title: "Failed to mark all as read.", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-20 w-full" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase font-mono">Notifications</h1>
          <p className="text-muted-foreground font-mono text-sm">
            {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount !== 1 ? "s" : ""}` : "All caught up."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            className="font-mono uppercase text-xs"
            onClick={() => setFilter("all")}
          >
            All ({notifications?.length || 0})
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            className="font-mono uppercase text-xs"
            onClick={() => setFilter("unread")}
          >
            Unread ({unreadCount})
          </Button>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="font-mono uppercase text-xs" onClick={handleMarkAllRead}>
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {}
      <div className="space-y-2">
        {filtered.map(n => {
          const Icon = typeIcon[n.type || "system"] || Bell;
          const isUnread = !n.isRead;
          return (
            <Card
              key={n.id}
              className={`transition-all border ${isUnread ? "border-primary/30 bg-primary/5" : "border-border bg-card"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 p-2 border shrink-0 ${isUnread ? "bg-primary/10 border-primary/20 text-primary" : "bg-muted border-border text-muted-foreground"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{n.title}</span>
                        {isUnread && (
                          <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                        )}
                        <Badge
                          variant={typeBadgeVariant[n.type || ""] || "secondary"}
                          className="font-mono text-[10px] uppercase"
                        >
                          {n.type?.replace(/_/g, " ")}
                        </Badge>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground shrink-0">
                        {n.createdAt ? format(new Date(n.createdAt), "MMM dd, HH:mm") : "—"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                  </div>
                  {isUnread && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs font-mono shrink-0 mt-0.5"
                      onClick={() => handleMarkRead(n.id)}
                      disabled={markRead.isPending}
                    >
                      <MailCheck className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
              <p className="font-mono text-sm text-muted-foreground">
                {filter === "unread" ? "No unread notifications." : "No notifications yet."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
