"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

type Props = {
  label: string;
  path: string;
  className?: string;
  [keu: string]: any;
} & React.HTMLAttributes<HTMLAnchorElement>;

export default function NavLink({
  path,
  label,
  className,
  ...restProps
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === path;
  return (
    <Link
      href={path}
      className={cn(
        "text-xs font-medium py-[14px] px-4 hover:rounded-[10px] text-center min-w-[200px]  border-b border-b-[#B8B8B8] common-transition hover:border-b-transparent hover:bg-primary/20",
        className,
        {
          "bg-primary rounded-[10px] text-white hover:opacity-90 hover:bg-primary":
            isActive,
        },
      )}
      {...restProps}
    >
      {label}
    </Link>
  );
}
