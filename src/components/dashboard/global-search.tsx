
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileBox, Search, Users } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "../ui/button";
import { clients, manualAssets } from "@/lib/data";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-between text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search clients or assets...
        </div>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Clients">
            {clients.map((client) => (
              <CommandItem
                key={client.id}
                onSelect={() => handleSelect(`/dashboard/clients/${client.id}`)}
              >
                <Users className="mr-2 h-4 w-4" />
                <span>{client.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Assets">
            {manualAssets.map((asset) => (
              <CommandItem
                key={asset.id}
                onSelect={() => handleSelect(`/dashboard/add-asset`)}
              >
                <FileBox className="mr-2 h-4 w-4" />
                <span>{asset.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
