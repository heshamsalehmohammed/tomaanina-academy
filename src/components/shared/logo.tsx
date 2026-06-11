import Link from "next/link";
import { BookOpen } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
};

export function Logo({ className, showTagline = false }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 group", className)}>
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/30 transition group-hover:bg-primary/30">
        <BookOpen className="size-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-foreground">{APP_NAME}</span>
        {showTagline && (
          <span className="text-xs text-muted-foreground">
            تعليم القرآن والعربية
          </span>
        )}
      </div>
    </Link>
  );
}
