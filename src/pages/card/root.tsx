import type { ReactElement } from "react";
import { useState } from "react";
import moment from "moment";
import WithBottomNavigation from "layouts/with-bottom-navigation";
import { CardPinModal } from "views/card-pin";
import { CardSecurity } from "views/card-security";
import { CardInfoView } from "views/card-info";
import { Table, TableRowProps, TableSectionProps } from "components/table";
import { Title, Heading } from "components/typography";
import { formatter, getDate } from "utils";

type CardTransaction = {
  id: string;
  entity: string | null;
  datetime: Date;
  amount: number;
};

function generateTransactions() {
  const transactions: CardTransaction[] = [
    {
      id: "0",
      entity: "Postmates",
      datetime: getDate(-1),
      amount: -25.3,
    },
    {
      id: "1",
      entity: "Apple Store",
      datetime: getDate(-1),
      amount: -250,
    },
    {
      id: "2",
      entity: "Uber",
      datetime: getDate(-2),
      amount: -18.48,
    },
  ];
  return transactions;
}

function cardTransactionsToSections(transactions: CardTransaction[]) {
  let sectionsObj: Record<number, Partial<TableRowProps[]>> = {};

  for (let transaction of transactions) {
    let datetime = moment(transaction.datetime);

    let row: TableRowProps = {
      id: transaction.id,
      label: transaction.entity || "",
      value: formatter.format(transaction.amount),
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

export default function CardRootPage() {
  const [showPin, setShowPin] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);

  const transactions = generateTransactions();
  const sections = cardTransactionsToSections(transactions);

  return (
    <>
      <CardPinModal isOpen={showPin} onClose={() => setShowPin(false)} />
      <CardSecurity
        isOpen={showSecurity}
        onClose={() => setShowSecurity(false)}
      />
      <div className="px-4 pt-4">
        <Title>My card</Title>
        <CardInfoView onShowPin={setShowPin} onShowSecurity={setShowSecurity} />
        <Heading className="mb-3">Transactions</Heading>
        <Table sections={sections} />
      </div>
    </>
  );
}

CardRootPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBottomNavigation>{page}</WithBottomNavigation>;
};
