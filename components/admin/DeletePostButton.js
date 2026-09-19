"use client";

import { deletePostAction } from "@/lib/actions/posts";

export default function DeletePostButton({ id, title }) {
  return (
    <form
      action={deletePostAction.bind(null, id)}
      onSubmit={(event) => {
        if (!window.confirm(`Delete "${title}"? This can't be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-sm font-medium text-ink-faint hover:text-brand-hover">
        Delete
      </button>
    </form>
  );
}
