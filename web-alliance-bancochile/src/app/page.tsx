import { use } from "react";

import Landing from "@/components/functional/Landing";

import { getProductList } from "@/store/services/product.service";

async function getData() {
  const data = await getProductList();
  return data;
}

export default function Home() {
  const data = use(getData());
  return <Landing initialData={data} />;
}
