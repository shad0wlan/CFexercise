"use client";
import CreatableSelect from "react-select/creatable";
import createBasicInfoAction from "@/lib/actions/common/create-basic-info-action";
import { useToast } from "@/hooks/use-toast";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import Input from "@/components/form/Input";
import { IconType } from "react-icons";
import { MdDelete, MdSave } from "react-icons/md";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils/cn";
import deleteBasicInfoAction from "@/lib/actions/common/delete-basic-info-action";
import updateBasicInfoAction from "@/lib/actions/common/update-basic-info-action";
import { messages } from "@/lib/constants/messages";

type OptionType = { label: string; value: number };

type Props = {
  options: OptionType[];
  endpoint: string;
  tag: string;
  placeholder: string;
};

export default function ReactSelect({
  options,
  endpoint,
  tag,
  placeholder,
}: Props) {
  const selectRef = useRef(null);
  const [onCreatePending, onCreateStartTransition] = useTransition();
  const [onSavePending, onSaveStartTransition] = useTransition();
  const [onDeletePending, onDeleteStartTransition] = useTransition();
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const { toast } = useToast();

  const clearSelectInput = () => {
    if (selectRef.current) {
      // @ts-ignore
      selectRef.current?.clearValue();
    }
  };

  const onCreate = (inputValue: string) => {
    onCreateStartTransition(async () => {
      const error = await createBasicInfoAction({ endpoint, tag, inputValue });
      if (error) {
        toast({
          title: messages.toastErrorTitle,
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: messages.toastSuccessTitle,
        description: "H επιλογή δημιουργήθηκε επιτυχώς",
      });
      setSelectedOption(null);
    });
  };

  const onSave = () => {
    onSaveStartTransition(async () => {
      const error = await updateBasicInfoAction({
        endpoint,
        tag,
        id: selectedOption?.value,
        newName: selectedOption?.label,
      });
      if (error) {
        toast({
          title: messages.toastErrorTitle,
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: messages.toastSuccessTitle,
        description: "H επιλογή ενημερώθηκε επιτυχώς",
      });
      clearSelectInput();
      setSelectedOption(null);
    });
  };

  const onDelete = () => {
    onDeleteStartTransition(async () => {
      const error = await deleteBasicInfoAction({
        endpoint,
        tag,
        id: selectedOption?.value,
      });
      if (error) {
        toast({
          title: messages.toastErrorTitle,
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: messages.toastSuccessTitle,
        description: "H επιλογή διαγράφηκε επιτυχώς",
      });
      clearSelectInput();
      setSelectedOption(null);
    });
  };

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3">
        <CreatableSelect
        ref={selectRef}
        isClearable
        isLoading={onCreatePending}
        onCreateOption={onCreate}
        onChange={(option) => setSelectedOption(option)}
        formatCreateLabel={(inputValue) => `Δημιουργία: ${inputValue}`}
        styles={{
          option: (baseStyles, { isFocused }) => ({
            ...baseStyles,
            backgroundColor: "#fff",
            "&:hover, &:focus": {
              backgroundColor: "#b4dcea",
              borderRadius: "10px",
            },
            color: "var(--black)",
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            border: "1px solid #b4dcea",
            backgroundColor: "#f3f3f3",
            borderRadius: "10px",
            padding: "6px 4px",
            boxShadow: "none",
            "&:hover, &:focus": {
              border: "1px solid #b4dcea",
            },
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            padding: "0 5px",
            borderRadius: "10px",
          }),
        }}
        options={options}
        placeholder={placeholder}
        className="w-full"
      />
      {!!selectedOption ? (
        <div className="flex items-center gap-3 w-full">
          <Input
            value={selectedOption?.label}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectedOption((prev) => ({
                value: prev!.value,
                label: e.target.value,
              }))
            }
          />
          <ButtonIcon
            onClick={onSave}
            icon={MdSave}
            isLoading={onSavePending}
            disabled={!selectedOption?.label?.trim() || onSavePending}
            className="text-primary"
          />
          <ButtonIcon
            onClick={onDelete}
            icon={MdDelete}
            isLoading={onDeletePending}
            disabled={onDeletePending}
            className="text-red-400"
          />
        </div>
      ) : null}
    </div>
  );
}

function ButtonIcon({
  icon: Icon,
  isLoading = false,
  className,
  ...restProps
}: {
  icon: IconType;
  isLoading: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "h-[50px] min-w-[50px] max-w-[50px] flex flex-center rounded-[10px] bg-light-gray border border-secondary-light hover:bg-secondary-light common-transition",
        className,
      )}
      {...restProps}
    >
      {isLoading ? <LoadingSpinner className="mr-0" /> : <Icon size={23} />}
    </button>
  );
}
