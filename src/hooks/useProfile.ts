import useSWR from "swr";
import { fetcher } from "api";
import { useGlobalStore } from "stores/global";
import { formatSnakeCase } from "utils";
import { Profile } from "models/profile";

export function useProfile(explicitAccountId?: string) {
  const getAccountId = useGlobalStore((state) => state.getAccountId);
  const accountId = explicitAccountId || getAccountId();
  const { data, error } = useSWR(`/api/profiles/${accountId}`, fetcher);

  if (data) {
    data.employerC = formatSnakeCase(data?.employer);
  }

  return {
    profile: data as Profile,
    isLoading: !error && !data,
    error: error,
  };
}
