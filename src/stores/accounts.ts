import { SetState, GetState } from "zustand";
import { StoreSlice } from "stores/utils";

export const featureName = "accounts";

type Accounts = {
  [featureName]: {
    // isActive: boolean;
    selectedIndex: number;
    // balance: number;
    // savings: number;
    // savingsTransactions: Transaction[];
    // balanceTransactions: Transaction[];
  };
};

type AccountsActions = {
  // setBalance: (amount: number) => void; // for testing purposes
  // addSavings: (amount: number) => void;
  // withdrawSavings: (amount: number) => void;
  setAccountsTab: (index: number) => void;
  // addBalanceIncome: (amount: number, label: string, initials: string) => void;
  // sendMoney: (amount: number, label: string, initials: string) => void;
};

export type AccountsStore = Accounts & AccountsActions;

// All amounts represented in cents
const initialCreditState: Accounts = {
  [featureName]: {
    // isActive: false,
    // balance: 12500,
    // balance: 0,
    // savings: 0,
    selectedIndex: 0,
    // // savingsTransactions: [],
    // balanceTransactions: [
    // {
    //   id: uuidv4(),
    //   initials: "MJ",
    //   employer: "Monica Juliani",
    //   amount: 2500,
    //   datetime: moment().add(-15, "days").toDate(),
    // },
    // {
    //   id: uuidv4(),
    //   logo: `https://res.cloudinary.com/argyle-media/image/upload/v1600705681/partner-logos/uber.png`,
    //   employer: "Uber",
    //   amount: 20000,
    //   datetime: moment().add(-30, "days").toDate(),
    // },
    // {
    //   id: uuidv4(),
    //   logo: `https://res.cloudinary.com/argyle-media/image/upload/v1600705681/partner-logos/uber.png`,
    //   employer: "Uber",
    //   amount: -10000,
    //   datetime: moment().add(-20, "days").toDate(),
    // },
    // ],
  },
};

// function modifyAccount(
//   state: AccountsStore,
//   accountToMod: ModifyAccount,
//   amount: number,
//   label: string,
//   unit: any,
//   unitMutate: any,
//   initials?: string
// ) {
//   const substate = { ...state[featureName] };

//   let transactions: Transaction[];
//   if (accountToMod == ModifyAccount.Savings) {
//     substate.savings += amount;
//     substate.balance -= amount;
//     substate.savingsTransactions = [...substate.savingsTransactions];
//     transactions = substate.savingsTransactions;
//   } else {
//     substate.balance += amount;
//     substate.balanceTransactions = [...substate.balanceTransactions];
//     transactions = substate.balanceTransactions;
//   }

//   const transaction: Transaction = {
//     employer: label,
//     id: uuidv4(),
//     datetime: moment().toDate(),
//     amount,
//     initials,
//   };
//   transactions.push(transaction);
//   return { [featureName]: substate };
// }

export const createAccountsSlice: StoreSlice<AccountsStore> = (
  set: SetState<AccountsStore>,
  get: GetState<AccountsStore>
) => ({
  ...initialCreditState,
  // setBalance: (amount) =>
  //   set((state) => ({
  //     [featureName]: {
  //       ...state[featureName],
  //       balance: amount,
  //     },
  //   })),
  // addSavings: (amount, unit, unitMutate) =>
  //   set((state) =>
  //     modifyAccount(
  //       state,
  //       ModifyAccount.Savings,
  //       amount,
  //       "From your balance",
  //       unit,
  //       unitMutate
  //     )
  //   ),
  // withdrawSavings: (amount, unit, unitMutate) =>
  //   set((state) =>
  //     modifyAccount(state, ModifyAccount.Savings, -amount, "To your balance")
  //   ),
  setAccountsTab: (index) =>
    set((state) => ({
      [featureName]: {
        ...state[featureName],
        selectedIndex: index,
      },
    })),
  // addBalanceIncome: (amount, label, initials, unit, unitMutate) =>
  //   set((state) =>
  //     modifyAccount(
  //       state,
  //       ModifyAccount.Balance,
  //       amount,
  //       label,
  //       unit,
  //       unitMutate,
  //       initials
  //     )
  //   ),
  // sendMoney: (amount, label, initials) =>
  //   set((state) =>
  //     modifyAccount(state, ModifyAccount.Balance, -amount, label, initials)
  //   ),
});
