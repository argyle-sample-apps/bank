import { ReactElement, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import WithBackButton from "layouts/with-back-button";

import { Button } from "components/button";
import { Footnote, Heading, Paragraph } from "components/typography";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import { PlusIcon } from "components/icons";
import { useGlobalStore } from "stores/global";
import { ArgyleLink } from "components/argyle-link";
import clsx from "clsx";

export default function ConnectPage() {
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkInstance, setLinkInstance] = useState<any>();

  const getAccountId = useGlobalStore((state) => state.getAccountId);
  const router = useRouter();

  const handleLinkOpen = () => {
    if (!linkInstance) {
      return setLinkLoading(true);
    }

    linkInstance.open();
  };

  useEffect(() => {
    if (linkInstance && linkLoading === true) {
      setLinkLoading(false);
      linkInstance.open();
    }
  }, [linkLoading, linkInstance]);

  const handleLinkClose = () => {
    const accountId = getAccountId();

    if (accountId) {
      router.push("/onboarding/welcome");
    }
  };

  return (
    <>
      <ArgyleLink
        payDistributionUpdateFlow={false}
        onClose={() => handleLinkClose()}
        onLinkInit={(link) => {
          setLinkInstance(link);
        }}
      />
      <div className="px-4 pr-[92px]">
        <DecorativeIconWrapper>
          <PlusIcon />
        </DecorativeIconWrapper>
        <Heading className="mb-3">Let’s get started</Heading>
        <Paragraph className="mb-6">
          Your finances start with your income. Let’s begin by connecting to the
          sources of your income.
        </Paragraph>
        <div className={clsx("flex", linkLoading && "animate-pulse")}>
          <Button onClick={handleLinkOpen}>Connect your work</Button>
        </div>
        <Footnote className="mt-6">
          On the next screen, you will be able to search for your employer, work
          platform, or the payroll company that your employer uses to pay you.
        </Footnote>
      </div>
    </>
  );
}

ConnectPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
