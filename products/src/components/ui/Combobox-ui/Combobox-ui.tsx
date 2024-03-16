import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/cn";
import { Button } from "../button-ui";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "../scroll-area";
import { Label } from "../label-ui";

type ComboboxT = {
  id?: string;
  label?: string;
  width: string;
  value: string;
  onChange: (value: string) => void;
  placeHolder?: string;
  display?: boolean;
  data: any;
  dataValue: string;
  dataText: string;
  enabled?: boolean;
};

const ComboboxDemo = ({
  id,
  label,
  width,
  value,
  onChange,
  placeHolder,
  display = true,
  data,
  dataValue,
  dataText,
  enabled = true,
}: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative w-full ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="h-[53px]  border border-gray-300 rounded-md   py-2 px-3 mb-1 flex items-end"
          asChild
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? data.find((district: any) => district.district_name === value)
                  ?.district_name
              : "Selecciona la comuna..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Buscar comuna..." className="h-9" />

            <CommandEmpty>No se encontro la comuna.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="  h-60">
                {data.map((district: any) => (
                  <CommandItem
                    key={district.id}
                    value={district.district_name}
                    onSelect={(currentValue) => {
                      const lowercaseCurrentValue = currentValue.toLowerCase();
                      const foundItem = data.find(
                        (item: any) =>
                          item.district_name.toLowerCase() ===
                          lowercaseCurrentValue
                      );
                      if (foundItem) {
                        onChange(foundItem.district_name);
                      } else {
                        onChange("");
                      }
                      setOpen(false);
                    }}
                  >
                    {district.district_name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === district.district_name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {label && display && (
        <Label
          htmlFor={id}
          className="absolute top-1 left-1 px-2 -z-10 -mt-px bg-white text-gray-500 text-xs"
        >
          {label}
        </Label>
      )}
    </div>
  );
};

export default ComboboxDemo;
