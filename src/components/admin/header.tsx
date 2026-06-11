import { auth } from "@/lib/auth";

export async function AdminHeader({ title }: { title: string }) {
  const session = await auth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="text-sm text-muted-foreground">
        {session?.user?.name ?? session?.user?.email}
      </div>
    </header>
  );
}
