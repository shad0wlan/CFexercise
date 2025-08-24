"use client";
import Form from "@/components/form/Form";
import { FormProps } from "@/lib/types/form-props";
import { machineSchema } from "@/app/(roles)/@admin/machines/_lib/schema/machine-schema";
import createMachineAction from "@/app/(roles)/@admin/machines/_lib/actions/create-machine-action";
import type { MachineForm } from "@/app/(roles)/@admin/machines/_lib/type/machine-form";
import FormGroup from "@/components/form/FormGroup";
import Label from "@/components/form/Label";
import Input from "@/components/form/Input";
import InputErrorText from "@/components/form/InputErrorText";
import Button from "@/components/ui/Button";
import { ChangeEvent, useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { messages } from "@/lib/constants/messages";
import { Machine } from "@/app/(roles)/@admin/machines/_lib/type/machine";
import { getFullImagePath } from "@/lib/utils/get-full-image-path";
import updateMachineAction from "@/app/(roles)/@admin/machines/_lib/actions/update-machine-action";

type Props = {
  machine?: Machine;
} & FormProps;

const formProps = {
  post: {
    action: createMachineAction,
    schema: machineSchema,
  },
  patch: {
    action: updateMachineAction,
    schema: machineSchema,
  },
};

export default function MachineForm({
  method,
  machine,
  successMessage,
  submitButtonText,
}: Props) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  const onSubmitMachine = (values: MachineForm) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.image) {
        formData.append("image", values.image);
      }
      const error = await formProps[method].action(formData, machine?.id);
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
        description: successMessage,
      });
    });
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<z.infer<typeof machineSchema>>,
  ) => {
    const file = e.target.files?.[0];
    setValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  return (
    <Form
      defaultValues={{
        name: machine?.name,
      }}
      zodSchema={formProps[method].schema}
      onSubmitForm={onSubmitMachine}
      className="form"
    >
      {({ register, errors, setValue }) => {
        const { name } = register("image");
        return (
          <>
            <FormGroup>
              <Label>Όνομα </Label>
              <Input hasError={errors?.name} {...register("name")} />
              {errors?.name && <InputErrorText error={errors?.name?.message} />}
            </FormGroup>
            <FormGroup>
              <Label>Εικόνα</Label>
              <Input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="h-[50px] py-2.5"
                name={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleImageChange(e, setValue);
                }}
              />
              {(imagePreviewUrl || machine?.image) && (
                <div className="relative aspect-[2/1]">
                  <Image
                    src={imagePreviewUrl || getFullImagePath(machine!.image!)}
                    alt="Image Preview"
                    fill
                    className="mt-2 object-cover"
                  />
                </div>
              )}
            </FormGroup>

            <Button
              disabled={pending}
              isLoading={pending}
              className="md:col-end-3 lg:w-1/2 ml-auto"
              type="submit"
            >
              {submitButtonText}
            </Button>
          </>
        );
      }}
    </Form>
  );
}
