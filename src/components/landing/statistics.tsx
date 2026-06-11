import { STATISTICS } from "@/lib/constants";

export function Statistics() {
  return (
    <section className="section-padding islamic-pattern">
      <div className="mx-auto max-w-7xl">
        <div className="glass-card rounded-3xl p-8 sm:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              أرقام تعكس ثقة أولياء الأمور
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATISTICS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-extrabold gradient-text sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
