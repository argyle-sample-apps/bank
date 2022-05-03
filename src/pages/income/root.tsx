import { ReactElement, useState } from "react";
import WithBottomNavigation from "layouts/with-bottom-navigation";
import { Title, Footnote } from "components/typography";
import { useIncome } from "hooks/useIncome";
import { IncomeFiltering } from "views/income-filtering";
import { useGlobalStore } from "stores/global";
import { useAccounts } from "hooks/useAccounts";
import { ArgyleLink } from "components/argyle-link";
import { IncomeTotal } from "views/income-total";
import { IncomeSource } from "views/income-source";
import { IncomeChart } from "views/income-chart";
import { useFakeIncome } from "hooks/useFakeIncome";
import { SmallChevronDown } from "components/icons";

export default function IncomeRootPage() {
  const [linkInstance, setLinkInstance] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const selectedYear = useGlobalStore((state) => state.income.selectedYear);
  const selectedMode = useGlobalStore((state) => state.income.selectedMode);
  // const {
  //   income,
  //   isLoading: isIncomeLoading,
  //   mutate: mutateIncome,
  // } = useIncome({
  //   year: selectedYear,
  // });
  const {
    income,
    isLoading: isIncomeLoading,
    mutate: mutateIncome,
  } = useFakeIncome({ year: selectedYear });
  const {
    accounts,
    isLoading: isAccountsLoading,
    mutate: mutateAccounts,
  } = useAccounts();

  if (isIncomeLoading || isAccountsLoading) {
    return null;
  }

  return (
    <>
      <ArgyleLink
        payDistributionUpdateFlow={false}
        onClose={() => {
          mutateAccounts();
          mutateIncome();
        }}
        onLinkInit={(link) => setLinkInstance(link)}
      />
      <IncomeFiltering
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <div className="px-4 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <Title>Income</Title>
          <button
            className="flex items-center rounded-full bg-gray-100 py-1 px-3 !text-now-darkest"
            onClick={() => setModalVisible(true)}
          >
            <span className="mr-1.5 text-[14px] leading-[17px]">
              {selectedYear}
            </span>
            <SmallChevronDown />
          </button>
        </div>
        <div className="mt-12"></div>
        <IncomeChart
          income={income}
          accounts={accounts}
          onLinkOpen={() => linkInstance.open()}
          selectedMode={selectedMode}
        />
        <div className="mt-16">
          <IncomeTotal income={income} year={selectedYear} />
        </div>
        <div className="mt-16 pb-8">
          <IncomeSource income={income} accounts={accounts} />
        </div>
      </div>
    </>
  );
}

IncomeRootPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBottomNavigation>{page}</WithBottomNavigation>;
};
