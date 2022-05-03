import { ReactElement, useState } from "react";
import WithBottomNavigation from "layouts/with-bottom-navigation";
import { Title, Paragraph } from "components/typography";
import { Tab } from "@headlessui/react";
import { List } from "components/list";
import clsx from "clsx";

export default function WorkPage() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const jobs = [
    {
      id: 0,
      primary: "Floor Staff manager",
      secondary: "BestBuy",
      aside: "San Francisco",
      logo: "/assets/bestbuy.png",
      url: "https://www.appcast.io/",
    },
    {
      id: 1,
      primary: "Full-time Cashier",
      secondary: "Target",
      aside: "San Francisco",
      logo: "/assets/target.png",
      url: "https://www.appcast.io/",
    },
    {
      id: 2,
      primary: "Delivery Manager",
      secondary: "Amazon",
      aside: "Oakland",
      logo: "/assets/amazon.png",
      url: "https://www.appcast.io/",
    },
    {
      id: 3,
      primary: "Courier",
      secondary: "Grubhub",
      aside: "San Francisco",
      logo: "/assets/grubhub.png",
      url: "https://www.appcast.io/",
    },
    {
      id: 4,
      primary: "Courier",
      secondary: "Doordash",
      aside: "Oakland",
      logo: "/assets/doordash.png",
      url: "https://www.appcast.io/",
    },
  ];

  const boosters = [
    {
      id: 0,
      primary: "Get $50 from BestBuy",
      secondary: "BestBuy",
      logo: "/assets/bestbuy.png",
      url: "https://www.appcast.io/",
    },
    {
      id: 1,
      primary: "Get $50 from Target",
      secondary: "Target",
      logo: "/assets/target.png",
      url: "https://www.appcast.io/",
    },
    {
      id: 2,
      primary: "Get up to $90 from Amazon",
      secondary: "Amazon",
      logo: "/assets/amazon.png",
      url: "https://www.appcast.io/",
    },
  ];

  return (
    <div className="px-4 pt-4">
      <Title className="mb-7">Work</Title>
      <Paragraph className="mb-6">
        Increase your monthly income by pursuing these jobs and opportunities
      </Paragraph>
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
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
                Jobs
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
                Income boosters
              </Paragraph>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="py-6">
            <List elements={jobs} />
          </Tab.Panel>
          <Tab.Panel className="py-6">
            <List elements={boosters} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

WorkPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBottomNavigation>{page}</WithBottomNavigation>;
};
