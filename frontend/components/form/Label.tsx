import { cn } from "@/lib/utils/cn";
import { className } from "postcss-selector-parser";

type Props = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
} & React.HTMLProps<HTMLLabelElement>;

export default function Label({ children, className, ...restProps }: Props) {
  return (
    <label className={cn("text-sm font-semibold", className)} {...restProps}>
      {children}
    </label>
  );
}
