import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  className?: string;
} & PropsWithChildren;

export default function FormSectionContainer({ children, className }: Props) {
  return (
    <div className={cn("flex gap-5 flex-col lg:flex-row", className)}>
      {children}
    </div>
  );
}
