import { CheckCircle2, Globe, Heart } from "lucide-react";

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
          <div className="glass-card rounded-2xl p-8">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <Heart className="size-6" />
            </div>
            <h3 className="text-xl font-bold">رسالة الأكاديمية</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              تقديم تعليم قرآني ولغوي عالي الجودة يجمع بين الإتقان والرعاية،
              مع مراعاة احتياجات كل طالب وأسرته في بيئة إسلامية محترمة.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
              <Globe className="size-6" />
            </div>
            <h3 className="text-xl font-bold">نموذج التعليم أونلاين</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              حصص مباشرة عبر الإنترنت مع معلم متخصص، وخطط فردية، ومتابعة
              دورية، وتقارير تقدم تُبقي ولي الأمر على اطلاع دائم.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <CheckCircle2 className="size-6" />
            </div>
            <h3 className="text-xl font-bold">لماذا تثق بنا؟</h3>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                منهج تعليمي واضح ومنظم
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                تواصل مستمر مع الإدارة
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                مرونة في المواعيد والبرامج
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
