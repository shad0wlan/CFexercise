export function errorMessageResponse(data: any) {
  return Array.isArray(data)
    ? data?.[0]?.description
    : data?.message ??
        data?.detail ??
        "Τα πεδία δεν είναι σωστά συμπληρωμένα. Παρακαλώ δοκιμάστε ξανά.";
}
