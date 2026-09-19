import Link from "next/link";
import Logo from "@/components/Logo";
import { logoutAction } from "@/lib/actions/auth";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-hairline">
        <div className="page-shell flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden items-center gap-6 md:flex">
              <Link href="/admin/dashboard" className="text-sm font-medium text-ink-dim hover:text-ink">
                Posts
              </Link>
              <Link href="/admin/dashboard/new" className="text-sm font-medium text-ink-dim hover:text-ink">
                New post
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/" target="_blank" className="text-sm font-medium text-ink-dim hover:text-ink">
              View site
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="text-sm font-medium text-ink-dim hover:text-ink">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="page-shell py-10">{children}</div>
      </main>
    </div>
  );
}
