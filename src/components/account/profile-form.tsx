"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  updateProfileName,
  type ProfileState,
} from "@/lib/profile/actions";

export function ProfileForm({ initialName }: { initialName: string }) {
  const [state, formAction, pending] = useActionState<ProfileState, FormData>(
    updateProfileName,
    {},
  );

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Display name" htmlFor="profile-name">
        <Input
          id="profile-name"
          name="name"
          defaultValue={initialName}
          autoComplete="name"
          required
        />
      </Field>

      {state.error ? (
        <p role="alert" className="text-sm text-red-400">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-clay">Name saved.</p>
      ) : null}

      <Button type="submit" size="sm" disabled={pending}>
        {pending ? (
          <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
        ) : null}
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
