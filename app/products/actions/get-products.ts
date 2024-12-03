"use server";

import { get } from "@/app/common/util/fetch";
import Product from "../product";

export default async function getProducts() {
  return get<Product[]>("products");
}
