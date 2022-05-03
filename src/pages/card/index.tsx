import type { ReactElement } from "react";
import WithBottomNavigation from "layouts/with-bottom-navigation";
import { useGlobalStore } from "stores/global";
import dynamic from "next/dynamic";

const Onboarding = dynamic(() => import("pages/card/onboarding"), {
  ssr: false,
});
const Root = dynamic(() => import("pages/card/root"), {
  ssr: false,
});

export default function CardPage() {
  const isCardActive = useGlobalStore((state) => state.card.isActive);

  return isCardActive ? <Root /> : <Onboarding />;
}

CardPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBottomNavigation>{page}</WithBottomNavigation>;
};
