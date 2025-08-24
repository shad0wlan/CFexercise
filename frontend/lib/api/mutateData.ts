"use server";

import { cookies } from "next/headers";
import type { Headers } from "@/lib/types/headers";

type MutateDataArgs<T> = {
  endpoint: string;
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  body?: T | FormData;
};

export default async function mutateData<T>({
  endpoint,
  method,
  body,
}: MutateDataArgs<T>) {
  const accessToken = cookies().get("accessToken")?.value;
  const baseUrl = process.env.API_URL;
  const headers: Headers = {
    "Content-Type": "application/json",
  };

  if (body instanceof FormData) {
    delete headers["Content-Type"];
  }

  // Add Authorization header if accessToken is present
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return fetch(`${baseUrl}${endpoint}`, {
    method,
    body:
      body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    headers,
  });
}
