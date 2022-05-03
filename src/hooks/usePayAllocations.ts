import useSWR from "swr";
import { fetcher } from "api";
import { useGlobalStore } from "stores/global";
import { formatSnakeCase, groupBy } from "utils";

function refineData(data: any) {
  if (!data) {
    return {};
  }

  const refined = data.map((allocation: any) => {
    return {
      ...allocation,
      employerC: formatSnakeCase(allocation.employer),
    };
  });

  const grouped = groupBy(refined, (allocation: any) => allocation.employer);

  // TODO: Find out why API returns `null` for employer name after PD switch
  let fixed = {} as any;
  Object.entries(grouped).map(([key, value]) => {
    if (key === "null") {
      fixed["Fix me"] = value;
    } else {
      fixed[key] = value;
    }
  });

  return grouped;
}

export function usePayAllocations(explicitUserId?: string) {
  const globalUserId = useGlobalStore((state) => state.userId);
  const userId = explicitUserId || globalUserId;
  const { data, error } = useSWR(`/api/pay-allocations/${userId}`, fetcher);

  const refinedData = refineData(data);

  return {
    payAllocations: refinedData,
    isLoading: !error && !data,
    error: error,
  };
}
