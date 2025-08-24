import UsersList from "@/app/(roles)/@admin/_components/UsersList";
import { Role } from "@/lib/types/user";

export default function Admin({
  searchParams,
}: {
  searchParams: {
    role: Role;
  };
}) {
  return <UsersList roleType={searchParams?.role ?? "Admin"} />;
}
