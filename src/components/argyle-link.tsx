declare global {
  interface Window {
    Argyle: any;
  }
}

import { useEffect, useState } from "react";
import Script from "next/script";
import { useGlobalStore } from "stores/global";
import { useEphemeralStore } from "stores/ephemeral";
import { useUnitInit } from "hooks/useUnitInit";
import { createFakeIncome } from "fake";
import {
  CredentialsHints,
  SamplePasswordButton,
} from "views/credentials-hints";

type ArgyleLinkProps = {
  payDistributionUpdateFlow: boolean;
  onClose: () => void;
  onLinkInit: (link: any) => void;
};

export function ArgyleLink({
  payDistributionUpdateFlow,
  onClose,
  onLinkInit,
}: ArgyleLinkProps) {
  const addAccountId = useGlobalStore((state) => state.addAccountId);
  const addLinkItemId = useGlobalStore((state) => state.addLinkItemId);
  const setUser = useGlobalStore((state) => state.setUser);
  const userToken = useGlobalStore((state) => state.userToken);
  const getLinkItemId = useGlobalStore((state) => state.getLinkItemId);
  const enablePd = useGlobalStore((state) => state.enablePd);
  const addFakeIncome = useGlobalStore((state) => state.addFakeIncome);
  const isLinkLoaded = useEphemeralStore((state) => state.isLinkScriptLoaded);
  const confirmLinkIsLoaded = useEphemeralStore(
    (state) => state.confirmLinkIsLoaded
  );

  const [showHints, setShowHints] = useState(false);
  const [showHintsButton, setShowHintsButton] = useState(false);

  const { isLoading: isUnitLoading, unit } = useUnitInit();

  const handleUIEvent = (event: any) => {
    switch (event.name) {
      case "search - opened":
      case "success - opened":
      case "pd success - opened":
        setShowHintsButton(false);
        break;

      case "login - opened":
      case "mfa - opened":
        setShowHintsButton(true);
        break;

      case "link closed":
        setShowHintsButton(false);
        setShowHints(false);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (isLinkLoaded && !isUnitLoading) {
      const linkItems = payDistributionUpdateFlow ? [getLinkItemId()] : [];

      const link = window.Argyle.create({
        customizationId: "2L4FMP6X",
        pluginKey: process.env.NEXT_PUBLIC_ARGYLE_LINK_KEY,
        apiHost: process.env.NEXT_PUBLIC_ARGYLE_BASE_URL,
        userToken: userToken || "",
        payDistributionConfig:
          unit?.encryptedConfig || process.env.NEXT_PUBLIC_PD_CONFIG,
        payDistributionItemsOnly: true,
        payDistributionUpdateFlow: payDistributionUpdateFlow,
        payDistributionAutoTrigger: true,
        linkItems: linkItems,
        onUserCreated: ({
          userId,
          userToken,
        }: {
          userId: string;
          userToken: string;
        }) => {
          setUser(userId, userToken);
        },
        onAccountConnected: ({
          accountId,
          linkItemId,
        }: {
          accountId: string;
          linkItemId: string;
        }) => {
          addAccountId(accountId);
          addLinkItemId(linkItemId);

          const fakeIncomeData = createFakeIncome(accountId, linkItemId);

          addFakeIncome(fakeIncomeData);
        },
        onPayDistributionSuccess: () => enablePd(),
        onUIEvent: handleUIEvent,
        onClose,
      });

      onLinkInit(link);
    }
  }, [isLinkLoaded, isUnitLoading, payDistributionUpdateFlow]);

  return (
    <>
      <CredentialsHints isOpen={showHints} />
      <SamplePasswordButton
        showHintsButton={showHintsButton}
        showHints={showHints}
        onClick={() => setShowHints(!showHints)}
      />
      <Script
        src="https://plugin.argyle.io/argyle.web.v3.js"
        // src="https://plugin.develop.argyle.io/argyle.web.v3.js"
        onLoad={() => confirmLinkIsLoaded()}
      />
    </>
  );
}
