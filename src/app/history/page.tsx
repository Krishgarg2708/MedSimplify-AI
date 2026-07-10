'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter, FileText, ChevronRight, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const historyItems = [
  { id: '1', type: 'Complete Blood Count', hospital: 'Apollo Hospitals', date: 'May 15, 2024', risk: 'Low Risk', status: 'success' },
  { id: '2', type: 'Brain MRI Scan', hospital: 'Max Healthcare', date: 'April 02, 2024', risk: 'Moderate Risk', status: 'warning' },
  { id: '3', type: 'Thyroid Profile', hospital: 'Apollo Hospitals', date: 'March 15, 2024', risk: 'Low Risk', status: 'success' },
  { id: '4', type: 'Annual Health Checkup', hospital: 'Diagnostic Center', date: 'January 10, 2024', risk: 'Low Risk', status: 'success' },
  { id: '5', type: 'Doctor Prescription', hospital: 'Dr. Sharma Clinic', date: 'December 20, 2023', risk: 'Critical', status: 'destructive' },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">Health History</h1>
            <p className="text-muted-foreground">Your secure vault of interpreted medical documents.</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search reports..." className="pl-10 h-11 rounded-full bg-card" />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-full">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {historyItems.map((item) => (
            <Link key={item.id} href={`/reports/${item.id}`}>
              <Card className="group hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5 cursor-pointer border-border/50 mb-4 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center p-6 gap-6">
                    <div className={`hidden sm:flex shrink-0 w-12 h-12 rounded-xl items-center justify-center ${
                      item.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                      item.status === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-rose-500/10 text-rose-500'
                    }`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors truncate">{item.type}</h3>
                        <Badge variant="outline" className={`text-[10px] font-bold uppercase tracking-widest ${
                          item.status === 'success' ? 'border-emerald-500/30 text-emerald-500' :
                          item.status === 'warning' ? 'border-amber-500/30 text-amber-500' :
                          'border-rose-500/30 text-rose-500'
                        }`}>
                          {item.risk}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                        <span className="flex items-center gap-1">• {item.hospital}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center p-8 border border-dashed rounded-3xl text-muted-foreground">
          <p className="text-sm">End of history. You have {historyItems.length} reports in your vault.</p>
        </div>
      </main>
    </div>
  );
}
