import FormSectionContainer from "@/components/form/FormSectionContainer";
import FormGroup from "@/components/form/FormGroup";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import InputErrorText from "@/components/form/InputErrorText";
import Input from "@/components/form/Input";
import { SelectOption } from "@/lib/types/select-option";
import { z } from "zod";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { entrySchema } from "@/lib/schema/entry-schema";
import { ProductCode } from "@/lib/types/product-code";
import { ChangeEvent } from "react";

type Props = {
  machineOptions: SelectOption[];
  productionMaterialsOptions: SelectOption[];
  productCodesOptions: SelectOption[];
  productCodes: ProductCode[];
  setValue: UseFormSetValue<z.infer<typeof entrySchema>>;
  register: UseFormRegister<z.infer<typeof entrySchema>>;
  errors: FieldErrors<z.infer<typeof entrySchema>>;
  isCompleted: boolean;
};
export default function EntryFormMainInputs({
  machineOptions,
  productionMaterialsOptions,
  productCodesOptions,
  productCodes,
  setValue,
  register,
  errors,
  isCompleted,
}: Props) {
  return (
    <FormSectionContainer className="lg:flex-col px-5 sm:px-10 ">
      <FormSectionContainer>
        <FormGroup>
          <Label htmlFor="machineId">Επιλογή Μηχανής</Label>
          <Select
            options={machineOptions}
            placeholder="Eπιλέξτε μηχανή"
            hasError={errors?.machineId}
            disabled={isCompleted}
            {...register("machineId")}
          />
          {errors?.machineId && (
            <InputErrorText error={errors?.machineId?.message} />
          )}
        </FormGroup>
        <FormGroup>
          <Label>Κωδικός Προϊόντος</Label>
          <Select
            options={productCodesOptions}
            placeholder="Eπιλέξτε κωδικό προϊόντος"
            hasError={errors?.productCodeId}
            disabled={isCompleted}
            {...register("productCodeId")}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              const selectedProductCode = productCodes?.find(
                (productCode) => productCode.id === +e.target.value,
              );
              setValue("productCodeId", e.target.value);
              setValue("cannonTemp", selectedProductCode?.cannonTemp!);
              setValue("speed", selectedProductCode?.speed!);
              setValue("screwsPerZone", {
                "1": selectedProductCode?.screwsPerZone?.["1"]!,
                "2": selectedProductCode?.screwsPerZone?.["2"]!,
                "3": selectedProductCode?.screwsPerZone?.["3"]!,
                "4": selectedProductCode?.screwsPerZone?.["4"]!,
                "5": selectedProductCode?.screwsPerZone?.["5"]!,
                "6": selectedProductCode?.screwsPerZone?.["6"]!,
              });
              setValue("kalupiTemp", {
                up: selectedProductCode?.kalupiTemp?.up!,
                down: selectedProductCode?.kalupiTemp?.down!,
                left: selectedProductCode?.kalupiTemp?.left!,
                right: selectedProductCode?.kalupiTemp?.right!,
                frontUp: selectedProductCode?.kalupiTemp?.frontUp!,
                frontDown: selectedProductCode?.kalupiTemp?.frontDown!,
              });
            }}
          />
          {errors?.productCodeId && (
            <InputErrorText error={errors?.productCodeId?.message} />
          )}
        </FormGroup>
        <FormGroup>
          <Label>Υλικό Παραγωγής</Label>
          <Select
            options={productionMaterialsOptions}
            placeholder="Eπιλέξτε υλικό"
            hasError={errors?.productionMaterialId}
            {...register("productionMaterialId")}
            disabled={isCompleted}
          />
          {errors?.productionMaterialId && (
            <InputErrorText error={errors?.productionMaterialId?.message} />
          )}
        </FormGroup>
      </FormSectionContainer>
      <FormSectionContainer>
        <FormGroup>
          <Label>Βαρος/μ.</Label>
          <Input
            hasError={errors?.weightPerMeter}
            {...register("weightPerMeter")}
            disabled={isCompleted}
          />
          {errors?.weightPerMeter && (
            <InputErrorText error={errors?.weightPerMeter?.message} />
          )}
        </FormGroup>
        <FormGroup>
          <Label>Βαρος Σύνολο</Label>
          <Input
            hasError={errors?.weightTotal}
            {...register("weightTotal")}
            disabled={isCompleted}
          />
          {errors?.weightTotal && (
            <InputErrorText error={errors?.weightTotal?.message} />
          )}
        </FormGroup>
        <FormGroup>
          <Label>Παραγωγή για stock</Label>
          <Input
            hasError={errors?.productionForStock}
            {...register("productionForStock")}
            disabled={isCompleted}
          />
          {errors?.productionForStock && (
            <InputErrorText error={errors?.productionForStock?.message} />
          )}
        </FormGroup>
        <div className="w-full flex flex-col gap-2">
          <Label>Διάσταση Προφίλ</Label>
          <div className="flex gap-5">
            <FormGroup>
              <Input
                hasError={errors?.width}
                {...register("width")}
                placeholder="Πλατός"
                disabled={isCompleted}
              />
              {errors?.width && (
                <InputErrorText error={errors?.width?.message} />
              )}
            </FormGroup>
            <FormGroup>
              <Input
                hasError={errors?.thickness}
                {...register("thickness")}
                placeholder="Πάχος"
                disabled={isCompleted}
              />
              {errors?.thickness && (
                <InputErrorText error={errors?.thickness?.message} />
              )}
            </FormGroup>
          </div>
        </div>
      </FormSectionContainer>
    </FormSectionContainer>
  );
}
