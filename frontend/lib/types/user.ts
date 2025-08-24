export type Role = "Admin" | "Operator" | "Worker";

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};
