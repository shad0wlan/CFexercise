"use client";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  path: string;
  label: string;
  defaultActive?: boolean;
};

const TabLink = ({ path, label, defaultActive = false }: Props) => {
  const [key, value] = path?.split("=");
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get(key?.replace("?", ""))?.toLowerCase();
  const isActive =
    selectedTab === value?.toLowerCase() || (defaultActive && !selectedTab);

  return (
    <Link
      href={path}
      className={cn(
        "border-b-2 pb-0.5 border-b-transparent common-transition whitespace-nowrap",
        {
          "border-b-primary text-secondary ": isActive,
          "text-muted-foreground": !isActive,
        },
      )}
    >
      {label}
    </Link>
  );
};

export default TabLink;
