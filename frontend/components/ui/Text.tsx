import { ElementType, ReactNode } from "react";
import { Fira_Sans } from "next/font/google";
import { cn } from "@/lib/utils/cn";

const firaSans = Fira_Sans({ weight: ["400"], subsets: ["latin"] });

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  isTitle?: boolean;
};

export default function Text({
  as = "p",
  children,
  className,
  isTitle = false,
}: Props) {
  const Component = as;
  return (
    <Component
      className={cn(className, {
        [firaSans.className]: isTitle,
      })}
    >
      {children}
    </Component>
  );
}
