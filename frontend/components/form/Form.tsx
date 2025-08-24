"use client";
import {
  FieldErrors,
  useForm,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  DefaultValues,
} from "react-hook-form";
import { TypeOf, z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { ReactElement } from "react";

type Props<Validator extends ZodType<any, any, any>> = {
  zodSchema: Validator;
  defaultValues?: DefaultValues<TypeOf<Validator>>;
  className?: string;
  onSubmitForm?: (data: TypeOf<Validator>) => void;
  children: ({
    register,
    errors,
    watch,
    setValue,
    getValues,
  }: {
    register: UseFormRegister<z.infer<Validator>>;
    errors: FieldErrors<z.infer<Validator>>;
    watch: UseFormWatch<z.infer<Validator>>;
    setValue: UseFormSetValue<z.infer<Validator>>;
    getValues: () => TypeOf<Validator>;
  }) => ReactElement[] | ReactElement;
};
const Form = <Validator extends ZodType<any, any, any>>(
  props: Props<Validator>,
) => {
  const { children, className, zodSchema, defaultValues, onSubmitForm } = props;

  type ValidationSchema = z.infer<Validator>;

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  const onSubmit = (data: ValidationSchema) => {
    onSubmitForm?.(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {children({
        register,
        errors,
        watch,
        setValue,
        getValues,
      })}
      {process.env.NODE_ENV === "development" ? (
        <DevTool control={control} placement="top-left" />
      ) : null}
    </form>
  );
};

export default Form;
