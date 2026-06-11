import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllRegistrationsForExport } from "@/lib/services/registration";
import {
  CLASS_TYPE_LABELS,
  GENDER_LABELS,
  REGISTRATION_STATUS_LABELS,
} from "@/lib/constants";
import type { ClassType, RegistrationStatus } from "@/generated/prisma/client";
import type { ProgramRegistration } from "@/generated/prisma/client";

function escapeCsv(value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;

  const registrations = await getAllRegistrationsForExport({
    search: searchParams.get("search") ?? undefined,
    status: (searchParams.get("status") as RegistrationStatus) ?? undefined,
    requestedProgram: searchParams.get("program") ?? undefined,
    classType: (searchParams.get("classType") as ClassType) ?? undefined,
    wantsTrialLesson:
      searchParams.get("trial") === "true"
        ? true
        : searchParams.get("trial") === "false"
          ? false
          : undefined,
    country: searchParams.get("country") ?? undefined,
    dateFrom: searchParams.get("dateFrom") ?? undefined,
    dateTo: searchParams.get("dateTo") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined,
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") ?? "desc",
  });

  const headers = [
    "اسم الطالب",
    "العمر",
    "النوع",
    "مستوى الطالب",
    "يحفظ قرآن",
    "مقدار الحفظ",
    "مستوى القراءة",
    "ولي الأمر",
    "الهاتف",
    "واتساب",
    "البريد",
    "الدولة",
    "المدينة",
    "البرنامج",
    "نوع الحصة",
    "حصص أسبوعية",
    "المواعيد",
    "حصة تجريبية",
    "ملاحظات",
    "الحالة",
    "ملاحظات إدارية",
    "تاريخ التسجيل",
  ];

  const rows = registrations.map((r: ProgramRegistration) =>
    [
      r.studentName,
      r.studentAge,
      GENDER_LABELS[r.studentGender],
      r.currentLevel,
      r.hasQuranMemorization ? "نعم" : "لا",
      r.memorizedAmount,
      r.arabicReadingLevel,
      r.parentName,
      r.phone,
      r.whatsapp,
      r.email,
      r.country,
      r.city,
      r.requestedProgram,
      CLASS_TYPE_LABELS[r.classType],
      r.weeklySessions,
      r.preferredTimes,
      r.wantsTrialLesson ? "نعم" : "لا",
      r.additionalNotes,
      REGISTRATION_STATUS_LABELS[r.status],
      r.adminNotes,
      r.createdAt.toISOString(),
    ]
      .map(escapeCsv)
      .join(","),
  );

  const csv = "\uFEFF" + [headers.join(","), ...rows].join("\n");
  const filename = `tomaanina-registrations-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
