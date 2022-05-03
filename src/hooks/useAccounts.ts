import useSWR from "swr";
import { fetcher } from "api";
import { useGlobalStore } from "stores/global";
import { capitalizeFirstLetter } from "utils";
import { colors } from "consts";

export function useAccounts() {
  const userId = useGlobalStore((state) => state.userId);
  const { data, error, mutate } = useSWR(`/api/accounts/${userId}`, fetcher);

  const refinedData = data
    ?.filter(
      (account: any) => account.was_connected && account.status !== "error"
    )
    .map((account: any, index: number) => {
      return {
        ...account,
        nameC: capitalizeFirstLetter(account.link_item),
        color: colors[index],
      };
    });

  return {
    accounts: refinedData,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
}
