import useSWR from "swr";
import { fetcher } from "api";
import { useGlobalStore } from "stores/global";
import moment from "moment";

type useIncomeProps = {
  explicitUserId?: string;
  year?: number;
};

export function useIncome(opts = {} as useIncomeProps) {
  const explicitUserId = opts?.explicitUserId;
  const explicitYear = opts?.year;

  const globalUserId = useGlobalStore((state) => state.userId);
  const fakeIncome = useGlobalStore((state) => state.fakeIncome);

  const userId = explicitUserId || globalUserId;
  const year = explicitYear || moment().year();

  const url = `/api/income/${userId}/${year}`;
  const { data, error, mutate } = useSWR(url, fetcher);

  return {
    income: data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
