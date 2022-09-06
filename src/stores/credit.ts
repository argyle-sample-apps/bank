import { SetState, GetState } from "zustand";
import { StoreSlice } from "stores/utils";
import { getDate } from "utils";
import { Transaction } from "utils/accounts";

export const featureName = "credit";

export function generateCreditTransactions(
  employer: string | null,
  logo: string,
  amountDue: number,
  totalAmount: number
) {
  const transactions: Transaction[] = [
    {
      id: "-1",
      employer: "Your GoodBank balance",
      initials: "now",
      datetime: getDate(-31),
      amount: totalAmount,
    },
    {
      id: "0",
      employer,
      logo,
      datetime: getDate(-30),
      amount: -amountDue,
    },
    {
      id: "1",
      employer,
      logo,
      datetime: getDate(-60),
      amount: -amountDue,
    },
    {
      id: "2",
      employer,
      logo,
      datetime: getDate(-90),
      amount: -amountDue,
    },
  ];
  return transactions;
}

type Credit = {
  [featureName]: {
    isActive: boolean;
    amount: number | null;
    interest: number | null;
    transactions: Transaction[];
  };
};

type CreditActions = {
  setAmount: (amount: number) => void;
  setInterest: (interest: number) => void;
};

export type CreditStore = Credit & CreditActions;

const initialCreditState: Credit = {
  [featureName]: {
    isActive: false,
    amount: null,
    interest: null,
    transactions: [],
  },
};

export const createCreditSlice: StoreSlice<CreditStore> = (
  set: SetState<CreditStore>,
  get: GetState<CreditStore>
) => ({
  ...initialCreditState,
  setAmount: (amount) =>
    set((state) => ({
      [featureName]: {
        ...state[featureName],
        amount,
      },
    })),
  setInterest: (interest) =>
    set((state) => ({
      [featureName]: {
        ...state[featureName],
        interest,
      },
    })),
});
