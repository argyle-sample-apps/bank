import { SetState, GetState } from "zustand";
import { StoreSlice } from "stores/utils";
import moment from "moment";

export const featureName = "income";

type IncomeVals = {
  [featureName]: {
    selectedMode: number;
    selectedYear: number;
    selectedMonth: number;
  };
};

type IncomeActions = {
  setSelectedMode: (mode: number) => void;
  setSelectedYear: (year: number) => void;
  setSelectedMonth: (month: number) => void;
};

export type IncomeStore = IncomeVals & IncomeActions;

const initialIncomeState: IncomeVals = {
  [featureName]: {
    selectedMode: 0,
    selectedYear: moment().year(),
    selectedMonth: moment().month() + 1,
  },
};

export const createIncomeSlice: StoreSlice<IncomeStore> = (
  set: SetState<IncomeStore>,
  get: GetState<IncomeStore>
) => ({
  ...initialIncomeState,
  setSelectedMode: (mode) =>
    set((state) => ({
      [featureName]: {
        ...state[featureName],
        selectedMode: mode,
      },
    })),
  setSelectedYear: (year) =>
    set((state) => ({
      [featureName]: {
        ...state[featureName],
        selectedYear: year,
      },
    })),
  setSelectedMonth: (month) =>
    set((state) => ({
      [featureName]: {
        ...state[featureName],
        selectedMonth: month,
      },
    })),
});
