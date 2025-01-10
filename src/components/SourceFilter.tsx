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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedSource}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search source..." />
          <CommandEmpty>No source found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                onSourceChange("all");
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedSource === "all" ? "opacity-100" : "opacity-0"
                )}
              />
              All Sources
            </CommandItem>
            {sources.map((source) => (
              <CommandItem
                key={source}
                onSelect={() => {
                  onSourceChange(source);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedSource === source ? "opacity-100" : "opacity-0"
                  )}
                />
                {source}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}