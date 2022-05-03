import useSWR from "swr";
import { fetcher } from "api";
import { useGlobalStore } from "stores/global";

export function useUser() {
  const userId = useGlobalStore((state) => state.userId);
  const { data, error } = useSWR(`/api/user/${userId}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    error: error,
  };
}
