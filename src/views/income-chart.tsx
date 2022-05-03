import { useState } from "react";
import moment from "moment";
import { normalizeByKey } from "utils";
import { INCOME_FILTER_ALL } from "consts";
import { StackedBarYearChart } from "components/stacked-bar-year-chart";
import { IncomeSourcePicker } from "components/income-source-picker";
import { useGlobalStore } from "stores/global";
import { StackedBarMonthChart } from "components/stacked-bar-month-chart";

type IncomeChartProps = {
  income: any;
  accounts: any;
  onLinkOpen?: () => void;
  isMinimal?: boolean;
  selectedMode: number;
};

function filterAccountsBySource(accounts: any, source: string) {
  if (source === INCOME_FILTER_ALL) {
    return accounts;
  }

  return accounts.filter((account: any) => account.link_item === source);
}

export function IncomeChart({
  income,
  accounts,
  onLinkOpen,
  isMinimal = false,
  selectedMode,
}: IncomeChartProps) {
  const [selectedSource, setSelectedSource] = useState(INCOME_FILTER_ALL);

  const data = income.monthly.map((m: any) => ({
    month: moment()
      .month(m.month - 1)
      .format("MMM")
      .slice(0, 1),
    total: Number(m.total.gross_pay),
    data: normalizeByKey(m.data, "link_item"),
  }));

  const filteredAccounts = filterAccountsBySource(accounts, selectedSource);

  const chart =
    selectedMode === 0 ? (
      <StackedBarYearChart
        key="chart"
        data={data}
        accounts={filteredAccounts}
      />
    ) : (
      <StackedBarMonthChart
        key="chart"
        data={data}
        accounts={filteredAccounts}
      />
    );

  const content = [
    chart,
    <IncomeSourcePicker
      key="picker"
      sources={accounts}
      selectedSource={selectedSource}
      setSelectedSource={setSelectedSource}
      onLinkOpen={onLinkOpen}
    />,
  ];

  if (isMinimal) {
    content.reverse();
  }

  return <>{content}</>;
}
