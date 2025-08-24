"use server";

import { EntryForm } from "@/lib/types/entry";
import mutateData from "@/lib/api/mutateData";
import { endpoints } from "@/lib/constants/endpoints";
import { routes } from "@/lib/constants/routes";
import { errorMessageResponse } from "@/lib/utils/error-message-response";
import { redirect } from "next/navigation";
import moment from "moment";
import { messages } from "@/lib/constants/messages";

export default async function updateEntryAction(
  values: EntryForm,
  id?: number,
) {
  if (!id) {
    return {
      message: messages.idIsMissing,
    };
  }

  const response = await mutateData({
    endpoint: `${endpoints.entries}/${id}`,
    method: "PATCH",
    body: {
      ...values,
      productionDate: values?.productionDate
        ? moment(values.productionDate).utc()
        : null,
    },
  });

  if (!response.ok) {
    const data = response.json();
    return {
      message: errorMessageResponse(data),
    };
  }

  redirect(routes.home);
}
