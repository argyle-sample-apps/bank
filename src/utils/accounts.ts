import { TableRowProps, TableSectionProps } from "components/table";
import currency from "currency.js";
import moment from "moment";

export enum TransferTypes {
  addSavings,
  withdrawSavings,
}

export enum AccountsScreenTypes {
  Transfer,
  Success,
}

export type Transaction = {
  id: string;
  initials?: string;
  employer: string | null;
  logo?: string;
  datetime: Date;
  amount: number;
};

type View = "checking" | "savings";

export type UnitTransaction = Transaction & {
  purpose?: string;
  type:
    | "originatedAchTransaction"
    | "receivedAchTransaction"
    | "bookTransaction"
    | "feeTransaction";
};

function getSign(transaction: UnitTransaction, view: View) {
  if (
    transaction.type === "originatedAchTransaction" ||
    transaction.type === "feeTransaction"
  ) {
    return "-";
  } else if (transaction.type === "receivedAchTransaction") {
    return "+";
  } else if (transaction.type === "bookTransaction") {
    if (view === "checking") {
      if (transaction.purpose === "withdraw-savings") {
        return "+";
      } else {
        return "-";
      }
    } else if (view === "savings") {
      if (transaction.purpose === "withdraw-savings") {
        return "-";
      } else {
        return "+";
      }
    }
  }
}

export function unitTransactionsToSections(
  transactions: UnitTransaction[],
  view: View
) {
  // 1. group transactions by date
  // 2. transform for visualizations
  // 3. order groups (just in case)

  let sectionsObj: Record<number, Partial<TableRowProps[]>> = {};

  // 1.
  for (let transaction of transactions) {
    let datetime = moment(transaction.datetime);

    // For savings screen, + icon for "From your balance",
    // for balance screen - reversed icon "To your balance"
    // const isAddIcon =
    //   transaction.initials || transaction.logo
    //     ? undefined
    //     : isBalanceTransactions
    //     ? transaction.type === "originatedAchTransaction"
    //     : transaction.type === "receivedAchTransaction";
    const isAddIcon = false;

    let row: Omit<TableRowProps, "index"> = {
      id: transaction.id,
      label: transaction.employer || "",
      initials: transaction.initials,
      isAddIcon,
      value: `${getSign(transaction, view)} ${currency(
        Math.abs(transaction.amount),
        {
          fromCents: true,
        }
      ).format()}`,
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

type Translations = {
  heading?: string;
  text?: string;
  button?: string;
};

export function transferTranslation(
  screenType: AccountsScreenTypes,
  transferType: TransferTypes
) {
  let translations: Translations = {};

  if (screenType === AccountsScreenTypes.Transfer) {
    switch (transferType) {
      case TransferTypes.addSavings:
        translations = {
          heading: "Add money to your savings account",
          text: "The funds will be moved from your balance to your savings account.",
          button: "Add now",
        };
        break;
      case TransferTypes.withdrawSavings:
        translations = {
          heading: "Withdraw money from your savings account",
          text: "The funds will be moved from your savings account to your balance. Your balance is connected to and can be accessed with your GoodBank debit card.",
          button: "Withdraw now",
        };
        break;
    }
  } else if (screenType === AccountsScreenTypes.Success) {
    switch (transferType) {
      case TransferTypes.addSavings:
        translations = { text: "to your savings account from your balance" };
        break;
      case TransferTypes.withdrawSavings:
        translations = { text: "from your savings account to your balance" };
        break;
    }
  }

  return translations;
}
