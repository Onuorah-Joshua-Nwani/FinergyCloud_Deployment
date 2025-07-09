import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency, CURRENCIES } from '@shared/currency';

interface CurrencyContextValue {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currencies: typeof CURRENCIES;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(() => {
    // Try to get saved currency from localStorage
    const saved = localStorage.getItem('finergy-currency');
    return (saved as Currency) || 'NGN';
  });

  useEffect(() => {
    // Save currency selection to localStorage
    localStorage.setItem('finergy-currency', selectedCurrency);
  }, [selectedCurrency]);

  const value: CurrencyContextValue = {
    selectedCurrency,
    setSelectedCurrency,
    currencies: CURRENCIES,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}