import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <Image
        src="\public\logo.png"
        alt="Online Marketing HQ Logo"
        width={20}
        height={20}
        className="object-contain"
      />
    </Link>
  );
}
