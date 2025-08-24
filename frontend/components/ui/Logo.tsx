import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.webp";

export default function Logo({ width }: { width?: number }) {
  return (
    <Link href="/" className="relative z-20">
      <Image src={logo} width={width} alt="Logo" priority />
    </Link>
  );
}
