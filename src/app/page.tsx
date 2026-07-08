import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Activity, ShieldCheck, Zap, FileText, Languages, BrainCircuit, HeartPulse } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <Zap className="w-3 h-3" />
            Empowered by Gemini AI
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight mb-8 leading-[1.1]">
            Understand Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Medical Reports</span> with Ease.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload your blood tests, MRI, X-rays, or prescriptions. Our AI translates complex medical jargon into simple, actionable insights. 
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/upload">
              <Button size="lg" className="h-14 px-10 rounded-full text-lg font-medium shadow-xl shadow-primary/20">
                Analyze Report Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-10 rounded-full text-lg font-medium">
              View Sample Report
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card/30 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4">Why MedSimplify?</h2>
            <p className="text-muted-foreground">Expert interpretation for every document type.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Comprehensive Analysis",
                desc: "From simple blood tests to complex MRI scans, we explain everything clearly.",
                color: "text-blue-500",
                bg: "bg-blue-500/10"
              },
              {
                icon: Languages,
                title: "Multilingual Support",
                desc: "Get summaries in simple English or Hindi to ensure full understanding.",
                color: "text-indigo-500",
                bg: "bg-indigo-500/10"
              },
              {
                icon: BrainCircuit,
                title: "Smart Insights",
                desc: "Automatic detection of abnormal values and intelligent questions for your doctor.",
                color: "text-purple-500",
                bg: "bg-purple-500/10"
              },
              {
                icon: ShieldCheck,
                title: "Privacy First",
                desc: "Your medical data is encrypted and never shared. We prioritize your confidentiality.",
                color: "text-emerald-500",
                bg: "bg-emerald-500/10"
              },
              {
                icon: HeartPulse,
                title: "Risk Assessment",
                desc: "Understand the urgency of your results with our color-coded risk dashboard.",
                color: "text-rose-500",
                bg: "bg-rose-500/10"
              },
              {
                icon: Activity,
                title: "Health Tracking",
                desc: "Keep a permanent vault of all your reports and track improvements over time.",
                color: "text-amber-500",
                bg: "bg-amber-500/10"
              }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/5">
                <div className={`p-3 w-fit rounded-xl ${f.bg} ${f.color} mb-6`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <span className="font-headline font-bold text-xl">MedSimplify AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 MedSimplify AI. For educational purposes only. Not medical advice.
          </p>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}