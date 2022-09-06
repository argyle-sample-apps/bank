import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import WithBackButton from "layouts/with-back-button";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import {
  EarlyPayIcon,
  CheckIcon,
  CreditIcon,
  CheckedSmallIcon,
  UncheckedSmallIcon,
} from "components/icons";
import { Strong, Heading, Paragraph } from "components/typography";
import { formatter } from "utils";
import { Button, InlineButton } from "components/button";
import { useGlobalStore } from "stores/global";
import { useRouter } from "next/router";
import { useProfile } from "hooks/useProfile";
import { usePayouts } from "hooks/usePayouts";
import { ArgyleLink } from "components/argyle-link";
import currency from "currency.js";
import Splitter from "components/splitter";
import clsx from "clsx";

type ToggleButtonProps = {
  label: string;
  checked: boolean;
  onClick?: () => void;
  className?: string;
};

const ToggleButton = ({
  label,
  checked,
  onClick,
  className,
}: ToggleButtonProps) => {
  const checkboxEmptyClass = "h-3.5 w-3.5 rounded-full bg-now-grey";
  const checkboxFullClass = "h-3.5 w-3.5 rounded-full bg-now-green";
  // return <div className="ml-[3px] mt-[3px] h-2 w-2 text-black"><CheckSmallIcon /></div>
  return (
    <InlineButton
      onClick={onClick}
      className={clsx("flex items-center", className)}
    >
      {checked ? <CheckedSmallIcon /> : <UncheckedSmallIcon />}

      <Paragraph
        className={`ml-3 ${
          checked ? "!text-now-green" : "!text-black opacity-40"
        }`}
      >
        {label}
      </Paragraph>
    </InlineButton>
  );
};

export default function EarlyPayConfirmPage() {
  const setFeatureState = useGlobalStore((state) => state.setFeatureState);
  const { lastPayoutAmount, isLoading } = usePayouts();

  const isPdConfigured = useGlobalStore((state) => state.isPdConfigured);
  const [isAccountConnected, setIsAccountConnected] = useState<boolean>(true);
  const [linkInstance, setLinkInstance] = useState<any>();

  const setInterest = useGlobalStore((state) => state.setInterest);
  const creditAmount = useGlobalStore((state) => state.credit.amount) || 0;
  //   const receive = useFinanceStore((state) => state.receive);
  const interest = 3;

  const generateEarlyTransactions = useGlobalStore(
    (state) => state.generateEarlyTransactions
  );
  const { profile } = useProfile();
  const applyRoute = "/credit/final-confirm";
  const router = useRouter();

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

  const setupAndContinue = () => {
    setInterest(interest);
    router.push(applyRoute);
  };

  const handleConfirm = () => {
    if (!isPdConfigured) {
      linkInstance.open();
    } else {
      setupAndContinue();
    }
  };

  return (
    <div className="px-4 pt-4">
      <ArgyleLink
        payDistributionUpdateFlow={true}
        onClose={() => {
          if (useGlobalStore.getState().isPdConfigured) {
            // receive({ label: "Credit", amount: creditAmount });
            setupAndContinue();
          }
        }}
        onLinkInit={(link) => setLinkInstance(link)}
      />
      <DecorativeIconWrapper>
        <CreditIcon />
      </DecorativeIconWrapper>
      <Heading className="mb-3">Almost there</Heading>
      <Paragraph className="text-black">
        Your’re almost done. Based on your income we’re ready to provide a loan
        of{" "}
        <Strong>{currency(creditAmount, { fromCents: true }).format()} </Strong>
        with <Strong>{interest}%</Strong> interest
      </Paragraph>
      <Splitter className="mb-4 mt-6" />
      <ToggleButton
        label="Connect your work and income"
        checked={isAccountConnected}
        className="mb-4"
      />
      <ToggleButton
        label="Direct your income to GoodBank"
        checked={isPdConfigured}
      />
      <Splitter className="mb-6 mt-4" />
      <div className="mt-4 flex">
        <Button
          disabled={!linkInstance}
          onClick={() => handleConfirm()}
          as="button"
        >
          Complete application
        </Button>
        <InlineButton
          className="ml-4"
          onClick={() => router.back()}
          as="button"
        >
          Cancel
        </InlineButton>
      </div>
    </div>
  );
}

EarlyPayConfirmPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
