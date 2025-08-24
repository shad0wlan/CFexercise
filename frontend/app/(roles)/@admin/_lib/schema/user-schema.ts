import { z } from "zod";
import { messages } from "@/lib/constants/messages";

export const createUserSchema = z.object({
  username: z.string().trim().min(1, messages.required),
  firstName: z.string().trim().min(1, messages.required),
  lastName: z.string().trim().min(1, messages.required),
  email: z.string().trim().min(1, messages.required).email(messages.email),
  role: z.string().trim().min(1, messages.required),
  password: z.string().trim().min(8, messages.minEight),
});

export const updateUserSchema = z
  .object({
    username: z.string().trim().min(1, messages.required),
    firstName: z.string().trim().min(1, messages.required),
    lastName: z.string().trim().min(1, messages.required),
    email: z.string().trim().min(1, messages.required).email(messages.email),
    role: z.string().trim().min(1, messages.required),
    password: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password && data.password?.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: messages.minEight,
        path: ["password"],
      });
    }
  });
