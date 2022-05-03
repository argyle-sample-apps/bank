import { formatter } from "utils";
import { Title, Heading, Paragraph } from "components/typography";
import { InlineButton } from "components/button";
import { Table, TableRowProps, TableSectionProps } from "components/table";
import { useGlobalStore } from "stores/global";

import moment from "moment";
import { PauseIcon, PlayIcon, SettingsIcon } from "components/icons";
import clsx from "clsx";
import { EarlyNextPayoutViewView } from "views/early-next-payout";
import { Transaction } from "utils/accounts";

type ToggleButtonProps = {
  label: string;
  checked: boolean;
  icon: React.ElementType;
  iconClassName?: string;
  onClick: () => void;
};

const ToggleButton = ({
  label,
  checked,
  icon,
  iconClassName = "",
  onClick,
}: ToggleButtonProps) => {
  const checkboxEmptyClass = "h-3.5 w-3.5 rounded-full bg-now-grey";
  const checkboxFullClass = "h-3.5 w-3.5 rounded-full bg-now-green";

  const Icon = icon;
  return (
    <InlineButton onClick={onClick} className="mb-2 flex items-center">
      <div className={clsx("h-2 w-2 text-white", iconClassName)}>
        <Icon />
      </div>
      <Paragraph
        className={`ml-3 ${
          checked ? "!text-now-purple" : "!text-now-darkorange"
        }`}
      >
        {label}
      </Paragraph>
    </InlineButton>
  );
};

function transactionsToSections(transactions: Transaction[]) {
  // 1. group transactions by date
  // 2. transform for visualizations
  // 3. order groups (just in case)

  let sectionsObj: Record<number, Partial<TableRowProps[]>> = {};

  // 1.
  for (let transaction of transactions) {
    let datetime = moment(transaction.datetime);

    let row: TableRowProps = {
      id: transaction.id,
      label: transaction.employer || "",
      value: formatter.format(transaction.amount),
      logo: transaction.logo,
      time: datetime.format("HH:mm"),
    };

    let date = moment(datetime);
    date.set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0);

    let datestamp = date.unix();

    if (sectionsObj[datestamp]) {
      sectionsObj[datestamp].unshift(row);
    } else {
      sectionsObj[datestamp] = [row];
    }
  }

  // 2.
  // 3.
  const sections: TableSectionProps[] = Object.keys(sectionsObj)
    .sort((a, b) => Number(b) - Number(a))
    .map((sectionKey) => {
      let timestamp = Number(sectionKey);
      return {
        label: moment.unix(timestamp).format("MMMM D"),
        rows: sectionsObj[timestamp] as TableRowProps[],
      };
    });

  return sections;
}

export default function EarlyPayRootPage() {
  const isPaused = useGlobalStore((state) => state.earlypay.isPaused);
  const transactions = useGlobalStore((state) => state.earlypay.transactions);
  const setIsPaused = useGlobalStore((state) => state.setIsPaused);

  const sections = transactionsToSections(transactions);

  return (
    <div className="px-4 pt-4">
      <Title className="mb-3">Early Pay</Title>
      <EarlyNextPayoutViewView />
      <ToggleButton
        label={
          isPaused
            ? "Resume automatic early payments"
            : "Pause automatic early payments"
        }
        checked={isPaused}
        icon={isPaused ? PlayIcon : PauseIcon}
        iconClassName="ml-0.5"
        onClick={() => setIsPaused(!isPaused)}
      />
      <ToggleButton
        label="Add or modify income"
        checked={false}
        icon={SettingsIcon}
        onClick={() => console.log("add/modify income")}
      />
      <Heading className="mt-8 mb-3">History</Heading>
      <Table sections={sections} />
    </div>
  );
}
