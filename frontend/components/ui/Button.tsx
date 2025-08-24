import { cn } from "@/lib/utils/cn";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export type ButtonVariants = "default" | "delete" | "outline";

type Props = {
  children: React.ReactNode;
  variant?: ButtonVariants;
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
} & (
  | {
      type: "submit";
    }
  | { type: "button"; onClick: () => void }
) &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  type,
  onClick,
  className,
  isLoading = false,
  variant = "default",
  ...restProps
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "text-white bg-primary rounded-[10px] text-sm w-full outline-none text-center py-[18.5px] hover:opacity-90 common-transition",
        className,
        {
          "bg-red-400": variant === "delete",
          "bg-white text-primary border border-primary hover:bg-primary hover:text-white":
            variant === "outline",
        },
      )}
      {...restProps}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
}
