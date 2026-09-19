import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export const metadata = {
  title: "Work",
  description: "Results from ads, SEO, and ecommerce work across FMCG, fintech, wellness, and retail brands.",
};

// NOTE: These are placeholder case studies with illustrative numbers.
// Replace name, industry, service, result, and blurb with real client
// results before this site goes live.
const caseStudies = [
  {
    industry: "FMCG",
    service: "Meta & TikTok Ads",
    result: "4.1x",
    resultLabel: "ROAS in the first 90 days",
    blurb: "Rebuilt a snack brand’s account structure around 4 creative angles instead of 40 untested ones.",
  },
  {
    industry: "Fintech",
    service: "SEO",
    result: "212%",
    resultLabel: "increase in organic sign-ups",
    blurb: "Rebuilt a savings app’s content around comparison and how-to searches its buyers were already making.",
  },
  {
    industry: "Skincare / DTC",
    service: "Ecommerce Build",
    result: "38%",
    resultLabel: "lift in conversion rate",
    blurb: "Rebuilt checkout and product pages that were losing mobile buyers to load time.",
  },
  {
    industry: "Wellness",
    service: "SEO",
    result: "9,400",
    resultLabel: "monthly organic sessions, up from 600",
    blurb: "Built a content engine around the questions customers were typing into Google before they typed into a search bar for the brand.",
  },
  {
    industry: "B2B Services",
    service: "Google Ads",
    result: "-61%",
    resultLabel: "cost per qualified lead",
    blurb: "Cut a logistics brand’s lead form to 3 fields and matched landing pages to search intent instead of the homepage.",
  },
  {
    industry: "Retail",
    service: "Ads + SEO + Ecommerce",
    result: "3.6x",
    resultLabel: "return on ad spend across a seasonal peak",
    blurb: "Ran all three services together so the site could hold the traffic the ads and SEO both sent it.",
  },
];

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-hairline py-16 md:py-20">
        <div className="page-shell max-w-2xl">
          <p className="text-sm font-medium text-ink-dim">Work</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink md:text-5xl">
            The number that moved, by account.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-dim">
            A sample of the accounts we run and what changed after we took them over.
          </p>
        </div>
      </section>

      <section className="page-shell py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.blurb} className="glass-panel flex flex-col rounded-2xl p-7">
              <div className="flex items-center justify-between text-xs text-ink-faint">
                <span>{study.industry}</span>
                <span>{study.service}</span>
              </div>
              <p className="gradient-text mt-6 font-display text-3xl font-extrabold">
                {study.result}
              </p>
              <p className="mt-1 text-sm text-ink-dim">{study.resultLabel}</p>
              <p className="mt-5 text-sm leading-relaxed text-ink-dim">{study.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline py-20 md:py-28">
        <div className="page-shell glass-panel flex flex-col items-start gap-6 rounded-2xl p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <h2 className="text-3xl font-bold text-ink">Want to see a number like this on your account?</h2>
            <p className="mt-3 max-w-md text-ink-dim">
              Tell us the budget and the goal, and we’ll tell you honestly what’s realistic.
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
