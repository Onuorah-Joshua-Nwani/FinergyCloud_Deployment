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

  const handleCurrencyChange = (currency: Currency) => {
    console.log('Currency changing to:', currency);
    setSelectedCurrency(currency);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentCurrency.flag}</span>
            <span className="font-medium">{currentCurrency.code}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 z-[80] mt-1 shadow-lg border">
        {Object.values(currencies).map((currency) => (
          <DropdownMenuItem 
            key={currency.code}
            onClick={() => handleCurrencyChange(currency.code)}
            className={selectedCurrency === currency.code ? 'bg-green-50' : ''}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{currency.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{currency.code}</span>
                <span className="text-xs text-gray-500">{currency.name}</span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}