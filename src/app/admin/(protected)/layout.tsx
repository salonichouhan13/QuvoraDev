import { requireAdmin } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Route group "(protected)" keeps /admin/login OUTSIDE this layout (otherwise login would redirect to itself forever).
export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin(); // second gate, even if middleware is bypassed
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <span className="font-semibold">Quvora Admin</span>
        <div className="flex items-center gap-3 text-sm text-zinc-400">
          {user?.email}
          <LogoutButton />
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
