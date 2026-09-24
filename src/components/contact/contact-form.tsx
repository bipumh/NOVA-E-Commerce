"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2, Mail, TriangleAlert } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  subject: "Order enquiry",
  message: "",
};

const SUBJECTS = [
  "Order enquiry",
  "Product question",
  "Returns & exchanges",
  "Partnerships",
  "Something else",
];

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.email.trim()) next.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address";
    if (!form.message.trim()) next.message = "Please enter a message";
    else if (form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      // Replace this delay with a real API call when a backend is connected.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-surface p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-clay">
          <Check aria-hidden className="h-7 w-7" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-medium text-ink">
          Message sent
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Thanks, {form.name.split(" ")[0] || "friend"}. We&apos;ve received your
          message and will reply to <span className="text-ink">{form.email}</span>{" "}
          within 1–2 business days.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-8"
          onClick={() => {
            setForm(INITIAL);
            setStatus("idle");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      {status === "error" ? (
        <p
          role="alert"
          className="mb-5 flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          <TriangleAlert aria-hidden className="h-4 w-4 shrink-0" />
          Something went wrong sending your message. Please try again.
        </p>
      ) : null}

      <div className="space-y-5">
        <Field label="Name" htmlFor="contact-name" error={errors.name} required>
          <Input
            id="contact-name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </Field>

        <Field label="Email" htmlFor="contact-email" error={errors.email} required>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>

        <Field label="Subject" htmlFor="contact-subject" required>
          <Select
            id="contact-subject"
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
          >
            {SUBJECTS.map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </Select>
        </Field>

        <Field label="Message" htmlFor="contact-message" error={errors.message} required>
          <Textarea
            id="contact-message"
            rows={6}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Mail aria-hidden className="h-4 w-4" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}
