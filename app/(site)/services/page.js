import Link from "next/link";
import { AdsIcon, SeoIcon, StoreIcon, CheckIcon, ArrowIcon } from "@/components/icons";

export const metadata = {
  title: "Services",
  description:
    "Ads management across Meta, TikTok and Google, SEO built around buying-stage keywords, and ecommerce builds \u2014 what’s included in each.",
};

const services = [
  {
    icon: AdsIcon,
    name: "Ads Management",
    tagline: "Meta, TikTok, and Google \u2014 run to a cost-per-result target, not a vibe.",
    includes: [
      "Account audit and full campaign restructure",
      "Creative testing framework across angles, hooks, and formats",
      "Pixel, Conversions API, and tracking QA before spend scales",
      "Weekly reporting tied to your CPA or ROAS target",
      "Budget reallocation across platforms as results come in",
    ],
    bestFor: "Brands with a live offer that converts but isn’t reaching enough of the right people yet.",
  },
  {
    icon: SeoIcon,
    name: "SEO",
    tagline: "Organic traffic aimed at buying-stage keywords, not vanity rankings.",
    includes: [
      "Technical audit \u2014 site speed, indexing, and crawl structure",
      "Keyword mapping around what your buyers actually search",
      "Content calendar and on-page optimization",
      "Link building outreach",
      "Monthly reporting on rankings, traffic, and the leads it produced",
    ],
    bestFor: "Brands tired of paying for every single visitor and ready to build a compounding channel.",
  },
  {
    icon: StoreIcon,
    name: "Ecommerce Builds",
    tagline: "A store built to load fast, convert faster, and plug straight into your ad stack.",
    includes: [
      "New store build or migration, Shopify, WooCommerce, or custom",
      "Checkout flow and page-speed optimization",
      "Analytics, pixel, and conversion tracking wired in from day one",
      "Ongoing maintenance and feature updates",
      "Conversion rate testing on key landing and product pages",
    ],
    bestFor: "Brands whose ads are working but whose site is the thing losing the sale.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-hairline py-16 md:py-20">
        <div className="page-shell max-w-2xl">
          <p className="text-sm font-medium text-ink-dim">Services</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink md:text-5xl">
            Pick the gap. We’ll close it.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-dim">
            Most accounts need one of these three fixed first, and the other
            two follow naturally. Here’s exactly what’s included in each.
          </p>
        </div>
      </section>

      <div className="page-shell divide-y divide-hairline">
        {services.map((service, index) => (
          <section key={service.name} className="grid gap-10 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-20">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-panel">
                <service.icon className="h-6 w-6 text-brand" />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-ink">{service.name}</h2>
              <p className="mt-3 text-ink-dim">{service.tagline}</p>
              <p className="mt-6 text-sm text-ink-faint">
                <span className="font-semibold text-ink-dim">Best for: </span>
                {service.bestFor}
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-7 md:p-8">
              <p className="field-label !mb-4">What’s included</p>
              <ul className="flex flex-col gap-4">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    <span className="text-sm leading-relaxed text-ink-dim">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-hairline py-20 md:py-28">
        <div className="page-shell glass-panel flex flex-col items-start gap-6 rounded-2xl p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <h2 className="text-3xl font-bold text-ink">Not sure which one you need?</h2>
            <p className="mt-3 max-w-md text-ink-dim">
              Send us the account and the goal. We’ll tell you which gap to close first.
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
