import { ReactElement, useEffect, useState } from "react";
import WithBackButton from "layouts/with-back-button";

import { Button } from "components/button";
import { Heading, Paragraph } from "components/typography";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import { IncomeIcon } from "components/icons";
import { useGlobalStore } from "stores/global";
import { useRouter } from "next/router";
import { ArgyleLink } from "components/argyle-link";
import { useUnit } from "hooks/useUnit";

export default function CardTopUpPage() {
  const [linkInstance, setLinkInstance] = useState<any>();
  const router = useRouter();
  const isPdConfigured = useGlobalStore((state) => state.isPdConfigured);
  const setFeatureState = useGlobalStore((state) => state.setFeatureState);
  const setLast4Digits = useGlobalStore((state) => state.setLast4Digits);
  const applyRoute = "/card";

  const { unit } = useUnit();

  const handleSetupSuccess = () => {
    const url = "/api/unit/cards/" + unit?.checkingAccount.id;

    const options = {
      method: "POST",
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setFeatureState("card", true);
        setLast4Digits(data.attributes.last4Digits);
        router.push(applyRoute);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSetup = () => {
    if (!isPdConfigured && linkInstance) {
      linkInstance.open();
    } else {
      handleSetupSuccess();
    }
  };

  return (
    <>
      <ArgyleLink
        payDistributionUpdateFlow={true}
        onClose={() => {
          if (useGlobalStore.getState().isPdConfigured) {
            handleSetupSuccess();
          }
        }}
        onLinkInit={(link) => setLinkInstance(link)}
      />
      <div className="px-4">
        <DecorativeIconWrapper>
          <IncomeIcon />
        </DecorativeIconWrapper>
        <Heading className="mb-3">
          Auto top up your card as you get paid
        </Heading>
        <Paragraph className="mb-6">
          Connect your work account and enable deposit switch to automatically
          top up your FinanceNow debit card.
        </Paragraph>
        <div className="flex">
          <Button as="button" onClick={handleSetup} disabled={!linkInstance}>
            Set up
          </Button>
        </div>
      </div>
    </>
  );
}

CardTopUpPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
