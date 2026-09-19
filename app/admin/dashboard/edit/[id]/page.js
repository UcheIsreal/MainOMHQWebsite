import Link from "next/link";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { updatePostAction } from "@/lib/actions/posts";
import { getPostById } from "@/lib/db";

export default async function EditPostPage({ params }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) notFound();

  const action = updatePostAction.bind(null, id);

  return (
    <div className="max-w-2xl">
      <Link href="/admin/dashboard" className="text-sm font-medium text-ink-dim hover:text-ink">
        &larr; Back to posts
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-ink">Edit post</h1>

      <div className="mt-8">
        <PostForm action={action} post={post} submitLabel="Save changes" />
      </div>
    </div>
  );
}
