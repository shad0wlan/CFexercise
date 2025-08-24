import { z } from "zod";
import { loginSchema } from "@/app/login/_lib/schema/login-schema";

export type Login = z.infer<typeof loginSchema>;
