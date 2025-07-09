import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, DollarSign } from "lucide-react";
import { useCurrency } from "@/lib/currency-context";
import type { Currency } from "@shared/currency";

export default function CurrencySelector() {
  const { selectedCurrency, setSelectedCurrency, currencies } = useCurrency();
  const currentCurrency = currencies[selectedCurrency];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 mobile-text-sm">
          <DollarSign className="w-4 h-4" />
          <span className="hidden sm:inline">{currentCurrency.flag}</span>
          <span className="font-medium">{currentCurrency.code}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.values(currencies).map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => setSelectedCurrency(currency.code as Currency)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-lg">{currency.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{currency.code}</span>
              <span className="text-xs text-muted-foreground">{currency.name}</span>
            </div>
            {selectedCurrency === currency.code && (
              <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}