import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="gradient-text font-display text-7xl font-semibold">404</p>
      <h1 className="font-display mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-zinc-400">The page you're looking for doesn't exist or has moved.</p>
      <Link href="/" className={buttonVariants({ className: "mt-8" })}>Back to home</Link>
    </main>
  );
}
