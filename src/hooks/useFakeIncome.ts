import { useGlobalStore } from "stores/global";
import moment from "moment";
import zip from "just-zip-it";
import { calculateTotal } from "fake";

type useFakeIncomeProps = {
  year?: number;
};

export function useFakeIncome(opts = {} as useFakeIncomeProps) {
  const explicitYear = opts?.year;

  const fakeIncome = useGlobalStore((state) => state.fakeIncome);

  const currentYear = moment().year();
  const year = explicitYear || currentYear;

  const months = Array.from({ length: 12 }).map((_, i) => {
    return {
      year: year,
      month: i + 1,
    };
  });

  const combined = [];

  for (let key in fakeIncome) {
    const data = fakeIncome[key][year];
    combined.push(data.monthly);
  }

  const zipped = zip(...combined);

  const monthly = months.map((month, index) => {
    const data = zipped[index] || [];

    return {
      ...month,
      data: data,
      total: calculateTotal(data),
    };
  });

  const totals = monthly.map((month) => month.total);

  const data = {
    currency: "USD",
    monthly: monthly,
    total: calculateTotal(totals),
  };

  return {
    income: data,
    isLoading: false,
    error: false,
    mutate: () => {},
  };
}
