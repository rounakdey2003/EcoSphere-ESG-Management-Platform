import * as React from "react";
import {
  useGetEsgSummaryReport,
  useGetEnvironmentalReport,
  useGetSocialReport,
  useGetGovernanceReport,
  useListDepartments,
  useListEmployees,
  useListChallenges,
  useListCategories,
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, FileText, Printer, Filter, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from "recharts";
import { useToast } from "@/hooks/use-toast";


function escapeCSV(val: unknown): string {
  const str = val === null || val === undefined ? "" : String(val);
  // Always quote fields — handles commas, newlines, quotes
  return `"${str.replace(/"/g, '""')}"`;
}

function useDownloadCSV() {
  const { toast } = useToast();
  return (filename: string, rows: Record<string, unknown>[]) => {
    if (!rows || rows.length === 0) {
      toast({ title: "No data to export", description: "Add some records first, then export.", variant: "destructive" });
      return;
    }
    const keys = Object.keys(rows[0]);
    const csv = [
      keys.map(k => escapeCSV(k)).join(","),
      ...rows.map(r => keys.map(k => escapeCSV(r[k])).join(",")),
    ].join("\n");
    // UTF-8 BOM so Excel opens correctly
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
}

// ── Print helper ──────────────────────────────────────────────────────────────
function handlePrint() { window.print(); }

export default function ReportsPage() {
  const downloadCSV = useDownloadCSV();
  // Filters for custom report builder
  const [filters, setFilters] = React.useState({
    startDate: "", endDate: "", departmentId: "", module: "all",
  });

  const reportParams = {
    startDate: filters.startDate || undefined,
    endDate: filters.endDate || undefined,
  };

  const { data: esgReport, isLoading: isEsgLoading } = useGetEsgSummaryReport({});
  const { data: envReport, isLoading: isEnvLoading } = useGetEnvironmentalReport(reportParams);
  const { data: socialReport, isLoading: isSocialLoading } = useGetSocialReport(reportParams);
  const { data: govReport, isLoading: isGovLoading } = useGetGovernanceReport(reportParams);
  const { data: departments } = useListDepartments();
  const { data: employees } = useListEmployees();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase font-mono">Data Reports</h1>
          <p className="text-muted-foreground font-mono text-sm">Exportable ESG disclosures and audits.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="font-mono uppercase text-xs tracking-wider" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
          <Button className="font-mono uppercase text-xs tracking-wider" onClick={() =>
            downloadCSV("esg-summary.csv", (esgReport?.departmentRankings || []) as any[])
          }>
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      <Tabs defaultValue="esg-summary" className="w-full">
        <TabsList className="font-mono uppercase text-xs w-full justify-start border-b rounded-none mb-6 overflow-x-auto flex-nowrap">
          <TabsTrigger value="esg-summary">ESG Summary</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="custom">Custom Builder</TabsTrigger>
        </TabsList>

        {/* ── ESG Summary ── */}
        <TabsContent value="esg-summary">
          {isEsgLoading ? <Skeleton className="h-[400px] w-full" /> : (
            <div className="space-y-6">
              <Card>
                <CardHeader className="border-b border-border/50 flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="font-mono uppercase">ESG Performance Summary</CardTitle>
                    <CardDescription className="font-mono mt-1">Generated: {esgReport?.generatedAt ? new Date(esgReport.generatedAt).toLocaleString() : "Now"}</CardDescription>
                  </div>
                  <FileText className="w-8 h-8 text-muted-foreground opacity-50" />
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  {/* Scores */}
                  <section>
                    <h3 className="font-mono font-bold text-sm border-b pb-2 mb-4 uppercase">1. Overall Scores</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Overall ESG", value: esgReport?.overallScore, color: "text-foreground", bg: "bg-muted/30" },
                        { label: "Environmental", value: esgReport?.environmentalScore, color: "text-chart-1", bg: "bg-chart-1/10" },
                        { label: "Social", value: esgReport?.socialScore, color: "text-chart-2", bg: "bg-chart-2/10" },
                        { label: "Governance", value: esgReport?.governanceScore, color: "text-chart-3", bg: "bg-chart-3/10" },
                      ].map(s => (
                        <div key={s.label} className={`p-4 border border-border ${s.bg}`}>
                          <div className="text-xs font-mono text-muted-foreground uppercase mb-1">{s.label}</div>
                          <div className={`text-3xl font-bold font-mono ${s.color}`}>{s.value?.toFixed(1) ?? "0.0"}</div>
                          <div className="h-1.5 w-full bg-muted mt-2 overflow-hidden">
                            <div className="h-full bg-current opacity-60" style={{ width: `${s.value ?? 0}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Department Rankings */}
                  <section>
                    <h3 className="font-mono font-bold text-sm border-b pb-2 mb-4 uppercase">2. Department Rankings</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead className="text-right hidden sm:table-cell">Environmental</TableHead>
                            <TableHead className="text-right hidden sm:table-cell">Social</TableHead>
                            <TableHead className="text-right hidden sm:table-cell">Governance</TableHead>
                            <TableHead className="text-right">Total Score</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {esgReport?.departmentRankings?.map((d) => (
                            <TableRow key={d.departmentId}>
                              <TableCell className="font-mono font-bold">#{d.rank}</TableCell>
                              <TableCell className="font-medium">{d.departmentName}</TableCell>
                              <TableCell className="text-right font-mono text-xs hidden sm:table-cell text-chart-1">{d.environmentalScore?.toFixed(1)}</TableCell>
                              <TableCell className="text-right font-mono text-xs hidden sm:table-cell text-chart-2">{d.socialScore?.toFixed(1)}</TableCell>
                              <TableCell className="text-right font-mono text-xs hidden sm:table-cell text-chart-3">{d.governanceScore?.toFixed(1)}</TableCell>
                              <TableCell className="text-right font-mono font-bold">{d.totalScore?.toFixed(1)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* Highlights */}
                  <section>
                    <h3 className="font-mono font-bold text-sm border-b pb-2 mb-4 uppercase">3. Highlights</h3>
                    <ul className="space-y-2">
                      {esgReport?.highlights?.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 font-mono text-sm">
                          <span className="text-chart-1 font-bold">→</span> {h}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <div className="flex justify-end">
                    <Button variant="outline" className="font-mono uppercase text-xs" onClick={() => downloadCSV("esg-department-rankings.csv", (esgReport?.departmentRankings || []) as any[])}>
                      <Download className="w-3.5 h-3.5 mr-1.5" /> Export Rankings CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* ── Environmental Report ── */}
        <TabsContent value="environmental">
          {isEnvLoading ? <Skeleton className="h-[400px] w-full" /> : (
            <div className="space-y-6">
              <Card>
                <CardHeader className="border-b border-border/50">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <CardTitle className="font-mono uppercase">Environmental Report</CardTitle>
                      <CardDescription className="font-mono">Period: {envReport?.period?.startDate} – {envReport?.period?.endDate}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="font-mono uppercase text-xs" onClick={() => downloadCSV("environmental-transactions.csv", (envReport?.transactions || []).map(t => ({
                      date: t.transactionDate, department: t.departmentName, source: t.source, quantity: t.quantity, totalEmission: t.totalEmission, description: t.description,
                    })))}>
                      <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  {/* Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-chart-1/10 border border-chart-1/20">
                      <div className="text-xs font-mono text-muted-foreground uppercase mb-1">Total Emissions</div>
                      <div className="text-2xl font-bold font-mono text-chart-1">{envReport?.totalEmissions?.toLocaleString(undefined, { maximumFractionDigits: 1 })} tCO₂e</div>
                    </div>
                    <div className="p-4 bg-muted/30 border border-border">
                      <div className="text-xs font-mono text-muted-foreground uppercase mb-1">Goals Achieved</div>
                      <div className="text-2xl font-bold font-mono">{(envReport?.goalsStatus || []).filter((g: any) => g.status === 'achieved').length} / {(envReport?.goalsStatus || []).length}</div>
                    </div>
                    <div className="p-4 bg-muted/30 border border-border col-span-2 md:col-span-1">
                      <div className="text-xs font-mono text-muted-foreground uppercase mb-1">Transactions</div>
                      <div className="text-2xl font-bold font-mono">{envReport?.transactions?.length || 0}</div>
                    </div>
                  </div>

                  {/* By Department */}
                  <section>
                    <h3 className="font-mono font-bold text-sm border-b pb-2 mb-4 uppercase">Emissions by Department</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={envReport?.emissionsByDepartment || []} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="departmentName" tick={{ fontSize: 10, fontFamily: "monospace" }} />
                        <YAxis tick={{ fontSize: 10, fontFamily: "monospace" }} />
                        <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 0, fontFamily: "monospace", fontSize: 11 }} />
                        <Bar dataKey="totalEmission" fill="hsl(var(--chart-1))" name="tCO₂e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </section>

                  {/* By Source */}
                  <section>
                    <h3 className="font-mono font-bold text-sm border-b pb-2 mb-4 uppercase">Emissions by Source</h3>
                    <div className="grid gap-2">
                      {envReport?.emissionsBySource?.map(s => {
                        const pct = envReport.totalEmissions ? (s.totalEmission / envReport.totalEmissions) * 100 : 0;
                        return (
                          <div key={s.source} className="space-y-1">
                            <div className="flex justify-between font-mono text-xs">
                              <span className="capitalize">{s.source}</span>
                              <span>{s.totalEmission?.toLocaleString(undefined, { maximumFractionDigits: 1 })} tCO₂e ({pct.toFixed(1)}%)</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted border border-border overflow-hidden">
                              <div className="h-full bg-chart-1" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Goals */}
                  <section>
                    <h3 className="font-mono font-bold text-sm border-b pb-2 mb-4 uppercase">Goal Progress</h3>
                    <div className="space-y-3">
                      {envReport?.goalsStatus?.map(g => (
                        <div key={g.id} className="p-3 border border-border">
                          <div className="flex justify-between items-center gap-2 mb-2">
                            <span className="text-sm font-medium">{g.title}</span>
                            <Badge variant={g.status === "achieved" ? "outline" : g.status === "missed" ? "destructive" : "secondary"} className="font-mono text-[10px] uppercase shrink-0">{g.status}</Badge>
                          </div>
                          <div className="flex justify-between font-mono text-xs text-muted-foreground mb-1">
                            <span>{g.currentValue} {g.unit}</span>
                            <span>Target: {g.targetValue} {g.unit}</span>
                          </div>
                          <div className="h-1.5 w-full bg-muted border border-border overflow-hidden">
                            <div className="h-full bg-chart-1" style={{ width: `${Math.min(g.progressPercent ?? 0, 100)}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* ── Social Report ── */}
        <TabsContent value="social">
          {isSocialLoading ? <Skeleton className="h-[400px] w-full" /> : (
            <div className="space-y-6">
              <Card>
                <CardHeader className="border-b border-border/50">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <CardTitle className="font-mono uppercase">Social Report</CardTitle>
                      <CardDescription className="font-mono">Period: {socialReport?.period?.startDate} – {socialReport?.period?.endDate}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="font-mono uppercase text-xs" onClick={() => downloadCSV("social-top-participants.csv", (socialReport?.topParticipants || []) as any[])}>
                      <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-chart-2/10 border border-chart-2/20">
                      <div className="text-xs font-mono text-muted-foreground uppercase mb-1">Total Participations</div>
                      <div className="text-2xl font-bold font-mono text-chart-2">{socialReport?.totalParticipations || 0}</div>
                    </div>
                    <div className="p-4 bg-muted/30 border border-border">
                      <div className="text-xs font-mono text-muted-foreground uppercase mb-1">Approval Rate</div>
                      <div className="text-2xl font-bold font-mono">{socialReport?.approvalRate || 0}%</div>
                    </div>
                  </div>

                  <section>
                    <h3 className="font-mono font-bold text-sm border-b pb-2 mb-4 uppercase">Activities by Category</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={socialReport?.activitiesByCategory || []} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="categoryName" tick={{ fontSize: 10, fontFamily: "monospace" }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 10, fontFamily: "monospace" }} />
                        <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 0, fontFamily: "monospace", fontSize: 11 }} />
                        <Bar dataKey="count" fill="hsl(var(--chart-2))" name="Activities" />
                      </BarChart>
                    </ResponsiveContainer>
                  </section>

                  <section>
                    <h3 className="font-mono font-bold text-sm border-b pb-2 mb-4 uppercase">Gender Distribution</h3>
                    <div className="space-y-2">
                      {socialReport?.genderDistribution?.map((g, i) => {
                        const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-4))"];
                        return (
                          <div key={g.gender} className="space-y-1">
                            <div className="flex justify-between font-mono text-xs">
                              <span className="capitalize">{g.gender?.replace(/_/g, " ")}</span>
                              <span>{g.count} ({g.percent}%)</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted border border-border overflow-hidden">
                              <div className="h-full" style={{ width: `${g.percent}%`, background: colors[i % colors.length] }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  <section>
                    <h3 className="font-mono font-bold text-sm border-b pb-2 mb-4 uppercase">Top 10 Participants</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>Employee</TableHead>
                          <TableHead className="text-right">Activities</TableHead>
                          <TableHead className="text-right">Points Earned</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {socialReport?.topParticipants?.map((p, i) => (
                          <TableRow key={p.employeeId}>
                            <TableCell className="font-mono">#{i + 1}</TableCell>
                            <TableCell className="font-medium">{p.employeeName}</TableCell>
                            <TableCell className="text-right font-mono">{p.participationCount}</TableCell>
                            <TableCell className="text-right font-mono text-chart-2">+{p.pointsEarned}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </section>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* ── Governance Report ── */}
        <TabsContent value="governance">
          {isGovLoading ? <Skeleton className="h-[400px] w-full" /> : (
            <div className="space-y-6">
              <Card>
                <CardHeader className="border-b border-border/50">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <CardTitle className="font-mono uppercase">Governance Report</CardTitle>
                      <CardDescription className="font-mono">Period: {govReport?.period?.startDate} – {govReport?.period?.endDate}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="font-mono uppercase text-xs" onClick={() => downloadCSV("governance-issues.csv", (govReport?.issuesBySeverity || []) as any[])}>
                      <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Active Policies", value: govReport?.activePolicies },
                      { label: "Acknowledgement Rate", value: `${govReport?.acknowledgementRate || 0}%` },
                      { label: "Audits Completed", value: govReport?.auditsCompleted },
                      { label: "Issues Raised", value: govReport?.complianceIssuesRaised },
                    ].map(m => (
                      <div key={m.label} className="p-4 bg-muted/30 border border-border">
                        <div className="text-xs font-mono text-muted-foreground uppercase mb-1">{m.label}</div>
                        <div className="text-2xl font-bold font-mono">{m.value ?? 0}</div>
                      </div>
                    ))}
                  </div>

                  <section>
                    <h3 className="font-mono font-bold text-sm border-b pb-2 mb-4 uppercase">Issues by Severity</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={govReport?.issuesBySeverity || []} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="severity" tick={{ fontSize: 10, fontFamily: "monospace" }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 10, fontFamily: "monospace" }} />
                        <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 0, fontFamily: "monospace", fontSize: 11 }} />
                        <Bar dataKey="count" fill="hsl(var(--destructive))" name="Issues" />
                      </BarChart>
                    </ResponsiveContainer>
                  </section>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* ── Custom Report Builder ── */}
        <TabsContent value="custom">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono uppercase text-sm flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Custom Report Builder
                </CardTitle>
                <CardDescription className="font-mono">Filter and export a tailored ESG report.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                  <div className="space-y-1">
                    <Label className="font-mono text-xs uppercase">Start Date</Label>
                    <Input type="date" value={filters.startDate} onChange={e => setFilters(f => ({ ...f, startDate: e.target.value }))} className="font-mono text-sm" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-mono text-xs uppercase">End Date</Label>
                    <Input type="date" value={filters.endDate} onChange={e => setFilters(f => ({ ...f, endDate: e.target.value }))} className="font-mono text-sm" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-mono text-xs uppercase">Department</Label>
                    <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={filters.departmentId} onChange={e => setFilters(f => ({ ...f, departmentId: e.target.value }))}>
                      <option value="">All Departments</option>
                      {departments?.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-mono text-xs uppercase">Module</Label>
                    <select className="w-full h-9 border border-border bg-background font-mono text-sm px-2" value={filters.module} onChange={e => setFilters(f => ({ ...f, module: e.target.value }))}>
                      <option value="all">All Modules</option>
                      <option value="environmental">Environmental</option>
                      <option value="social">Social</option>
                      <option value="governance">Governance</option>
                    </select>
                  </div>
                </div>

                {/* Preview */}
                <div className="border border-border p-4 bg-muted/20 mb-4">
                  <div className="text-xs font-mono text-muted-foreground uppercase mb-3 font-bold">Report Preview</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 font-mono text-sm">
                    {(filters.module === "all" || filters.module === "environmental") && (
                      <div>
                        <div className="text-chart-1 font-bold uppercase text-xs mb-1">Environmental</div>
                        <div className="text-xs text-muted-foreground">Emissions: {envReport?.totalEmissions?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ?? "—"} tCO₂e</div>
                        <div className="text-xs text-muted-foreground">Goals: {(envReport?.goalsStatus || []).filter((g: any) => g.status === 'achieved').length} / {(envReport?.goalsStatus || []).length}</div>
                      </div>
                    )}
                    {(filters.module === "all" || filters.module === "social") && (
                      <div>
                        <div className="text-chart-2 font-bold uppercase text-xs mb-1">Social</div>
                        <div className="text-xs text-muted-foreground">Participations: {socialReport?.totalParticipations ?? "—"}</div>
                        <div className="text-xs text-muted-foreground">Approval Rate: {socialReport?.approvalRate ?? 0}%</div>
                      </div>
                    )}
                    {(filters.module === "all" || filters.module === "governance") && (
                      <div>
                        <div className="text-chart-3 font-bold uppercase text-xs mb-1">Governance</div>
                        <div className="text-xs text-muted-foreground">Issues Raised: {govReport?.complianceIssuesRaised ?? "—"}</div>
                        <div className="text-xs text-muted-foreground">Resolved: {govReport?.complianceIssuesResolved ?? 0}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button className="font-mono uppercase text-xs" onClick={() => {
                    const rows: Record<string, unknown>[] = [];
                    if (filters.module === "all" || filters.module === "environmental") {
                      (envReport?.transactions || []).forEach(t => rows.push({ module: "environmental", date: t.transactionDate, department: t.departmentName, source: t.source, quantity: t.quantity, emission: t.totalEmission }));
                    }
                    if (filters.module === "all" || filters.module === "social") {
                      (socialReport?.topParticipants || []).forEach(p => rows.push({ module: "social", employee: p.employeeName, activities: p.participationCount, points: p.pointsEarned }));
                    }
                    if (filters.module === "all" || filters.module === "governance") {
                      (govReport?.issuesBySeverity || []).forEach(i => rows.push({ module: "governance", severity: i.severity, count: i.count }));
                    }
                    downloadCSV(`custom-esg-report-${Date.now()}.csv`, rows.length ? rows : [{ note: "No data for selected filters" }]);
                  }}>
                    <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
                  </Button>
                  <Button variant="outline" className="font-mono uppercase text-xs" onClick={handlePrint}>
                    <Printer className="w-3.5 h-3.5 mr-1.5" /> Print Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
