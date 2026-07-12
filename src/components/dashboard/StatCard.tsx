import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
  colorClass?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className, colorClass }: StatCardProps) {
  return (
    <Card className={cn("p-6 relative overflow-hidden group", className)}>
      <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-5 rounded-full transition-transform group-hover:scale-110", colorClass || "bg-primary")} />
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-headline font-bold mt-1">{value}</h3>
          
          {trend && (
            <p className={cn(
              "text-xs mt-2 font-medium flex items-center gap-1",
              trend.positive ? "text-emerald-500" : "text-rose-500"
            )}>
              <span>{trend.positive ? '+' : ''}{trend.value}</span>
              <span className="text-muted-foreground">vs last month</span>
            </p>
          )}
        </div>
        
        <div className={cn("p-3 rounded-xl", colorClass ? `bg-${colorClass}/10` : "bg-primary/10")}>
          <Icon className={cn("w-6 h-6", colorClass ? `text-${colorClass}` : "text-primary")} />
        </div>
      </div>
    </Card>
  );
}
