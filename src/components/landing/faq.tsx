import { ChevronDown } from "lucide-react";
import { AnimatedCard } from "@/components/landing/animated-card";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQ() {
  return (
    <section id="faq" className="section-padding islamic-pattern">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-sm font-semibold text-accent">الأسئلة الشائعة</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            إجابات على أكثر الأسئلة شيوعًا
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <AnimatedCard key={item.question} index={index}>
              <details className="group glass-card rounded-xl px-4 py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold marker:content-none">
                  {item.question}
                  <ChevronDown className="size-5 shrink-0 text-muted-foreground transition group-open:rotate-180" />
                </summary>
                <p className="pb-4 text-muted-foreground">{item.answer}</p>
              </details>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
