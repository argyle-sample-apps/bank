import type { ReactElement } from "react";
import WithBottomNavigation from "layouts/with-bottom-navigation";
import dynamic from "next/dynamic";

const Onboarding = dynamic(() => import("pages/income/onboarding"), {
  ssr: false,
});
const Root = dynamic(() => import("pages/income/root"), {
  ssr: false,
});

export default function IncomePage() {
  // defaults to `true`, since the account is connected while onboarding
  const isIncomeActive = true;

  return isIncomeActive ? <Root /> : <Onboarding />;
}

IncomePage.getLayout = function getLayout(page: ReactElement) {
  return <WithBottomNavigation>{page}</WithBottomNavigation>;
};
