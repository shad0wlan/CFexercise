import EditProductCodePage from "@/components/common/EditProductCodePage/EditProductCodePage";

export default function EditProductCode({
  params,
}: {
  params: { id: string };
}) {
  return <EditProductCodePage id={params.id} />;
}
