"use client";
import Form from "@/components/form/Form";
import { entrySchema } from "@/lib/schema/entry-schema";
import type { Entry, EntryForm } from "@/lib/types/entry";
import { FormProps } from "@/lib/types/form-props";
import { Machine } from "@/app/(roles)/@admin/machines/_lib/type/machine";
import { useMemo, useTransition } from "react";
import { ProductionMaterial } from "@/lib/types/product-material";
import { getSelectOptions } from "@/lib/helpers/get-select-options";
import Button from "@/components/ui/Button";
import EntryFormMainInputs from "@/components/common/EntryForm/EntryFormMainInputs";
import EntryFormDetailsInputs from "@/components/common/EntryForm/EntryFormDetailsInputs";
import { PackageType } from "@/lib/types/package-type";
import { Color } from "@/lib/types/color";
import { Extra } from "@/lib/types/extra";
import FormSectionContainer from "@/components/form/FormSectionContainer";
import EntryFormImage from "@/components/common/EntryForm/EntryFormImage";
import EntryFormTempInputs from "@/components/common/EntryForm/EntryFormTempInputs";
import createEntryAction from "@/lib/actions/entries/create-entry-action";
import { useToast } from "@/hooks/use-toast";
import { messages } from "@/lib/constants/messages";
import updateEntryAction from "@/lib/actions/entries/update-entry-action";
import { useRouter } from "next/navigation";
import EntryFormChangeStatus from "@/components/common/EntryForm/EntryFormChangeStatus";
import { ProductCode } from "@/lib/types/product-code";

type Props = {
  entry?: Entry;
  isWorker?: boolean;
  machines: Machine[] | null;
  productionMaterials: ProductionMaterial[] | null;
  packageTypes: PackageType[] | null;
  colors: Color[] | null;
  extras: Extra[] | null;
  productCodes: ProductCode[] | null;
  defaultValues?: Partial<EntryForm>;
} & FormProps;

export default function EntryForm({
  entry,
  method,
  isWorker,
  defaultValues,
  successMessage,
  submitButtonText,
  machines,
  packageTypes,
  colors,
  extras,
  productCodes,
  productionMaterials,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const isPost = method === "post";
  const isCompleted = entry?.status === "Completed";
  const machineOptions = useMemo(
    () => getSelectOptions(machines ?? [], "name"),
    [machines],
  );
  const productCodesOptions = useMemo(
    () => getSelectOptions(productCodes ?? [], "code"),
    [productCodes],
  );

  const productionMaterialsOptions = useMemo(
    () => getSelectOptions(productionMaterials ?? [], "name"),
    [productionMaterials],
  );
  const packageTypesOptions = useMemo(
    () => getSelectOptions(packageTypes ?? [], "name"),
    [packageTypes],
  );
  const colorOptions = useMemo(
    () => getSelectOptions(colors ?? [], "name"),
    [colors],
  );
  const extraOptions = useMemo(
    () => getSelectOptions(extras ?? [], "name"),
    [extras],
  );

  const onSubmitEntry = (values: EntryForm) => {
    startTransition(async () => {
      const error = isPost
        ? await createEntryAction(values)
        : await updateEntryAction(values, entry?.id);

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

  return (
    <Form
      onSubmitForm={onSubmitEntry}
      defaultValues={{
        ...defaultValues,
        screwsPerZone: {
          "1": entry?.screwsPerZone?.["1"],
          "2": entry?.screwsPerZone?.["2"],
          "3": entry?.screwsPerZone?.["3"],
          "4": entry?.screwsPerZone?.["4"],
          "5": entry?.screwsPerZone?.["5"],
          "6": entry?.screwsPerZone?.["6"],
        },
        kalupiTemp: {
          up: entry?.kalupiTemp?.up,
          down: entry?.kalupiTemp?.down,
          left: entry?.kalupiTemp?.left,
          right: entry?.kalupiTemp?.right,
          frontUp: entry?.kalupiTemp?.frontUp,
          frontDown: entry?.kalupiTemp?.frontDown,
        },
      }}
      zodSchema={entrySchema}
    >
      {({ register, errors, watch, setValue }) => {
        const machineId = watch("machineId");
        const selectedMachine = machines?.find(
          (machine) => machine.id === +machineId,
        );

        return (
          <div className="flex flex-col gap-5 lg:gap-7 pt-10">
            <div>
              {entry && !isWorker && (
                <EntryFormChangeStatus
                  status={entry.status}
                  entryId={entry.id}
                />
              )}
              <EntryFormMainInputs
                register={register}
                errors={errors}
                machineOptions={machineOptions}
                productCodesOptions={productCodesOptions}
                productionMaterialsOptions={productionMaterialsOptions}
                productCodes={productCodes ?? []}
                setValue={setValue}
                isCompleted={isCompleted}
              />
            </div>
            <FormSectionContainer className="px-5 sm:px-10 flex-col-reverse">
              {selectedMachine && selectedMachine.image && (
                <div className="relative aspect-[2/1] w-full lg:w-1/2">
                  <EntryFormImage image={selectedMachine.image} />
                </div>
              )}
              <EntryFormTempInputs
                register={register}
                errors={errors}
                isCompleted={isCompleted}
              />
            </FormSectionContainer>
            <EntryFormDetailsInputs
              register={register}
              errors={errors}
              packageTypesOptions={packageTypesOptions}
              extraOptions={extraOptions}
              colorOptions={colorOptions}
              isCompleted={isCompleted}
            />

            <div className="flex flex-col-reverse sm:flex-row justify-end px-5 pb-5 sm:px-10 sm:pb-10 gap-5">
              <Button
                variant="outline"
                className="md:col-end-3 lg:w-1/3"
                type="button"
                onClick={() => router.back()}
              >
                ΑΚΥΡΩΣΗ
              </Button>
              {!isCompleted && (
                <Button
                  disabled={pending}
                  isLoading={pending}
                  className="md:col-end-3 lg:w-1/3"
                  type="submit"
                >
                  {submitButtonText}
                </Button>
              )}
            </div>
          </div>
        );
      }}
    </Form>
  );
}
