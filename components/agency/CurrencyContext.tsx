"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CURRENCY_RATES } from "@/lib/demo-agency-data";

type CurrencyKey = keyof typeof CURRENCY_RATES;

interface CurrencyContextType {
  currency: CurrencyKey;
  setCurrency: (currency: CurrencyKey) => void;
  formatPrice: (priceUSD: number) => string;
  currencySymbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyKey>("USD");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("nepal_agency_currency") as CurrencyKey | null;
    if (saved && CURRENCY_RATES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (curr: CurrencyKey) => {
    setCurrencyState(curr);
    localStorage.setItem("nepal_agency_currency", curr);
  };

  const activeCurrency = mounted ? currency : "USD";

  const formatPrice = (priceUSD: number) => {
    const rateData = CURRENCY_RATES[activeCurrency] || CURRENCY_RATES.USD;
    const converted = Math.round(priceUSD * rateData.rate);
    return `${rateData.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency: activeCurrency,
        setCurrency,
        formatPrice,
        currencySymbol: CURRENCY_RATES[activeCurrency]?.symbol || "$",
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      currency: "USD" as CurrencyKey,
      setCurrency: () => {},
      formatPrice: (priceUSD: number) => `$${priceUSD.toLocaleString()}`,
      currencySymbol: "$",
    };
  }
  return context;
}
