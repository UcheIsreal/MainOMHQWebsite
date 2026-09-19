import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <Image
        src="/logo.png"
        alt="Online Marketing HQ Logo"
        width={40}
        height={40}
        className="object-contain"
      />

      <span className="font-display text-[15px] font-semibold text-ink">
        Online Marketing
      </span>
    </Link>
  );
}
