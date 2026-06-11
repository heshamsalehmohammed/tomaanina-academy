"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, ChevronLeft, ChevronRight, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { StatusBadge } from "@/components/admin/status-badge";
import { CLASS_TYPE_LABELS } from "@/lib/constants";
import { formatArabicDate, cn } from "@/lib/utils";

type RegistrationItem = {
  id: string;
  studentName: string;
  studentAge: number;
  parentName: string;
  phone: string;
  whatsapp: string;
  requestedProgram: string;
  classType: string;
  country: string;
  status: string;
  createdAt: Date;
};

type RegistrationsTableProps = {
  data: {
    items: RegistrationItem[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};

const sortableColumns = [
  { key: "studentName", label: "اسم الطالب" },
  { key: "studentAge", label: "العمر" },
  { key: "parentName", label: "ولي الأمر" },
  { key: "phone", label: "الهاتف" },
  { key: "whatsapp", label: "واتساب" },
  { key: "requestedProgram", label: "البرنامج" },
  { key: "classType", label: "نوع الحصة" },
  { key: "country", label: "الدولة" },
  { key: "status", label: "الحالة" },
  { key: "createdAt", label: "تاريخ التسجيل" },
];

export function RegistrationsTable({ data }: RegistrationsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sortBy") ?? "createdAt";
  const currentOrder = searchParams.get("sortOrder") ?? "desc";

  const toggleSort = (column: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentSort === column) {
      params.set("sortOrder", currentOrder === "asc" ? "desc" : "asc");
    } else {
      params.set("sortBy", column);
      params.set("sortOrder", "desc");
    }
    router.push(`/admin/registrations?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/admin/registrations?${params.toString()}`);
  };

  const exportUrl = `/api/admin/registrations/export?${searchParams.toString()}`;

  if (data.items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-lg font-medium">لا توجد تسجيلات</p>
        <p className="mt-2 text-sm text-muted-foreground">
          لم يتم العثور على تسجيلات مطابقة للبحث أو الفلاتر الحالية
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          عرض {data.items.length} من {data.total} تسجيل
        </p>
        <a
          href={exportUrl}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <Download className="size-4" />
          تصدير CSV
        </a>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              {sortableColumns.map((col) => (
                <TableHead key={col.key}>
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className="font-semibold hover:text-primary"
                  >
                    {col.label}
                    {currentSort === col.key && (
                      <span className="mr-1 text-xs">
                        {currentOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </TableHead>
              ))}
              <TableHead>إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.studentName}</TableCell>
                <TableCell>{item.studentAge}</TableCell>
                <TableCell>{item.parentName}</TableCell>
                <TableCell dir="ltr">{item.phone}</TableCell>
                <TableCell dir="ltr">{item.whatsapp}</TableCell>
                <TableCell className="max-w-[150px] truncate">
                  {item.requestedProgram}
                </TableCell>
                <TableCell>
                  {CLASS_TYPE_LABELS[item.classType] ?? item.classType}
                </TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm">
                  {formatArabicDate(new Date(item.createdAt))}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/registrations/${item.id}`}
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                  >
                    <Eye className="size-4" />
                    عرض
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={data.page <= 1}
            onClick={() => goToPage(data.page - 1)}
          >
            <ChevronRight className="size-4" />
            السابق
          </Button>
          <span className="text-sm text-muted-foreground">
            صفحة {data.page} من {data.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={data.page >= data.totalPages}
            onClick={() => goToPage(data.page + 1)}
          >
            التالي
            <ChevronLeft className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
