import { z } from "zod";
import {
  createUserSchema,
  updateUserSchema,
} from "@/app/(roles)/@admin/_lib/schema/user-schema";

export type CreateUserForm = z.infer<typeof createUserSchema>;
export type UpdateUserForm = z.infer<typeof updateUserSchema>;
