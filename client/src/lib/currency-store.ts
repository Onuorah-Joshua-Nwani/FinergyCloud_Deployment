import { Currency, CURRENCIES } from '@shared/currency';

// Simple global state management without React context
class CurrencyStore {
  private currency: Currency = 'NGN';
  private listeners: Array<(currency: Currency) => void> = [];

  constructor() {
    // Load saved currency from localStorage on initialization
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('finergy-currency');
      if (saved && ['NGN', 'GBP', 'EUR'].includes(saved)) {
        this.currency = saved as Currency;
      }
    }
  }

  getCurrency(): Currency {
    return this.currency;
  }

  setCurrency(currency: Currency): void {
    this.currency = currency;
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('finergy-currency', currency);
    }
    
    // Notify all listeners
    this.listeners.forEach(listener => listener(currency));
  }

  subscribe(listener: (currency: Currency) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  getCurrencies() {
    return CURRENCIES;
  }
}

// Create global store instance
export const currencyStore = new CurrencyStore();

// Non-React hook for accessing currency
export function getCurrency() {
  return currencyStore.getCurrency();
}

export function setCurrency(currency: Currency) {
  currencyStore.setCurrency(currency);
}

export function getCurrencies() {
  return currencyStore.getCurrencies();
}