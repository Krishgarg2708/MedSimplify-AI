'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Activity, ShieldCheck, UserCircle } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/60 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/30">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight">MedSimplify AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <Link href="/history" className="hover:text-primary transition-colors">History</Link>
          <Link href="/upload" className="hover:text-primary transition-colors">Process Report</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserCircle className="w-5 h-5" />
          </Button>
          <Link href="/upload">
            <Button className="rounded-full font-medium">
              Start Analysis
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
