import { useEffect, useState } from "react";

import { Currency } from "./types";
import api from "./api";

type UseCurrencies = (fund: string) => {
  currencies: Currency[];
  isLoadingCurrencies: boolean;
};

const useCurrencies: UseCurrencies = (fund) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(false);

  const fetchCurrencies = async (fund: string) => {
    setIsLoadingCurrencies(true);

    try {
      const currencies = await api.fetchCurrencies(fund);
      setCurrencies(currencies);
    } catch (e) {
      setCurrencies([]);
    } finally {
      setIsLoadingCurrencies(false);
    }
  };

  useEffect(() => {
    fetchCurrencies(fund);
  }, [fund]);

  return { isLoadingCurrencies, currencies };
};

export default useCurrencies;
