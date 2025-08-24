import { cn } from "@/lib/utils/cn";
import { PropsWithChildren } from "react";

type Props = {
  isOpen: boolean;
} & PropsWithChildren;

export default function MobileNavigation({ isOpen, children }: Props) {
  return (
    <div
      className={cn(
        "fixed z-10 inset-0 flex flex-col items-center justify-center gap-5 bg-white common-transition translate-x-full px-10",
        {
          "translate-x-0": isOpen,
        },
      )}
    >
      {children}
    </div>
  );
}
