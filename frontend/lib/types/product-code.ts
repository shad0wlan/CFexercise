import { z } from "zod";
import { productCodeSchema } from "@/lib/schema/product-code-schema";

export type ScrewsPerZone = {
  1: number | null;
  2: number | null;
  3: number | null;
  4: number | null;
  5: number | null;
  6: number | null;
};

export type KalupiTemp = {
  up: number | null;
  down: number | null;
  left: number | null;
  right: number | null;
  frontUp: number | null;
  frontDown: number | null;
};

export type ProductCode = {
  id: number;
  code: string;
  cannonTemp: number | null;
  speed: number | null;
  screwsPerZone: ScrewsPerZone;
  kalupiTemp: KalupiTemp;
};

export type ProductCodeForm = z.infer<typeof productCodeSchema>;
