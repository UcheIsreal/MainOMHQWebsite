import Link from "next/link";
import PostForm from "@/components/admin/PostForm";
import { createPostAction } from "@/lib/actions/posts";

export default function NewPostPage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/dashboard" className="text-sm font-medium text-ink-dim hover:text-ink">
        &larr; Back to posts
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-ink">New post</h1>

      <div className="mt-8">
        <PostForm action={createPostAction} submitLabel="Save post" />
      </div>
    </div>
  );
}
