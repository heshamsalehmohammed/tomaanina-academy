import {
  Baby,
  BookOpen,
  Gift,
  GraduationCap,
  Mic,
  PenLine,
  Sparkles,
} from "lucide-react";
import { AnimatedCard } from "@/components/landing/animated-card";
import { PROGRAMS } from "@/lib/constants";

const iconMap = {
  BookOpen,
  Mic,
  GraduationCap,
  Baby,
  PenLine,
  Mosque: Sparkles,
  Gift,
} as const;

export function Programs() {
  return (
    <section id="programs" className="section-padding bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold text-accent">برامجنا</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            برامج تعليمية شاملة لكل الأعمار
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            اختر البرنامج المناسب لك أو لأبنائك، من تحفيظ القرآن إلى تأسيس
            اللغة العربية والعلوم الشرعية.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program, index) => {
            const Icon =
              iconMap[program.icon as keyof typeof iconMap] ?? BookOpen;
            return (
              <AnimatedCard
                key={program.id}
                index={index}
                className="group glass-card rounded-2xl p-6 hover:border-primary/40"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary transition duration-300 group-hover:scale-110">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-lg font-bold">{program.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {program.description}
                </p>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
