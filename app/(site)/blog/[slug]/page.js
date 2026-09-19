import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { getPostBySlug } from "@/lib/db";
import { ArrowIcon } from "@/components/icons";

// Always read the latest post content instead of baking a snapshot in at
// build time (also means a newly-published post is reachable immediately).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const html = marked.parse(post.content || "");

  return (
    <article className="py-16 md:py-20">
      <div className="page-shell max-w-2xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-ink-dim hover:text-ink">
          <ArrowIcon className="h-4 w-4 rotate-180" />
          Back to blog
        </Link>

        <p className="mt-8 text-xs text-ink-faint">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink md:text-4xl">
          {post.title}
        </h1>

        {post.coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImageUrl}
            alt=""
            className="mt-10 w-full rounded-2xl object-cover"
          />
        )}

        <div
          className="prose-post mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </article>
  );
}
