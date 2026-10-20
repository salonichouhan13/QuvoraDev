"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-zinc-400">An unexpected error occurred. Please try again.</p>
      <Button className="mt-8" onClick={reset}>Try again</Button>
    </main>
  );
}
