import Logo from "@/components/Logo";
import LoginForm from "@/components/admin/LoginForm";

export default async function AdminLoginPage({ searchParams }) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel w-full max-w-sm rounded-2xl p-8">
        <Logo />
        <h1 className="mt-8 text-xl font-bold text-ink">Dashboard login</h1>
        <p className="mt-2 text-sm text-ink-dim">
          Sign in to publish and edit blog posts.
        </p>

        <div className="mt-8">
          <LoginForm next={next} />
        </div>
      </div>
    </div>
  );
}
