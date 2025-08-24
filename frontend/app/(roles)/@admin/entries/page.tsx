import EntriesList from "@/components/common/EntriesPage/EntriesList";
import type { SearchParamsStatus } from "@/lib/types/entry";

export default async function Worker({
  searchParams,
}: {
  searchParams: { status: SearchParamsStatus };
}) {
  return <EntriesList status={searchParams?.status ?? "All"} />;
}
