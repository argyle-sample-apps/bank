import useSWR from "swr";
import { fetcher } from "api";
import { useGlobalStore } from "stores/global";

export function useUnitInit(explicitUserId?: string) {
  const userId = explicitUserId || useGlobalStore((state) => state.userId);
  const { data, error, mutate } = useSWR(
    () => `/api/unit/${userId}/init`,
    fetcher
  );

  return {
    unit: data,
    isLoading: !error && !data,
    error: error,
    mutate: mutate,
  };
}
