import { CheckCircle2, Globe, Heart } from "lucide-react";
import { AnimatedCard } from "@/components/landing/animated-card";

const cards = [
  {
    icon: Heart,
    iconClass: "bg-primary/20 text-primary",
    title: "رسالة الأكاديمية",
    content:
      "تقديم تعليم قرآني ولغوي عالي الجودة يجمع بين الإتقان والرعاية، مع مراعاة احتياجات كل طالب وأسرته في بيئة إسلامية محترمة.",
  },
  {
    icon: Globe,
    iconClass: "bg-accent/20 text-accent",
    title: "نموذج التعليم أونلاين",
    content:
      "حصص مباشرة عبر الإنترنت مع معلم متخصص، وخطط فردية، ومتابعة دورية، وتقارير تقدم تُبقي ولي الأمر على اطلاع دائم.",
  },
  {
    icon: CheckCircle2,
    iconClass: "bg-primary/20 text-primary",
    title: "لماذا تثق بنا؟",
    list: [
      "منهج تعليمي واضح ومنظم",
      "تواصل مستمر مع الإدارة",
      "مرونة في المواعيد والبرامج",
    ],
  },
] as const;

export function About() {
  return (
    <section id="about" className="section-padding islamic-pattern">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold text-primary">عن الأكاديمية</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            رسالتنا: تعليم هادئ بثقة وإتقان
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            نؤمن أن تعلّم القرآن واللغة العربية يجب أن يكون رحلة مريحة ومنظمة
            تمنح الطالب وولي الأمر الطمأنينة والثقة في كل خطوة.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {cards.map((card, index) => (
            <AnimatedCard
              key={card.title}
              index={index}
              className="glass-card rounded-2xl p-8"
            >
              <div
                className={`mb-4 flex size-12 items-center justify-center rounded-xl ${card.iconClass}`}
              >
                <card.icon className="size-6" />
              </div>
              <h3 className="text-xl font-bold">{card.title}</h3>
              {"content" in card && card.content ? (
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {card.content}
                </p>
              ) : (
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {card.list?.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
