import { AnimatedCard } from "@/components/landing/animated-card";
import { STATISTICS } from "@/lib/constants";

export function Statistics() {
  return (
    <section className="section-padding islamic-pattern">
      <div className="mx-auto max-w-7xl">
        <AnimatedCard
          index={0}
          hover={false}
          className="glass-card rounded-3xl p-8 sm:p-12"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              أرقام تعكس ثقة أولياء الأمور
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATISTICS.map((stat, index) => (
              <AnimatedCard
                key={stat.label}
                index={index + 1}
                hover={false}
                className="text-center"
              >
                <div className="text-4xl font-extrabold gradient-text sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
}
