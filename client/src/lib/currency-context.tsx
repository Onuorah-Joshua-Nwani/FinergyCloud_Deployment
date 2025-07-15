import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency, CURRENCIES } from '@shared/currency';

interface CurrencyContextValue {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currencies: typeof CURRENCIES;
}

const CurrencyContext = React.createContext<CurrencyContextValue | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = React.useState<Currency>(() => {
    // Try to get saved currency from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('finergy-currency');
      return (saved as Currency) || 'NGN';
    }
    return 'NGN';
  });

  React.useEffect(() => {
    // Save currency selection to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('finergy-currency', selectedCurrency);
    }
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
  const context = React.useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}