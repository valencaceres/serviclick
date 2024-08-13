import { use } from "react";

import Landing from "@/components/functional/Landing";

import config from "../utils/config";

async function getData() {
  const res = await fetch(
    `${config.server}/api/broker/getProductsAndAssistancesByBrokerId/${config.service}`,
    {
      headers: {
        id: `${config.apiKey}`,
      },
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    throw new Error("Error al cargar los datos");
  }
  return res.json();
}

export default function Home() {
  const data = use(getData());
  return <Landing initialData={data} />;
}
