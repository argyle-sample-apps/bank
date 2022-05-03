import create, { SetState, GetState } from "zustand";
import { StoreSlice } from "stores/utils";
import { persist, devtools } from "zustand/middleware";
import {
  createCreditSlice,
  CreditStore,
  featureName as creditFeatureName,
  generateCreditTransactions,
} from "stores/credit";
import { createCardSlice, CardStore } from "stores/card";
import { EarlyPayStore, createEarlyPaySlice } from "stores/early-pay";
import {
  AccountsStore,
  createAccountsSlice,
  featureName as accountsFeatureName,
} from "stores/accounts";
import { IncomeStore, createIncomeSlice } from "stores/income";

export const currentStoreVersion = 4;

type Features = CreditStore &
  CardStore &
  EarlyPayStore &
  AccountsStore &
  IncomeStore;

type Feature = keyof Features;

type Store = {
  isDemoAccount: boolean;
  isPdConfigured: boolean;
  isOnboarded: boolean;
  storeVer: number;
  userId: string;
  userToken: string;
  accountIds: string[];
  linkItemIds: string[];
  fakeIncome: any;
};

type GeneralVals = Store;

type GeneralActions = {
  getAccountId: () => string;
  getLinkItemId: () => string;
  addAccountId: (id: string) => void;
  addLinkItemId: (id: string) => void;
  addFakeIncome: (data: any) => void;
  setUser: (id: string, token: string) => void;
  setIsOnboarded: (yesNo: boolean) => void;
  setFeatureState: (feature: Feature, isActive: boolean) => void;
  enablePd: () => void;
  reset: () => void;
  generateCreditTransactions: (
    employer: string | null,
    logo: string,
    amount: number
  ) => void;
};

type GeneralStore = GeneralActions & GeneralVals;

type DemoActions = {
  loginToDemoAccount: (state: any) => void;
};

type GlobalStore = GeneralStore & Features & DemoActions;

const initialState: GeneralVals = {
  isDemoAccount: false,
  isPdConfigured: false,
  isOnboarded: false,
  storeVer: currentStoreVersion,
  userId: "",
  userToken: "",
  accountIds: [] as string[],
  linkItemIds: [] as string[],
  fakeIncome: {},
};

const createGeneralStoreSlice: StoreSlice<GeneralStore> = (
  set: SetState<any>,
  get: GetState<any>
) => ({
  ...initialState,
  getAccountId: () => get().accountIds[0] ?? "",
  getLinkItemId: () => get().linkItemIds[0] ?? "",
  addAccountId: (id) =>
    set((state: GeneralStore) => ({ accountIds: [...state.accountIds, id] })),
  addLinkItemId: (id) =>
    set((state: GeneralStore) => ({ linkItemIds: [...state.linkItemIds, id] })),
  setUser: (id, token) => set({ userId: id, userToken: token }),
  setIsOnboarded: (yesNo) => set({ isOnboarded: yesNo }),
  setFeatureState: (feature, isActive) =>
    set((state: GlobalStore) => ({
      [feature]: { ...state[feature], isActive },
    })),
  enablePd: () => set({ isPdConfigured: true }),
  generateCreditTransactions: (employer, logo, amount) =>
    set((state: GlobalStore) => {
      // Function includes actions with 2 store slices hence it's defined in the global
      const transactions = generateCreditTransactions(
        employer,
        logo,
        amount,
        state.credit.amount!
      );
      const totalCreditTransactions = transactions.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );

      // const totalBalance = state.accounts.balance + totalCreditTransactions;
      return {
        [creditFeatureName]: {
          ...state[creditFeatureName],
          transactions,
        },
        // [accountsFeatureName]: {
        //   ...state[accountsFeatureName],
        //   balance: totalBalance,
        // },
      };
    }),
  reset: () => set(store(set, get), true),
  addFakeIncome: (data) =>
    set((state: GeneralStore) => ({
      fakeIncome: {
        ...state.fakeIncome,
        ...data,
      },
    })),
});

const store = (set: SetState<any>, get: GetState<any>) => ({
  ...createGeneralStoreSlice(set, get),
  ...createCreditSlice(set, get),
  ...createCardSlice(set, get),
  ...createEarlyPaySlice(set, get),
  ...createAccountsSlice(set, get),
  ...createIncomeSlice(set, get),
  loginToDemoAccount: (state: any) => set(state),
});

export const useGlobalStore = create<GlobalStore>(
  devtools(
    persist(store, {
      name: "global",
    })
  )
);
