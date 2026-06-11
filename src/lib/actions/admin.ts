"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  adminUpdateRegistrationSchema,
} from "@/lib/validations/registration";
import {
  deleteRegistration,
  updateRegistrationStatus,
} from "@/lib/services/registration";
import type { RegistrationStatus } from "@/generated/prisma/client";

export type AdminActionState = {
  success: boolean;
  message: string;
};

export async function updateRegistrationAction(
  id: string,
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    const session = await requireAdmin();
    const rawData = {
      status: formData.get("status"),
      adminNotes: formData.get("adminNotes"),
      note: formData.get("note"),
    };

    const parsed = adminUpdateRegistrationSchema.safeParse(rawData);
    if (!parsed.success) {
      return { success: false, message: "بيانات غير صالحة" };
    }

    await updateRegistrationStatus(
      id,
      parsed.data.status as RegistrationStatus,
      session.user.id,
      parsed.data.adminNotes,
      parsed.data.note,
    );

    revalidatePath("/admin");
    revalidatePath("/admin/registrations");
    revalidatePath(`/admin/registrations/${id}`);

    return { success: true, message: "تم تحديث التسجيل بنجاح" };
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return { success: false, message: "غير مصرح لك بهذا الإجراء" };
    }
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return { success: false, message: "التسجيل غير موجود" };
    }
    console.error("Update registration error:", error);
    return { success: false, message: "حدث خطأ أثناء التحديث" };
  }
}

export async function deleteRegistrationAction(
  id: string,
): Promise<AdminActionState> {
  try {
    await requireAdmin();
    await deleteRegistration(id);

    revalidatePath("/admin");
    revalidatePath("/admin/registrations");

    return { success: true, message: "تم حذف التسجيل بنجاح" };
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return { success: false, message: "غير مصرح لك بهذا الإجراء" };
    }
    console.error("Delete registration error:", error);
    return { success: false, message: "حدث خطأ أثناء الحذف" };
  }
}
