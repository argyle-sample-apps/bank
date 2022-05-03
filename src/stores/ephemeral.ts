import create, { SetState } from "zustand";
import { devtools } from "zustand/middleware";

type EphemeralStoreVals = {
  isLinkScriptLoaded: boolean;
  phoneNumber: string;
  phoneId: string;
};

type EphemeralActions = {
  confirmLinkIsLoaded: () => void;
  setPhoneNumber: (number: string) => void;
  setPhoneId: (id: string) => void;
};

type EphemeralStore = EphemeralStoreVals & EphemeralActions;

const initialState: EphemeralStoreVals = {
  isLinkScriptLoaded: false,
  phoneNumber: "",
  phoneId: "",
};

const store = (set: SetState<EphemeralStore>) => ({
  ...initialState,
  confirmLinkIsLoaded: () => set({ isLinkScriptLoaded: true }),
  setPhoneNumber: (number: string) => set({ phoneNumber: number }),
  setPhoneId: (id: string) => set({ phoneId: id }),
});

export const useEphemeralStore = create<EphemeralStore>(devtools(store));
