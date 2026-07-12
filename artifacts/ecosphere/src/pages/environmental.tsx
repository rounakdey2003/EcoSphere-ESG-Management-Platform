import * as React from "react"
import { 
  useGetEnvironmentalDashboard, 
  useListCarbonTransactions,
  useCreateCarbonTransaction,
  useListEmissionFactors,
  useListDepartments,
  useListEnvironmentalGoals,
  useCreateEnvironmentalGoal,
} from "@workspace/api-client-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { useQueryClient } from "@tanstack/react-query"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart
} from "recharts"
import { format } from "date-fns"
import { PlusCircle, X, Leaf, Target, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

export default function EnvironmentalModule() {
  const { data: dashboard, isLoading: isLoadingDash } = useGetEnvironmentalDashboard()
  const { data: transactions, isLoading: isLoadingTrans } = useListCarbonTransactions()
  const { data: emissionFactors } = useListEmissionFactors()
  const { data: departments } = useListDepartments()
  const { data: goals } = useListEnvironmentalGoals()
  const createTransaction = useCreateCarbonTransaction()
  const createGoal = useCreateEnvironmentalGoal()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  
  const [showEmissionModal, setShowEmissionModal] = React.useState(false)
  const [emissionForm, setEmissionForm] = React.useState({
    departmentId: "", emissionFactorId: "", quantity: "", source: "manual", description: "", transactionDate: new Date().toISOString().split("T")[0],
  })

  
  const [showGoalModal, setShowGoalModal] = React.useState(false)
  const [goalForm, setGoalForm] = React.useState({
    title: "", description: "", departmentId: "", targetValue: "", currentValue: "0", unit: "tCO2e", deadline: "",
  })

  const handleCreateEmission = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emissionForm.departmentId || !emissionForm.emissionFactorId || !emissionForm.quantity) {
      toast({ title: "Please fill all required fields.", variant: "destructive" })
      return
    }
    try {
      await createTransaction.mutateAsync({ data: {
        departmentId: Number(emissionForm.departmentId),
        emissionFactorId: Number(emissionForm.emissionFactorId),
        quantity: Number(emissionForm.quantity),
        source: emissionForm.source as any,
        description: emissionForm.description || undefined,
        transactionDate: emissionForm.transactionDate,
      }})
      queryClient.invalidateQueries()
      setShowEmissionModal(false)
      setEmissionForm({ departmentId: "", emissionFactorId: "", quantity: "", source: "manual", description: "", transactionDate: new Date().toISOString().split("T")[0] })
      toast({ title: "Emission recorded.", description: "Carbon transaction has been logged." })
    } catch {
      toast({ title: "Error recording emission.", variant: "destructive" })
    }
  }

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!goalForm.title || !goalForm.targetValue || !goalForm.deadline) {
      toast({ title: "Please fill all required fields.", variant: "destructive" })
      return
    }
    try {
      await createGoal.mutateAsync({ data: {
        title: goalForm.title,
        description: goalForm.description || undefined,
        departmentId: goalForm.departmentId ? Number(goalForm.departmentId) : undefined,
        targetValue: Number(goalForm.targetValue),
        currentValue: Number(goalForm.currentValue || 0),
        unit: goalForm.unit,
        deadline: goalForm.deadline,
        status: "active",
      }})
      queryClient.invalidateQueries()
      setShowGoalModal(false)
      setGoalForm({ title: "", description: "", departmentId: "", targetValue: "", currentValue: "0", unit: "tCO2e", deadline: "" })
      toast({ title: "Goal created.", description: "Sustainability goal has been added." })
    } catch {
      toast({ title: "Error creating goal.", variant: "destructive" })
    }
  }

  if (isLoadingDash || isLoadingTrans) {
    return <div className="space-y-4"><Skeleton className="h-[200px] w-full" /><Skeleton className="h-[400px] w-full" /></div>
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase font-mono">Environmental Ops</h1>
          <p className="text-muted-foreground font-mono text-sm">Carbon accounting and resource goals tracking.</p>
        </div>
        <Button className="font-mono uppercase text-xs tracking-wider self-start sm:self-auto" onClick={() => setShowEmissionModal(true)}>
          <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Record Emission
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="bg-chart-1 text-primary-foreground border-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase opacity-80 flex items-center gap-2">
              <Leaf className="w-4 h-4" /> Total Emissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-mono">
              {dashboard?.totalEmissions?.toLocaleString() || 0}
            </div>
            <p className="text-sm font-mono opacity-80 mt-1">tCO2e YTD</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4" /> Active Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-mono text-foreground">
              {dashboard?.goalsProgress?.length || 0}
            </div>
            <p className="text-sm font-mono text-muted-foreground mt-1">
              {dashboard?.goalsAchieved || 0} Achieved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Top Emitter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-foreground truncate">
              {dashboard?.emissionsByDepartment?.[0]?.departmentName || 'N/A'}
            </div>
            <p className="text-sm font-mono text-muted-foreground mt-1">
              {dashboard?.emissionsByDepartment?.[0]?.totalEmission?.toLocaleString() || 0} tCO2e
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="font-mono uppercase text-xs w-full justify-start border-b rounded-none mb-6 overflow-x-auto flex-nowrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Ledger</TabsTrigger>
          <TabsTrigger value="goals">Goals Tracker</TabsTrigger>
          <TabsTrigger value="factors">Emission Factors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono uppercase text-sm">Emissions Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dashboard?.emissionsTrend || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{fontFamily: 'monospace', fontSize: 10}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontFamily: 'monospace', fontSize: 10}} />
                      <Tooltip contentStyle={{fontFamily: 'monospace', borderRadius: '0', border: '1px solid hsl(var(--border))'}} />
                      <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-mono uppercase text-sm">By Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboard?.emissionsByDepartment || []} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{fontFamily: 'monospace', fontSize: 10}} />
                      <YAxis dataKey="departmentName" type="category" axisLine={false} tickLine={false} tick={{fontFamily: 'monospace', fontSize: 10}} width={80} />
                      <Tooltip contentStyle={{fontFamily: 'monospace', borderRadius: '0', border: '1px solid hsl(var(--border))'}} />
                      <Bar dataKey="totalEmission" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono uppercase text-sm">Carbon Ledger</CardTitle>
              <CardDescription className="font-mono">Raw data of all recorded emissions.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="text-right">Total (tCO2e)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions?.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-mono text-muted-foreground">
                        {format(new Date(t.transactionDate), 'yyyy-MM-dd')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">{t.source}</Badge>
                      </TableCell>
                      <TableCell>{t.departmentName}</TableCell>
                      <TableCell className="max-w-[200px] truncate hidden md:table-cell">{t.description}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-chart-1">
                        {Number(t.totalEmission).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!transactions || transactions.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground font-mono">
                        No transactions recorded.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <div className="flex justify-end mb-4">
            <Button size="sm" className="font-mono uppercase text-xs" onClick={() => setShowGoalModal(true)}>
              <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add Goal
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {dashboard?.goalsProgress?.map(goal => (
              <Card key={goal.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription className="font-mono text-xs mt-1">Due: {format(new Date(goal.deadline), 'MMM yyyy')}</CardDescription>
                    </div>
                    <Badge variant={
                      goal.status === 'achieved' ? 'default' : 
                      goal.status === 'missed' ? 'destructive' : 
                      'secondary'
                    }>{goal.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-sm">
                      <span>{goal.currentValue} {goal.unit}</span>
                      <span className="text-muted-foreground">Target: {goal.targetValue} {goal.unit}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-none border border-border overflow-hidden">
                      <div 
                        className="h-full bg-chart-1" 
                        style={{ width: `${Math.min(100, goal.progressPercent || 0)}%` }}
                      />
                    </div>
                    <p className="text-right font-mono text-xs text-muted-foreground">
                      {goal.progressPercent?.toFixed(1)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {(!dashboard?.goalsProgress || dashboard.goalsProgress.length === 0) && (
              <div className="col-span-2 text-center py-12 text-muted-foreground font-mono">
                No sustainability goals set yet.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="factors">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono uppercase text-sm">Emission Factors</CardTitle>
              <CardDescription className="font-mono">Carbon values used during calculations.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Factor</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emissionFactors?.map(ef => (
                    <TableRow key={ef.id}>
                      <TableCell className="font-medium">{ef.name}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{ef.category}</Badge></TableCell>
                      <TableCell className="font-mono">{Number(ef.factor).toFixed(4)}</TableCell>
                      <TableCell className="font-mono text-muted-foreground">{ef.unit}</TableCell>
                      <TableCell>
                        <Badge variant={ef.isActive ? "default" : "secondary"} className="text-[10px]">
                          {ef.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!emissionFactors || emissionFactors.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground font-mono">
                        No emission factors configured.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {}
      <Modal open={showEmissionModal} onClose={() => setShowEmissionModal(false)} title="Record Carbon Emission">
        <form onSubmit={handleCreateEmission} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="font-mono text-xs">Department *</Label>
            <select
              className="w-full border border-border bg-background text-foreground px-3 py-2 text-sm font-mono"
              value={emissionForm.departmentId}
              onChange={e => setEmissionForm(f => ({ ...f, departmentId: e.target.value }))}
              required
            >
              <option value="">Select department…</option>
              {departments?.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono text-xs">Emission Factor *</Label>
            <select
              className="w-full border border-border bg-background text-foreground px-3 py-2 text-sm font-mono"
              value={emissionForm.emissionFactorId}
              onChange={e => setEmissionForm(f => ({ ...f, emissionFactorId: e.target.value }))}
              required
            >
              <option value="">Select emission factor…</option>
              {emissionFactors?.filter(ef => ef.isActive).map(ef => (
                <option key={ef.id} value={ef.id}>{ef.name} ({Number(ef.factor).toFixed(4)} {ef.unit})</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono text-xs">Quantity *</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 100"
              className="font-mono"
              value={emissionForm.quantity}
              onChange={e => setEmissionForm(f => ({ ...f, quantity: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono text-xs">Source</Label>
            <select
              className="w-full border border-border bg-background text-foreground px-3 py-2 text-sm font-mono"
              value={emissionForm.source}
              onChange={e => setEmissionForm(f => ({ ...f, source: e.target.value }))}
            >
              <option value="manual">Manual</option>
              <option value="purchase">Purchase</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="expense">Expense</option>
              <option value="fleet">Fleet</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono text-xs">Date *</Label>
            <Input
              type="date"
              className="font-mono"
              value={emissionForm.transactionDate}
              onChange={e => setEmissionForm(f => ({ ...f, transactionDate: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono text-xs">Description</Label>
            <Input
              placeholder="Optional notes…"
              className="font-mono"
              value={emissionForm.description}
              onChange={e => setEmissionForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 font-mono text-xs" onClick={() => setShowEmissionModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 font-mono text-xs" disabled={createTransaction.isPending}>
              {createTransaction.isPending ? "Saving…" : "Record Emission"}
            </Button>
          </div>
        </form>
      </Modal>

      {}
      <Modal open={showGoalModal} onClose={() => setShowGoalModal(false)} title="Add Sustainability Goal">
        <form onSubmit={handleCreateGoal} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="font-mono text-xs">Goal Title *</Label>
            <Input
              placeholder="e.g. Reduce fleet emissions by 20%"
              className="font-mono"
              value={goalForm.title}
              onChange={e => setGoalForm(f => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono text-xs">Department (optional)</Label>
            <select
              className="w-full border border-border bg-background text-foreground px-3 py-2 text-sm font-mono"
              value={goalForm.departmentId}
              onChange={e => setGoalForm(f => ({ ...f, departmentId: e.target.value }))}
            >
              <option value="">All departments</option>
              {departments?.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="font-mono text-xs">Target Value *</Label>
              <Input
                type="number" step="0.01" min="0"
                placeholder="100"
                className="font-mono"
                value={goalForm.targetValue}
                onChange={e => setGoalForm(f => ({ ...f, targetValue: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs">Unit</Label>
              <Input
                placeholder="tCO2e"
                className="font-mono"
                value={goalForm.unit}
                onChange={e => setGoalForm(f => ({ ...f, unit: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono text-xs">Deadline *</Label>
            <Input
              type="date"
              className="font-mono"
              value={goalForm.deadline}
              onChange={e => setGoalForm(f => ({ ...f, deadline: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono text-xs">Description</Label>
            <Input
              placeholder="Optional description…"
              className="font-mono"
              value={goalForm.description}
              onChange={e => setGoalForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 font-mono text-xs" onClick={() => setShowGoalModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 font-mono text-xs" disabled={createGoal.isPending}>
              {createGoal.isPending ? "Saving…" : "Add Goal"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
