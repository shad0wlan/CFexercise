import EntryFormSectionLabel from "@/components/common/EntryForm/EntryFormSectionLabel";
import FormSectionContainer from "@/components/form/FormSectionContainer";
import Text from "@/components/ui/Text";
import Label from "@/components/form/Label";
import FormGroup from "@/components/form/FormGroup";
import Input from "@/components/form/Input";
import InputErrorText from "@/components/form/InputErrorText";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { entrySchema } from "@/lib/schema/entry-schema";

type Props = {
  register: UseFormRegister<z.infer<typeof entrySchema>>;
  errors: FieldErrors<z.infer<typeof entrySchema>>;
  isCompleted: boolean;
};

export default function EntryFormTempInputs({
  register,
  errors,
  isCompleted,
}: Props) {
  return (
    <FormSectionContainer className="w-full lg:w-1/2 lg:flex-col ml-auto mt-5">
      <EntryFormSectionLabel label="Θερμοκρασίες" className="rounded-[20px]" />
      <FormSectionContainer className="lg:flex-col">
        <Text className="text-center text-sm font-semibold mb-1.5">
          Κοχλία ανά ζώνη
        </Text>
        <FormSectionContainer className="lg:flex-col gap-2">
          <FormSectionContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
            <FormGroup>
              <Label>Κανονιού</Label>
              <Input
                placeholder="180"
                hasError={errors?.cannonTemp}
                {...register("cannonTemp")}
                disabled={isCompleted}
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
                disabled={isCompleted}
              />
              {errors?.screwsPerZone?.["1"] && (
                <InputErrorText error={errors?.screwsPerZone?.["1"]?.message} />
              )}
            </FormGroup>
            <FormGroup>
              <Label>Ζώνη 2</Label>

              <Input
                placeholder="170"
                hasError={errors?.screwsPerZone?.["2"]}
                {...register("screwsPerZone.2")}
                disabled={isCompleted}
              />
              {errors?.screwsPerZone?.["2"] && (
                <InputErrorText error={errors?.screwsPerZone?.["2"]?.message} />
              )}
            </FormGroup>
            <FormGroup>
              <Label>Ζώνη 3</Label>

              <Input
                placeholder="175"
                hasError={errors?.screwsPerZone?.["3"]}
                {...register("screwsPerZone.3")}
                disabled={isCompleted}
              />
              {errors?.screwsPerZone?.["3"] && (
                <InputErrorText error={errors?.screwsPerZone?.["3"]?.message} />
              )}
            </FormGroup>
            <FormGroup>
              <Label>Ζώνη 4</Label>

              <Input
                placeholder="180"
                hasError={errors?.screwsPerZone?.["4"]}
                {...register("screwsPerZone.4")}
                disabled={isCompleted}
              />
              {errors?.screwsPerZone?.["4"] && (
                <InputErrorText error={errors?.screwsPerZone?.["4"]?.message} />
              )}
            </FormGroup>
            <FormGroup>
              <Label>Ζώνη 5</Label>

              <Input
                placeholder="185"
                hasError={errors?.screwsPerZone?.["5"]}
                {...register("screwsPerZone.5")}
                disabled={isCompleted}
              />
              {errors?.screwsPerZone?.["5"] && (
                <InputErrorText error={errors?.screwsPerZone?.["5"]?.message} />
              )}
            </FormGroup>
            <FormGroup>
              <Label>Ζώνη 6</Label>

              <Input
                placeholder="190"
                hasError={errors?.screwsPerZone?.["6"]}
                {...register("screwsPerZone.6")}
                disabled={isCompleted}
              />
              {errors?.screwsPerZone?.["6"] && (
                <InputErrorText error={errors?.screwsPerZone?.["6"]?.message} />
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
                disabled={isCompleted}
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
                disabled={isCompleted}
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
                disabled={isCompleted}
              />
              {errors?.kalupiTemp?.right && (
                <InputErrorText error={errors?.kalupiTemp?.right?.message} />
              )}
            </FormGroup>
            <FormGroup>
              <Label>Αριστερά</Label>

              <Input
                placeholder="75"
                hasError={errors?.kalupiTemp?.left}
                {...register("kalupiTemp.left")}
                disabled={isCompleted}
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
                disabled={isCompleted}
              />
              {errors?.kalupiTemp?.frontUp && (
                <InputErrorText error={errors?.kalupiTemp?.frontUp?.message} />
              )}
            </FormGroup>
            <FormGroup>
              <Label>Μπρ. Κάτω</Label>

              <Input
                placeholder="95"
                hasError={errors?.kalupiTemp?.frontDown}
                {...register("kalupiTemp.frontDown")}
                disabled={isCompleted}
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
              disabled={isCompleted}
            />
            {errors?.speed && <InputErrorText error={errors?.speed?.message} />}
          </FormGroup>
        </FormSectionContainer>
      </FormSectionContainer>
    </FormSectionContainer>
  );
}
