import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} | تعليم القرآن واللغة العربية أونلاين`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "تحفيظ القرآن أونلاين",
    "تعليم التجويد",
    "تعليم القرآن للأطفال",
    "تأسيس اللغة العربية",
    "أكاديمية قرآن عن بعد",
    "حصة تجريبية قرآن",
    "أكاديمية الطمأنينة",
  ],
  openGraph: {
    title: `${APP_NAME} | تعليم القرآن واللغة العربية أونلاين`,
    description: APP_DESCRIPTION,
    locale: "ar_SA",
    type: "website",
    siteName: APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | تعليم القرآن واللغة العربية أونلاين`,
    description: APP_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full`}>
      <body className="min-h-full antialiased">
        <TooltipProvider>
          {children}
          <Toaster position="top-center" dir="rtl" richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}
