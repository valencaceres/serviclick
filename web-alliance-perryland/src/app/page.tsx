import LandingPage from "@/components/LandingPage";
import config from '@/utils/config';
import { use } from "react";

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

export default function HomePage(){
  const data = use(getData());
  return <LandingPage initialData={data}/>;
}