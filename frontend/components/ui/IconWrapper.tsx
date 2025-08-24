import { cn } from "@/lib/utils/cn";
import { IconType } from "react-icons";

export type Props = {
  icon: IconType;
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function IconWrapper({
  children,
  onClick,
  icon: Icon,
  className,
}: Props) {
  return (
    <button
      type="button"
      className={cn(
        "hidden lg:flex lg:flex-col lg:items-center lg:gap-1 group",
        className,
      )}
      onClick={onClick}
    >
      <span className="min-w-8 min-h-8 rounded-full bg-secondary-light flex-center common-transition group-hover:bg-secondary">
        {<Icon className="text-white" />}
      </span>
      {children}
    </button>
  );
}
