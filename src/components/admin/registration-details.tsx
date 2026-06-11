"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteRegistrationDialog } from "@/components/admin/delete-registration-dialog";
import {
  updateRegistrationAction,
  deleteRegistrationAction,
} from "@/lib/actions/admin";
import {
  CLASS_TYPE_LABELS,
  GENDER_LABELS,
  REGISTRATION_STATUS_LABELS,
} from "@/lib/constants";
import { formatArabicDate } from "@/lib/utils";

type RegistrationDetailsProps = {
  registration: {
    id: string;
    studentName: string;
    studentAge: number;
    studentGender: string;
    currentLevel: string;
    hasQuranMemorization: boolean;
    memorizedAmount: string | null;
    arabicReadingLevel: string;
    parentName: string;
    phone: string;
    whatsapp: string;
    email: string;
    country: string;
    city: string;
    requestedProgram: string;
    classType: string;
    weeklySessions: string;
    preferredTimes: string;
    wantsTrialLesson: boolean;
    additionalNotes: string | null;
    status: string;
    adminNotes: string | null;
    createdAt: Date;
    updatedAt: Date;
    notes: Array<{
      id: string;
      content: string;
      createdAt: Date;
      admin: { name: string | null; email: string } | null;
    }>;
    statusHistory: Array<{
      id: string;
      fromStatus: string | null;
      toStatus: string;
      createdAt: Date;
      admin: { name: string | null; email: string } | null;
    }>;
  };
};

const initialState = { success: false, message: "" };

export function RegistrationDetails({
  registration,
}: RegistrationDetailsProps) {
  const router = useRouter();
  const [status, setStatus] = useState(registration.status);
  const [updateState, updateAction, isUpdating] = useActionState(
    updateRegistrationAction.bind(null, registration.id),
    initialState,
  );

  useEffect(() => {
    if (updateState.message) {
      if (updateState.success) toast.success(updateState.message);
      else toast.error(updateState.message);
    }
  }, [updateState]);

  const handleDelete = async () => {
    const result = await deleteRegistrationAction(registration.id);
    if (result.success) {
      toast.success(result.message);
      router.push("/admin/registrations");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <StatusBadge status={registration.status} />
        <DeleteRegistrationDialog onConfirm={handleDelete}>
          <Button variant="destructive" size="sm">
            <Trash2 className="size-4" />
            حذف التسجيل
          </Button>
        </DeleteRegistrationDialog>
      </div>

      <DetailSection title="معلومات الطالب">
        <DetailItem label="اسم الطالب" value={registration.studentName} />
        <DetailItem label="العمر" value={String(registration.studentAge)} />
        <DetailItem
          label="النوع"
          value={GENDER_LABELS[registration.studentGender] ?? registration.studentGender}
        />
        <DetailItem label="المستوى الحالي" value={registration.currentLevel} />
        <DetailItem
          label="هل يحفظ من القرآن؟"
          value={registration.hasQuranMemorization ? "نعم" : "لا"}
        />
        {registration.memorizedAmount && (
          <DetailItem label="مقدار الحفظ" value={registration.memorizedAmount} />
        )}
        <DetailItem
          label="مستوى القراءة العربية"
          value={registration.arabicReadingLevel}
        />
      </DetailSection>

      <DetailSection title="معلومات ولي الأمر / التواصل">
        <DetailItem label="اسم ولي الأمر" value={registration.parentName} />
        <DetailItem label="الهاتف" value={registration.phone} dir="ltr" />
        <DetailItem label="واتساب" value={registration.whatsapp} dir="ltr" />
        <DetailItem label="البريد الإلكتروني" value={registration.email} dir="ltr" />
        <DetailItem label="الدولة" value={registration.country} />
        <DetailItem label="المدينة" value={registration.city} />
      </DetailSection>

      <DetailSection title="معلومات البرنامج">
        <DetailItem label="البرنامج المطلوب" value={registration.requestedProgram} />
        <DetailItem
          label="نوع الحصة"
          value={CLASS_TYPE_LABELS[registration.classType] ?? registration.classType}
        />
        <DetailItem label="الحصص الأسبوعية" value={registration.weeklySessions} />
        <DetailItem label="المواعيد المناسبة" value={registration.preferredTimes} />
        <DetailItem
          label="حصة تجريبية"
          value={registration.wantsTrialLesson ? "نعم" : "لا"}
        />
        {registration.additionalNotes && (
          <DetailItem label="ملاحظات إضافية" value={registration.additionalNotes} />
        )}
      </DetailSection>

      <Card>
        <CardHeader>
          <CardTitle>إدارة التسجيل</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateAction} className="space-y-4">
            <input type="hidden" name="status" value={status} />
            <div>
              <Label>الحالة</Label>
              <Select
                value={status}
                onValueChange={(value) => value && setStatus(value)}
              >
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(REGISTRATION_STATUS_LABELS).map(
                    ([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>ملاحظات إدارية</Label>
              <Textarea
                name="adminNotes"
                defaultValue={registration.adminNotes ?? ""}
                className="mt-1.5"
                rows={3}
                placeholder="ملاحظات داخلية للإدارة"
              />
            </div>

            <div>
              <Label>إضافة ملاحظة جديدة</Label>
              <Textarea
                name="note"
                className="mt-1.5"
                rows={2}
                placeholder="أضف ملاحظة مع سجل زمني"
              />
            </div>

            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                "حفظ التغييرات"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {registration.statusHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>سجل تغيير الحالة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {registration.statusHistory.map((entry) => (
              <div
                key={entry.id}
                className="rounded-lg border border-border p-3 text-sm"
              >
                <div className="flex items-center gap-2">
                  {entry.fromStatus && (
                    <>
                      <StatusBadge status={entry.fromStatus} />
                      <span>←</span>
                    </>
                  )}
                  <StatusBadge status={entry.toStatus} />
                </div>
                <p className="mt-1 text-muted-foreground">
                  {formatArabicDate(new Date(entry.createdAt))}
                  {entry.admin && ` — ${entry.admin.name ?? entry.admin.email}`}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {registration.notes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>الملاحظات الداخلية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {registration.notes.map((note) => (
              <div
                key={note.id}
                className="rounded-lg border border-border p-3 text-sm"
              >
                <p>{note.content}</p>
                <p className="mt-1 text-muted-foreground">
                  {formatArabicDate(new Date(note.createdAt))}
                  {note.admin && ` — ${note.admin.name ?? note.admin.email}`}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <p className="text-sm text-muted-foreground">
        تاريخ التسجيل: {formatArabicDate(new Date(registration.createdAt))}
      </p>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">{children}</CardContent>
    </Card>
  );
}

function DetailItem({
  label,
  value,
  dir,
}: {
  label: string;
  value: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium" dir={dir}>
        {value}
      </p>
    </div>
  );
}
