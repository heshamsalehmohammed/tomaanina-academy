"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROGRAM_OPTIONS, REGISTRATION_STATUS_LABELS } from "@/lib/constants";

type RegistrationsFiltersProps = {
  countries: string[];
};

export function RegistrationsFilters({ countries }: RegistrationsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      params.delete("page");
      startTransition(() => {
        router.push(`/admin/registrations?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const clearFilters = () => {
    startTransition(() => {
      router.push("/admin/registrations");
    });
  };

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="بحث بالاسم، الهاتف، البريد..."
            className="pr-10"
            defaultValue={searchParams.get("search") ?? ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateParams({ search: e.currentTarget.value || undefined });
              }
            }}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => {
            const input = document.querySelector<HTMLInputElement>(
              'input[placeholder="بحث بالاسم، الهاتف، البريد..."]',
            );
            updateParams({ search: input?.value || undefined });
          }}
          disabled={isPending}
        >
          بحث
        </Button>
        <Button variant="ghost" onClick={clearFilters} disabled={isPending}>
          <X className="size-4" />
          مسح الفلاتر
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <FilterSelect
          placeholder="الحالة"
          value={searchParams.get("status") ?? ""}
          options={Object.entries(REGISTRATION_STATUS_LABELS).map(
            ([value, label]) => ({ value, label }),
          )}
          onChange={(v) => updateParams({ status: v })}
        />
        <FilterSelect
          placeholder="البرنامج"
          value={searchParams.get("program") ?? ""}
          options={PROGRAM_OPTIONS}
          onChange={(v) => updateParams({ program: v })}
        />
        <FilterSelect
          placeholder="نوع الحصة"
          value={searchParams.get("classType") ?? ""}
          options={[
            { value: "INDIVIDUAL", label: "فردية" },
            { value: "GROUP", label: "جماعية" },
          ]}
          onChange={(v) => updateParams({ classType: v })}
        />
        <FilterSelect
          placeholder="حصة تجريبية"
          value={searchParams.get("trial") ?? ""}
          options={[
            { value: "true", label: "نعم" },
            { value: "false", label: "لا" },
          ]}
          onChange={(v) => updateParams({ trial: v })}
        />
        <FilterSelect
          placeholder="الدولة"
          value={searchParams.get("country") ?? ""}
          options={countries.map((c) => ({ value: c, label: c }))}
          onChange={(v) => updateParams({ country: v })}
        />
        <Input
          type="date"
          defaultValue={searchParams.get("dateFrom") ?? ""}
          onChange={(e) => updateParams({ dateFrom: e.target.value || undefined })}
          className="w-full"
        />
        <Input
          type="date"
          defaultValue={searchParams.get("dateTo") ?? ""}
          onChange={(e) => updateParams({ dateTo: e.target.value || undefined })}
          className="w-full"
        />
      </div>
    </div>
  );
}

function FilterSelect({
  placeholder,
  value,
  options,
  onChange,
}: {
  placeholder: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string | undefined) => void;
}) {
  return (
    <Select
      value={value || undefined}
      onValueChange={(v) => onChange(v || undefined)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
