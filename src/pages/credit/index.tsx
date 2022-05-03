import type { ReactElement } from "react";
import WithBottomNavigation from "layouts/with-bottom-navigation";
import { useGlobalStore } from "stores/global";
import dynamic from "next/dynamic";

const Onboarding = dynamic(() => import("pages/credit/onboarding"), {
  ssr: false,
});
const Root = dynamic(() => import("pages/credit/root"), {
  ssr: false,
});

export default function CreditPage() {
  const isCreditActive = useGlobalStore((state) => state.credit.isActive);

  return isCreditActive ? <Root /> : <Onboarding />;
}

CreditPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBottomNavigation>{page}</WithBottomNavigation>;
};
