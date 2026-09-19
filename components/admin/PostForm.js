"use client";

import { useActionState } from "react";

export default function PostForm({ action, post, submitLabel }) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div>
        <label className="field-label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={post?.title}
          className="field-input"
          placeholder="How we cut cost per lead by 40% for a fintech client"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="excerpt">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={post?.excerpt}
          className="field-input resize-none"
          placeholder="One or two sentences shown on the blog list and used as the search-result description."
        />
      </div>

      <div>
        <label className="field-label" htmlFor="coverImageUrl">
          Cover image URL <span className="text-ink-faint">(optional)</span>
        </label>
        <input
          id="coverImageUrl"
          name="coverImageUrl"
          type="url"
          defaultValue={post?.coverImageUrl || ""}
          className="field-input"
          placeholder="https://\u2026"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="content">
          Content <span className="text-ink-faint">(Markdown \u2014 ## for headings, ** for bold, - for lists)</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={16}
          defaultValue={post?.content}
          className="field-input resize-y font-mono text-sm leading-relaxed"
          placeholder={"## Start with the result\n\nWrite the post here in Markdown."}
        />
      </div>

      <label className="flex items-center gap-3 text-sm text-ink-dim">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? false}
          className="h-4 w-4 rounded border-hairline bg-panel accent-brand"
        />
        Published \u2014 visible on the public blog
      </label>

      {state?.error && <p className="text-sm text-brand-hover">{state.error}</p>}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
          {pending ? "Saving\u2026" : submitLabel}
        </button>
      </div>
    </form>
  );
}
