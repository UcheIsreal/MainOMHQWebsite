import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-[13px] font-extrabold text-white">
        HQ
      </span>
      <span className="font-display text-[15px] font-semibold text-ink">
        Online Marketing
      </span>
    </Link>
  );
}
