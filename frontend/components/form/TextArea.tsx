import { cn } from "@/lib/utils/cn";
import { FieldError } from "react-hook-form";
import { forwardRef } from "react";

type Props = {
  hasError?: FieldError;
  size?: "sm" | "base";
  className?: string;
  [key: string]: any;
} & React.HTMLProps<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, hasError, inputSize = "base", ...restProps }: Props, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-[10px] border border-secondary-light bg-light-gray outline-none px-4 py-3 disabled:cursor-not-allowed disabled:bg-disabled",
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

TextArea.displayName = "TextArea";

export default TextArea;
