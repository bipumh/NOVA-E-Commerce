import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-5 py-16 sm:py-24">
      <div className="text-center">
        <Logo />
        <h1 className="mt-8 font-display text-3xl font-medium text-ink">Create your account</h1>
        <p className="mt-2 text-sm text-muted">
          Join NOVA for faster checkout and order tracking.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <AuthForm mode="signup" />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="link-underline font-medium text-clay hover:text-clay-dark">
          Sign in
        </Link>
      </p>
    </div>
  );
}
