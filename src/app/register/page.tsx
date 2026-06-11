import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RegistrationForm } from "@/components/registration/registration-form";
import { Logo } from "@/components/shared/logo";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: "التسجيل",
  description: `سجّل في ${APP_NAME} وابدأ رحلتك في تعلّم القرآن واللغة العربية`,
};

export default function RegisterPage() {
  return (
    <div className="islamic-pattern min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground transition hover:text-primary"
          >
            <ArrowRight className="size-4" />
            العودة للرئيسية
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">نموذج التسجيل</h1>
          <p className="mt-2 text-muted-foreground">
            املأ النموذج وسيتواصل معك فريق {APP_NAME} في أقرب وقت
          </p>
        </div>

        <div className="rounded-2xl border border-border/40 bg-card/30 p-4 sm:p-6 lg:p-8">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
