import {
  Clock,
  FileText,
  Heart,
  LineChart,
  Target,
  Users,
  Video,
} from "lucide-react";
import { AnimatedCard } from "@/components/landing/animated-card";
import { WHY_CHOOSE_US } from "@/lib/constants";

const iconMap = {
  Users,
  LineChart,
  Target,
  Clock,
  Video,
  FileText,
  Heart,
} as const;

export function WhyUs() {
  return (
    <section id="why-us" className="section-padding islamic-pattern">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold text-primary">لماذا نحن</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            مميزات تجعل تجربتك معنا مختلفة
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Users;
            return (
              <AnimatedCard
                key={item.title}
                index={index}
                className="rounded-2xl border border-border/50 bg-card/50 p-6 hover:border-primary/30"
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
