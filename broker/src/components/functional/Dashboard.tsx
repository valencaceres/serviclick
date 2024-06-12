import React, { useEffect } from "react";

import { DollarSignIcon, WalletIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";

import { useBroker, useRol, useUser } from "~/store/hooks/index";
import { Broker } from "~/interfaces/broker";
import { useUI } from "~/store/hooks/index";
import { Skeleton } from "../ui/Skeleton";

export const Dashboard: React.FC = () => {
  const { broker } = useUI();

  return (
    <div className="flex w-full flex-col items-center gap-2 pl-12">
      <BrokerSummary broker={broker} />
    </div>
  );
};

function BrokerSummary({ broker }: { broker: Broker | null }) {
  const {
    getDetailsByBrokerId,
    summary: data,
    isLoading: loading,
    getBrokerById
  } = useBroker();

  useEffect(() => {
    if (broker && broker.id) {
      getDetailsByBrokerId(broker.id);
    }
  }, [broker]);
  const isLoading = loading || data?.summary?.charged === null;

  return (
    <div className="flex w-full flex-col flex-wrap items-center gap-4 py-4 lg:flex-row lg:justify-center">
      <Card className="w-full max-w-xs hover:bg-slate-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Cantidad de Ventas</CardTitle>
            <WalletIcon className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading || !broker ? (
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
          {isLoading || !broker ? (
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
          {isLoading || !broker ? (
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
          {isLoading || !broker ? (
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
  );
}
