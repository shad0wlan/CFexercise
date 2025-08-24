import { z } from "zod";
import { messages } from "@/lib/constants/messages";

const isValidPercentage = (value: number) => value >= 0 && value <= 100;

const numberParams = { message: messages.enterNumber, coerce: true };

export const productCodeSchema = z.object({
  code: z.string().trim().min(1, messages.required),
  cannonTemp: z.number(numberParams).optional().nullable(),
  speed: z.number(numberParams).optional().nullable(),
  screwsPerZone: z.object({
    "1": z.number(numberParams).nullable(),
    "2": z.number(numberParams).nullable(),
    "3": z.number(numberParams).nullable(),
    "4": z.number(numberParams).nullable(),
    "5": z.number(numberParams).nullable(),
    "6": z.number(numberParams).nullable(),
  }),

  kalupiTemp: z.object({
    up: z.number(numberParams).nullable(),
    down: z.number(numberParams).nullable(),
    left: z.number(numberParams).nullable(),
    right: z.number(numberParams).nullable(),
    frontUp: z.number(numberParams).nullable(),
    frontDown: z.number(numberParams).nullable(),
  }),
});
