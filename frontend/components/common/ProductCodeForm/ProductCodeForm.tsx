"use client";
import { FormProps } from "@/lib/types/form-props";
import type { ProductCode, ProductCodeForm } from "@/lib/types/product-code";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { messages } from "@/lib/constants/messages";
import Form from "@/components/form/Form";
import FormGroup from "@/components/form/FormGroup";
import Label from "@/components/form/Label";
import Input from "@/components/form/Input";
import InputErrorText from "@/components/form/InputErrorText";
import Button from "@/components/ui/Button";
import { productCodeSchema } from "@/lib/schema/product-code-schema";
import FormSectionContainer from "@/components/form/FormSectionContainer";
import EntryFormSectionLabel from "@/components/common/EntryForm/EntryFormSectionLabel";
import Text from "@/components/ui/Text";
import createProductCodeAction from "@/lib/actions/product-codes/create-product-code-action";
import updateProductCodeAction from "@/lib/actions/product-codes/update-product-code-action";

type Props = {
  productCode?: ProductCode;
} & FormProps;

export default function ProductCodeForm({
  productCode,
  method,
  successMessage,
  submitButtonText,
}: Props) {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const isCreate = method === "post";

  const onSubmitProductCode = (values: ProductCodeForm) => {
    startTransition(async () => {
      const error = isCreate
        ? await createProductCodeAction(values)
        : await updateProductCodeAction(values, productCode?.id);
      if (error) {
        toast({
          title: messages.toastErrorTitle,
          description: error.message, // error.message,
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
    code: productCode?.code ?? "",
    cannonTemp: productCode?.cannonTemp ?? null,
    speed: productCode?.speed ?? null,
    screwsPerZone: {
      "1": productCode?.screwsPerZone?.["1"] ?? null,
      "2": productCode?.screwsPerZone?.["2"] ?? null,
      "3": productCode?.screwsPerZone?.["3"] ?? null,
      "4": productCode?.screwsPerZone?.["4"] ?? null,
      "5": productCode?.screwsPerZone?.["5"] ?? null,
      "6": productCode?.screwsPerZone?.["6"] ?? null,
    },
    kalupiTemp: {
      up: productCode?.kalupiTemp?.up ?? null,
      down: productCode?.kalupiTemp?.down ?? null,
      left: productCode?.kalupiTemp?.left ?? null,
      right: productCode?.kalupiTemp?.right ?? null,
      frontUp: productCode?.kalupiTemp?.frontUp ?? null,
      frontDown: productCode?.kalupiTemp?.frontDown ?? null,
    },
  };

  return (
    <Form
      defaultValues={defaultValues}
      onSubmitForm={onSubmitProductCode}
      className=" p-10"
      zodSchema={productCodeSchema}
    >
      {({ register, errors }) => (
        <div className="flex flex-col gap-10">
          <FormGroup className="lg:w-1/2">
            <Label>Κωδικός Προϊόντος</Label>
            <Input hasError={errors?.code} {...register("code")} />
            {errors?.code && <InputErrorText error={errors?.code?.message} />}
          </FormGroup>

          <EntryFormSectionLabel
            label="Θερμοκρασίες"
            className="rounded-[20px]"
          />
          <FormSectionContainer className="lg:flex-col">
            <Text className="text-center text-sm font-semibold mb-1.5">
              Κοχλία ανά ζώνη
            </Text>
            <FormSectionContainer className="lg:flex-col gap-2">
              <Label>Κανονιού</Label>
              <FormSectionContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
                <FormGroup>
                  <Input
                    placeholder="180"
                    hasError={errors?.cannonTemp}
                    {...register("cannonTemp")}
                  />
                  {errors?.cannonTemp && (
                    <InputErrorText error={errors?.cannonTemp?.message} />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Ζώνη 1</Label>

                  <Input
                    placeholder="160"
                    hasError={errors?.screwsPerZone?.["1"]}
                    {...register("screwsPerZone.1")}
                  />
                  {errors?.screwsPerZone?.["1"] && (
                    <InputErrorText
                      error={errors?.screwsPerZone?.["1"]?.message}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Ζώνη 2</Label>

                  <Input
                    placeholder="170"
                    hasError={errors?.screwsPerZone?.["2"]}
                    {...register("screwsPerZone.2")}
                  />
                  {errors?.screwsPerZone?.["2"] && (
                    <InputErrorText
                      error={errors?.screwsPerZone?.["2"]?.message}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Ζώνη 3</Label>

                  <Input
                    placeholder="175"
                    hasError={errors?.screwsPerZone?.["3"]}
                    {...register("screwsPerZone.3")}
                  />
                  {errors?.screwsPerZone?.["3"] && (
                    <InputErrorText
                      error={errors?.screwsPerZone?.["3"]?.message}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Ζώνη 4</Label>

                  <Input
                    placeholder="180"
                    hasError={errors?.screwsPerZone?.["4"]}
                    {...register("screwsPerZone.4")}
                  />
                  {errors?.screwsPerZone?.["4"] && (
                    <InputErrorText
                      error={errors?.screwsPerZone?.["4"]?.message}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Ζώνη 5</Label>

                  <Input
                    placeholder="185"
                    hasError={errors?.screwsPerZone?.["5"]}
                    {...register("screwsPerZone.5")}
                  />
                  {errors?.screwsPerZone?.["5"] && (
                    <InputErrorText
                      error={errors?.screwsPerZone?.["5"]?.message}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Ζώνη 6</Label>

                  <Input
                    placeholder="190"
                    hasError={errors?.screwsPerZone?.["6"]}
                    {...register("screwsPerZone.6")}
                  />
                  {errors?.screwsPerZone?.["6"] && (
                    <InputErrorText
                      error={errors?.screwsPerZone?.["6"]?.message}
                    />
                  )}
                </FormGroup>
              </FormSectionContainer>
            </FormSectionContainer>
            <FormSectionContainer className="lg:flex-col gap-2">
              <Label>Καλουπιου</Label>
              <FormSectionContainer className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-6">
                <FormGroup>
                  <Label>Πάνω</Label>

                  <Input
                    placeholder="80"
                    hasError={errors?.kalupiTemp?.up}
                    {...register("kalupiTemp.up")}
                  />
                  {errors?.kalupiTemp?.up && (
                    <InputErrorText error={errors?.kalupiTemp?.up?.message} />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Κάτω</Label>

                  <Input
                    placeholder="85"
                    hasError={errors?.kalupiTemp?.down}
                    {...register("kalupiTemp.down")}
                  />
                  {errors?.kalupiTemp?.down && (
                    <InputErrorText error={errors?.kalupiTemp?.down?.message} />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Δεξιά</Label>

                  <Input
                    placeholder="75"
                    hasError={errors?.kalupiTemp?.right}
                    {...register("kalupiTemp.right")}
                  />
                  {errors?.kalupiTemp?.right && (
                    <InputErrorText
                      error={errors?.kalupiTemp?.right?.message}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Αριστερά</Label>

                  <Input
                    placeholder="75"
                    hasError={errors?.kalupiTemp?.left}
                    {...register("kalupiTemp.left")}
                  />
                  {errors?.kalupiTemp?.left && (
                    <InputErrorText error={errors?.kalupiTemp?.left?.message} />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Μπρ. Πάνω</Label>

                  <Input
                    placeholder="90"
                    hasError={errors?.kalupiTemp?.frontUp}
                    {...register("kalupiTemp.frontUp")}
                  />
                  {errors?.kalupiTemp?.frontUp && (
                    <InputErrorText
                      error={errors?.kalupiTemp?.frontUp?.message}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Μπρ. Κάτω</Label>

                  <Input
                    placeholder="95"
                    hasError={errors?.kalupiTemp?.frontDown}
                    {...register("kalupiTemp.frontDown")}
                  />
                  {errors?.kalupiTemp?.frontDown && (
                    <InputErrorText
                      error={errors?.kalupiTemp?.frontDown?.message}
                    />
                  )}
                </FormGroup>
              </FormSectionContainer>
              <FormGroup className="lg:w-1/2">
                <Label>Τραβηχτικό</Label>
                <Input
                  placeholder="25"
                  hasError={errors?.speed}
                  {...register("speed")}
                />
                {errors?.speed && (
                  <InputErrorText error={errors?.speed?.message} />
                )}
              </FormGroup>
            </FormSectionContainer>
          </FormSectionContainer>

          <Button
            disabled={pending}
            isLoading={pending}
            className="lg:w-1/2"
            type="submit"
          >
            {submitButtonText}
          </Button>
        </div>
      )}
    </Form>
  );
}
