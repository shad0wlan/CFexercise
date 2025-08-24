import { z } from "zod";
import { messages } from "@/lib/constants/messages";

export const machineSchema = z.object({
  name: z.string().trim().min(1, messages.required),
  image: z.custom<File>((file) => file instanceof File).optional(),
});
