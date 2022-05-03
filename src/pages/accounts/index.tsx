import { ReactElement, useState } from "react";
import WithBottomNavigation from "layouts/with-bottom-navigation";
import dynamic from "next/dynamic";
import { Paragraph, Title } from "components/typography";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import Splitter from "components/splitter";
import { useGlobalStore } from "stores/global";

const Balance = dynamic(() => import("pages/accounts/balance"), {
  ssr: false,
});
const Savings = dynamic(() => import("pages/accounts/savings"), {
  ssr: false,
});

export default function CardPage() {
  const selectedIndex = useGlobalStore((state) => state.accounts.selectedIndex);
  const setAccountsTab = useGlobalStore((state) => state.setAccountsTab);
  return (
    <div className="px-4 pt-4">
      <Title className="mb-3">Accounts</Title>
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(index) => setAccountsTab(index)}
      >
        <Tab.List>
          <Tab>
            {({ selected }) => (
              <Paragraph
                className={clsx(
                  "px-3 py-0.5 text-[14px]",
                  selected && "rounded-full bg-gray-100 !text-now-darkest"
                )}
              >
                Balance
              </Paragraph>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              <Paragraph
                className={clsx(
                  "px-3 py-0.5 text-[14px]",
                  selected && "rounded-full bg-gray-100 !text-now-darkest"
                )}
              >
                Savings
              </Paragraph>
            )}
          </Tab>
        </Tab.List>
        <Splitter className="mt-5" />
        <Tab.Panels>
          <Tab.Panel>
            <Balance />
          </Tab.Panel>
          <Tab.Panel>
            <Savings />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

CardPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBottomNavigation>{page}</WithBottomNavigation>;
};
