import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/shared/logo";

export const metadata = {
  title: "تسجيل الدخول",
};

export default function LoginPage() {
  return (
    <div className="admin-light flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50 px-4">
      <div className="mb-8 w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowRight className="size-4" />
          العودة للموقع
        </Link>
        <Logo />
      </div>
      <Suspense fallback={<div className="text-muted-foreground">جاري التحميل...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
