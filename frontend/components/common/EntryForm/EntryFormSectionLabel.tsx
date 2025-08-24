import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils/cn";

type Props = {
  label: string;
  className?: string;
};

export default function EntryFormSectionLabel({ label, className }: Props) {
  return (
    <div className={cn("text-center px-5 py-[13px] bg-[#F6F6F6]", className)}>
      <Text className="font-bold">{label}</Text>
    </div>
  );
}
