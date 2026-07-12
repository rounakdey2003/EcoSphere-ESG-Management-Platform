import * as React from "react";
import {
  useGetGovernanceDashboard,
  useListEsgPolicies,
  useListComplianceIssues,
  useListAudits,
  useCreateAudit,
  useCreateComplianceIssue,
  useUpdateComplianceIssue,
  useListDepartments,
  useListEmployees,
  useCreatePolicyAcknowledgement,
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
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { AlertTriangle, ShieldAlert, ShieldCheck, CheckCircle2, PlusCircle, X } from "lucide-react";
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

export default function GovernanceModule() {
  const { data: dashboard, isLoading: isLoadingDash } = useGetGovernanceDashboard();
  const { data: policies } = useListEsgPolicies();
  const { data: issues } = useListComplianceIssues();
  const { data: audits } = useListAudits();
  const { data: departments } = useListDepartments();
  const { data: employees } = useListEmployees();

  const createAudit = useCreateAudit();
  const createIssue = useCreateComplianceIssue();
  const updateIssue = useUpdateComplianceIssue();
  const createAck = useCreatePolicyAcknowledgement();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [showAuditModal, setShowAuditModal] = React.useState(false);
  const [showIssueModal, setShowIssueModal] = React.useState(false);
  const [ackModal, setAckModal] = React.useState<{ policyId: number; policyTitle: string } | null>(null);
  const [ackEmployeeId, setAckEmployeeId] = React.useState("");

  const [auditForm, setAuditForm] = React.useState({ title: "", auditor: "", departmentId: "", auditDate: "", description: "" });
  const [issueForm, setIssueForm] = React.useState({ auditId: "", severity: "medium", description: "", ownerId: "", dueDate: "" });

  const handleCreateAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAudit.mutateAsync({ data: {
        title: auditForm.title,
        auditor: auditForm.auditor,
        departmentId: auditForm.departmentId ? Number(auditForm.departmentId) : undefined,
        auditDate: auditForm.auditDate,
        description: auditForm.description || undefined,
        status: "scheduled",
      }});
      queryClient.invalidateQueries();
      setShowAuditModal(false);
      setAuditForm({ title: "", auditor: "", departmentId: "", auditDate: "", description: "" });
      toast({ title: "Audit created successfully." });
    } catch {
      toast({ title: "Error creating audit.", variant: "destructive" });
    }
  };

  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createIssue.mutateAsync({ data: {
        auditId: Number(issueForm.auditId),
        severity: issueForm.severity as any,
        description: issueForm.description,
        ownerId: Number(issueForm.ownerId),
        dueDate: issueForm.dueDate,
        status: "open",
      }});
      queryClient.invalidateQueries();
      setShowIssueModal(false);
      setIssueForm({ auditId: "", severity: "medium", description: "", ownerId: "", dueDate: "" });
      toast({ title: "Compliance issue reported." });
    } catch {
      toast({ title: "Error creating issue.", variant: "destructive" });
    }
  };

  const handleResolveIssue = async (id: number) => {
    try {
      await updateIssue.mutateAsync({ id, data: { status: "resolved" } });
      queryClient.invalidateQueries();
      toast({ title: "Issue marked as resolved." });
    } catch {
      toast({ title: "Failed to update issue.", variant: "destructive" });
    }
  };

  const handleAcknowledge = async () => {
    if (!ackModal || !ackEmployeeId) {
      toast({ title: "Select an employee.", variant: "destructive" }); return;
    }
    try {
      await createAck.mutateAsync({ data: { policyId: ackModal.policyId, employeeId: Number(ackEmployeeId) } });
      queryClient.invalidateQueries();
      setAckModal(null); setAckEmployeeId("");
      toast({ title: "Policy acknowledged.", description: `${ackModal.policyTitle} acknowledged successfully.` });
    } catch (err: any) {
      toast({ title: "Acknowledgement failed.", description: err?.message || "May already be acknowledged.", variant: "destructive" });
    }
  };

  if (isLoadingDash) {
    return <div className="space-y-4"><Skeleton className="h-[100px] w-full" /><Skeleton className="h-[400px] w-full" /></div>;
  }

  const severityColor: Record<string, string> = {
    critical: "bg-red-600 text-white",
    high: "bg-orange-500 text-white",
    medium: "bg-amber-400 text-black",
    low: "bg-blue-400 text-white",
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase font-mono">Governance Control</h1>
          <p className="text-muted-foreground font-mono text-sm">Policies, audits, and compliance tracking.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="font-mono uppercase text-xs tracking-wider border-destructive text-destructive hover:bg-destructive hover:text-white text-xs" onClick={() => setShowIssueModal(true)}>
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" /> Report Issue
          </Button>
          <Button className="font-mono uppercase text-xs tracking-wider text-xs" onClick={() => setShowAuditModal(true)}>
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> New Audit
          </Button>
        </div>
      </div>

      {}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className={cn(dashboard?.overdueComplianceIssues ? "bg-destructive text-destructive-foreground border-transparent" : "")}>
          <CardContent className="pt-5 pb-4">
            <div className="text-xs font-mono uppercase opacity-80 mb-1">Overdue Issues</div>
            <div className="text-3xl font-bold font-mono flex items-center gap-2">
              {dashboard?.overdueComplianceIssues || 0}
              {!!dashboard?.overdueComplianceIssues && <ShieldAlert className="w-5 h-5" />}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="text-xs font-mono uppercase text-muted-foreground mb-1">Open Issues</div>
            <div className="text-3xl font-bold font-mono text-destructive">{dashboard?.openComplianceIssues || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="text-xs font-mono uppercase text-muted-foreground mb-1">Active Policies</div>
            <div className="text-3xl font-bold font-mono">{dashboard?.activePolicies || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="text-xs font-mono uppercase text-muted-foreground mb-1">Ack. Rate</div>
            <div className="text-3xl font-bold font-mono text-chart-1">{dashboard?.acknowledgementRate || 0}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="font-mono uppercase text-xs w-full justify-start border-b rounded-none mb-6 overflow-x-auto flex-nowrap">
          <TabsTrigger value="issues">Compliance Issues</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {}
        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono uppercase text-sm">Compliance Issue Tracker</CardTitle>
              <CardDescription className="font-mono">Issues that pass their due date while open are flagged as overdue.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="hidden sm:table-cell">Owner</TableHead>
                    <TableHead className="hidden md:table-cell">Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issues?.map((issue) => (
                    <TableRow key={issue.id} className={cn(issue.isOverdue && issue.status !== "resolved" ? "bg-destructive/5 border-l-2 border-l-destructive" : "")}>
                      <TableCell>
                        <span className={cn("px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-none", severityColor[issue.severity] || "bg-muted")}>
                          {issue.severity}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <div className="text-sm truncate">{issue.description}</div>
                        {issue.isOverdue && issue.status !== "resolved" && (
                          <div className="text-[10px] text-destructive font-mono flex items-center gap-1 mt-0.5">
                            <AlertTriangle className="w-3 h-3" /> OVERDUE
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground hidden sm:table-cell">{issue.ownerName || "Unassigned"}</TableCell>
                      <TableCell className="font-mono text-xs hidden md:table-cell">{issue.dueDate ? format(new Date(issue.dueDate), "MMM dd, yyyy") : "—"}</TableCell>
                      <TableCell>
                        <Badge variant={issue.status === "resolved" ? "outline" : issue.status === "open" ? "destructive" : "secondary"} className="font-mono text-[10px] uppercase">
                          {issue.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {issue.status !== "resolved" && (
                          <Button size="sm" variant="ghost" className="h-7 text-xs font-mono" onClick={() => handleResolveIssue(issue.id)}>
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Resolve
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!issues?.length) && (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-mono">No compliance issues found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {}
        <TabsContent value="audits">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="font-mono uppercase text-sm">Audit Registry</CardTitle>
                <CardDescription className="font-mono">Scheduled and completed governance audits.</CardDescription>
              </div>
              <Button size="sm" className="font-mono uppercase text-xs" onClick={() => setShowAuditModal(true)}>
                <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> New Audit
              </Button>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Audit</TableHead>
                    <TableHead className="hidden sm:table-cell">Auditor</TableHead>
                    <TableHead className="hidden md:table-cell">Department</TableHead>
                    <TableHead className="hidden lg:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Issues</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audits?.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <div className="font-medium text-sm">{a.title}</div>
                        <div className="text-xs text-muted-foreground font-mono hidden sm:block">{a.description}</div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground hidden sm:table-cell">{a.auditor}</TableCell>
                      <TableCell className="font-mono text-xs hidden md:table-cell">{a.departmentName || "Org-wide"}</TableCell>
                      <TableCell className="font-mono text-xs hidden lg:table-cell">{a.auditDate ? format(new Date(a.auditDate), "MMM dd, yyyy") : "—"}</TableCell>
                      <TableCell>
                        <Badge variant={a.status === "completed" ? "outline" : a.status === "in_progress" ? "secondary" : "default"} className="font-mono text-[10px] uppercase">
                          {a.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">{a.issueCount || 0}</TableCell>
                    </TableRow>
                  ))}
                  {(!audits?.length) && (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-mono">No audits found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {}
        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono uppercase text-sm">ESG Policy Library</CardTitle>
              <CardDescription className="font-mono">Policy acknowledgement tracking across the workforce.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy</TableHead>
                    <TableHead className="hidden sm:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Effective</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Acknowledgements</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policies?.map((p) => {
                    const ackPct = p.totalEmployees ? Math.round(((p.acknowledgementCount || 0) / p.totalEmployees) * 100) : 0;
                    return (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div className="font-medium text-sm">{p.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1 hidden sm:block">{p.description}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="secondary" className="font-mono text-[10px] uppercase">{p.category}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs hidden md:table-cell">{p.effectiveDate ? format(new Date(p.effectiveDate), "MMM yyyy") : "—"}</TableCell>
                        <TableCell>
                          <Badge variant={p.status === "active" ? "outline" : "secondary"} className="font-mono text-[10px] uppercase">{p.status}</Badge>
                        </TableCell>
                      <TableCell className="text-right">
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-mono text-xs">{p.acknowledgementCount || 0} / {p.totalEmployees || 0}</span>
                            <div className="w-20 h-1.5 bg-muted border border-border overflow-hidden">
                              <div className="h-full bg-chart-1" style={{ width: `${ackPct}%` }} />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {p.status === "active" && (
                            <Button size="sm" variant="outline" className="h-7 text-xs font-mono" onClick={() => setAckModal({ policyId: p.id, policyTitle: p.title })}>
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Acknowledge
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {(!policies?.length) && (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground font-mono">No policies found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono uppercase text-sm">Issues by Severity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dashboard?.issuesBySeverity || []} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="severity" tick={{ fontSize: 10, fontFamily: "monospace" }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fontFamily: "monospace" }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 0, fontFamily: "monospace", fontSize: 11 }} />
                    <Bar dataKey="count" fill="hsl(var(--destructive))" name="Issues" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-mono uppercase text-sm">Recent Audits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(dashboard?.recentAudits || []).slice(0, 5).map((a) => (
                    <div key={a.id} className="flex items-start justify-between gap-2 py-2 border-b border-border/40 last:border-0">
                      <div>
                        <div className="text-sm font-medium">{a.title}</div>
                        <div className="text-xs text-muted-foreground font-mono">{a.departmentName} · {a.auditDate ? format(new Date(a.auditDate), "MMM dd, yyyy") : "—"}</div>
                      </div>
                      <Badge variant={a.status === "completed" ? "outline" : "secondary"} className="font-mono text-[10px] uppercase shrink-0">{a.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {}
      <Modal open={showAuditModal} onClose={() => setShowAuditModal(false)} title="Create New Audit">
        <form onSubmit={handleCreateAudit} className="space-y-4">
          <div className="space-y-1">
            <Label className="font-mono text-xs">Audit Title *</Label>
            <Input value={auditForm.title} onChange={e => setAuditForm(f => ({ ...f, title: e.target.value }))} required className="font-mono text-sm" placeholder="e.g. Q3 Environmental Audit" />
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Auditor *</Label>
            <Input value={auditForm.auditor} onChange={e => setAuditForm(f => ({ ...f, auditor: e.target.value }))} required className="font-mono text-sm" placeholder="e.g. EY Sustainability" />
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Department</Label>
            <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={auditForm.departmentId} onChange={e => setAuditForm(f => ({ ...f, departmentId: e.target.value }))}>
              <option value="">Org-wide</option>
              {departments?.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Audit Date *</Label>
            <Input type="date" value={auditForm.auditDate} onChange={e => setAuditForm(f => ({ ...f, auditDate: e.target.value }))} required className="font-mono text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Description</Label>
            <Input value={auditForm.description} onChange={e => setAuditForm(f => ({ ...f, description: e.target.value }))} className="font-mono text-sm" />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 font-mono uppercase text-xs" onClick={() => setShowAuditModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 font-mono uppercase text-xs" disabled={createAudit.isPending}>
              {createAudit.isPending ? "Creating…" : "Create Audit"}
            </Button>
          </div>
        </form>
      </Modal>

      {}
      <Modal open={showIssueModal} onClose={() => setShowIssueModal(false)} title="Report Compliance Issue">
        <form onSubmit={handleCreateIssue} className="space-y-4">
          <div className="space-y-1">
            <Label className="font-mono text-xs">Audit *</Label>
            <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={issueForm.auditId} onChange={e => setIssueForm(f => ({ ...f, auditId: e.target.value }))} required>
              <option value="">Select audit…</option>
              {audits?.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Severity *</Label>
            <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={issueForm.severity} onChange={e => setIssueForm(f => ({ ...f, severity: e.target.value }))}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Description *</Label>
            <Input value={issueForm.description} onChange={e => setIssueForm(f => ({ ...f, description: e.target.value }))} required className="font-mono text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Assign Owner *</Label>
            <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={issueForm.ownerId} onChange={e => setIssueForm(f => ({ ...f, ownerId: e.target.value }))} required>
              <option value="">Select employee…</option>
              {employees?.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Due Date *</Label>
            <Input type="date" value={issueForm.dueDate} onChange={e => setIssueForm(f => ({ ...f, dueDate: e.target.value }))} required className="font-mono text-sm" />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 font-mono uppercase text-xs" onClick={() => setShowIssueModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 font-mono uppercase text-xs" disabled={createIssue.isPending}>
              {createIssue.isPending ? "Reporting…" : "Report Issue"}
            </Button>
          </div>
        </form>
      </Modal>

      {}
      <Modal open={!!ackModal} onClose={() => { setAckModal(null); setAckEmployeeId(""); }} title={`Acknowledge: ${ackModal?.policyTitle || ""}`}>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground font-mono">Select the employee who is acknowledging this policy.</p>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Employee *</Label>
            <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={ackEmployeeId} onChange={e => setAckEmployeeId(e.target.value)}>
              <option value="">Select employee…</option>
              {employees?.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 font-mono uppercase text-xs" onClick={() => { setAckModal(null); setAckEmployeeId(""); }}>Cancel</Button>
            <Button type="button" className="flex-1 font-mono uppercase text-xs" disabled={createAck.isPending || !ackEmployeeId} onClick={handleAcknowledge}>
              {createAck.isPending ? "Saving…" : "Confirm Acknowledgement"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
