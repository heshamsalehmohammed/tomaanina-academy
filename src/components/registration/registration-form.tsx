"use client";

import { useActionState, useEffect } from "react";
import { useForm, type UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitRegistration } from "@/lib/actions/registration";
import {
  registrationFormSchema,
  type RegistrationFormInput,
} from "@/lib/validations/registration";
import { PROGRAM_OPTIONS } from "@/lib/constants";

const initialState = { success: false, message: "" };

function handleSelectChange(
  setValue: UseFormSetValue<RegistrationFormInput>,
  field: keyof RegistrationFormInput,
  value: unknown,
) {
  if (typeof value === "string" && value) {
    setValue(field, value as RegistrationFormInput[typeof field]);
  }
}

export function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(
    submitRegistration,
    initialState,
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormInput>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      hasQuranMemorization: "false",
      wantsTrialLesson: "false",
      website: "",
    },
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        reset();
      } else {
        toast.error(state.message);
      }
    }
  }, [state, reset]);

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    formAction(formData);
  });

  const hasMemorization = watch("hasQuranMemorization");

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <input type="hidden" {...register("website")} />
      <input type="hidden" {...register("studentGender")} />
      <input type="hidden" {...register("hasQuranMemorization")} />
      <input type="hidden" {...register("requestedProgram")} />
      <input type="hidden" {...register("classType")} />
      <input type="hidden" {...register("wantsTrialLesson")} />

      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle>معلومات الطالب</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="اسم الطالب" error={errors.studentName?.message} required>
            <Input {...register("studentName")} placeholder="أدخل اسم الطالب" />
          </Field>
          <Field label="عمر الطالب" error={errors.studentAge?.message} required>
            <Input
              type="number"
              {...register("studentAge")}
              placeholder="مثال: 8"
            />
          </Field>
          <Field label="النوع" error={errors.studentGender?.message} required>
            <Select
              onValueChange={(v) => handleSelectChange(setValue, "studentGender", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">ذكر</SelectItem>
                <SelectItem value="FEMALE">أنثى</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field
            label="مستوى الطالب الحالي"
            error={errors.currentLevel?.message}
            required
          >
            <Input
              {...register("currentLevel")}
              placeholder="مثال: مبتدئ / متوسط"
            />
          </Field>
          <Field
            label="هل يحفظ شيئًا من القرآن؟"
            error={errors.hasQuranMemorization?.message}
            required
          >
            <Select
              onValueChange={(v) =>
                setValue("hasQuranMemorization", v as "true" | "false")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">نعم</SelectItem>
                <SelectItem value="false">لا</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          {hasMemorization === "true" && (
            <Field
              label="مقدار الحفظ الحالي"
              error={errors.memorizedAmount?.message}
            >
              <Input
                {...register("memorizedAmount")}
                placeholder="مثال: جزء عمّ / 5 أجزاء"
              />
            </Field>
          )}
          <Field
            label="مستوى القراءة باللغة العربية"
            error={errors.arabicReadingLevel?.message}
            required
            className="sm:col-span-2"
          >
            <Input
              {...register("arabicReadingLevel")}
              placeholder="مثال: يقرأ ببطء / يقرأ بطلاقة"
            />
          </Field>
        </CardContent>
      </Card>

      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle>معلومات ولي الأمر / التواصل</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field
            label="اسم ولي الأمر"
            error={errors.parentName?.message}
            required
          >
            <Input {...register("parentName")} placeholder="أدخل الاسم" />
          </Field>
          <Field label="رقم الهاتف" error={errors.phone?.message} required>
            <Input {...register("phone")} placeholder="+966..." dir="ltr" />
          </Field>
          <Field label="رقم واتساب" error={errors.whatsapp?.message} required>
            <Input {...register("whatsapp")} placeholder="+966..." dir="ltr" />
          </Field>
          <Field
            label="البريد الإلكتروني"
            error={errors.email?.message}
            required
          >
            <Input
              type="email"
              {...register("email")}
              placeholder="example@email.com"
              dir="ltr"
            />
          </Field>
          <Field label="الدولة" error={errors.country?.message} required>
            <Input {...register("country")} placeholder="مثال: السعودية" />
          </Field>
          <Field label="المدينة" error={errors.city?.message} required>
            <Input {...register("city")} placeholder="مثال: الرياض" />
          </Field>
        </CardContent>
      </Card>

      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle>معلومات البرنامج</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field
            label="البرنامج المطلوب"
            error={errors.requestedProgram?.message}
            required
          >
            <Select
              onValueChange={(v) =>
                handleSelectChange(setValue, "requestedProgram", v)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر البرنامج" />
              </SelectTrigger>
              <SelectContent>
                {PROGRAM_OPTIONS.map((program) => (
                  <SelectItem key={program.value} value={program.value}>
                    {program.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="نوع الحصة" error={errors.classType?.message} required>
            <Select
              onValueChange={(v) => handleSelectChange(setValue, "classType", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الحصة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INDIVIDUAL">فردية</SelectItem>
                <SelectItem value="GROUP">جماعية</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field
            label="عدد الحصص الأسبوعية المفضل"
            error={errors.weeklySessions?.message}
            required
          >
            <Input {...register("weeklySessions")} placeholder="مثال: 3 حصص" />
          </Field>
          <Field
            label="هل يريد حصة تجريبية مجانية؟"
            error={errors.wantsTrialLesson?.message}
            required
          >
            <Select
              onValueChange={(v) =>
                handleSelectChange(setValue, "wantsTrialLesson", v)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">نعم</SelectItem>
                <SelectItem value="false">لا</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field
            label="المواعيد المناسبة"
            error={errors.preferredTimes?.message}
            required
            className="sm:col-span-2"
          >
            <Textarea
              {...register("preferredTimes")}
              placeholder="اذكر الأوقات المناسبة لك"
              rows={3}
            />
          </Field>
          <Field
            label="ملاحظات إضافية"
            error={errors.additionalNotes?.message}
            className="sm:col-span-2"
          >
            <Textarea
              {...register("additionalNotes")}
              placeholder="أي ملاحظات تود إضافتها"
              rows={3}
            />
          </Field>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full h-12" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            جاري الإرسال...
          </>
        ) : (
          "إرسال طلب التسجيل"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
  className,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 block">
        {label}
        {required && <span className="text-destructive mr-1">*</span>}
      </Label>
      {children}
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
