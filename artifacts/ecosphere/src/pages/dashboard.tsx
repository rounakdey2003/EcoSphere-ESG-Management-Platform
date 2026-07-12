import * as React from "react"
import { useGetDashboardSummary } from "@workspace/api-client-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie
} from "recharts"
import { format } from "date-fns"

export default function Dashboard() {
  const { data: summary, isLoading } = useGetDashboardSummary()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
        </div>
      </div>
    )
  }

  if (!summary) return null

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight uppercase font-mono">Terminal Overview</h1>
        <p className="text-muted-foreground font-mono text-sm">Real-time ESG compliance metrics & system status.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary text-primary-foreground border-primary-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-transparent border-0">
            <CardTitle className="text-sm font-mono uppercase font-bold tracking-wider opacity-80">
              Overall ESG Score
            </CardTitle>
            <div className="w-8 h-8 rounded-full border border-primary-foreground/30 flex items-center justify-center text-xs font-bold">
              ∑
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-mono tracking-tighter">
              {summary.overallEsgScore.toFixed(1)}
            </div>
            <div className="mt-4">
              <Progress value={summary.overallEsgScore} className="h-1 bg-primary-foreground/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-mono uppercase font-bold tracking-wider text-muted-foreground">
              Environmental
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-chart-1">
              {summary.environmentalScore.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              Emissions: {summary.totalCarbonEmissions} tCO2e
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-mono uppercase font-bold tracking-wider text-muted-foreground">
              Social
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-chart-2">
              {summary.socialScore.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              Active: {summary.activeParticipations} participations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-mono uppercase font-bold tracking-wider text-muted-foreground">
              Governance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-chart-3">
              {summary.governanceScore.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              <span className={summary.overdueComplianceIssues ? "text-destructive font-bold" : ""}>
                {summary.overdueComplianceIssues} overdue issues
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-mono uppercase text-sm">Score Composition Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Environmental", score: summary.environmentalScore, fill: "hsl(var(--chart-1))" },
                    { name: "Social", score: summary.socialScore, fill: "hsl(var(--chart-2))" },
                    { name: "Governance", score: summary.governanceScore, fill: "hsl(var(--chart-3))" }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontFamily: 'monospace', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontFamily: 'monospace', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: 'hsl(var(--muted)/0.5)'}}
                    contentStyle={{fontFamily: 'monospace', borderRadius: '0', border: '1px solid hsl(var(--border))'}}
                  />
                  <Bar dataKey="score" radius={[0, 0, 0, 0]}>
                    {
                      [0,1,2].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={[
                          "hsl(var(--chart-1))",
                          "hsl(var(--chart-2))",
                          "hsl(var(--chart-3))"
                        ][index]} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="font-mono uppercase text-sm">System Event Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summary.recentActivity?.slice(0, 6).map((activity, i) => (
                <div key={i} className="flex items-start gap-4 text-sm border-l-2 pl-3 pb-4 border-muted relative last:border-0 last:pb-0">
                  <div className="absolute w-2 h-2 rounded-full bg-primary -left-[5px] top-1" />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium leading-none font-mono text-xs text-muted-foreground uppercase">
                      {format(new Date(activity.createdAt), 'MMM dd HH:mm')}
                    </p>
                    <p className="font-medium text-sm leading-tight">
                      {activity.title}
                    </p>
                    {activity.description && (
                      <p className="text-muted-foreground text-xs">
                        {activity.description}
                      </p>
                    )}
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {activity.type.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
              {!summary.recentActivity?.length && (
                <div className="text-sm text-muted-foreground font-mono">No recent events registered.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
