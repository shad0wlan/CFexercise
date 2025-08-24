"use client";
import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import { loginSchema } from "@/app/login/_lib/schema/login-schema";
import FormGroup from "@/components/form/FormGroup";
import Label from "@/components/form/Label";
import Button from "@/components/ui/Button";
import loginAction from "@/app/login/_lib/actions/login-action";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { Login } from "@/app/login/_lib/types/login";
import { messages } from "@/lib/constants/messages";

export default function LoginForm() {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  const onLogin = (values: Login) => {
    startTransition(async () => {
      const error = await loginAction(values);

      if (error) {
        toast({
          title: messages.toastErrorTitle,
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="bg-white max-w-[549px] w-full rounded-[20px] ">
      <div className="bg-primary h-6 rounded-t-[20px]" />
      <Form
        onSubmitForm={onLogin}
        zodSchema={loginSchema}
        className="px-5 pt-[55px] pb-[72px] grid place-items-center mx-auto max-w-[360px] gap-5 w-full"
      >
        {({ register, errors }) => (
          <>
            <FormGroup>
              <Label htmlFor="username">Εισάγετε όνομα χρήστη</Label>
              <Input
                id="username"
                {...register("username")}
                hasError={errors?.username}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Εισάγετε κωδικό πρόσβασης</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                hasError={errors?.password}
                autoComplete="new-password"
              />
            </FormGroup>
            <Button isLoading={pending} disabled={pending} type="submit">
              ΕΙΣΟΔΟΣ
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}
