import { Quote } from "lucide-react";
import { AnimatedCard } from "@/components/landing/animated-card";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold text-primary">آراء العملاء</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            ماذا يقول أولياء الأمور والطلاب
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <AnimatedCard
              key={testimonial.name}
              index={index}
              className="glass-card rounded-2xl p-6"
            >
              <Quote className="size-8 text-accent/60" />
              <p className="mt-4 leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mt-6 border-t border-border/50 pt-4">
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
