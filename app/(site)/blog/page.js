import Link from "next/link";
import { getPublishedPosts } from "@/lib/db";

// Always read the latest posts instead of baking a snapshot in at build time.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog",
  description: "Notes on ads, SEO, and ecommerce from the accounts we run day to day.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <section className="py-16 md:py-20">
      <div className="page-shell max-w-2xl border-b border-hairline pb-16">
        <p className="text-sm font-medium text-ink-dim">Blog</p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink md:text-5xl">
          Notes from the accounts we run.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-ink-dim">
          What’s actually working in ads, SEO, and ecommerce right now \u2014 written up as we see it.
        </p>
      </div>

      <div className="page-shell py-16">
        {posts.length === 0 ? (
          <div className="glass-panel rounded-2xl p-10 text-center">
            <p className="text-ink-dim">
              Nothing published yet \u2014 the first post will show up here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="glass-panel flex flex-col rounded-2xl p-7 transition-colors hover:border-ink-faint"
              >
                {post.coverImageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.coverImageUrl}
                    alt=""
                    className="mb-5 h-40 w-full rounded-lg object-cover"
                  />
                )}
                <p className="text-xs text-ink-faint">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-3 text-lg font-semibold text-ink">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
