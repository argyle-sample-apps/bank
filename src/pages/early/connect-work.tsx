import { ReactElement, useEffect, useState } from "react";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import { AddIcon, EarlyPayIcon, PlusIcon } from "components/icons";
import { Title, Heading, Paragraph, Footnote } from "components/typography";
import { Button } from "components/button";
import "rc-slider/assets/index.css";
import { useIncome } from "hooks/useIncome";
import { useGlobalStore } from "stores/global";
import { ArgyleLink } from "components/argyle-link";
import { useRouter } from "next/router";
import WithBackButton from "layouts/with-back-button";
import { useFakeIncome } from "hooks/useFakeIncome";

export default function EarlyPayConnectPage() {
  const router = useRouter();
  const { income, isLoading } = useFakeIncome();
  const [linkInstance, setLinkInstance] = useState<any>();
  const isPdConfigured = useGlobalStore((state) => state.isPdConfigured);
  const applyRoute = "early/confirm";

  const handleSetup = () => {
    if (!isPdConfigured) {
      linkInstance.open();
    } else {
      router.push(applyRoute);
    }
  };

  if (isLoading) {
    return (
      <div className="grid animate-pulse gap-3 px-4">
        <div className="h-7 w-20 rounded-full bg-gray-200"></div>
        <div className="h-4 w-full rounded-full bg-gray-200"></div>
        <div className="h-4 w-4/6 rounded-full bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded-full bg-gray-200"></div>
        <div className="h-10 w-3/6 rounded-full bg-gray-200"></div>
      </div>
    );
  }

  return (
    <>
      <ArgyleLink
        payDistributionUpdateFlow={true}
        onClose={() => {
          if (useGlobalStore.getState().isPdConfigured) {
            router.push(applyRoute);
          }
        }}
        onLinkInit={(link) => setLinkInstance(link)}
      />
      <div className="px-4 pt-4">
        <DecorativeIconWrapper>
          <PlusIcon />
        </DecorativeIconWrapper>
        <Heading className="mb-3">Start by connecting your work</Heading>
        <Paragraph className="mb-3">
          Make your employment history and experience work for you. When
          FinanceNow sees what you earned before, it’s easy for us to pay you
          early.
        </Paragraph>
        <div className="mt-4 mb-6 flex">
          <Button as="button" onClick={handleSetup} disabled={!linkInstance}>
            Connect your work
          </Button>
        </div>
        <Footnote>
          On the next screen, you will be able to search for your employer, work
          platform or, if you know it, the payroll company that your employer
          uses to pay you.
        </Footnote>
      </div>
    </>
  );
}

EarlyPayConnectPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
