"use client";

import { useState } from "react";

interface Props{
    hiringConditions: string
}

export const CardHiring = ({hiringConditions}: Props) => {
    const [more, setMore] = useState(false);
  return (
    <div className="p-8 bg-slate-200 rounded-b-3xl">
        <p className={`text-justify ${more ? 'line-clamp-none' : 'line-clamp-4'}`}>{hiringConditions}</p>
        <button className={`font-bold ${more ? 'hidden' : 'block'}`} onClick={() => setMore(true)}>Ver más.</button>
        <button className={`font-bold ${more ? 'block' : 'hidden'}`} onClick={() => setMore(false)}>Ver menos.</button>
        <div className="flex">
          <button className="ml-auto bg-sky-800 text-sky-100 py-1 px-3 text-sm rounded-lg">Descargar PDF</button>
        </div>
    </div>
  )
}
