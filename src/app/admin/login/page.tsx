import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect("/admin");
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <LoginForm />
    </main>
  );
}
