"use client";
import Table from "@/components/table/Table";
import { User } from "@/lib/types/user";
import { ColumnDef } from "@tanstack/table-core";
import { routes } from "@/lib/constants/routes";
import UserTabs from "@/app/(roles)/@admin/_components/UserTabs";
import TableActions from "@/components/table/TableActions";
import deleteUserAction from "@/app/(roles)/@admin/_lib/actions/delete-user-action";
import { useMemo } from "react";
import { titles } from "@/lib/constants/titles";

type Props = {
  users: User[];
};

const rolesInGreek = {
  Admin: "Διαχειριστής",
  Operator: "Χειριστής Μηχανής",
  Worker: "Καταχωρητής",
};

export default function UsersTable({ users = [] }: Props) {
  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        header: "Όνομα Χρήστη",
        accessorKey: "username",
      },
      {
        header: "Όνομα",
        accessorKey: "firstName",
      },
      {
        header: "Επώνυμο",
        accessorKey: "lastName",
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: ({ row }) => (
          <a href={`mailto:${row.original.email}`} className="text-blue-500">
            {row.original.email}
          </a>
        ),
      },
      {
        header: "Τύπος χρήστη",
        accessorKey: "role",
        cell: ({ row }) => <span>{rolesInGreek[row.original.role]}</span>,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <TableActions
            onEdit={`${routes.editUser}/${row.original.id}`}
            onDelete={() => deleteUserAction(row.original.id)}
          />
        ),
      },
    ],
    [],
  );

  return (
    <Table
      data={users}
      columns={columns}
      title={titles.users}
      linkLabel="ΠΡΟΣΘΗΚΗ ΧΡΗΣΤΗ"
      linkHref={routes.addUser}
    >
      <UserTabs />
    </Table>
  );
}
