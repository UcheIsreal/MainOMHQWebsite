import Link from "next/link";
import { AdsIcon, SeoIcon, StoreIcon, ArrowIcon } from "@/components/icons";
import { getPublishedPosts } from "@/lib/db";

// Always read the latest posts for the "From the blog" teaser instead of
// baking a snapshot in at build time.
export const dynamic = "force-dynamic";

const stats = [
  { value: "3.2x", label: "average ROAS across live ad accounts" },
  { value: "68%", label: "of leads now arriving organically, not paid" },
  { value: "11", label: "ecommerce builds shipped and still converting" },
];

const services = [
  {
    icon: AdsIcon,
    name: "Ads Management",
    blurb:
      "Meta, TikTok, and Google campaigns built around a target cost per result, with weekly reads on what to scale and what to cut.",
  },
  {
    icon: SeoIcon,
    name: "SEO",
    blurb:
      "Technical fixes, content that targets buying-stage keywords, and link building \u2014 aimed at organic traffic that converts, not just ranks.",
  },
  {
    icon: StoreIcon,
    name: "Ecommerce Builds",
    blurb:
      "Storefronts built to load fast and check out faster, wired into the same pixel and analytics stack running the ads.",
  },
];

const industries = ["FMCG", "Fintech", "Ecommerce", "Wellness & Skincare", "B2B Services"];

export default async function HomePage() {
  const posts = await getPublishedPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section className="grid-glow relative overflow-hidden border-b border-hairline">
        <div className="page-shell grid gap-14 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <div>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] text-ink md:text-5xl">
              Marketing built to move one number:{" "}
              <span className="gradient-text">your revenue.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-dim">
              We run the Meta, TikTok, and Google ads. We build the SEO engine
              behind them. We ship the store that has to convert all of it.
              Then we show you the number that moved not a highlight reel.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="mailto:hello@onlinemarketinghq.co" className="btn-primary">
                Book a strategy call
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <Link href="/work" className="btn-secondary">
                See the results
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 md:p-8 md:self-center">
            <p className="field-label !mb-5">What we report on</p>
            <ul className="flex flex-col gap-5">
              {stats.map((stat) => (
                <li key={stat.label} className="flex items-baseline gap-4">
                  <span className="gradient-text font-display text-2xl font-extrabold shrink-0">
                    {stat.value}
                  </span>
                  <span className="text-sm text-ink-dim">{stat.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-ink-faint">
              Sample figures for illustration replace with your account results.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-hairline py-10">
        <div className="page-shell flex flex-wrap items-center gap-x-10 gap-y-3">
          <p className="text-sm text-ink-faint">Built for teams in</p>
          {industries.map((name) => (
            <span key={name} className="text-sm font-medium text-ink-dim">
              {name}
            </span>
          ))}
        </div>
      </section>

      <section className="page-shell py-20 md:py-28">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold text-ink">Three services, one scoreboard.</h2>
          <p className="mt-4 text-ink-dim">
            Each one is run to feed the others SEO content backs the ad
            angles, the ads validate what SEO should target next, and the
            store is built to hold the traffic both bring in.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.name} className="glass-panel rounded-2xl p-7">
              <service.icon className="h-6 w-6 text-brand" />
              <h3 className="mt-5 text-lg font-semibold text-ink">{service.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{service.blurb}</p>
            </div>
          ))}
        </div>

        <Link href="/services" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-cyan">
          See what’s included in each service
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </section>

      <section className="border-t border-hairline bg-panel/40 py-20 md:py-28">
        <div className="page-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold text-ink">Proof, not portfolio filler.</h2>
            <p className="mt-4 text-ink-dim">
              A look at the accounts we run and the number that moved on each one.
            </p>
          </div>
          <Link href="/work" className="btn-secondary shrink-0">
            View all work
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="page-shell py-20 md:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold text-ink">From the blog</h2>
              <p className="mt-4 text-ink-dim">
                Notes on what’s working in ads, SEO, and ecommerce right now.
              </p>
            </div>
            <Link href="/blog" className="btn-secondary shrink-0">
              Read the blog
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="glass-panel rounded-2xl p-7 transition-colors hover:border-ink-faint"
              >
                <p className="text-xs text-ink-faint">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-ink">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-hairline py-20 md:py-28">
        <div className="page-shell glass-panel flex flex-col items-start gap-6 rounded-2xl p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <h2 className="text-3xl font-bold text-ink">Let’s find your number.</h2>
            <p className="mt-3 max-w-md text-ink-dim">
              Tell us the budget and the goal. We’ll tell you honestly whether we can move it.
            </p>
          </div>
          <Link href="mailto:hello@onlinemarketinghq.co" className="btn-primary shrink-0">
            Book a strategy call
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
