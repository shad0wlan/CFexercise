"use server";

import { cookies } from "next/headers";
import { User } from "@/lib/types/user";

export default async function getUserAction() {
  const user = cookies().get("user")?.value;
  if (user) {
    return JSON.parse(user) as User;
  }

  return null;
}
