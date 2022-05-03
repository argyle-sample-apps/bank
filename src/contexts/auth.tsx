import React, {
  createContext,
  useState,
  useEffect,
  ReactElement,
  useContext,
} from "react";
import { useRouter } from "next/router";
import { useProfile } from "hooks/useProfile";
import { currentStoreVersion, useGlobalStore } from "stores/global";

import { Loader } from "components/loader";

type AuthContextProps = {
  isAuthed: boolean;
  login: () => void;
};

type AuthProviderProps = {
  children: ReactElement;
};

const AuthContext = createContext<AuthContextProps>({
  isAuthed: false,
  login: () => {
    throw "Shouldn't be executed";
  },
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { profile, isLoading } = useProfile();

  const isOnboarded = useGlobalStore((state) => state.isOnboarded);
  const setIsOnboarded = useGlobalStore((state) => state.setIsOnboarded);
  const storeVer = useGlobalStore((state) => state.storeVer);
  const reset = useGlobalStore((state) => state.reset);

  const [didLoad, setDidLoad] = useState<boolean>(false);
  const router = useRouter();
  const isOnboardingPath = router.pathname.includes("/onboarding/");
  const isPreprofilePath = router.pathname.includes("/onboarding/landing");

  const login = () => {
    if (profile) {
      setIsOnboarded(true);
    }
  };

  const checkAndRedirectOnboarding = () => {
    if (!profile && setIsOnboarded) {
      setIsOnboarded(false);
      if (!isOnboardingPath) {
        router.push("/onboarding/landing");
        return true;
      } else {
        if (!didLoad) setDidLoad(true);
      }
    }
  };

  const checkAndRedirectHome = () => {
    if (profile && isOnboarded && isOnboardingPath) {
      router.push("/home");
      return true;
    } else {
      if (!didLoad) setDidLoad(true);
    }
  };

  const checkAndRedirectOnboardingConfirm = () => {
    if (profile && !isOnboarded && (isPreprofilePath || !isOnboardingPath)) {
      router.push("/onboarding/personal");
      return true;
    } else {
      if (!didLoad) setDidLoad(true);
    }
  };

  let shouldReturnLoader = false;

  if (!isLoading) {
    if (storeVer === undefined || storeVer < currentStoreVersion) {
      console.log("reset store, reload app", storeVer);
      reset();
      shouldReturnLoader = true;
      // router.push("/onboarding/landing").then(() => {
      //   localStorage.clear();
      // });
    } else {
      shouldReturnLoader = checkAndRedirectHome() || shouldReturnLoader;
      shouldReturnLoader = checkAndRedirectOnboarding() || shouldReturnLoader;
      shouldReturnLoader =
        checkAndRedirectOnboardingConfirm() || shouldReturnLoader;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthed: isOnboarded,
        login,
      }}
    >
      {!didLoad || shouldReturnLoader ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
