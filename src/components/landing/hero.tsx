import Link from "next/link";
import { ArrowLeft, Sparkles, Shield, Users } from "lucide-react";
import { AnimatedCard } from "@/components/landing/animated-card";
import { buttonVariants } from "@/components/ui/button";
import { APP_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const heroCards = [
  { icon: Shield, label: "بيئة تعليمية آمنة" },
  { icon: Users, label: "معلمون متخصصون" },
  { icon: Sparkles, label: "متابعة تعليمية منظمة" },
] as const;

export function Hero() {
  return (
    <section className="hero-glow islamic-pattern relative min-h-screen overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-20 pt-24 text-center sm:px-6 lg:px-8 lg:pt-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <Sparkles className="size-4" />
          <span>تعليم قرآني متميز عن بُعد</span>
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          أكاديمية الطمأنينة
          <span className="mt-2 block gradient-text">
            رحلتك الآمنة لتعلّم القرآن والعربية
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {APP_TAGLINE}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base")}
          >
            سجّل الآن
            <ArrowLeft className="size-4" />
          </Link>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 border-accent/40 px-8 text-base hover:border-accent hover:bg-accent/10",
            )}
          >
            احجز حصة تجريبية مجانية
          </Link>
        </div>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {heroCards.map((item, index) => (
            <AnimatedCard
              key={item.label}
              index={index}
              className="glass-card flex items-center justify-center gap-3 rounded-2xl px-4 py-4"
            >
              <item.icon className="size-5 text-accent" />
              <span className="text-sm font-medium">{item.label}</span>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
