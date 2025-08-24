import Select from "@/components/form/Select";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Label from "@/components/form/Label";
import FormGroup from "@/components/form/FormGroup";
import { EntryStatus } from "@/lib/types/entry";
import { ChangeEvent, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { messages } from "@/lib/constants/messages";
import changeEntryStatusAction from "@/lib/actions/entries/change-entry-status-action";

const options = [
  {
    value: "Pending",
    label: "Σε εκκρεμότητα",
  },
  {
    value: "Production",
    label: "Σε παραγωγή",
  },
  {
    value: "Completed",
    label: "Ολοκληρωμένο",
  },
];

type Props = {
  entryId: number;
  status: EntryStatus;
};

export default function EntryFormChangeStatus({ entryId, status }: Props) {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as EntryStatus;
    startTransition(async () => {
      const isError = await changeEntryStatusAction(newStatus, entryId);
      if (isError) {
        toast({
          title: messages.toastErrorTitle,
          description: "Αποτυχία αλλαγής κατάστασης",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: messages.toastSuccessTitle,
        description: "Επιτυχής αλλαγή κατάστασης",
      });
    });
  };
  return (
    <FormGroup className="px-10 mb-5">
      <Label>Αλλαγή Κατάστασης</Label>
      <div className="flex items-center gap-5">
        <Select
          placeholder="Επιλέξτε κατάσταση"
          options={options}
          className="lg:w-[calc(33%-8px)]"
          value={status}
          onChange={onChangeStatus}
        />
        {pending && <LoadingSpinner className="fill-primary" />}
      </div>
    </FormGroup>
  );
}
