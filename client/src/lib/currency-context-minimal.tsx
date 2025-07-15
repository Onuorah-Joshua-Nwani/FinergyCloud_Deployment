// Minimal currency context that avoids React import issues
import { Currency, CURRENCIES } from '@shared/currency';

export interface CurrencyContextValue {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currencies: typeof CURRENCIES;
}

// Simple provider that doesn't use React hooks
export function CurrencyProvider({ children }: { children: any }) {
  return children;
}

// Hook that uses window-level storage instead of React state
export function useCurrency(): CurrencyContextValue {
  // Get current currency from localStorage or default
  const getCurrentCurrency = (): Currency => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('finergy-currency');
      if (saved && ['NGN', 'GBP', 'EUR'].includes(saved)) {
        return saved as Currency;
      }
    }
    return 'NGN';
  };

  // Set currency and save to localStorage
  const setSelectedCurrency = (currency: Currency) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('finergy-currency', currency);
      // Trigger a storage event to update other components
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'finergy-currency',
        newValue: currency,
      }));
    }
  };

  return {
    selectedCurrency: getCurrentCurrency(),
    setSelectedCurrency,
    currencies: CURRENCIES,
  };
}