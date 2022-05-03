import useSWR from "swr";
import { fetcher } from "api";

export function useTransactions(unitAccountId?: string) {
  const { data, error, mutate } = useSWR(
    () => `/api/unit/transactions/${unitAccountId}`,
    fetcher
  );

  return {
    transactions: data?.data,
    isLoading: !error && !data,
    error: error,
    mutate: mutate,
  };
}
