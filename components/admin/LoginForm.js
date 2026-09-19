"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";

export default function LoginForm({ next }) {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="next" value={next || "/admin/dashboard"} />

      <div>
        <label className="field-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="field-input"
          placeholder="admin@onlinemarketinghq.co"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="field-input"
          placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-brand-hover">{state.error}</p>
      )}

      <button type="submit" disabled={pending} className="btn-primary justify-center disabled:opacity-60">
        {pending ? "Signing in\u2026" : "Sign in"}
      </button>
    </form>
  );
}
