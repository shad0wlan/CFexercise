import { cn } from "@/lib/utils/cn";
import { ForwardedRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type Props = {
  hasError?: FieldError;
  size?: "sm" | "base";
  className?: string;
  [key: string]: any;
} & React.HTMLProps<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { className, hasError, inputSize = "base", ...restProps }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-[10px] border border-secondary-light bg-light-gray outline-none px-4 py-3 disabled:cursor-not-allowed disabled:bg-disabled placeholder:text-[13px]",
          className,
          {
            "border-red-500": hasError,
            "py-2": inputSize === "sm",
          },
        )}
        {...restProps}
      />
    );
  },
);

export default Input;

Input.displayName = "Input";
