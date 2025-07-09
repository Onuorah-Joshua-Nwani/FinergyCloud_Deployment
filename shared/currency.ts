export type Currency = 'NGN' | 'GBP' | 'EUR';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  flag: string;
}

export const CURRENCIES: Record<Currency, CurrencyInfo> = {
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    flag: '🇳🇬'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound Sterling',
    flag: '🇬🇧'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    flag: '🇪🇺'
  }
};

// Exchange rates relative to NGN (Nigerian Naira as base)
export const EXCHANGE_RATES: Record<Currency, number> = {
  NGN: 1.0,        // Base currency
  GBP: 0.00078,    // 1 NGN = 0.00078 GBP (approximately 1,280 NGN per GBP)
  EUR: 0.00093     // 1 NGN = 0.00093 EUR (approximately 1,075 NGN per EUR)
};

export function convertCurrency(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to NGN first (base currency)
  const amountInNGN = fromCurrency === 'NGN' ? amount : amount / EXCHANGE_RATES[fromCurrency];
  
  // Convert from NGN to target currency
  const convertedAmount = toCurrency === 'NGN' ? amountInNGN : amountInNGN * EXCHANGE_RATES[toCurrency];
  
  return Math.round(convertedAmount * 100) / 100; // Round to 2 decimal places
}

export function formatCurrency(amount: number, currency: Currency): string {
  const currencyInfo = CURRENCIES[currency];
  const convertedAmount = Math.abs(amount);
  
  // Format based on currency
  if (currency === 'NGN') {
    // Format Nigerian Naira with appropriate scaling
    if (convertedAmount >= 1000000000) {
      return `${currencyInfo.symbol}${(convertedAmount / 1000000000).toFixed(1)}B`;
    } else if (convertedAmount >= 1000000) {
      return `${currencyInfo.symbol}${(convertedAmount / 1000000).toFixed(1)}M`;
    } else if (convertedAmount >= 1000) {
      return `${currencyInfo.symbol}${(convertedAmount / 1000).toFixed(1)}K`;
    } else {
      return `${currencyInfo.symbol}${convertedAmount.toFixed(0)}`;
    }
  } else {
    // Format GBP and EUR with appropriate scaling
    if (convertedAmount >= 1000000) {
      return `${currencyInfo.symbol}${(convertedAmount / 1000000).toFixed(2)}M`;
    } else if (convertedAmount >= 1000) {
      return `${currencyInfo.symbol}${(convertedAmount / 1000).toFixed(1)}K`;
    } else {
      return `${currencyInfo.symbol}${convertedAmount.toFixed(2)}`;
    }
  }
}

export function getCurrencySymbol(currency: Currency): string {
  return CURRENCIES[currency].symbol;
}

export function getCurrencyName(currency: Currency): string {
  return CURRENCIES[currency].name;
}