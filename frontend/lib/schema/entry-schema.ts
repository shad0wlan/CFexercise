import { z } from "zod";
import { messages } from "@/lib/constants/messages";

const isValidPercentage = (value: number) => value >= 0 && value <= 100;

const numberParams = { message: messages.enterNumber, coerce: true };

export const entrySchema = z.object({
  width: z.number(numberParams).min(1, messages.required),
  thickness: z.number(numberParams).min(1, messages.required),
  weightPerMeter: z.number(numberParams).min(1, messages.required),
  weightTotal: z.number(numberParams).min(1, messages.required),
  cannonTemp: z.number(numberParams).min(1, messages.required),
  speed: z.number(numberParams).min(1, messages.required),
  colorPercentage: z
    .number(numberParams)
    .min(1, messages.required)
    .max(100, messages.max100)
    .refine(isValidPercentage, {
      message: messages.percentageMinMaxValues,
    }),
  productionForStock: z.number(numberParams).min(1, messages.required),

  kgRecycling: z.number(numberParams).optional().nullable(),
  productionDate: z.string().trim().optional(),
  printerText: z.string().trim().optional(),
  notes: z.string().optional(),

  machineId: z.string().trim().min(1, messages.required),
  productCodeId: z.string().trim().min(1, messages.required),
  colorId: z.string().trim().min(1, messages.required),
  packageTypeId: z.string().trim().min(1, messages.required),
  productionMaterialId: z.string().trim().min(1, messages.required),
  extraId: z.string().trim().optional(),

  screwsPerZone: z.object({
    "1": z.number(numberParams).min(1, messages.required),
    "2": z.number(numberParams).min(1, messages.required),
    "3": z.number(numberParams).min(1, messages.required),
    "4": z.number(numberParams).min(1, messages.required),
    "5": z.number(numberParams).min(1, messages.required),
    "6": z.number(numberParams).nullable(),
  }),

  kalupiTemp: z.object({
    up: z.number(numberParams).min(1, messages.required),
    down: z.number(numberParams).min(1, messages.required),
    left: z.number(numberParams).min(1, messages.required),
    right: z.number(numberParams).min(1, messages.required),
    frontUp: z.number(numberParams).min(1, messages.required),
    frontDown: z.number(numberParams).min(1, messages.required),
  }),
});
