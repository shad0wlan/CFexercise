import EditEntryPage from "@/components/common/EditEntryPage";

export default function EditEntry({ params }: { params: { entryId: string } }) {
  return <EditEntryPage entryId={params.entryId} />;
}
