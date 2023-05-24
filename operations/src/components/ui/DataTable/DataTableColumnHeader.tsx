import { Column } from "@tanstack/react-table";
import { ChevronsUpDown, EyeOff, SortAsc, SortDesc } from "lucide-react";

import { cn } from "~/utils/cn";
import { Button } from "../ButtonC";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  hideable,
}: DataTableColumnHeaderProps<TData, TValue> & {
  hideable?: boolean;
}) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -ml-3 h-8 font-semibold"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <SortDesc className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <SortAsc className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white" align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <SortAsc className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <SortDesc className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            Desc
          </DropdownMenuItem>
          {hideable && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOff className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
                Esconder
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
