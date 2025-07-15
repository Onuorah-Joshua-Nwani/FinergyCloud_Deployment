// import { useCurrency } from "@/lib/currency-context";
import { convertCurrency, formatCurrency, type Currency } from "@shared/currency";

export function useCurrencyFormat() {
  // Safe currency handling without context
  const selectedCurrency = 'NGN';

  const convertAndFormat = (amount: number, fromCurrency: Currency = 'NGN'): string => {
    const convertedAmount = convertCurrency(amount, fromCurrency, selectedCurrency);
    return formatCurrency(convertedAmount, selectedCurrency);
  };

  const convert = (amount: number, fromCurrency: Currency = 'NGN'): number => {
    return convertCurrency(amount, fromCurrency, selectedCurrency);
  };

  const format = (amount: number): string => {
    return formatCurrency(amount, selectedCurrency);
  };

  return {
    selectedCurrency,
    convertAndFormat,
    convert,
    format,
  };
}