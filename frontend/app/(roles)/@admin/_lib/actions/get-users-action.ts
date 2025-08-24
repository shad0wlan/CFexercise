"use server";

import { Role, User } from "@/lib/types/user";
import fetcher from "@/lib/api/fetcher";
import { endpoints } from "@/lib/constants/endpoints";
import { tags } from "@/lib/constants/tags";

export default async function getUsersAction(roleType: Role) {
  return fetcher<User[]>({
    endpoint: `${endpoints.users}?role=${roleType}`,
  });
}
