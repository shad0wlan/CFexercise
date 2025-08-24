import type { EntryStatus } from "@/lib/types/entry";
import { EntryStatusEnum } from "@/lib/enums/entry-status";
import { cn } from "@/lib/utils/cn";

type Props = {
  status: EntryStatus;
};

export default function EntryStatus({ status }: Props) {
  return (
    <span
      className={cn("whitespace-nowrap", {
        "text-red-600": status === "Pending",
        "text-green-500": status === "Production",
        "text-gray-700": status === "Completed",
      })}
    >
      {EntryStatusEnum[status]}
    </span>
  );
}
