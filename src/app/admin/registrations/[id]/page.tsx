import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AdminHeader } from "@/components/admin/header";
import { RegistrationDetails } from "@/components/admin/registration-details";
import { getRegistrationById } from "@/lib/services/registration";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "تفاصيل التسجيل",
};

export default async function RegistrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const registration = await getRegistrationById(id);

  if (!registration) {
    notFound();
  }

  return (
    <>
      <AdminHeader title="تفاصيل التسجيل" />
      <div className="flex-1 overflow-auto p-6">
        <Link
          href="/admin/registrations"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowRight className="size-4" />
          العودة للتسجيلات
        </Link>
        <RegistrationDetails registration={registration} />
      </div>
    </>
  );
}
