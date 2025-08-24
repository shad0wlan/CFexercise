import { cn } from "@/lib/utils/cn";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export default function ButtonLink({
  children,
  href,
  className,
  ...restProps
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "text-white bg-primary rounded-[10px] text-sm w-full outline-none text-center py-[18.5px] hover:opacity-90 common-transition",
        className,
      )}
      {...restProps}
    >
      {children}
    </Link>
  );
}
