import { z } from "zod";
import { machineSchema } from "@/app/(roles)/@admin/machines/_lib/schema/machine-schema";

export type MachineForm = z.infer<typeof machineSchema>;
