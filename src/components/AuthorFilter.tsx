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
import { mockNews } from "@/data/mockNews";

// Get unique authors from mock news
const authors = Array.from(new Set(mockNews.map(article => article.author).filter(Boolean))) as string[];

interface AuthorFilterProps {
  selectedAuthor: string | "all";
  onAuthorChange: (author: string | "all") => void;
}

export function AuthorFilter({ selectedAuthor, onAuthorChange }: AuthorFilterProps) {
  const [open, setOpen] = useState(false);
  const displayValue = selectedAuthor || "all";
  const authorOptions = ["all", ...authors];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {displayValue === "all" ? "All Authors" : displayValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command value={displayValue}>
          <CommandInput placeholder="Search author..." />
          <CommandEmpty>No author found.</CommandEmpty>
          <CommandGroup>
            {authorOptions.map((author) => (
              <CommandItem
                key={author}
                value={author}
                onSelect={() => {
                  onAuthorChange(author);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    displayValue === author ? "opacity-100" : "opacity-0"
                  )}
                />
                {author === "all" ? "All Authors" : author}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}