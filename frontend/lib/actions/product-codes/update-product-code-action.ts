"use server";

import type { ProductCodeForm } from "@/lib/types/product-code";
import { messages } from "@/lib/constants/messages";
import mutateData from "@/lib/api/mutateData";
import { endpoints } from "@/lib/constants/endpoints";
import { errorMessageResponse } from "@/lib/utils/error-message-response";
import { redirect } from "next/navigation";
import { routes } from "@/lib/constants/routes";

export default async function updateProductCodeAction(
  values: ProductCodeForm,
  id?: number,
) {
  if (!id) {
    return {
      message: messages.idIsMissing,
    };
  }

  const response = await mutateData({
    endpoint: `${endpoints.productCodes}/${id}`,
    method: "PATCH",
    body: values,
  });

  if (!response.ok) {
    const data = response.json();
    return {
      message: errorMessageResponse(data),
    };
  }

  redirect(routes.productCodes);
}
