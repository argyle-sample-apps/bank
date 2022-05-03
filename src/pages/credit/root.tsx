import moment from "moment";
import currency from "currency.js";
import { useGlobalStore } from "stores/global";
import { CreditInfoView } from "views/credit-info";
import { CreditDueView } from "views/credit-due-info";
import { Table, TableRowProps, TableSectionProps } from "components/table";
import { Title, Heading, Paragraph, Strong } from "components/typography";
import { formatPercent } from "utils";
import { Transaction } from "utils/accounts";

function transactionsToSections(transactions: Transaction[]) {
  let sectionsObj: Record<number, Partial<TableRowProps[]>> = {};

  for (let transaction of transactions) {
    let datetime = moment(transaction.datetime);

    let row: TableRowProps = {
      id: transaction.id,
      label: transaction.employer || "",
      initials: transaction.initials,
      value: currency(transaction.amount, { fromCents: true }).format(),
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

export default function CreditRootPage() {
  const amount = useGlobalStore((state) => state.credit.amount) || 0;
  const transactions = useGlobalStore((state) => state.credit.transactions);

  const sections = transactionsToSections(transactions);

  // because transactions also include the full amounts
  const paidAmount =
    amount -
    transactions.reduce((total, transation) => total + transation.amount, 0);
  const paidPercent = formatPercent((paidAmount / amount) * 100);

  return (
    <div className="px-4 pt-4">
      <Title className="mb-3">Credit</Title>
      <CreditInfoView />
      <div className="mb-10" />
      <CreditDueView />
      <Heading className="mb-3">History</Heading>
      <Paragraph>
        <Strong>{paidPercent}%</Strong> paid off
      </Paragraph>
      <div className="flex bg-gray-100">
        <div
          style={{ width: `${paidPercent}%` }}
          className="h-1 flex-none bg-now-purple"
        />
      </div>
      <Table sections={sections} />
    </div>
  );
}
