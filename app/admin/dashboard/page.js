import Link from "next/link";
import { getAllPosts } from "@/lib/db";
import DeletePostButton from "@/components/admin/DeletePostButton";

// Always read the latest posts instead of baking a snapshot in at build time.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Posts</h1>
          <p className="mt-1 text-sm text-ink-dim">
            {posts.length} {posts.length === 1 ? "post" : "posts"} total
          </p>
        </div>
        <Link href="/admin/dashboard/new" className="btn-primary">
          New post
        </Link>
      </div>

      <div className="mt-8">
        {posts.length === 0 ? (
          <div className="glass-panel rounded-2xl p-10 text-center">
            <p className="text-ink-dim">No posts yet. Create your first one.</p>
          </div>
        ) : (
          <div className="glass-panel divide-y divide-hairline overflow-hidden rounded-2xl">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-ink">{post.title}</p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.published
                          ? "bg-lime/10 text-lime"
                          : "bg-panel-light text-ink-faint"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink-faint">
                    Updated{" "}
                    {new Date(post.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-5">
                  {post.published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-sm font-medium text-ink-dim hover:text-ink"
                    >
                      View
                    </Link>
                  )}
                  <Link
                    href={`/admin/dashboard/edit/${post.id}`}
                    className="text-sm font-medium text-cyan hover:text-ink"
                  >
                    Edit
                  </Link>
                  <DeletePostButton id={post.id} title={post.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
