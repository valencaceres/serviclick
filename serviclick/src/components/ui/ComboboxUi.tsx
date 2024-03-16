import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "~/utils/cn";
import { Button } from "./ButtonC";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./Command";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "./ScrollArea";
// Convertimos ComboboxDemo en un componente de React
const ComboboxDemo = ({
  array,
  onValueChange,
  defaultValue,
  value: fieldValue,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<any>(defaultValue);
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? array.find((district: any) => district.district_name === value)
                ?.district_name
            : "Selecciona districto..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Busca districto..." className="h-9" />

          <CommandEmpty>No se encontro el districto.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="  h-72 border border-yellow-500">
              {array.map((district: any) => (
                <CommandItem
                  key={district.id}
                  value={district.district_name}
                  onSelect={(currentValue) => {
                    const lowercaseCurrentValue = currentValue.toLowerCase();
                    const foundItem = array.find(
                      (item: any) =>
                        item.district_name.toLowerCase() ===
                        lowercaseCurrentValue
                    );
                    if (foundItem) {
                      handleValueChange(foundItem.district_name);
                    } else {
                      handleValueChange("");
                    }
                    setOpen(false);
                  }}
                >
                  {district.district_name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      fieldValue === district ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxDemo;
