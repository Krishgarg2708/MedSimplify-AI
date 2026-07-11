'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  ArrowLeft, 
  Download, 
  Printer, 
  Languages, 
  Stethoscope, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  AlertCircle,
  Pill,
  Lightbulb,
  MessageCircleQuestion,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ReportDetails() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('last_report');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  if (!data) return null;

  const { report, emergency, doctorQuestions } = data;

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> Export PDF
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Printer className="w-4 h-4" /> Print
            </Button>
          </div>
        </div>

        {emergency && (
          <div className="mb-8 p-6 rounded-2xl bg-rose-500/10 border-2 border-rose-500 flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
            <AlertTriangle className="w-8 h-8 text-rose-500 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-rose-500 mb-1">Emergency Warning</h3>
              <p className="text-rose-500/90 leading-relaxed font-medium">
                This report may contain findings requiring urgent medical attention. Please contact a qualified healthcare professional immediately.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Header */}
            <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-card to-background">
              <div className={`h-2 w-full ${
                report.riskLevel === 'Low Risk' ? 'bg-emerald-500' :
                report.riskLevel === 'Moderate Risk' ? 'bg-amber-500' :
                'bg-rose-500'
              }`} />
              <CardHeader className="pt-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`px-4 py-1.5 text-xs font-bold uppercase ${
                    report.riskLevel === 'Low Risk' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    report.riskLevel === 'Moderate Risk' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                    'bg-rose-500/10 text-rose-500 border-rose-500/20'
                  }`}>
                    {report.riskLevel}
                  </Badge>
                  <span className="text-sm text-muted-foreground font-medium">Report Date: May 15, 2024</span>
                </div>
                <CardTitle className="text-3xl font-headline font-bold mb-4">Analysis Summary</CardTitle>
                <p className="text-lg leading-relaxed text-muted-foreground">{report.summary}</p>
              </CardHeader>
            </Card>

            {/* Explanation Tabs */}
            <Tabs defaultValue="english" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 rounded-xl mb-6 h-12">
                <TabsTrigger value="english" className="rounded-lg gap-2">
                  <Languages className="w-4 h-4" /> English Explanation
                </TabsTrigger>
                <TabsTrigger value="hindi" className="rounded-lg gap-2">
                  <Languages className="w-4 h-4" /> Hindi Summary
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="english">
                <Card className="p-8 border-border/50">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" /> Simplified Details
                  </h3>
                  <div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed">
                    {report.simpleEnglish.split('\n').map((para: string, i: number) => (
                      <p key={i} className="mb-4">{para}</p>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="hindi">
                <Card className="p-8 border-border/50">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Languages className="w-5 h-5 text-primary" /> हिंदी सारांश
                  </h3>
                  <div className="text-muted-foreground leading-relaxed text-lg">
                    {report.simpleHindi}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Important Findings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-emerald-500/20 bg-emerald-500/[0.02]">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 className="w-5 h-5" /> Normal Findings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {report.normalValues.map((v: string, i: number) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span className="text-muted-foreground">{v}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-rose-500/20 bg-rose-500/[0.02]">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-rose-500">
                    <AlertCircle className="w-5 h-5" /> Abnormal Findings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {report.abnormalValues.map((v: string, i: number) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        <span className="text-rose-500 font-medium">{v}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Dictionary Section */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> Medical Glossary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {report.medicalTerms.map((term: any, i: number) => (
                    <AccordionItem value={`item-${i}`} key={i} className="border-border/50">
                      <AccordionTrigger className="text-left font-bold py-4 hover:no-underline hover:text-primary">
                        {term.term}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2">
                        <div className="p-4 rounded-xl bg-muted/30 border border-border/40">
                          <p className="text-sm font-bold text-primary mb-1">Definition</p>
                          <p className="text-sm text-muted-foreground">{term.definition}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Why it matters</p>
                            <p className="text-sm">{term.whyImportant}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Normal Range</p>
                            <Badge variant="secondary" className="font-mono">{term.normalRange || 'N/A'}</Badge>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Risk Breakdown */}
            <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" /> Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-background border border-border/60">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Risk Reason</p>
                  <p className="text-sm leading-relaxed">{report.riskReason}</p>
                </div>
                
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-4">Doctor Consultation Prep</p>
                  <div className="space-y-3">
                    {doctorQuestions.slice(0, 5).map((q: string, i: number) => (
                      <div key={i} className="flex gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <MessageCircleQuestion className="w-4 h-4 text-primary shrink-0" />
                        <p className="text-xs font-medium leading-tight">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medicines if any */}
            {report.medicineExplanation && report.medicineExplanation.length > 0 && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-primary">
                    <Pill className="w-5 h-5" /> Prescriptions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {report.medicineExplanation.map((med: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-background border border-primary/10">
                      <h4 className="font-bold text-primary mb-2">{med.medicineName}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{med.purpose}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
                          <Info className="w-3 h-3" /> Tip: {med.takeBeforeAfterFood || 'Standard usage'}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Lifestyle */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" /> Lifestyle Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {report.lifestyleSuggestions.map((tip: string, i: number) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg bg-card border border-border/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <p className="text-xs text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-muted/20 border border-border/40 text-[10px] text-muted-foreground italic leading-relaxed">
              {report.disclaimer}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
