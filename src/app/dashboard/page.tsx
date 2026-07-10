'use client';

import { Navbar } from '@/components/layout/Navbar';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Search, 
  History, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const mockChartData = [
  { name: 'Jan', score: 85 },
  { name: 'Feb', score: 82 },
  { name: 'Mar', score: 88 },
  { name: 'Apr', score: 91 },
  { name: 'May', score: 89 },
  { name: 'Jun', score: 94 },
];

const recentReports = [
  { id: '1', type: 'Blood CBC', date: '2 hours ago', risk: 'Low Risk', status: 'success' },
  { id: '2', type: 'MRI Brain', date: 'Yesterday', risk: 'Moderate Risk', status: 'warning' },
  { id: '3', type: 'Doctor Prescription', date: '3 days ago', risk: 'Low Risk', status: 'success' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold">Health Overview</h1>
            <p className="text-muted-foreground">Welcome back, Sarah. Here's your recent health trajectory.</p>
          </div>
          <Link href="/upload">
            <Button className="rounded-full shadow-lg shadow-primary/20 gap-2 h-12 px-6">
              <Plus className="w-5 h-5" />
              Process New Report
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Overall Health Score" 
            value="94/100" 
            icon={Activity} 
            trend={{ value: '5%', positive: true }}
            colorClass="text-emerald-500"
          />
          <StatCard 
            title="Processed Reports" 
            value="12" 
            icon={FileText} 
            trend={{ value: '2', positive: true }}
          />
          <StatCard 
            title="Risk Alerts" 
            value="1" 
            icon={AlertTriangle} 
            colorClass="text-amber-500"
          />
          <StatCard 
            title="Vault Security" 
            value="Active" 
            icon={ShieldCheck} 
            colorClass="text-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <Card className="lg:col-span-2 overflow-hidden border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-headline">Health Score Trend</CardTitle>
                  <CardDescription>Visualizing your wellness over the last 6 months</CardDescription>
                </div>
                <div className="flex items-center gap-1 text-emerald-500 text-sm font-bold">
                  <TrendingUp className="w-4 h-4" />
                  +5.4%
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dy={10} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--primary))' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Reports List */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-headline">Recent History</CardTitle>
              <Link href="/history">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div 
                    key={report.id} 
                    className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/40 hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${report.status === 'success' ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}>
                        <FileText className={`w-5 h-5 ${report.status === 'success' ? 'text-emerald-500' : 'text-amber-500'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">{report.type}</p>
                        <p className="text-xs text-muted-foreground">{report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight ${
                        report.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {report.risk}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
