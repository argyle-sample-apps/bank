import type { ReactElement } from "react";
import WithBottomNavigation from "layouts/with-bottom-navigation";
import { useGlobalStore } from "stores/global";
import dynamic from "next/dynamic";

const Onboarding = dynamic(() => import("pages/early/onboarding"), {
  ssr: false,
});
const Root = dynamic(() => import("pages/early/root"), {
  ssr: false,
});

export default function EarlyPayPage() {
  const isEarlyPayActive = useGlobalStore((state) => state.earlypay.isActive);

  return isEarlyPayActive ? <Root /> : <Onboarding />;
}

EarlyPayPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBottomNavigation>{page}</WithBottomNavigation>;
};
