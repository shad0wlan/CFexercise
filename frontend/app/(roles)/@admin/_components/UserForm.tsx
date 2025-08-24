"use client";
import Form from "@/components/form/Form";
import FormGroup from "@/components/form/FormGroup";
import Label from "@/components/form/Label";
import Input from "@/components/form/Input";
import Button from "@/components/ui/Button";
import InputErrorText from "@/components/form/InputErrorText";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { messages } from "@/lib/constants/messages";
import type {
  CreateUserForm,
  UpdateUserForm,
} from "@/app/(roles)/@admin/_lib/types/user-form";
import createUserAction from "@/app/(roles)/@admin/_lib/actions/create-user-action";
import { FormProps } from "@/lib/types/form-props";
import {
  createUserSchema,
  updateUserSchema,
} from "@/app/(roles)/@admin/_lib/schema/user-schema";
import { User } from "@/lib/types/user";
import updateUserAction from "@/app/(roles)/@admin/_lib/actions/update-user-action";
import Select from "@/components/form/Select";
import { roleSelectOptions } from "@/app/(roles)/@admin/_lib/helpers/role-select-options";

type Props = {
  user?: User;
  isProfile?: boolean;
} & FormProps;

export default function UserForm({
  method,
  user,
  successMessage,
  submitButtonText,
  isProfile,
}: Props) {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const isCreate = method === "post";

  const onSubmitUser = (values: CreateUserForm | UpdateUserForm) => {
    startTransition(async () => {
      const error = isCreate
        ? await createUserAction(values as CreateUserForm)
        : await updateUserAction(values as UpdateUserForm, user?.id, isProfile);
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

  const defaultValues = {
    username: user?.username,
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    role: user?.role,
  };

  const schema = method === "post" ? createUserSchema : updateUserSchema;
  return (
    <Form
      defaultValues={defaultValues}
      onSubmitForm={onSubmitUser}
      className="form"
      zodSchema={schema}
    >
      {({ register, errors }) => (
        <>
          <FormGroup>
            <Label>Όνομα Χρήστη </Label>
            <Input hasError={errors?.username} {...register("username")} />
            {errors?.username && (
              <InputErrorText error={errors?.username?.message} />
            )}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              hasError={errors?.email}
              {...register("email")}
            />
            {errors?.email && <InputErrorText error={errors?.email?.message} />}
          </FormGroup>
          <FormGroup>
            <Label>Όνομα</Label>
            <Input hasError={errors?.firstName} {...register("firstName")} />
            {errors?.firstName && (
              <InputErrorText error={errors?.firstName?.message} />
            )}
          </FormGroup>
          <FormGroup>
            <Label>Επώνυμο</Label>
            <Input hasError={errors?.lastName} {...register("lastName")} />
            {errors?.lastName && (
              <InputErrorText error={errors?.lastName?.message} />
            )}
          </FormGroup>
          <FormGroup>
            <Label>Τύπος χρήστη</Label>
            <Select
              options={roleSelectOptions}
              placeholder="Eπιλέξτε τύπο χρήστη"
              hasError={errors?.role}
              {...register("role")}
              disabled={method === "patch"}
            />
            {errors?.role && <InputErrorText error={errors?.role?.message} />}
          </FormGroup>
          <FormGroup>
            <Label>Κωδικός Πρόσβασης</Label>
            <Input
              hasError={errors?.password}
              type="password"
              {...register("password")}
              autoComplete="new-password"
            />
            {errors?.password && (
              <InputErrorText error={errors?.password?.message} />
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
      )}
    </Form>
  );
}
