"use server";

import { registrationSchema } from "@/lib/validations/registration";
import { createRegistration } from "@/lib/services/registration";

export type RegistrationActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitRegistration(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  const rawData = {
    studentName: formData.get("studentName"),
    studentAge: formData.get("studentAge"),
    studentGender: formData.get("studentGender"),
    currentLevel: formData.get("currentLevel"),
    hasQuranMemorization: formData.get("hasQuranMemorization"),
    memorizedAmount: formData.get("memorizedAmount"),
    arabicReadingLevel: formData.get("arabicReadingLevel"),
    parentName: formData.get("parentName"),
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp"),
    email: formData.get("email"),
    country: formData.get("country"),
    city: formData.get("city"),
    requestedProgram: formData.get("requestedProgram"),
    classType: formData.get("classType"),
    weeklySessions: formData.get("weeklySessions"),
    preferredTimes: formData.get("preferredTimes"),
    wantsTrialLesson: formData.get("wantsTrialLesson"),
    additionalNotes: formData.get("additionalNotes"),
    website: formData.get("website"),
  };

  const parsed = registrationSchema.safeParse(rawData);

  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string;
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }
    return {
      success: false,
      message: "يرجى تصحيح الأخطاء في النموذج",
      errors,
    };
  }

  if (parsed.data.website) {
    return { success: true, message: "تم استلام طلبك بنجاح" };
  }

  try {
    await createRegistration(parsed.data);
    return {
      success: true,
      message:
        "تم إرسال طلب التسجيل بنجاح! سيتواصل معك فريق أكاديمية الطمأنينة قريبًا.",
    };
  } catch (error) {
    if (error instanceof Error && error.message === "DUPLICATE_SUBMISSION") {
      return {
        success: false,
        message:
          "تم استلام طلب مماثل مؤخرًا. إذا كنت بحاجة للمساعدة، تواصل معنا عبر واتساب.",
      };
    }

    console.error("Registration submission error:", error);
    return {
      success: false,
      message: "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.",
    };
  }
}
