import type {
  ClassType,
  RegistrationStatus,
  StudentGender,
} from "@/generated/prisma/client";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import type { RegistrationFormData } from "@/lib/validations/registration";

export type RegistrationListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: RegistrationStatus;
  requestedProgram?: string;
  classType?: ClassType;
  wantsTrialLesson?: boolean;
  country?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export async function checkDuplicateRegistration(phone: string, email: string) {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const existing = await prisma.programRegistration.findFirst({
    where: {
      createdAt: { gte: since },
      OR: [{ phone }, { email: email.toLowerCase() }],
    },
    select: { id: true },
  });

  return Boolean(existing);
}

export async function createRegistration(data: RegistrationFormData) {
  const isDuplicate = await checkDuplicateRegistration(data.phone, data.email);
  if (isDuplicate) {
    throw new Error("DUPLICATE_SUBMISSION");
  }

  const registration = await prisma.programRegistration.create({
    data: {
      studentName: data.studentName.trim(),
      studentAge: data.studentAge,
      studentGender: data.studentGender as StudentGender,
      currentLevel: data.currentLevel.trim(),
      hasQuranMemorization: data.hasQuranMemorization === "true",
      memorizedAmount: data.memorizedAmount?.trim() || null,
      arabicReadingLevel: data.arabicReadingLevel.trim(),
      parentName: data.parentName.trim(),
      phone: data.phone.trim(),
      whatsapp: data.whatsapp.trim(),
      email: data.email.trim().toLowerCase(),
      country: data.country.trim(),
      city: data.city.trim(),
      requestedProgram: data.requestedProgram,
      classType: data.classType as ClassType,
      weeklySessions: data.weeklySessions.trim(),
      preferredTimes: data.preferredTimes.trim(),
      wantsTrialLesson: data.wantsTrialLesson === "true",
      additionalNotes: data.additionalNotes?.trim() || null,
      status: "NEW",
      statusHistory: {
        create: {
          fromStatus: null,
          toStatus: "NEW",
        },
      },
    },
  });

  return registration;
}

function buildWhereClause(
  params: RegistrationListParams,
): Prisma.ProgramRegistrationWhereInput {
  const where: Prisma.ProgramRegistrationWhereInput = {};

  if (params.search) {
    const search = params.search.trim();
    where.OR = [
      { studentName: { contains: search, mode: "insensitive" } },
      { parentName: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { whatsapp: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { country: { contains: search, mode: "insensitive" } },
      { requestedProgram: { contains: search, mode: "insensitive" } },
    ];
  }

  if (params.status) where.status = params.status;
  if (params.requestedProgram) where.requestedProgram = params.requestedProgram;
  if (params.classType) where.classType = params.classType;
  if (params.wantsTrialLesson !== undefined) {
    where.wantsTrialLesson = params.wantsTrialLesson;
  }
  if (params.country) where.country = params.country;

  if (params.dateFrom || params.dateTo) {
    where.createdAt = {};
    if (params.dateFrom) {
      where.createdAt.gte = new Date(params.dateFrom);
    }
    if (params.dateTo) {
      const endDate = new Date(params.dateTo);
      endDate.setHours(23, 59, 59, 999);
      where.createdAt.lte = endDate;
    }
  }

  return where;
}

function buildOrderBy(
  sortBy?: string,
  sortOrder: "asc" | "desc" = "desc",
): Prisma.ProgramRegistrationOrderByWithRelationInput {
  const validSortFields: Record<
    string,
    Prisma.ProgramRegistrationOrderByWithRelationInput
  > = {
    studentName: { studentName: sortOrder },
    studentAge: { studentAge: sortOrder },
    parentName: { parentName: sortOrder },
    phone: { phone: sortOrder },
    whatsapp: { whatsapp: sortOrder },
    requestedProgram: { requestedProgram: sortOrder },
    classType: { classType: sortOrder },
    country: { country: sortOrder },
    status: { status: sortOrder },
    createdAt: { createdAt: sortOrder },
  };

  return validSortFields[sortBy ?? "createdAt"] ?? { createdAt: "desc" };
}

export async function getRegistrations(params: RegistrationListParams) {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;
  const skip = (page - 1) * pageSize;
  const where = buildWhereClause(params);
  const orderBy = buildOrderBy(params.sortBy, params.sortOrder ?? "desc");

  const [items, total] = await Promise.all([
    prisma.programRegistration.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
      select: {
        id: true,
        studentName: true,
        studentAge: true,
        parentName: true,
        phone: true,
        whatsapp: true,
        requestedProgram: true,
        classType: true,
        country: true,
        status: true,
        wantsTrialLesson: true,
        createdAt: true,
      },
    }),
    prisma.programRegistration.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getRegistrationById(id: string) {
  return prisma.programRegistration.findUnique({
    where: { id },
    include: {
      notes: {
        orderBy: { createdAt: "desc" },
        include: {
          admin: { select: { name: true, email: true } },
        },
      },
      statusHistory: {
        orderBy: { createdAt: "desc" },
        include: {
          admin: { select: { name: true, email: true } },
        },
      },
    },
  });
}

export async function getDashboardStats() {
  const [
    total,
    newCount,
    contactedCount,
    acceptedCount,
    rejectedCount,
    trialCount,
  ] = await Promise.all([
    prisma.programRegistration.count(),
    prisma.programRegistration.count({ where: { status: "NEW" } }),
    prisma.programRegistration.count({ where: { status: "CONTACTED" } }),
    prisma.programRegistration.count({ where: { status: "ACCEPTED" } }),
    prisma.programRegistration.count({ where: { status: "REJECTED" } }),
    prisma.programRegistration.count({ where: { wantsTrialLesson: true } }),
  ]);

  return {
    total,
    newCount,
    contactedCount,
    acceptedCount,
    rejectedCount,
    trialCount,
    inProgressCount: await prisma.programRegistration.count({
      where: { status: "IN_PROGRESS" },
    }),
  };
}

export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus,
  adminId: string,
  adminNotes?: string,
  note?: string,
) {
  const existing = await prisma.programRegistration.findUnique({
    where: { id },
    select: { status: true },
  });

  if (!existing) {
    throw new Error("NOT_FOUND");
  }

  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const updated = await tx.programRegistration.update({
      where: { id },
      data: {
        status,
        ...(adminNotes !== undefined ? { adminNotes: adminNotes || null } : {}),
      },
    });

    if (existing.status !== status) {
      await tx.registrationStatusHistory.create({
        data: {
          registrationId: id,
          adminId,
          fromStatus: existing.status,
          toStatus: status,
        },
      });
    }

    if (note?.trim()) {
      await tx.registrationNote.create({
        data: {
          registrationId: id,
          adminId,
          content: note.trim(),
        },
      });
    }

    return updated;
  });
}

export async function deleteRegistration(id: string) {
  return prisma.programRegistration.delete({ where: { id } });
}

export async function getAllRegistrationsForExport(
  params: RegistrationListParams,
) {
  const where = buildWhereClause(params);
  const orderBy = buildOrderBy(params.sortBy, params.sortOrder ?? "desc");

  return prisma.programRegistration.findMany({
    where,
    orderBy,
  });
}

export async function getDistinctCountries() {
  const countries = await prisma.programRegistration.findMany({
    select: { country: true },
    distinct: ["country"],
    orderBy: { country: "asc" },
  });
  return countries.map((c: { country: string }) => c.country);
}
