# أكاديمية الطمأنينة

منصة تعليمية عربية متكاملة لتعليم القرآن الكريم واللغة العربية أونلاين — مبنية بـ Next.js ومصممة للنشر على Vercel Hobby.

## الميزات

- صفحة هبوط عربية RTL احترافية
- نموذج تسجيل عام مع التحقق والتخزين في PostgreSQL
- تسجيل دخول إداري آمن (Auth.js + Credentials)
- لوحة تحكم إدارية مع إحصائيات وجدول تسجيلات
- بحث وفلترة وترتيب وترقيم صفحات من جهة الخادم
- تصدير CSV
- سجل حالة وملاحظات إدارية

## المتطلبات

- Node.js 20+
- PostgreSQL (محلي أو Neon / Supabase / Vercel Postgres)

## التشغيل محليًا

```bash
# 1. تثبيت الحزم
npm install

# 2. إعداد المتغيرات البيئية
cp .env.example .env
# عدّل DATABASE_URL و AUTH_SECRET

# 3. توليد عميل Prisma وتطبيق المخطط
npm run db:generate
npm run db:push

# 4. إنشاء مستخدم الإدارة
npm run db:seed

# 5. تشغيل التطوير
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000)

## المسارات

| المسار | الوصف | الحماية |
|--------|--------|---------|
| `/` | الصفحة الرئيسية | عام |
| `/register` | نموذج التسجيل | عام |
| `/login` | تسجيل دخول الإدارة | عام |
| `/admin` | لوحة التحكم | محمي |
| `/admin/registrations` | إدارة التسجيلات | محمي |
| `/admin/registrations/[id]` | تفاصيل التسجيل | محمي |

## المتغيرات البيئية

| المتغير | مطلوب | الوصف |
|---------|--------|--------|
| `DATABASE_URL` | نعم | رابط PostgreSQL |
| `AUTH_SECRET` | نعم | مفتاح تشفير الجلسات (32+ حرف) |
| `ADMIN_SEED_EMAIL` | للبذر | بريد مدير النظام |
| `ADMIN_SEED_PASSWORD` | للبذر | كلمة مرور المدير |
| `NEXT_PUBLIC_APP_NAME` | لا | اسم التطبيق |
| `NEXT_PUBLIC_APP_URL` | لا | رابط الموقع |

## إنشاء مستخدم الإدارة

```bash
# عيّن في .env:
ADMIN_SEED_EMAIL="admin@tomaanina.com"
ADMIN_SEED_PASSWORD="كلمة-مرور-قوية"

npm run db:seed
```

## النشر على Vercel Hobby

### 1. إعداد قاعدة البيانات

أنشئ قاعدة PostgreSQL عبر [Neon](https://neon.tech) أو [Supabase](https://supabase.com) أو Vercel Postgres.

استخدم **رابط الاتصال المُجمّع (pooled)** في `DATABASE_URL` للإنتاج.

### 2. رفع المشروع إلى Vercel

```bash
# اربط المستودع بـ Vercel أو استخدم CLI
npx vercel
```

### 3. إعداد متغيرات البيئة في Vercel

في **Project Settings → Environment Variables** أضف:

- `DATABASE_URL` — رابط PostgreSQL المُجمّع
- `AUTH_SECRET` — أنشئه: `openssl rand -base64 32`
- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_PASSWORD`
- `NEXT_PUBLIC_APP_NAME` = `أكاديمية الطمأنينة`
- `NEXT_PUBLIC_APP_URL` = رابط موقعك على Vercel

### 4. تطبيق المخطط وإنشاء المدير

من جهازك المحلي (بعد ضبط `DATABASE_URL` لقاعدة الإنتاج):

```bash
npm run db:push
npm run db:seed
```

أو استخدم `prisma migrate deploy` إذا استخدمت migrations.

### 5. النشر

```bash
git push
# أو
npx vercel --prod
```

### 6. التحقق بعد النشر

1. افتح `/` — تأكد من ظهور الصفحة الرئيسية
2. افتح `/register` — جرّب إرسال تسجيل
3. افتح `/login` — سجّل دخول المدير
4. افتح `/admin` — تأكد من حماية المسار

### ملاحظات Vercel Hobby

- لا يوجد خادم Express منفصل — كل المنطق عبر Server Actions و Route Handlers
- الجلسات عبر JWT في cookies (متوافقة مع serverless)
- استخدم اتصال Prisma مع تجميع الاتصالات
- الصفحة الرئيسية ثابتة قدر الإمكان؛ صفحات الإدارة ديناميكية

## الأوامر

```bash
npm run dev          # التطوير
npm run build        # البناء للإنتاج
npm run typecheck    # فحص الأنواع
npm run lint         # ESLint
npm run db:generate  # توليد Prisma Client
npm run db:migrate   # migrations
npm run db:push      # دفع المخطط مباشرة
npm run db:seed      # بذر مستخدم الإدارة
```

## نماذج قاعدة البيانات

- `AdminUser` — مستخدمو الإدارة
- `ProgramRegistration` — طلبات التسجيل
- `RegistrationNote` — ملاحظات إدارية
- `RegistrationStatusHistory` — سجل تغيير الحالة

## الترخيص

خاص — أكاديمية الطمأنينة
