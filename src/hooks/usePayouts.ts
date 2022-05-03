import useSWR from "swr";
import { fetcher } from "api";
import { useGlobalStore } from "stores/global";

export function usePayouts(accountId?: string) {
  const getAccountId = useGlobalStore((state) => state.getAccountId);
  const id = accountId || getAccountId();
  const { data, error } = useSWR(`/api/payouts/${id}`, fetcher);

  let lastPayoutAmount = 0;
  if (data && data.length > 0) {
    lastPayoutAmount = data[data.length - 1].net_pay;
  }

  return {
    payouts: data,
    lastPayoutAmount,
    isLoading: !error && !data,
    isError: error,
  };
}
