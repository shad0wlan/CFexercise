import { cookies } from "next/headers";
import type { Headers } from "@/lib/types/headers";
type Options = {
  next?: {
    tags?: string[];
    revalidate?: number;
  };
  cache?: "force-cache" | "no-store";
};

type FetcherArgs = {
  endpoint: string;
  options?: Options;
};

type FetcherOptions = {
  headers: Headers;
  options?: Options;
};

export type ReturnData<T> = {
  data: T | null;
  error: string | null;
};

export default async function fetcher<T>({
  endpoint,
  options = {
    cache: "no-store",
  },
}: FetcherArgs): Promise<ReturnData<T>> {
  const accessToken = cookies().get("accessToken")?.value;
  const baseUrl = process.env.API_URL;
  const headers: Headers = {
    "Content-Type": "application/json",
  };

  // Add Authorization header if accessToken is present
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Fetcher options
  const fetcherOptions: FetcherOptions = {
    headers,
    ...options,
  };

  const response = await fetch(`${baseUrl}${endpoint}`, fetcherOptions);

  // If the response is not ok, return an error object
  if (!response.ok)
    return {
      data: null,
      error: `Παρουσιάστηκε σφάλμα. ${response.statusText} - ${response.status}`,
    };

  const data = await response.json();

  return {
    data: data as T,
    error: null,
  };
}
