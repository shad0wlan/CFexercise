"use server";

import fetcher from "@/lib/api/fetcher";
import { User } from "@/lib/types/user";
import { endpoints } from "@/lib/constants/endpoints";

export default async function gerUserDetailsAction(id: string) {
  return fetcher<User>({
    endpoint: `${endpoints.users}/${id}`,
  });
}
