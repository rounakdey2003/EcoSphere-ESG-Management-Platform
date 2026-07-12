import * as React from "react";
import {
  useListChallenges,
  useGetLeaderboard,
  useListBadges,
  useListRewards,
  useCreateChallenge,
  useUpdateChallenge,
  useListEmployeeBadges,
  useRedeemReward,
  useListEmployees,
  useListCategories,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Medal, Target, Zap, Gift, PlusCircle, X, CheckCircle2, ShoppingCart } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-mono font-bold uppercase text-sm">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

const difficultyColor: Record<string, string> = {
  easy: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  hard: "bg-red-100 text-red-700 border-red-200",
};

const statusColor: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  active: "bg-chart-1/10 text-chart-1 border-chart-1/30",
  under_review: "bg-amber-100 text-amber-800",
  completed: "bg-blue-100 text-blue-800",
  archived: "bg-muted text-muted-foreground line-through",
};

const LIFECYCLE: string[] = ["draft", "active", "under_review", "completed"];

export default function GamificationModule() {
  const { data: challenges, isLoading: isLoadingChal } = useListChallenges();
  const { data: leaderboard, isLoading: isLoadingLead } = useGetLeaderboard();
  const { data: badges } = useListBadges();
  const { data: rewards } = useListRewards();
  const { data: employees } = useListEmployees();
  const { data: categories } = useListCategories();

  const createChallenge = useCreateChallenge();
  const updateChallenge = useUpdateChallenge();
  const redeemRewardMutation = useRedeemReward();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [showChallengeModal, setShowChallengeModal] = React.useState(false);
  const [showRedeemModal, setShowRedeemModal] = React.useState<number | null>(null);
  const [redeemEmpId, setRedeemEmpId] = React.useState("");
  const [challengeForm, setChallengeForm] = React.useState({
    title: "", description: "", categoryId: "", xp: "200", difficulty: "medium", evidenceRequired: false, deadline: "",
  });

  const handleCreateChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createChallenge.mutateAsync({ data: {
        title: challengeForm.title,
        description: challengeForm.description,
        categoryId: Number(challengeForm.categoryId),
        xp: Number(challengeForm.xp),
        difficulty: challengeForm.difficulty as any,
        evidenceRequired: challengeForm.evidenceRequired,
        deadline: challengeForm.deadline || undefined,
        status: "draft",
      }});
      queryClient.invalidateQueries();
      setShowChallengeModal(false);
      setChallengeForm({ title: "", description: "", categoryId: "", xp: "200", difficulty: "medium", evidenceRequired: false, deadline: "" });
      toast({ title: "Challenge created as Draft.", description: "Activate it to make it visible to employees." });
    } catch {
      toast({ title: "Error creating challenge.", variant: "destructive" });
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateChallenge.mutateAsync({ id, data: { status: newStatus as any } });
      queryClient.invalidateQueries();
      toast({ title: `Challenge moved to "${newStatus}".` });
    } catch {
      toast({ title: "Failed to update status.", variant: "destructive" });
    }
  };

  const handleRedeem = async (rewardId: number) => {
    if (!redeemEmpId) { toast({ title: "Select an employee.", variant: "destructive" }); return; }
    try {
      await redeemRewardMutation.mutateAsync({ data: { employeeId: Number(redeemEmpId), rewardId } });
      queryClient.invalidateQueries();
      setShowRedeemModal(null);
      setRedeemEmpId("");
      toast({ title: "Reward redeemed!", description: "Points have been deducted from the employee's balance." });
    } catch (err: any) {
      toast({ title: "Redemption failed.", description: err?.message || "Check stock and point balance.", variant: "destructive" });
    }
  };

  const selectedReward = rewards?.find(r => r.id === showRedeemModal);
  const challengeCategories = categories?.filter(c => c.type === "challenge") || [];

  if (isLoadingChal || isLoadingLead) {
    return <div className="space-y-4"><Skeleton className="h-[200px] w-full" /><Skeleton className="h-[400px] w-full" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase font-mono">Employee Gamification</h1>
          <p className="text-muted-foreground font-mono text-sm">Challenges, XP, badges, and rewards.</p>
        </div>
        <Button className="font-mono uppercase text-xs tracking-wider self-start sm:self-auto" onClick={() => setShowChallengeModal(true)}>
          <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Create Challenge
        </Button>
      </div>

      {}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-chart-5 to-chart-1 text-primary-foreground border-transparent">
          <CardContent className="pt-5 pb-4 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-300 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-mono uppercase opacity-80">Top Employee</div>
              <div className="text-lg font-bold truncate">{leaderboard?.[0]?.employeeName || "—"}</div>
              <div className="text-xs font-mono opacity-70">{leaderboard?.[0]?.xp?.toLocaleString() || 0} XP</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4 flex items-center gap-3">
            <Target className="w-8 h-8 text-chart-4 shrink-0" />
            <div>
              <div className="text-xs font-mono uppercase text-muted-foreground">Active Challenges</div>
              <div className="text-3xl font-bold font-mono">{challenges?.filter(c => c.status === "active").length || 0}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4 flex items-center gap-3">
            <Medal className="w-8 h-8 text-chart-2 shrink-0" />
            <div>
              <div className="text-xs font-mono uppercase text-muted-foreground">Available Badges</div>
              <div className="text-3xl font-bold font-mono">{badges?.length || 0}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4 flex items-center gap-3">
            <Gift className="w-8 h-8 text-chart-3 shrink-0" />
            <div>
              <div className="text-xs font-mono uppercase text-muted-foreground">Active Rewards</div>
              <div className="text-3xl font-bold font-mono">{rewards?.filter(r => r.status === "active").length || 0}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="font-mono uppercase text-xs w-full justify-start border-b rounded-none mb-6 overflow-x-auto flex-nowrap">
          <TabsTrigger value="challenges">Campaigns</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="badges">Badge Catalog</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        {}
        <TabsContent value="challenges">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono uppercase text-sm">Challenge Campaigns</CardTitle>
              <CardDescription className="font-mono">Full lifecycle: Draft → Active → Under Review → Completed</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Challenge</TableHead>
                    <TableHead className="hidden sm:table-cell">Difficulty</TableHead>
                    <TableHead className="hidden md:table-cell">XP</TableHead>
                    <TableHead className="hidden lg:table-cell">Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Advance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {challenges?.map((c) => {
                    const currentIdx = LIFECYCLE.indexOf(c.status);
                    const nextStatus = currentIdx >= 0 && currentIdx < LIFECYCLE.length - 1 ? LIFECYCLE[currentIdx + 1] : null;
                    return (
                      <TableRow key={c.id}>
                        <TableCell>
                          <div className="font-medium text-sm">{c.title}</div>
                          <div className="text-xs text-muted-foreground hidden sm:block">{c.description}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className={cn("px-2 py-0.5 text-[10px] font-mono font-bold uppercase border", difficultyColor[c.difficulty || "easy"])}>
                            {c.difficulty}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-xs hidden md:table-cell text-chart-2">+{c.xp} XP</TableCell>
                        <TableCell className="font-mono text-xs hidden lg:table-cell">{c.deadline ? format(new Date(c.deadline), "MMM dd, yyyy") : "—"}</TableCell>
                        <TableCell>
                          <span className={cn("px-2 py-0.5 text-[10px] font-mono font-bold uppercase", statusColor[c.status] || "bg-muted text-muted-foreground")}>
                            {c.status?.replace("_", " ")}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {nextStatus && (
                            <Button size="sm" variant="outline" className="h-7 text-[10px] font-mono uppercase" onClick={() => handleStatusChange(c.id, nextStatus)}>
                              → {nextStatus.replace("_", " ")}
                            </Button>
                          )}
                          {c.status === "completed" && (
                            <Button size="sm" variant="ghost" className="h-7 text-[10px] font-mono text-muted-foreground" onClick={() => handleStatusChange(c.id, "archived")}>
                              Archive
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {(!challenges?.length) && (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-mono">No challenges found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {}
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono uppercase text-sm">Global XP Leaderboard</CardTitle>
              <CardDescription className="font-mono">Ranked by total XP earned from challenges.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead className="hidden sm:table-cell">Department</TableHead>
                    <TableHead className="hidden md:table-cell text-right">Badges</TableHead>
                    <TableHead className="hidden md:table-cell text-right">Challenges</TableHead>
                    <TableHead className="text-right">Total XP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard?.map((entry, i) => (
                    <TableRow key={entry.employeeId} className={i < 3 ? "bg-muted/30" : ""}>
                      <TableCell className="font-mono font-bold">
                        {i === 0 ? <span className="text-yellow-500 text-lg">#1</span> :
                          i === 1 ? <span className="text-slate-400 text-lg">#2</span> :
                            i === 2 ? <span className="text-amber-600 text-lg">#3</span> :
                              `#${entry.rank}`}
                      </TableCell>
                      <TableCell className="font-medium">{entry.employeeName}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground hidden sm:table-cell">{entry.departmentName}</TableCell>
                      <TableCell className="text-right font-mono hidden md:table-cell">{entry.badgeCount}</TableCell>
                      <TableCell className="text-right font-mono hidden md:table-cell">{entry.challengeCount}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-chart-2">{entry.xp?.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  {(!leaderboard?.length) && (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-mono">No leaderboard data.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {}
        <TabsContent value="badges">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {badges?.map(badge => (
              <Card key={badge.id} className="text-center p-4 hover:border-chart-2 transition-colors cursor-pointer group">
                <div className="text-4xl mb-3 mx-auto w-14 h-14 bg-muted flex items-center justify-center border border-border group-hover:bg-chart-2/10 transition-colors">
                  {badge.icon}
                </div>
                <h3 className="font-bold text-sm leading-tight mb-1">{badge.name}</h3>
                <p className="text-[10px] text-muted-foreground font-mono leading-tight">{badge.description}</p>
                <p className="text-[10px] text-chart-1 font-mono mt-1 font-bold">{badge.unlockValue} {badge.unlockType}</p>
              </Card>
            ))}
            {(!badges?.length) && (
              <div className="col-span-full text-center py-12 text-muted-foreground font-mono">No badges configured.</div>
            )}
          </div>
        </TabsContent>

        {}
        <TabsContent value="rewards">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rewards?.map(reward => (
              <Card key={reward.id} className={cn("flex flex-col", reward.status !== "active" || reward.stock === 0 ? "opacity-60" : "")}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base font-bold">{reward.name}</CardTitle>
                      <CardDescription className="text-xs font-mono mt-0.5">{reward.description}</CardDescription>
                    </div>
                    <Gift className="w-5 h-5 text-chart-3 shrink-0 mt-0.5" />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between gap-3">
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span className="text-muted-foreground">Cost</span>
                    <span className="font-bold text-chart-2">{reward.pointsRequired?.toLocaleString()} pts</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-muted-foreground">Stock</span>
                    <span className={cn(reward.stock === 0 ? "text-destructive" : "text-foreground")}>{reward.stock} left</span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full font-mono uppercase text-xs mt-2"
                    disabled={reward.status !== "active" || reward.stock === 0}
                    onClick={() => { setShowRedeemModal(reward.id); setRedeemEmpId(""); }}
                  >
                    <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                    {reward.stock === 0 ? "Out of Stock" : "Redeem"}
                  </Button>
                </CardContent>
              </Card>
            ))}
            {(!rewards?.length) && (
              <div className="col-span-full text-center py-12 text-muted-foreground font-mono">No rewards configured.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {}
      <Modal open={showChallengeModal} onClose={() => setShowChallengeModal(false)} title="Create Challenge">
        <form onSubmit={handleCreateChallenge} className="space-y-4">
          <div className="space-y-1">
            <Label className="font-mono text-xs">Title *</Label>
            <Input value={challengeForm.title} onChange={e => setChallengeForm(f => ({ ...f, title: e.target.value }))} required className="font-mono text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Description</Label>
            <Input value={challengeForm.description} onChange={e => setChallengeForm(f => ({ ...f, description: e.target.value }))} className="font-mono text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="font-mono text-xs">XP Reward</Label>
              <Input type="number" value={challengeForm.xp} onChange={e => setChallengeForm(f => ({ ...f, xp: e.target.value }))} className="font-mono text-sm" min="0" />
            </div>
            <div className="space-y-1">
              <Label className="font-mono text-xs">Difficulty</Label>
              <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={challengeForm.difficulty} onChange={e => setChallengeForm(f => ({ ...f, difficulty: e.target.value }))}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Category</Label>
            <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={challengeForm.categoryId} onChange={e => setChallengeForm(f => ({ ...f, categoryId: e.target.value }))}>
              <option value="">None</option>
              {challengeCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Deadline</Label>
            <Input type="date" value={challengeForm.deadline} onChange={e => setChallengeForm(f => ({ ...f, deadline: e.target.value }))} className="font-mono text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="evidence" checked={challengeForm.evidenceRequired} onChange={e => setChallengeForm(f => ({ ...f, evidenceRequired: e.target.checked }))} className="w-4 h-4" />
            <Label htmlFor="evidence" className="font-mono text-xs cursor-pointer">Evidence/Proof Required</Label>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 font-mono uppercase text-xs" onClick={() => setShowChallengeModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 font-mono uppercase text-xs" disabled={createChallenge.isPending}>
              {createChallenge.isPending ? "Creating…" : "Create Draft"}
            </Button>
          </div>
        </form>
      </Modal>

      {}
      <Modal open={showRedeemModal !== null} onClose={() => setShowRedeemModal(null)} title="Redeem Reward">
        <div className="space-y-4">
          <div className="p-3 bg-muted border border-border">
            <div className="font-bold text-sm">{selectedReward?.name}</div>
            <div className="font-mono text-xs text-muted-foreground">{selectedReward?.description}</div>
            <div className="font-mono text-sm mt-1 font-bold text-chart-2">{selectedReward?.pointsRequired?.toLocaleString()} points</div>
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Select Employee *</Label>
            <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={redeemEmpId} onChange={e => setRedeemEmpId(e.target.value)}>
              <option value="">Choose employee…</option>
              {employees?.map(e => (
                <option key={e.id} value={e.id}>{e.name} ({e.totalPoints?.toLocaleString()} pts available)</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 font-mono uppercase text-xs" onClick={() => setShowRedeemModal(null)}>Cancel</Button>
            <Button className="flex-1 font-mono uppercase text-xs" disabled={!redeemEmpId || redeemRewardMutation.isPending} onClick={() => showRedeemModal !== null && handleRedeem(showRedeemModal)}>
              {redeemRewardMutation.isPending ? "Redeeming…" : "Confirm Redemption"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
