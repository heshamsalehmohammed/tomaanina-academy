import { z } from "zod";

const registrationFields = {
  studentName: z
    .string()
    .min(2, "اسم الطالب يجب أن يكون حرفين على الأقل")
    .max(100, "اسم الطالب طويل جدًا"),
  studentAge: z
    .string()
    .min(1, "عمر الطالب مطلوب")
    .refine((val) => !Number.isNaN(Number(val)), "عمر الطالب مطلوب"),
  studentGender: z.enum(["MALE", "FEMALE"], {
    message: "يرجى اختيار النوع",
  }),
  currentLevel: z
    .string()
    .min(2, "مستوى الطالب الحالي مطلوب")
    .max(200, "النص طويل جدًا"),
  hasQuranMemorization: z.enum(["true", "false"], {
    message: "يرجى الإجابة على هذا السؤال",
  }),
  memorizedAmount: z.string().max(500).optional().or(z.literal("")),
  arabicReadingLevel: z
    .string()
    .min(2, "مستوى القراءة باللغة العربية مطلوب")
    .max(200, "النص طويل جدًا"),
  parentName: z
    .string()
    .min(2, "اسم ولي الأمر يجب أن يكون حرفين على الأقل")
    .max(100, "الاسم طويل جدًا"),
  phone: z
    .string()
    .min(8, "رقم الهاتف غير صالح")
    .max(20, "رقم الهاتف طويل جدًا")
    .regex(/^[\d\s+\-()]+$/, "رقم الهاتف غير صالح"),
  whatsapp: z
    .string()
    .min(8, "رقم واتساب غير صالح")
    .max(20, "رقم واتساب طويل جدًا")
    .regex(/^[\d\s+\-()]+$/, "رقم واتساب غير صالح"),
  email: z
    .string()
    .email("البريد الإلكتروني غير صالح")
    .max(150, "البريد الإلكتروني طويل جدًا"),
  country: z
    .string()
    .min(2, "الدولة مطلوبة")
    .max(100, "اسم الدولة طويل جدًا"),
  city: z
    .string()
    .min(2, "المدينة مطلوبة")
    .max(100, "اسم المدينة طويل جدًا"),
  requestedProgram: z.string().min(1, "يرجى اختيار البرنامج المطلوب"),
  classType: z.enum(["INDIVIDUAL", "GROUP"], {
    message: "يرجى اختيار نوع الحصة",
  }),
  weeklySessions: z
    .string()
    .min(1, "عدد الحصص الأسبوعية مطلوب")
    .max(50, "النص طويل جدًا"),
  preferredTimes: z
    .string()
    .min(2, "المواعيد المناسبة مطلوبة")
    .max(500, "النص طويل جدًا"),
  wantsTrialLesson: z.enum(["true", "false"], {
    message: "يرجى الإجابة على هذا السؤال",
  }),
  additionalNotes: z.string().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
};

export const registrationFormSchema = z.object(registrationFields);

export const registrationSchema = registrationFormSchema.extend({
  studentAge: z
    .string()
    .min(1, "عمر الطالب مطلوب")
    .transform((val) => Number(val))
    .pipe(
      z
        .number()
        .int("يجب أن يكون العمر رقمًا صحيحًا")
        .min(3, "العمر يجب أن يكون 3 سنوات على الأقل")
        .max(80, "العمر غير صالح"),
    ),
});

export type RegistrationFormInput = z.infer<typeof registrationFormSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const adminUpdateRegistrationSchema = z.object({
  status: z.enum([
    "NEW",
    "CONTACTED",
    "IN_PROGRESS",
    "ACCEPTED",
    "REJECTED",
  ]),
  adminNotes: z.string().max(5000).optional().or(z.literal("")),
  note: z.string().max(2000).optional().or(z.literal("")),
});

export type AdminUpdateRegistrationData = z.infer<
  typeof adminUpdateRegistrationSchema
>;
