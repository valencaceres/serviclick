import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

import {
  CheckIcon,
  ChevronsUpDownIcon,
  DollarSignIcon,
  WalletIcon,
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Button } from "../ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/Command";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";

import { cn } from "~/lib/utils";
import { type RouterOutputs, api } from "~/utils/api";

import { useUI } from "~/store/hooks";
import { Skeleton } from "../ui/Skeleton";

export const Dashboard: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const { broker, setBroker } = useUI();

  return (
    <div className=" flex w-full flex-col gap-2 pl-12">
      <div className="flex w-full items-center border-b p-2">
        <SelectBroker
          open={open}
          setOpen={setOpen}
          broker={broker}
          setBroker={setBroker}
        />
      </div>
      {broker && <BrokerSummary broker={broker} />}
    </div>
  );
};

type Broker = RouterOutputs["broker"]["getByUser"][number];

function SelectBroker({
  open,
  setOpen,
  broker,
  setBroker,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  broker: Broker | null;
  setBroker: (broker: Broker | null) => void;
}) {
  const { user } = useUser();

  const { data: brokers } = api.broker.getByUser.useQuery({
    userId: user?.id || "",
  });

  useEffect(() => {
    if (brokers && brokers.length === 1) {
      setBroker(brokers[0] ?? null);
    }
  }, [brokers, setBroker]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-xs justify-between"
        >
          {broker
            ? brokers?.find((b: Broker) => b.id === broker.id)?.name
            : "Seleccionar broker"}
          <ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white">
        <Command>
          <CommandInput placeholder="Buscar broker" />
          <CommandEmpty>No se encontró el broker.</CommandEmpty>
          <CommandGroup>
            {brokers?.map((b: Broker) => (
              <CommandItem
                key={b.id}
                onSelect={(currentBroker) => {
                  setBroker(currentBroker === broker?.id ? null : b);
                  setOpen(false);
                }}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    broker?.id === b.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {b?.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function BrokerSummary({ broker }: { broker: Broker | null }) {
  const { data, isLoading } = api.broker.getReport.useQuery({
    agentId: broker?.id || "",
  });

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
          {isLoading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <h2 className="text-2xl font-bold">{data?.length} ventas</h2>
          )}
        </CardContent>
        <CardFooter>
          <p>+20% que el mes pasado</p>
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
          {isLoading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <h2 className="text-2xl font-bold">
              {data
                ?.reduce((acc, curr) => acc + parseInt(curr.charged), 0)
                .toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
            </h2>
          )}
        </CardContent>
        <CardFooter>
          <p>+42% que el mes pasado</p>
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
          {isLoading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <h2 className="text-2xl font-bold">
              {data
                ?.reduce((acc, curr) => acc + parseInt(curr.paid), 0)
                .toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
            </h2>
          )}
        </CardContent>
        <CardFooter>
          <p>-5% que el mes pasado</p>
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
          {isLoading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <h2 className="text-2xl font-bold">
              {data
                ?.reduce((acc, curr) => acc + parseInt(curr.balance), 0)
                .toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
            </h2>
            
          )}
        </CardContent>
        <CardFooter>
          <p>+12% que el mes pasado</p>
        </CardFooter>
      </Card>
    </div>
  );
}
