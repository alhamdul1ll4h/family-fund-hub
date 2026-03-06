import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'primary' | 'accent' | 'warning';
}

const variantStyles = {
  default: "bg-card shadow-card",
  primary: "gradient-primary text-primary-foreground",
  accent: "gradient-accent",
  warning: "bg-warning/10 border border-warning/20",
};

const iconStyles = {
  default: "bg-secondary text-secondary-foreground",
  primary: "bg-primary-foreground/20 text-primary-foreground",
  accent: "bg-accent-foreground/10 text-accent-foreground",
  warning: "bg-warning/20 text-warning",
};

export default function StatCard({ title, value, subtitle, icon: Icon, variant = 'default' }: StatCardProps) {
  return (
    <div className={cn("rounded-2xl p-6 transition-all duration-200 hover:shadow-card-hover", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className={cn("text-sm font-medium mb-1", variant === 'primary' ? "text-primary-foreground/80" : "text-muted-foreground")}>
            {title}
          </p>
          <p className="text-3xl font-heading font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className={cn("text-xs mt-1", variant === 'primary' ? "text-primary-foreground/60" : "text-muted-foreground")}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconStyles[variant])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
