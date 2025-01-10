import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Source, sources } from "@/data/mockNews";

interface SourceFilterProps {
  selectedSource: Source | "all";
  onSourceChange: (source: Source | "all") => void;
}

export function SourceFilter({ selectedSource, onSourceChange }: SourceFilterProps) {
  const [open, setOpen] = useState(false);

  // Ensure we have a valid selectedSource value
  const displayValue = selectedSource || "all";
  
  // Ensure sources array is valid and add "all" option
  const sourceOptions = ["all", ...(Array.isArray(sources) ? sources : [])];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {displayValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command value={displayValue}>
          <CommandInput placeholder="Search source..." />
          <CommandEmpty>No source found.</CommandEmpty>
          <CommandGroup>
            {sourceOptions.map((source) => (
              <CommandItem
                key={source}
                value={source}
                onSelect={() => {
                  onSourceChange(source as Source | "all");
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    displayValue === source ? "opacity-100" : "opacity-0"
                  )}
                />
                {source === "all" ? "All Sources" : source}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}