import React from "react";
import { Role } from "@/lib/types/user";
import userRoleAction from "@/lib/actions/user/user-role-action";
import Header from "@/components/header/Header";
import { notFound } from "next/navigation";
import Navigation from "@/components/navigation/Navigation";

export default async function RolesLayout({
  admin,
  operator,
  worker,
}: {
  admin: React.ReactNode;
  operator: React.ReactNode;
  worker: React.ReactNode;
}) {
  // Get authenticated user role
  const userRole: Role | null = await userRoleAction();

  // Create a Record with key of the roles and value of the page
  const activeRolePage: Record<Role, React.ReactNode> = {
    Admin: admin,
    Operator: operator,
    Worker: worker,
  };
  return (
    <section className="p-5 sm:p-8 lg:p-16">
      <Header />
      <Navigation />
      {userRole ? activeRolePage[userRole] : notFound()}
    </section>
  );
}
// TODO Add edit entry to operator and admin
