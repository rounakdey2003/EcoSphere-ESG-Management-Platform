import * as React from "react";
import {
  useGetSocialDashboard,
  useListCsrActivities,
  useListEmployeeParticipations,
  useUpdateEmployeeParticipation,
  useCreateCsrActivity,
  useCreateEmployeeParticipation,
  useListEmployees,
  useListCategories,
  useListDepartments,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Users, Activity, Clock, TrendingUp, PlusCircle, X } from "lucide-react";
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

export default function SocialModule() {
  const { data: dashboard, isLoading: isLoadingDash } = useGetSocialDashboard();
  const { data: activities, isLoading: isLoadingAct } = useListCsrActivities();
  const { data: participations } = useListEmployeeParticipations();
  const { data: employees } = useListEmployees();
  const { data: categories } = useListCategories();
  const { data: departments } = useListDepartments();
  const updateParticipation = useUpdateEmployeeParticipation();
  const createActivity = useCreateCsrActivity();
  const createParticipation = useCreateEmployeeParticipation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  
  const [showActivityModal, setShowActivityModal] = React.useState(false);
  const [showParticipationModal, setShowParticipationModal] = React.useState(false);
  const [activityForm, setActivityForm] = React.useState({ title: "", categoryId: "", departmentId: "", pointsAwarded: "50", startDate: "", endDate: "", description: "" });
  const [participationForm, setParticipationForm] = React.useState({ activityId: "", employeeId: "", proofUrl: "" });

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const handleApprove = async (id: number) => {
    try {
      await updateParticipation.mutateAsync({ id, data: { approvalStatus: "approved" } });
      queryClient.invalidateQueries();
      toast({ title: "Participation approved", description: "Points have been awarded to the employee." });
    } catch {
      toast({ title: "Error", description: "Failed to approve participation.", variant: "destructive" });
    }
  };

  const handleReject = async (id: number) => {
    try {
      await updateParticipation.mutateAsync({ id, data: { approvalStatus: "rejected" } });
      queryClient.invalidateQueries();
      toast({ title: "Participation rejected." });
    } catch {
      toast({ title: "Error", description: "Failed to reject participation.", variant: "destructive" });
    }
  };

  const approvalRate = dashboard?.totalParticipations
    ? Math.round(((dashboard.approvedParticipations || 0) / dashboard.totalParticipations) * 100)
    : 0;

  
  const genderData = dashboard?.genderDistribution || [];

  
  const deptData = (dashboard?.participationsByDepartment || []).filter(d => d.count > 0);

  const csrCategories = categories?.filter(c => c.type === "csr_activity") || [];

  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createActivity.mutateAsync({ data: {
        title: activityForm.title,
        description: activityForm.description || undefined,
        categoryId: Number(activityForm.categoryId),
        departmentId: activityForm.departmentId ? Number(activityForm.departmentId) : undefined,
        points: Number(activityForm.pointsAwarded) || 50,
        startDate: activityForm.startDate,
        endDate: activityForm.endDate || undefined,
        status: "active",
      }});
      queryClient.invalidateQueries();
      setShowActivityModal(false);
      setActivityForm({ title: "", categoryId: "", departmentId: "", pointsAwarded: "50", startDate: "", endDate: "", description: "" });
      toast({ title: "CSR Activity created." });
    } catch {
      toast({ title: "Error creating activity.", variant: "destructive" });
    }
  };

  const handleRecordParticipation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createParticipation.mutateAsync({ data: {
        activityId: Number(participationForm.activityId),
        employeeId: Number(participationForm.employeeId),
        proof: participationForm.proofUrl || undefined,
      }});
      queryClient.invalidateQueries();
      setShowParticipationModal(false);
      setParticipationForm({ activityId: "", employeeId: "", proofUrl: "" });
      toast({ title: "Participation recorded.", description: "Awaiting approval." });
    } catch {
      toast({ title: "Error recording participation.", variant: "destructive" });
    }
  };

  if (isLoadingDash || isLoadingAct) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase font-mono">Social Impact</h1>
          <p className="text-muted-foreground font-mono text-sm">CSR activities, employee engagement &amp; diversity.</p>
        </div>
        <div className="flex gap-2 flex-wrap self-start sm:self-auto">
          <Button variant="outline" size="sm" className="font-mono uppercase text-xs tracking-wider" onClick={() => setShowParticipationModal(true)}>
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Record Participation
          </Button>
          <Button size="sm" className="font-mono uppercase text-xs tracking-wider" onClick={() => setShowActivityModal(true)}>
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add CSR Activity
          </Button>
        </div>
      </div>

      {}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-chart-2 text-primary-foreground border-transparent">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 opacity-70" />
              <span className="text-xs font-mono uppercase opacity-80">Total Participations</span>
            </div>
            <div className="text-3xl font-bold font-mono">{dashboard?.totalParticipations || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono uppercase text-muted-foreground">Active CSR</span>
            </div>
            <div className="text-3xl font-bold font-mono">{dashboard?.activeCsrActivities || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-mono uppercase text-muted-foreground">Pending Approvals</span>
            </div>
            <div className="text-3xl font-bold font-mono text-amber-500">{dashboard?.pendingParticipations || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-chart-1" />
              <span className="text-xs font-mono uppercase text-muted-foreground">Approval Rate</span>
            </div>
            <div className="text-3xl font-bold font-mono text-chart-1">{approvalRate}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="font-mono uppercase text-xs w-full justify-start border-b rounded-none mb-6 overflow-x-auto flex-nowrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">CSR Activities</TabsTrigger>
          <TabsTrigger value="queue">Approval Queue</TabsTrigger>
          <TabsTrigger value="diversity">Diversity</TabsTrigger>
        </TabsList>

        {}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {}
            <Card>
              <CardHeader>
                <CardTitle className="font-mono uppercase text-sm">Participation by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={deptData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="departmentName" tick={{ fontSize: 10, fontFamily: "monospace" }} />
                    <YAxis tick={{ fontSize: 10, fontFamily: "monospace" }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 0, fontFamily: "monospace", fontSize: 11 }} />
                    <Bar dataKey="count" fill="hsl(var(--chart-2))" name="Participations" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {}
            <Card>
              <CardHeader>
                <CardTitle className="font-mono uppercase text-sm">Top Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(dashboard?.topParticipants || []).slice(0, 5).map((p, i) => (
                    <div key={p.employeeId} className="flex items-center justify-between py-1 border-b border-border/40 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground w-5">#{i + 1}</span>
                        <span className="text-sm font-medium">{p.employeeName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-muted-foreground">{p.participationCount} activities</span>
                        <Badge variant="outline" className="font-mono text-[10px]">+{p.pointsEarned} pts</Badge>
                      </div>
                    </div>
                  ))}
                  {(!dashboard?.topParticipants?.length) && (
                    <p className="text-sm text-muted-foreground font-mono text-center py-6">No data yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {}
        <TabsContent value="activities">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="font-mono uppercase text-sm">CSR Activity Directory</CardTitle>
                <CardDescription className="font-mono">All registered social impact programmes.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead className="hidden sm:table-cell">Department</TableHead>
                    <TableHead className="hidden md:table-cell">Points</TableHead>
                    <TableHead className="hidden lg:table-cell">Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Enrolled</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities?.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <div className="font-medium text-sm">{a.title}</div>
                        <div className="text-xs text-muted-foreground font-mono hidden sm:block">{a.categoryName}</div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground hidden sm:table-cell">{a.departmentName || "All"}</TableCell>
                      <TableCell className="font-mono text-xs hidden md:table-cell">{a.points} pts</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground hidden lg:table-cell">
                        {a.startDate ? format(new Date(a.startDate), "MMM d") : "—"} – {a.endDate ? format(new Date(a.endDate), "MMM d, yyyy") : "Ongoing"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={a.status === "active" ? "outline" : a.status === "completed" ? "secondary" : "destructive"} className="font-mono text-[10px] uppercase">
                          {a.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">{a.participantCount || 0}</TableCell>
                    </TableRow>
                  ))}
                  {(!activities?.length) && (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-mono">No activities found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {}
        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono uppercase text-sm">Submission Queue</CardTitle>
              <CardDescription className="font-mono">Review and approve employee participation submissions.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead className="hidden sm:table-cell">Activity</TableHead>
                    <TableHead className="hidden md:table-cell">Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participations?.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.employeeName}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground hidden sm:table-cell truncate max-w-[180px]">{p.activityTitle}</TableCell>
                      <TableCell className="font-mono text-xs hidden md:table-cell">{p.submittedAt ? format(new Date(p.submittedAt), "MMM dd, yyyy") : "N/A"}</TableCell>
                      <TableCell>
                        <Badge
                          className="font-mono text-[10px] uppercase"
                          variant={p.approvalStatus === "approved" ? "outline" : p.approvalStatus === "rejected" ? "destructive" : "secondary"}
                        >
                          {p.approvalStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {p.approvalStatus === "pending" && (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm" variant="outline"
                              className="h-7 text-xs font-mono border-destructive text-destructive hover:bg-destructive hover:text-white"
                              onClick={() => handleReject(p.id)}
                              disabled={updateParticipation.isPending}
                            >
                              <XCircle className="w-3 h-3 mr-1" /> Reject
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 text-xs font-mono bg-chart-1 hover:bg-chart-1/90 text-primary-foreground"
                              onClick={() => handleApprove(p.id)}
                              disabled={updateParticipation.isPending}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" /> Approve
                            </Button>
                          </div>
                        )}
                        {p.approvalStatus !== "pending" && (
                          <span className="text-xs text-muted-foreground font-mono">
                            {p.approvalStatus === "approved" ? `+${p.pointsEarned ?? 0} pts` : "—"}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!participations?.length) && (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground font-mono">Queue is empty.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {}
        <TabsContent value="diversity" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono uppercase text-sm">Gender Distribution</CardTitle>
                <CardDescription className="font-mono">Active workforce breakdown.</CardDescription>
              </CardHeader>
              <CardContent>
                {genderData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={genderData} dataKey="count" nameKey="gender" cx="50%" cy="50%" outerRadius={90} label={({ gender, percent }) => `${gender} ${Math.round((percent || 0) * 100)}%`} labelLine={false}>
                        {genderData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v: number, n: string) => [v, n]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 0, fontFamily: "monospace", fontSize: 11 }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-40 text-muted-foreground font-mono text-sm">No diversity data available.</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-mono uppercase text-sm">Workforce Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {genderData.map((g, i) => (
                    <div key={g.gender} className="space-y-1">
                      <div className="flex justify-between text-sm font-mono">
                        <span className="capitalize">{g.gender?.replace(/_/g, " ")}</span>
                        <span>{g.count} employees ({g.percent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-muted border border-border overflow-hidden">
                        <div className="h-full transition-all" style={{ width: `${g.percent}%`, background: COLORS[i % COLORS.length] }} />
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-border font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Employees</span>
                      <span className="font-bold">{employees?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {}
      <Modal open={showActivityModal} onClose={() => setShowActivityModal(false)} title="Add CSR Activity">
        <form onSubmit={handleCreateActivity} className="space-y-4">
          <div className="space-y-1">
            <Label className="font-mono text-xs">Title *</Label>
            <Input value={activityForm.title} onChange={e => setActivityForm(f => ({ ...f, title: e.target.value }))} required className="font-mono text-sm" placeholder="Tree Planting Drive" />
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Category</Label>
            <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={activityForm.categoryId} onChange={e => setActivityForm(f => ({ ...f, categoryId: e.target.value }))}>
              <option value="">None</option>
              {csrCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Department</Label>
            <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={activityForm.departmentId} onChange={e => setActivityForm(f => ({ ...f, departmentId: e.target.value }))}>
              <option value="">Org-wide</option>
              {departments?.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="font-mono text-xs">Points Awarded</Label>
              <Input type="number" min={0} value={activityForm.pointsAwarded} onChange={e => setActivityForm(f => ({ ...f, pointsAwarded: e.target.value }))} className="font-mono text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="font-mono text-xs">Start Date</Label>
              <Input type="date" value={activityForm.startDate} onChange={e => setActivityForm(f => ({ ...f, startDate: e.target.value }))} className="font-mono text-sm" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Description</Label>
            <Input value={activityForm.description} onChange={e => setActivityForm(f => ({ ...f, description: e.target.value }))} className="font-mono text-sm" placeholder="Optional description" />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 font-mono uppercase text-xs" onClick={() => setShowActivityModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 font-mono uppercase text-xs" disabled={createActivity.isPending}>
              {createActivity.isPending ? "Creating…" : "Create Activity"}
            </Button>
          </div>
        </form>
      </Modal>

      {}
      <Modal open={showParticipationModal} onClose={() => setShowParticipationModal(false)} title="Record Employee Participation">
        <form onSubmit={handleRecordParticipation} className="space-y-4">
          <div className="space-y-1">
            <Label className="font-mono text-xs">CSR Activity *</Label>
            <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={participationForm.activityId} onChange={e => setParticipationForm(f => ({ ...f, activityId: e.target.value }))} required>
              <option value="">Select activity…</option>
              {activities?.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Employee *</Label>
            <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={participationForm.employeeId} onChange={e => setParticipationForm(f => ({ ...f, employeeId: e.target.value }))} required>
              <option value="">Select employee…</option>
              {employees?.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Proof URL (optional)</Label>
            <Input value={participationForm.proofUrl} onChange={e => setParticipationForm(f => ({ ...f, proofUrl: e.target.value }))} className="font-mono text-sm" placeholder="https://..." />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 font-mono uppercase text-xs" onClick={() => setShowParticipationModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 font-mono uppercase text-xs" disabled={createParticipation.isPending}>
              {createParticipation.isPending ? "Saving…" : "Record Participation"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
