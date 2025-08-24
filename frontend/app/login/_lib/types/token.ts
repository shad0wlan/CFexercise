import { Role } from "@/lib/types/user";

export type Token = {
  accessToken: string;
};

export type DecodedToken = {
  sid: string;
  given_name: string;
  role: Role;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
};
