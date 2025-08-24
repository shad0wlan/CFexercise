import { cn } from "@/lib/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentWrapper({ children, className }: Props) {
  return (
    <div className={cn("bg-white shadow-sm rounded-[20px] mt-5", className)}>
      {children}
    </div>
  );
}
