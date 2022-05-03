import { SetState, GetState } from "zustand";
import { StoreSlice } from "stores/utils";
import { getDate } from "utils";
import { Transaction } from "utils/accounts";

export const featureName = "earlypay";

type EarlyPay = {
  [featureName]: {
    isActive: boolean;
    isPaused: boolean;
    amount: number;
    transactions: Transaction[];
  };
};

type EarlyPayActions = {
  setIsPaused: (isPaused: boolean) => void;
  setEarlyAmount: (amount: number) => void;
  generateEarlyTransactions: (
    employer: string,
    logo: string,
    amount: number
  ) => void;
};

export type EarlyPayStore = EarlyPay & EarlyPayActions;

function generateTransactions(
  employer: string | null,
  logo: string,
  amountDue: number
) {
  // @ts-ignore
  const transactions: Transaction[] = [
    {
      id: "0",
      employer,
      logo,
      datetime: getDate(-30),
      amount: amountDue,
    },
    {
      id: "1",
      employer,
      logo,
      datetime: getDate(-60),
      amount: amountDue,
    },
    {
      id: "2",
      employer,
      logo,
      datetime: getDate(-90),
      amount: amountDue,
    },
  ];
  return transactions;
}

const initialEarlyPayState: EarlyPay = {
  [featureName]: {
    isActive: false,
    isPaused: false,
    amount: 0,
    transactions: [],
  },
};

export const createEarlyPaySlice: StoreSlice<EarlyPayStore> = (
  set: SetState<EarlyPayStore>,
  get: GetState<EarlyPayStore>
) => ({
  ...initialEarlyPayState,
  setIsPaused: (isPaused) =>
    set((state) => ({
      [featureName]: {
        ...state[featureName],
        isPaused,
      },
    })),
  setEarlyAmount: (amount) =>
    set((state) => ({
      [featureName]: {
        ...state[featureName],
        amount,
      },
    })),
  generateEarlyTransactions: (employer, logo, amount) =>
    set((state) => {
      const transactions = generateTransactions(employer, logo, amount);
      return {
        [featureName]: {
          ...state[featureName],
          transactions,
        },
      };
    }),
});
