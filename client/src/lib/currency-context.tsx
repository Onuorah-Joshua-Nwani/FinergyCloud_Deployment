// Enhanced currency context with proper reactivity
import { Currency, CURRENCIES } from '@shared/currency';
import { useState, useEffect } from 'react';

export interface CurrencyContextValue {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currencies: typeof CURRENCIES;
}

// Simple provider that doesn't use React hooks
export function CurrencyProvider({ children }: { children: any }) {
  return children;
}

// Hook that uses local storage with proper reactivity
export function useCurrency(): CurrencyContextValue {
  const [selectedCurrency, setSelectedCurrencyState] = useState<Currency>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('finergy-currency');
      if (saved && ['NGN', 'GBP', 'EUR'].includes(saved)) {
        return saved as Currency;
      }
    }
    return 'NGN';
  });

  // Set currency and save to localStorage with proper state update
  const setSelectedCurrency = (currency: Currency) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('finergy-currency', currency);
      setSelectedCurrencyState(currency);
      // Trigger a custom event to update other components
      window.dispatchEvent(new CustomEvent('currency-changed', {
        detail: { currency }
      }));
    }
  };

  // Listen for currency changes from other components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'finergy-currency' && e.newValue && ['NGN', 'GBP', 'EUR'].includes(e.newValue)) {
        setSelectedCurrencyState(e.newValue as Currency);
      }
    };

    const handleCurrencyChange = (e: CustomEvent) => {
      if (e.detail?.currency) {
        setSelectedCurrencyState(e.detail.currency);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('currency-changed', handleCurrencyChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('currency-changed', handleCurrencyChange as EventListener);
    };
  }, []);

  return {
    selectedCurrency,
    setSelectedCurrency,
    currencies: CURRENCIES,
  };
}