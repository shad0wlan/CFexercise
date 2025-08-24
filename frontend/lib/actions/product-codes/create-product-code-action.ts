"use server";

import type { ProductCodeForm } from "@/lib/types/product-code";
import mutateData from "@/lib/api/mutateData";
import { endpoints } from "@/lib/constants/endpoints";
import { errorMessageResponse } from "@/lib/utils/error-message-response";
import { redirect } from "next/navigation";
import { routes } from "@/lib/constants/routes";

export default async function createProductCodeAction(values: ProductCodeForm) {
  const response = await mutateData({
    endpoint: endpoints.productCodes,
    method: "POST",
    body: values,
  });

  const data = await response.json();
  if (!response.ok) {
    return {
      message: errorMessageResponse(data),
    };
  }

  redirect(routes.productCodes);
}
