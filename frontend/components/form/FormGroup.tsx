import { cn } from "@/lib/utils/cn";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
} & PropsWithChildren;

export default function FormGroup({ children, className }: Props) {
  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {children}
    </div>
  );
}
