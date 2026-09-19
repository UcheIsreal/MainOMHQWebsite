import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="page-shell grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-dim">
            Performance marketing for brands that want to see the number move,
            not just hear the pitch.
          </p>
        </div>

        <div>
          <p className="field-label !mb-3">Site</p>
          <ul className="flex flex-col gap-2.5 text-sm text-ink-dim">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li><Link href="/services" className="hover:text-ink">Services</Link></li>
            <li><Link href="/work" className="hover:text-ink">Work</Link></li>
            <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
          </ul>
        </div>

        <div>
          <p className="field-label !mb-3">Talk to us</p>
          <ul className="flex flex-col gap-2.5 text-sm text-ink-dim">
            <li>
              <Link href="mailto:hello@onlinemarketinghq.co" className="hover:text-ink">
                hello@onlinemarketinghq.co
              </Link>
            </li>
            <li>Lagos, Nigeria \u2014 working with brands in the UK, US, Canada &amp; Australia</li>
          </ul>
        </div>
      </div>

      <div className="page-shell flex flex-col gap-2 border-t border-hairline py-6 text-xs text-ink-faint md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Online Marketing HQ. All rights reserved.</p>
        <p>Built to be measured, not admired.</p>
      </div>
    </footer>
  );
}
