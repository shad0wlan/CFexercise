import React, { useState, useTransition } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { TooltipWrapper } from "@/components/ui/Tooltip";
import { DialogWrapper } from "@/components/ui/Dialog";
import { useToast } from "@/hooks/use-toast";
import { messages } from "@/lib/constants/messages";
import Link from "next/link";

type Props = {
  onDelete?: () => Promise<{ isError: boolean; message?: string } | undefined>;
  onEdit?: string;
};

const ICON_SIZE = 22;
export default function TableActions({ onDelete, onEdit }: Props) {
  return (
    <div className="flex items-center justify-end gap-3">
      {onEdit && (
        <Link href={onEdit} className="flex items-center justify-center">
          <TooltipWrapper label="Επεξεργασία">
            <MdEdit size={ICON_SIZE} className="text-primary cursor-pointer" />
          </TooltipWrapper>
        </Link>
      )}
      {onDelete && <TableDeleteAction onDelete={onDelete} />}
    </div>
  );
}

function TableDeleteAction({ onDelete }: Omit<Props, "onEdit">) {
  const [pending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const onSubmitDelete = () => {
    startTransition(async () => {
      const error = await onDelete!();
      if (error?.isError) {
        toast({
          title: messages.toastErrorTitle,
          description: error?.message ?? messages.failedDelete,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: messages.toastSuccessTitle,
        description: messages.successDelete,
      });
      setIsOpen(false);
    });
  };

  return (
    <TooltipWrapper label="Διαγραφή">
      <DialogWrapper
        onOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Είστε απολύτως σίγουροι;"
        description="Αυτή η ενέργεια δεν μπορεί να αναιρεθεί. Αυτό θα διαγράψει μόνιμα τα
            δεδομένα από το server."
        submitText="Διαγραφή"
        onClick={onSubmitDelete}
        variant="delete"
        isLoading={pending}
      >
        <span>
          <MdDelete size={ICON_SIZE} className="text-red-400 cursor-pointer" />
        </span>
      </DialogWrapper>
    </TooltipWrapper>
  );
}
