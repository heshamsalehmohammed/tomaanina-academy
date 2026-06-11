import { Suspense } from "react";
import { AdminHeader } from "@/components/admin/header";
import { RegistrationsFilters } from "@/components/admin/registrations-filters";
import { RegistrationsTable } from "@/components/admin/registrations-table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getDistinctCountries,
  getRegistrations,
} from "@/lib/services/registration";
import type {
  ClassType,
  RegistrationStatus,
} from "@/generated/prisma/client";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "إدارة التسجيلات",
};

type SearchParams = Promise<{
  page?: string;
  search?: string;
  status?: string;
  program?: string;
  classType?: string;
  trial?: string;
  country?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: string;
}>;

export default async function AdminRegistrationsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const countries = await getDistinctCountries();

  const data = await getRegistrations({
    page: Number(params.page) || 1,
    pageSize: DEFAULT_PAGE_SIZE,
    search: params.search,
    status: params.status as RegistrationStatus | undefined,
    requestedProgram: params.program,
    classType: params.classType as ClassType | undefined,
    wantsTrialLesson:
      params.trial === "true"
        ? true
        : params.trial === "false"
          ? false
          : undefined,
    country: params.country,
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
    sortBy: params.sortBy,
    sortOrder: (params.sortOrder as "asc" | "desc") ?? "desc",
  });

  return (
    <>
      <AdminHeader title="إدارة التسجيلات" />
      <div className="flex-1 space-y-6 overflow-auto p-6">
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <RegistrationsFilters countries={countries} />
        </Suspense>
        <RegistrationsTable data={data} />
      </div>
    </>
  );
}
