import * as React from "react";
import {
  useGetSettings,
  useUpdateSettings,
  useListDepartments,
  useListCategories,
  useListEmployees,
  useCreateDepartment,
  useCreateCategory,
  useUpdateDepartment,
  useDeleteDepartment,
  useDeleteCategory,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Trash2, X } from "lucide-react";
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

export default function SettingsPage() {
  const { data: settings, isLoading: isSettingsLoading } = useGetSettings();
  const { data: departments } = useListDepartments();
  const { data: categories } = useListCategories();
  const { data: employees } = useListEmployees();

  const updateSettings = useUpdateSettings();
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();
  const deleteDepartment = useDeleteDepartment();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  
  const [weights, setWeights] = React.useState({ env: 40, social: 30, gov: 30 });
  React.useEffect(() => {
    if (settings) {
      setWeights({
        env: Math.round(Number(settings.environmentalWeight)) || 40,
        social: Math.round(Number(settings.socialWeight)) || 30,
        gov: Math.round(Number(settings.governanceWeight)) || 30,
      });
    }
  }, [settings]);

  
  const [showDeptModal, setShowDeptModal] = React.useState(false);
  const [showCatModal, setShowCatModal] = React.useState(false);
  const [deptForm, setDeptForm] = React.useState({ name: "", code: "", head: "", employeeCount: "0" });
  const [catForm, setCatForm] = React.useState({ name: "", type: "csr_activity" });

  const handleToggle = async (field: string, value: boolean) => {
    try {
      await updateSettings.mutateAsync({ data: { [field]: value } as any });
      queryClient.invalidateQueries();
      toast({ title: "Setting updated." });
    } catch {
      toast({ title: "Failed to save setting.", variant: "destructive" });
    }
  };

  const handleSaveWeights = async () => {
    const total = weights.env + weights.social + weights.gov;
    if (Math.abs(total - 100) > 1) {
      toast({ title: `Weights must sum to 100% (currently ${total}%)`, variant: "destructive" });
      return;
    }
    try {
      await updateSettings.mutateAsync({
        data: {
          environmentalWeight: weights.env,
          socialWeight: weights.social,
          governanceWeight: weights.gov,
        }
      } as any);
      queryClient.invalidateQueries();
      toast({ title: "Scoring weights saved." });
    } catch {
      toast({ title: "Failed to save weights.", variant: "destructive" });
    }
  };

  const handleCreateDept = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDepartment.mutateAsync({ data: {
        name: deptForm.name,
        code: deptForm.code,
        head: deptForm.head || undefined,
        employeeCount: Number(deptForm.employeeCount) || 0,
        status: "active",
      }});
      queryClient.invalidateQueries();
      setShowDeptModal(false);
      setDeptForm({ name: "", code: "", head: "", employeeCount: "0" });
      toast({ title: "Department created." });
    } catch {
      toast({ title: "Error creating department.", variant: "destructive" });
    }
  };

  const handleDeleteDept = async (id: number, name: string) => {
    if (!confirm(`Delete department "${name}"? This cannot be undone.`)) return;
    try {
      await deleteDepartment.mutateAsync({ id });
      queryClient.invalidateQueries();
      toast({ title: "Department deleted." });
    } catch {
      toast({ title: "Failed to delete department.", variant: "destructive" });
    }
  };

  const handleCreateCat = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory.mutateAsync({ data: { name: catForm.name, type: catForm.type as any, status: "active" } });
      queryClient.invalidateQueries();
      setShowCatModal(false);
      setCatForm({ name: "", type: "csr_activity" });
      toast({ title: "Category created." });
    } catch {
      toast({ title: "Error creating category.", variant: "destructive" });
    }
  };

  const handleDeleteCat = async (id: number, name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    try {
      await deleteCategory.mutateAsync({ id });
      queryClient.invalidateQueries();
      toast({ title: "Category deleted." });
    } catch {
      toast({ title: "Failed to delete.", variant: "destructive" });
    }
  };

  if (isSettingsLoading) {
    return <div className="space-y-4"><Skeleton className="h-[200px] w-full" /><Skeleton className="h-[400px] w-full" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase font-mono">System Config</h1>
        <p className="text-muted-foreground font-mono text-sm">Platform administration and ontology.</p>
      </div>

      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="font-mono uppercase text-xs w-full justify-start border-b rounded-none mb-6 overflow-x-auto flex-nowrap">
          <TabsTrigger value="platform">Platform Rules</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>

        {}
        <TabsContent value="platform" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono uppercase text-sm">Automation &amp; Validation</CardTitle>
                <CardDescription className="font-mono">Global behaviors for data entry.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: "autoEmissionCalculation", label: "Auto Carbon Calculation", desc: "Derive emissions automatically from linked factors." },
                  { key: "evidenceRequired", label: "Strict Evidence Mode", desc: "Require proof uploads for all CSR and challenge claims." },
                  { key: "badgeAutoAward", label: "Auto-Award Badges", desc: "Grant badges immediately when thresholds are met." },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <Label className="font-mono text-sm">{label}</Label>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <Switch
                      checked={!!(settings as any)?.[key]}
                      onCheckedChange={(v) => handleToggle(key, v)}
                      disabled={updateSettings.isPending}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-mono uppercase text-sm">ESG Score Weights</CardTitle>
                <CardDescription className="font-mono">Must sum to 100%. Changes affect overall ESG score formula.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "env" as const, label: "Environmental Weight", color: "bg-chart-1" },
                  { key: "social" as const, label: "Social Weight", color: "bg-chart-2" },
                  { key: "gov" as const, label: "Governance Weight", color: "bg-chart-3" },
                ].map(({ key, label, color }) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between">
                      <Label className="font-mono text-sm">{label}</Label>
                      <span className="font-mono text-sm font-bold">{weights[key]}%</span>
                    </div>
                    <Input
                      type="number" min="0" max="100"
                      value={weights[key]}
                      onChange={e => setWeights(w => ({ ...w, [key]: Number(e.target.value) }))}
                      className="font-mono text-sm h-8"
                    />
                    <div className="h-1.5 w-full bg-muted border border-border overflow-hidden">
                      <div className={`h-full ${color}`} style={{ width: `${weights[key]}%` }} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    Total: <span className={Math.abs(weights.env + weights.social + weights.gov - 100) > 1 ? "text-destructive font-bold" : "text-chart-1 font-bold"}>
                      {weights.env + weights.social + weights.gov}%
                    </span>
                  </span>
                  <Button size="sm" className="font-mono uppercase text-xs" onClick={handleSaveWeights} disabled={updateSettings.isPending}>
                    Save Weights
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono uppercase text-sm">Notification Settings</CardTitle>
              <CardDescription className="font-mono">Configure which events trigger in-app notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { key: "notifyComplianceIssue", label: "New Compliance Issue", desc: "Alert when a new compliance issue is raised or becomes overdue." },
                { key: "notifyCsrApproval", label: "CSR Activity Approval", desc: "Alert employees when their CSR participation is approved or rejected." },
                { key: "notifyChallengeApproval", label: "Challenge Approval", desc: "Notify employees when challenge submissions are reviewed." },
                { key: "notifyPolicyReminder", label: "Policy Acknowledgement Reminders", desc: "Remind employees of unacknowledged active policies." },
                { key: "notifyBadgeUnlock", label: "Badge Unlock", desc: "Notify employees when a new badge is automatically awarded." },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between gap-4 py-1 border-b border-border/40 last:border-0">
                  <div className="space-y-0.5">
                    <Label className="font-mono text-sm">{label}</Label>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <Switch
                    checked={!!(settings as any)?.[key]}
                    onCheckedChange={(v) => handleToggle(key, v)}
                    disabled={updateSettings.isPending}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {}
        <TabsContent value="departments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="font-mono uppercase text-sm">Department Management</CardTitle>
                <CardDescription className="font-mono">Organizational hierarchy and ESG ownership.</CardDescription>
              </div>
              <Button size="sm" className="font-mono uppercase text-xs" onClick={() => setShowDeptModal(true)}>
                <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add Department
              </Button>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Code</TableHead>
                    <TableHead className="hidden md:table-cell">Head</TableHead>
                    <TableHead className="text-right">Headcount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments?.map(d => (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium">{d.name}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground hidden sm:table-cell">{d.code}</TableCell>
                      <TableCell className="font-mono text-xs hidden md:table-cell">{d.head || "—"}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{d.employeeCount}</TableCell>
                      <TableCell>
                        <Badge variant={d.status === "active" ? "outline" : "secondary"} className="font-mono text-[10px] uppercase">{d.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive" onClick={() => handleDeleteDept(d.id, d.name)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!departments?.length) && (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-mono">No departments found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {}
        <TabsContent value="categories">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="font-mono uppercase text-sm">Category Ontology</CardTitle>
                <CardDescription className="font-mono">Shared categories for CSR activities and challenges.</CardDescription>
              </div>
              <Button size="sm" className="font-mono uppercase text-xs" onClick={() => setShowCatModal(true)}>
                <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add Category
              </Button>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories?.map(c => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono text-[10px]">{c.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={c.status === "active" ? "outline" : "secondary"} className="font-mono text-[10px] uppercase">{c.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" className="h-7 text-destructive hover:text-destructive" onClick={() => handleDeleteCat(c.id, c.name)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {}
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono uppercase text-sm">Employee Directory</CardTitle>
              <CardDescription className="font-mono">All registered employees and their ESG engagement stats.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">Department</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">XP</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees?.map(e => (
                    <TableRow key={e.id}>
                      <TableCell>
                        <div className="font-medium">{e.name}</div>
                        <div className="text-xs text-muted-foreground font-mono hidden sm:block">{e.email}</div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground hidden sm:table-cell">{e.role}</TableCell>
                      <TableCell className="font-mono text-xs hidden md:table-cell">{(e as any).departmentName || "—"}</TableCell>
                      <TableCell className="text-right font-mono text-sm hidden sm:table-cell">{e.xp?.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-chart-2 text-sm">{e.totalPoints?.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={e.status === "active" ? "outline" : "secondary"} className="font-mono text-[10px] uppercase">{e.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!employees?.length) && (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-mono">No employees found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {}
      <Modal open={showDeptModal} onClose={() => setShowDeptModal(false)} title="Add Department">
        <form onSubmit={handleCreateDept} className="space-y-4">
          <div className="space-y-1">
            <Label className="font-mono text-xs">Name *</Label>
            <Input value={deptForm.name} onChange={e => setDeptForm(f => ({ ...f, name: e.target.value }))} required className="font-mono text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Code *</Label>
            <Input value={deptForm.code} onChange={e => setDeptForm(f => ({ ...f, code: e.target.value }))} required className="font-mono text-sm" placeholder="e.g. ENG" />
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Department Head</Label>
            <Input value={deptForm.head} onChange={e => setDeptForm(f => ({ ...f, head: e.target.value }))} className="font-mono text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Employee Count</Label>
            <Input type="number" value={deptForm.employeeCount} onChange={e => setDeptForm(f => ({ ...f, employeeCount: e.target.value }))} className="font-mono text-sm" min="0" />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 font-mono uppercase text-xs" onClick={() => setShowDeptModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 font-mono uppercase text-xs" disabled={createDepartment.isPending}>
              {createDepartment.isPending ? "Creating…" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>

      {}
      <Modal open={showCatModal} onClose={() => setShowCatModal(false)} title="Add Category">
        <form onSubmit={handleCreateCat} className="space-y-4">
          <div className="space-y-1">
            <Label className="font-mono text-xs">Name *</Label>
            <Input value={catForm.name} onChange={e => setCatForm(f => ({ ...f, name: e.target.value }))} required className="font-mono text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="font-mono text-xs">Type *</Label>
            <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={catForm.type} onChange={e => setCatForm(f => ({ ...f, type: e.target.value }))}>
              <option value="csr_activity">CSR Activity</option>
              <option value="challenge">Challenge</option>
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 font-mono uppercase text-xs" onClick={() => setShowCatModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 font-mono uppercase text-xs" disabled={createCategory.isPending}>
              {createCategory.isPending ? "Creating…" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
