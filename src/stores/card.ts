import { SetState, GetState } from "zustand";
import { StoreSlice } from "stores/utils";

export const featureName = "card";

type Card = {
  [featureName]: {
    isActive: boolean;
    last4Digits: string;
  };
};

type CardActions = {
  setLast4Digits: (digits: string) => void;
};

export type CardStore = Card & CardActions;

const initialCardState: Card = {
  [featureName]: {
    isActive: false,
    last4Digits: "",
  },
};

export const createCardSlice: StoreSlice<CardStore> = (
  set: SetState<CardStore>,
  get: GetState<CardStore>
) => ({
  ...initialCardState,
  setLast4Digits: (digits) =>
    set((state) => ({
      [featureName]: {
        ...state[featureName],
        last4Digits: digits,
      },
    })),
});
