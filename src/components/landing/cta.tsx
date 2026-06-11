import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTA() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-card to-accent/10 p-8 text-center sm:p-16">
          <div className="absolute inset-0 islamic-pattern opacity-50" />
          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">
              ابدأ رحلة الطمأنينة التعليمية اليوم
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              سجّل الآن واحصل على حصة تجريبية مجانية لتقييم مستوى الطالب واختيار
              البرنامج الأنسب.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className={cn(buttonVariants({ size: "lg" }), "h-12 px-8")}
              >
                سجّل الآن
                <ArrowLeft className="size-4" />
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-8",
                )}
              >
                احجز حصة تجريبية مجانية
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
