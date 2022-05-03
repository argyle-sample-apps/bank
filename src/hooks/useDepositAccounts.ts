import useSWR from "swr";
import { fetcher } from "api";

export function useDepositAccounts(unitCustomerId?: string) {
  //   const userId = explicitUserId || useGlobalStore((state) => state.userId);
  const { data, error } = useSWR(
    () => `/api/unit/deposit-accounts/${unitCustomerId}`,
    fetcher
  );

  return {
    unit: data,
    isLoading: !error && !data,
    error: error,
  };
}
