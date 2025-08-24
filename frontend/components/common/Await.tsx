import { ReturnData } from "@/lib/api/fetcher";
import React from "react";

type Props<T> = {
  resolve: () => Promise<ReturnData<T>>;
  errorFallback: (error: string) => React.ReactNode;
  children: (data: T) => React.ReactNode;
};

export default async function Await<T>({
  children,
  resolve,
  errorFallback,
}: Props<T>) {
  const { data, error } = await resolve();
  return <>{data ? children(data!) : errorFallback(error!)}</>;
}
