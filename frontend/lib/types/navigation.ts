import { Role } from "@/lib/types/user";

export type RolePaths = Record<
  Role,
  { id: number; path: string; label: string }[]
>;
