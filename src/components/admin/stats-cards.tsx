import {
  CheckCircle,
  MessageSquare,
  UserPlus,
  Users,
  XCircle,
  Gift,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type StatsCardsProps = {
  stats: {
    total: number;
    newCount: number;
    contactedCount: number;
    inProgressCount: number;
    acceptedCount: number;
    rejectedCount: number;
    trialCount: number;
  };
};

const cards = [
  { key: "total", label: "إجمالي التسجيلات", icon: Users, color: "text-primary" },
  { key: "newCount", label: "تسجيلات جديدة", icon: UserPlus, color: "text-blue-500" },
  { key: "contactedCount", label: "تم التواصل", icon: MessageSquare, color: "text-amber-500" },
  { key: "inProgressCount", label: "قيد المتابعة", icon: Users, color: "text-purple-500" },
  { key: "acceptedCount", label: "مقبول", icon: CheckCircle, color: "text-emerald-500" },
  { key: "rejectedCount", label: "مرفوض", icon: XCircle, color: "text-red-500" },
  { key: "trialCount", label: "طلبات حصة تجريبية", icon: Gift, color: "text-accent" },
] as const;

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.key} className="border-border/60">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-xl bg-muted p-3 ${card.color}`}>
              <card.icon className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-2xl font-bold">{stats[card.key]}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
