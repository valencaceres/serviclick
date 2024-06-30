import React, { useEffect } from "react";

import { DollarSignIcon, WalletIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";

import {Button} from "../ui/Button";

import { useRetail } from "~/store/hooks/index";
import { Retail } from "~/interfaces/retail";
import { useUI } from "~/store/hooks/index";
import { Skeleton } from "../ui/Skeleton";

export const Dashboard: React.FC = () => {
  const { retail } = useUI();

  return (
    <div className="flex w-full flex-col items-center gap-2 pl-12">
      <RetailSummary retail={retail} />
    </div>
  );
};

function RetailSummary({ retail }: { retail: Retail | null }) {

  const {
    getDetailsByRetailId,
    summary: data,
    isLoading: loading,
    getSalesMultiHogar,
    retail64
  } = useRetail();
  const base64ToArrayBuffer = (base64: string) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};

const downloadSales = () => {
  
    const fileName = `Ventas-${retail?.name}.xlsx`
    const base64String: string = String(retail64);
    try {
        const arrayBuffer = base64ToArrayBuffer(base64String);
        const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
    }
};

  useEffect(() => {
    if (retail && retail.id) {
      getDetailsByRetailId(retail?.id || '');
      getSalesMultiHogar(retail?.id || '')
    }
  }, [retail, getDetailsByRetailId]);
  const isLoading = loading || data?.summary?.charged === null;
  return (
    <div className="flex w-full flex-col flex-wrap items-center gap-4 py-4 lg:flex-row lg:justify-center">
    <div className="flex w-full flex-col flex-wrap items-center gap-4 py-4 lg:flex-row lg:justify-center">
      <Card className="w-full max-w-xs hover:bg-slate-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Cantidad de Ventas</CardTitle>
            <WalletIcon className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading || !retail ? (
            <Skeleton className="h-8 w-full bg-primary-500" />
          ) : (
            <h2 className="text-2xl font-bold">
              {data?.summary?.quantity} ventas
            </h2>
          )}
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-full bg-primary-500" />
        </CardFooter>
      </Card>
      <Card className="w-full max-w-xs bg-green-100 hover:bg-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Cobrado</CardTitle>
            <DollarSignIcon className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading || !retail ? (
            <Skeleton className="h-8 w-full bg-primary-500" />
          ) : (
            <h2 className="text-2xl font-bold">
              {data?.summary?.charged?.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </h2>
          )}
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-full bg-primary-500" />
        </CardFooter>
      </Card>
      <Card className="w-full max-w-xs bg-yellow-100 hover:bg-yellow-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pagado</CardTitle>
            <DollarSignIcon className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading || !retail ? (
            <Skeleton className="h-8 w-full bg-primary-500" />
          ) : (
            <h2 className="text-2xl font-bold">
              {data?.summary?.paid?.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </h2>
          )}
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-full bg-primary-500" />
        </CardFooter>
      </Card>
      <Card className="w-full max-w-xs bg-red-100 hover:bg-red-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Deuda</CardTitle>
            <DollarSignIcon className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading || !retail ? (
            <Skeleton className="h-8 w-full bg-primary-500" />
          ) : (
            <h2 className="text-2xl font-bold">
              {data?.summary?.due?.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </h2>
          )}
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-full bg-primary-500" />
        </CardFooter>
      </Card>
    </div>
      {retail && retail.id ? <Button onClick={downloadSales}>Reporte</Button> : null}
    </div>
  );
}
