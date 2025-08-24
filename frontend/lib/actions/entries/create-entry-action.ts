"use server";

import { EntryForm } from "@/lib/types/entry";
import mutateData from "@/lib/api/mutateData";
import { endpoints } from "@/lib/constants/endpoints";
import { routes } from "@/lib/constants/routes";
import { errorMessageResponse } from "@/lib/utils/error-message-response";
import { redirect } from "next/navigation";
import moment from "moment";

export default async function createEntryAction(values: EntryForm) {
  const response = await mutateData({
    endpoint: endpoints.entries,
    method: "POST",
    body: {
      ...values,
      productionDate: values?.productionDate
        ? moment(values.productionDate).utc()
        : null,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch((_) => null);
    return {
      message: errorMessageResponse(data),
    };
  }

  redirect(routes.home);
}
