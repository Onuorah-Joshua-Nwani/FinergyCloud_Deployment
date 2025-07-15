import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, DollarSign } from "lucide-react";
// import { useCurrency } from "@/lib/currency-context";
import type { Currency } from "@shared/currency";

export default function CurrencySelector() {
  // Safe currency handling without context
  const selectedCurrency = 'NGN';
  const setSelectedCurrency = () => {};
  const currencies = {
    NGN: { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
    GBP: { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    EUR: { code: 'EUR', name: 'Euro', flag: '🇪🇺' }
  };
  const currentCurrency = currencies[selectedCurrency];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 sm:gap-2 text-xs sm:text-sm h-8 px-2 sm:px-3">
          <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-sm">{currentCurrency.flag}</span>
          <span className="font-medium">{currentCurrency.code}</span>
          <ChevronDown className="w-3 h-3 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 z-50">
        {Object.values(currencies).map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => setSelectedCurrency(currency.code as Currency)}
            className="flex items-center gap-3 cursor-pointer p-3 focus:bg-gray-50 hover:bg-gray-50"
          >
            <span className="text-lg flex-shrink-0">{currency.flag}</span>
            <div className="flex flex-col flex-1">
              <span className="font-medium text-sm">{currency.code}</span>
              <span className="text-xs text-muted-foreground">{currency.name}</span>
            </div>
            {selectedCurrency === currency.code && (
              <div className="ml-auto w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}