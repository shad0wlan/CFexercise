import { cn } from "@/lib/utils/cn";
import { FieldError } from "react-hook-form";
import { ForwardedRef, forwardRef } from "react";
import { SelectOption } from "@/lib/types/select-option";

type Props = {
  options: SelectOption[];
  placeholder: string;
  className?: string;
  hasError?: FieldError;
  [key: string]: any;
} & React.HTMLProps<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, Props>(
  (
    { options, placeholder, className, hasError, ...restProps }: Props,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full rounded-[10px] border border-secondary-light bg-light-gray outline-none px-4 py-3 disabled:cursor-not-allowed disabled:bg-gray-300",
          className,
          {
            "border-red-500": hasError,
          },
        )}
        {...restProps}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  },
);

export default Select;

Select.displayName = "Select";
