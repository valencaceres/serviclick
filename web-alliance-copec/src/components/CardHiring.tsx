"use client";

import { useState } from "react";
import { use } from "react";

import config from "@/utils/config";
import download from "@/utils/download";

interface Props {
  hiringConditions: string;
  productPlanId: string;
  name: string;
}

export const CardHiring = ({
  hiringConditions,
  productPlanId,
  name,
}: Props) => {
  const [more, setMore] = useState(false);

  const handleClickDownloadPDF = async () => {
    const res = await fetch(
      `${config.server}/api/product/getBase64ByProductPlanId/${productPlanId}`,
      {
        headers: {
          id: `${config.apiKey}`,
        },
      }
    );
    if (res.ok) {
      const jsonData = await res.json();
      download(jsonData.data, name);
    }
  };

  return (
    <div className="p-8 bg-slate-200 rounded-b-3xl">
      <p
        className={`text-justify ${more ? "line-clamp-none" : "line-clamp-4"}`}>
        {hiringConditions}
      </p>
      <button
        className={`font-bold ${more ? "hidden" : "block"}`}
        onClick={() => setMore(true)}>
        Ver más.
      </button>
      <button
        className={`font-bold ${more ? "block" : "hidden"}`}
        onClick={() => setMore(false)}>
        Ver menos.
      </button>
      <div className="flex">
        <button
          className="ml-auto bg-sky-800 text-sky-100 py-1 px-3 text-sm rounded-lg"
          onClick={handleClickDownloadPDF}>
          Descargar PDF
        </button>
      </div>
    </div>
  );
};
