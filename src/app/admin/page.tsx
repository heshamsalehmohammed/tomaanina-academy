import Link from "next/link";
import { AdminHeader } from "@/components/admin/header";
import { StatsCards } from "@/components/admin/stats-cards";
import { buttonVariants } from "@/components/ui/button";
import { getDashboardStats } from "@/lib/services/registration";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "لوحة التحكم",
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <>
      <AdminHeader title="نظرة عامة" />
      <div className="flex-1 space-y-8 overflow-auto p-6">
        <StatsCards stats={stats} />
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">إجراءات سريعة</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            إدارة تسجيلات الطلاب الجدد ومتابعة حالاتهم
          </p>
          <Link
            href="/admin/registrations"
            className={cn(buttonVariants(), "mt-4 inline-flex")}
          >
            عرض جميع التسجيلات
          </Link>
        </div>
      </div>
    </>
  );
}
