import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: PageProps<"/login">) {
  const sp = await searchParams;
  const checkEmail = sp.signup === "check-email";
  const next = typeof sp.next === "string" ? sp.next : undefined;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-5 py-16 sm:py-24">
      <div className="text-center">
        <Logo />
        <h1 className="mt-8 font-display text-3xl font-medium text-ink">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">Sign in to your NOVA account.</p>
      </div>

      {checkEmail ? (
        <p className="mt-6 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink">
          Account created — please check your email to confirm your address, then
          sign in below.
        </p>
      ) : null}

      <div className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <AuthForm mode="login" next={next} />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        New to NOVA?{" "}
        <Link href="/signup" className="link-underline font-medium text-clay hover:text-clay-dark">
          Create an account
        </Link>
      </p>
    </div>
  );
}
