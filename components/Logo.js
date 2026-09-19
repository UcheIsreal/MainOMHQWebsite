import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image
        src="https://www.image2url.com/r2/default/images/1789845155398-7574319e-cbf6-461d-b6c7-12b59c72ea0b.png"
        alt="Online Marketing HQ Logo"
        width={180}
        height={50}
        className="object-contain"
      />
    </Link>
  );
}
