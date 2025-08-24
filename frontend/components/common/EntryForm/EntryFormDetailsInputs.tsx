import { SelectOption } from "@/lib/types/select-option";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { entrySchema } from "@/lib/schema/entry-schema";
import FormSectionContainer from "@/components/form/FormSectionContainer";
import FormGroup from "@/components/form/FormGroup";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import InputErrorText from "@/components/form/InputErrorText";
import Input from "@/components/form/Input";
import EntryFormSectionLabel from "@/components/common/EntryForm/EntryFormSectionLabel";
import TextArea from "@/components/form/TextArea";

type Props = {
  packageTypesOptions: SelectOption[];
  colorOptions: SelectOption[];
  extraOptions: SelectOption[];
  register: UseFormRegister<z.infer<typeof entrySchema>>;
  errors: FieldErrors<z.infer<typeof entrySchema>>;
  isCompleted: boolean;
};

export default function EntryFormDetailsInputs({
  packageTypesOptions,
  extraOptions,
  colorOptions,
  register,
  errors,
  isCompleted,
}: Props) {
  return (
    <>
      <EntryFormSectionLabel label="Λεπτομέρειες" className="my-5" />
      <FormSectionContainer className="px-5 sm:px-10 lg:flex-col ">
        <FormSectionContainer>
          <FormGroup>
            <Label>Tύπος Συσκευασίας</Label>
            <Select
              options={packageTypesOptions}
              placeholder="Eπιλέξτε συσκευασία"
              hasError={errors?.packageTypeId}
              {...register("packageTypeId")}
              disabled={isCompleted}
            />
            {errors?.packageTypeId && (
              <InputErrorText error={errors?.packageTypeId?.message} />
            )}
          </FormGroup>
          <FormGroup>
            <Label>Χρώμα</Label>
            <Select
              options={colorOptions}
              placeholder="Eπιλέξτε xρώμα"
              hasError={errors?.colorId}
              {...register("colorId")}
              disabled={isCompleted}
            />
            {errors?.colorId && (
              <InputErrorText error={errors?.colorId?.message} />
            )}
          </FormGroup>
          <FormGroup>
            <Label>Ποσοστό %</Label>
            <Input
              hasError={errors?.colorPercentage}
              {...register("colorPercentage")}
              placeholder="Χρώμα %"
              disabled={isCompleted}
            />
            {errors?.colorPercentage && (
              <InputErrorText error={errors?.colorPercentage?.message} />
            )}
          </FormGroup>
          <FormGroup className="lg:w-[200%]">
            <Label>Κείμενο Εκτυπωτή</Label>
            <Input
              hasError={errors?.printerText}
              {...register("printerText")}
              disabled={isCompleted}
            />
            {errors?.printerText && (
              <InputErrorText error={errors?.printerText?.message} />
            )}
          </FormGroup>
          <FormGroup>
            <Label>Πρόσθετα</Label>
            <Select
              options={extraOptions}
              placeholder="Eπιλέξτε πρόσθετο"
              hasError={errors?.extraId}
              {...register("extraId")}
              disabled={isCompleted}
            />
            {errors?.extraId && (
              <InputErrorText error={errors?.extraId?.message} />
            )}
          </FormGroup>
        </FormSectionContainer>
        <FormSectionContainer>
          <div className="flex flex-col gap-5">
            <FormGroup>
              <Label>Kg Ανακύκλωσης</Label>
              <Input
                hasError={errors?.kgRecycling}
                {...register("kgRecycling")}
                disabled={isCompleted}
              />
              {errors?.kgRecycling && (
                <InputErrorText error={errors?.kgRecycling?.message} />
              )}
            </FormGroup>
            <FormGroup>
              <Label>Ημ. Παραγωγή</Label>
              <Input
                hasError={errors?.productionDate}
                type="datetime-local"
                {...register("productionDate")}
                disabled={isCompleted}
              />
              {errors?.productionDate && (
                <InputErrorText error={errors?.productionDate?.message} />
              )}
            </FormGroup>
          </div>

          <FormGroup>
            <Label>Σχόλια</Label>
            <TextArea
              rows={4}
              hasError={errors?.notes}
              {...register("notes")}
              className="h-full"
              disabled={isCompleted}
            />
            {errors?.notes && <InputErrorText error={errors?.notes?.message} />}
          </FormGroup>
        </FormSectionContainer>
      </FormSectionContainer>
    </>
  );
}
