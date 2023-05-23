import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/Command";

import { cn } from "~/utils/cn"; 
import { api, type RouterOutputs } from "~/utils/api";

type Broker = RouterOutputs["broker"]["getByUser"][number];

export function SelectBroker({
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
