import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.svg";

export default function Logo({ width }: { width?: number }) {
  return (
    <Link href="/" className="relative z-20">
      <Image src={logo} width={width || 200} height={60} alt="ProdTrack Logo" priority />
    </Link>
  );
}
