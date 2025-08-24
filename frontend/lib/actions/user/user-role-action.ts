"use server";
import getUserAction from "@/lib/actions/user/get-user-action";

export default async function userRoleAction() {
  const user = await getUserAction();

  if (user) {
    return user.role;
  }

  return null;
}
