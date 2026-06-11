import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import {
  APP_TAGLINE,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  WHATSAPP_NUMBER,
} from "@/lib/constants";

const quickLinks = [
  { href: "#about", label: "عن الأكاديمية" },
  { href: "#programs", label: "البرامج" },
  { href: "#why-us", label: "لماذا نحن" },
  { href: "/register", label: "التسجيل" },
  { href: "#faq", label: "الأسئلة الشائعة" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Logo showTagline />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {APP_TAGLINE}
            </p>
          </div>

          <div>
            <h3 className="font-bold">روابط سريعة</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold">تواصل معنا</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
                >
                  <MessageCircle className="size-4" />
                  واتساب
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
                >
                  <Phone className="size-4" />
                  {CONTACT_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
                >
                  <Mail className="size-4" />
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} أكاديمية الطمأنينة. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
