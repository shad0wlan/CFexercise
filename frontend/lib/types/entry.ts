import { User } from "@/lib/types/user";
import { Machine } from "@/app/(roles)/@admin/machines/_lib/type/machine";
import { Color } from "@/lib/types/color";
import { PackageType } from "@/lib/types/package-type";
import { ProductionMaterial } from "@/lib/types/product-material";
import { Extra } from "@/lib/types/extra";
import { z } from "zod";
import { entrySchema } from "@/lib/schema/entry-schema";
import { ProductCode } from "@/lib/types/product-code";

export type EntryStatus = "Pending" | "Production" | "Completed";
export type SearchParamsStatus = "All" | EntryStatus;

export type ScrewsPerZone = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number | null;
};

export type KalupiTemp = {
  up: number;
  down: number;
  left: number;
  right: number;
  frontUp: number;
  frontDown: number;
};

export type Entry = {
  id: number;
  status: EntryStatus;
  createdAt: string;
  updatedAt: string | null;
  productionDate: string | null;
  printerText: string | null;
  notes: string | null;
  weightPerMeter: number;
  weightTotal: number;
  width: number;
  thickness: number;
  cannonTemp: number;
  speed: number;
  colorPercentage: number;
  productionForStock: number;
  kgRecycling: number | null;
  screwsPerZone: ScrewsPerZone;
  kalupiTemp: KalupiTemp;
  user: User;
  machine: Machine;
  productCode: ProductCode;
  color: Color;
  packageType: PackageType;
  productionMaterial: ProductionMaterial;
  extra: Extra | null;
};

export type EntryForm = z.infer<typeof entrySchema>;
