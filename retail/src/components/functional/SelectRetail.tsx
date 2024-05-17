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
import { Retail } from "~/interfaces/retail";
import { useRetail } from "~/store/hooks";
import {useUser} from '../../store/hooks'

import { cn } from "~/utils/cn";
export function SelectRetail({
  open,
  setOpen,
  retail,
  setRetail,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  retail: Retail | null;
  setRetail: (retail: Retail | null) => void;
}) {
  const { user } = useUser();
  const { retailList: retails, getByUserId } = useRetail();
  useEffect(() => {
    if (user) {
      getByUserId(user.id);
    }
  }, [user, getByUserId]);
  const storedState = localStorage.getItem("uiState");
  const parsedState = storedState ? JSON.parse(storedState) : {};
  const retailStorage = parsedState?.retail;

  useEffect(() => {
    if (retailStorage && !retail) {
      setRetail(retailStorage);
    } else if (!retailStorage && retails && retails.length === 1) {
      setRetail(retails[0] ?? null);
    }
  }, [retails, setRetail, retailStorage]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-xs justify-between"
        >
          {retail && retail.id !== ""
            ? retails?.find((b: Retail) => b.id === retail.id)?.name
            : "Seleccionar retail"}
          <ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white">
        <Command>
          <CommandInput placeholder="Buscar retail" />
          <CommandEmpty>No se encontró el retail.</CommandEmpty>
          <CommandGroup>
            {retails?.map((b: Retail) => (
              <CommandItem
                key={b.id}
                onSelect={(currentRetail) => {
                  setRetail(currentRetail === retail?.id ? null : b);
                  setOpen(false);
                }}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    retail?.id === b.id ? "opacity-100" : "opacity-0"
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
