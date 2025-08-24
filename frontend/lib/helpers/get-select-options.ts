export function getSelectOptions<T extends { id: number }>(
  data: T[],
  accessor: string,
) {
  return data?.map((item) => ({
    label: item[accessor as keyof typeof item] as string,
    value: item.id,
  }));
}
