import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <Image
        src="/logo.png"
        alt="Online Marketing HQ"
        width={160}
        height={40}
        className="h-8 w-auto"
        priority
      />
    </Link>
  );
}
