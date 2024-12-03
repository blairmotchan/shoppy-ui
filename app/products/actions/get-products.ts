"use server";

import { get } from "@/app/common/util/fetch";

export default async function getProducts() {
  return get<Product[]>("products");
}
