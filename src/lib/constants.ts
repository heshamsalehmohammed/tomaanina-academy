export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "أكاديمية الطمأنينة";
export const APP_TAGLINE =
  "رحلة آمنة ومتقنة لتعلّم القرآن واللغة العربية عن بُعد";
export const APP_DESCRIPTION =
  "أكاديمية الطمأنينة تقدم برامج تعليم القرآن الكريم، التجويد، تصحيح التلاوة، وتأسيس اللغة العربية للأطفال والكبار من خلال حصص أونلاين مباشرة ومتابعة تعليمية منظمة.";

export const PROGRAMS = [
  {
    id: "quran-memorization",
    title: "تحفيظ القرآن الكريم",
    description:
      "برنامج منظم لحفظ كتاب الله مع مراجعة دورية ومتابعة فردية لكل طالب.",
    icon: "BookOpen",
  },
  {
    id: "recitation-correction",
    title: "تصحيح التلاوة",
    description:
      "تحسين مخارج الحروف وتجويد القراءة بإشراف معلمين متخصصين.",
    icon: "Mic",
  },
  {
    id: "tajweed",
    title: "تعليم التجويد",
    description:
      "تعلّم أحكام التجويد نظريًا وعمليًا بأسلوب مبسّط ومنهجي.",
    icon: "GraduationCap",
  },
  {
    id: "arabic-foundation",
    title: "تأسيس اللغة العربية للأطفال",
    description:
      "بناء أساس قوي في اللغة العربية للأطفال عبر أنشطة تفاعلية ممتعة.",
    icon: "Baby",
  },
  {
    id: "reading-writing",
    title: "القراءة والكتابة والإملاء",
    description:
      "تطوير مهارات القراءة والكتابة والإملاء بخطوات تدريجية واضحة.",
    icon: "PenLine",
  },
  {
    id: "islamic-sciences",
    title: "العلوم الشرعية للأطفال",
    description:
      "تعليم مبسّط للعقيدة والفقه والسيرة بما يناسب عمر الطفل.",
    icon: "Mosque",
  },
  {
    id: "trial-lesson",
    title: "برنامج الحصة التجريبية المجانية",
    description:
      "تجربة مجانية لمعرفة المستوى والبرنامج المناسب قبل الاشتراك.",
    icon: "Gift",
  },
] as const;

export const PROGRAM_OPTIONS = PROGRAMS.map((p) => ({
  value: p.title,
  label: p.title,
}));

export const WHY_CHOOSE_US = [
  {
    title: "معلمون متخصصون",
    description: "نخبة من المعلمين والمعلمات المؤهلين في القرآن والتجويد.",
    icon: "Users",
  },
  {
    title: "متابعة دورية للطالب",
    description: "متابعة مستمرة لمستوى الطالب وتقدّمه في كل مرحلة.",
    icon: "LineChart",
  },
  {
    title: "خطط تعليمية فردية",
    description: "خطة تعليمية مصممة وفق احتياجات ومستوى كل طالب.",
    icon: "Target",
  },
  {
    title: "مواعيد مرنة",
    description: "مرونة في اختيار الأوقات المناسبة لك ولعائلتك.",
    icon: "Clock",
  },
  {
    title: "تعليم تفاعلي مباشر",
    description: "حصص مباشرة أونلاين بتفاعل حقيقي بين المعلم والطالب.",
    icon: "Video",
  },
  {
    title: "تقارير تقدم للطلاب",
    description: "تقارير دورية توضح مستوى الطالب ونقاط القوة والتحسين.",
    icon: "FileText",
  },
  {
    title: "مناسب للأطفال والكبار",
    description: "برامج متنوعة تناسب مختلف الأعمار والمستويات.",
    icon: "Heart",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "تعبئة نموذج التسجيل",
    description: "املأ نموذج التسجيل بمعلومات الطالب والبرنامج المطلوب.",
  },
  {
    step: 2,
    title: "تواصل الإدارة مع ولي الأمر أو الطالب",
    description: "يتواصل فريقنا معك لتأكيد البيانات والإجابة على استفساراتك.",
  },
  {
    step: 3,
    title: "تحديد المستوى والبرنامج المناسب",
    description: "نقيّم مستوى الطالب ونقترح البرنامج والخطة الأنسب.",
  },
  {
    step: 4,
    title: "بدء الحصص المباشرة أونلاين",
    description: "تبدأ رحلة التعلّم عبر حصص مباشرة مع معلم متخصص.",
  },
] as const;

export const STATISTICS = [
  { value: "500+", label: "عدد الطلاب" },
  { value: "40+", label: "عدد المعلمين" },
  { value: "1200+", label: "عدد الحلقات" },
  { value: "98%", label: "نسبة رضا أولياء الأمور" },
] as const;

export const TESTIMONIALS = [
  {
    name: "أم عبدالله",
    role: "ولية أمر",
    content:
      "ابني تحسّن كثيرًا في التلاوة والحفظ، والمتابعة ممتازة والمعلم صبور ومحترف.",
  },
  {
    name: "محمد العتيبي",
    role: "طالب",
    content:
      "الحصص منظمة والمواعيد مرنة، وأشعر بتقدّم حقيقي في التجويد والقراءة.",
  },
  {
    name: "أم سارة",
    role: "ولية أمر",
    content:
      "أكاديمية الطمأنينة وفرت لنا بيئة تعليمية هادئة وآمنة لبناتنا عن بُعد.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "هل الحصص أونلاين؟",
    answer:
      "نعم، جميع الحصص مباشرة عبر الإنترنت مع معلم متخصص، ويمكن حضورها من أي مكان.",
  },
  {
    question: "هل توجد حصة تجريبية؟",
    answer:
      "نعم، نوفر حصة تجريبية مجانية لتقييم مستوى الطالب واختيار البرنامج المناسب.",
  },
  {
    question: "هل يوجد معلمات للطالبات؟",
    answer:
      "نعم، لدينا معلمات متخصصات لتعليم الطالبات في بيئة مريحة ومناسبة.",
  },
  {
    question: "هل يمكن اختيار مواعيد مرنة؟",
    answer:
      "بالتأكيد، نحرص على تنسيق المواعيد بما يناسب جدول الطالب وولي الأمر.",
  },
  {
    question: "كيف يتم متابعة مستوى الطالب؟",
    answer:
      "نقدم متابعة دورية وتقارير تقدم توضح مستوى الطالب وتوصيات للتحسين.",
  },
] as const;

export const REGISTRATION_STATUS_LABELS: Record<string, string> = {
  NEW: "جديد",
  CONTACTED: "تم التواصل",
  IN_PROGRESS: "قيد المتابعة",
  ACCEPTED: "مقبول",
  REJECTED: "مرفوض",
};

export const GENDER_LABELS: Record<string, string> = {
  MALE: "ذكر",
  FEMALE: "أنثى",
};

export const CLASS_TYPE_LABELS: Record<string, string> = {
  INDIVIDUAL: "فردية",
  GROUP: "جماعية",
};

export const DEFAULT_PAGE_SIZE = 10;

export const WHATSAPP_NUMBER = "966500000000";
export const CONTACT_EMAIL = "info@tomaanina.com";
export const CONTACT_PHONE = "+966500000000";
