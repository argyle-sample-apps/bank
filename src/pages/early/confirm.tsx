import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import WithBackButton from "layouts/with-back-button";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import {
  EarlyPayIcon,
  CheckIcon,
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

type ToggleButtonProps = {
  label: string;
  checked: boolean;
  onClick?: () => void;
};

const ToggleButton = ({ label, checked, onClick }: ToggleButtonProps) => {
  return (
    <InlineButton onClick={onClick} className="flex items-center">
      {checked ? <CheckedSmallIcon /> : <UncheckedSmallIcon />}

      <Paragraph
        className={`ml-3 ${checked ? "text-now-green" : "text-now-grey"}`}
      >
        {label}
      </Paragraph>
    </InlineButton>
  );
};

export default function EarlyPayConfirmPage() {
  const setFeatureState = useGlobalStore((state) => state.setFeatureState);
  const { lastPayoutAmount, payouts, isLoading } = usePayouts();

  const isPdConfigured = useGlobalStore((state) => state.isPdConfigured);
  const [isAccountConnected, setIsAccountConnected] = useState<boolean>(true);
  const [linkInstance, setLinkInstance] = useState<any>();

  const earlypayAmount = useGlobalStore((state) => state.earlypay.amount);
  const setEarlyPayAmount = useGlobalStore((state) => state.setEarlyAmount);
  const generateEarlyTransactions = useGlobalStore(
    (state) => state.generateEarlyTransactions
  );
  const { profile } = useProfile();
  const applyRoute = "/early/success";
  const router = useRouter();

  const employer = profile?.employerC;

  useEffect(() => {
    const possibleAmount = lastPayoutAmount * 0.7;
    setEarlyPayAmount(possibleAmount);
  }, [lastPayoutAmount]);

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

  const setupEarlyPayAndContinue = () => {
    const logo = `https://res.cloudinary.com/argyle-media/image/upload/v1600705681/partner-logos/${profile?.employer}.png`;
    const employer = profile?.employerC || "";
    generateEarlyTransactions(employer, logo, earlypayAmount);
    setFeatureState("earlypay", true);
    router.push(applyRoute);
  };

  const handleConfirm = () => {
    if (!isPdConfigured) {
      linkInstance.open();
    } else {
      setupEarlyPayAndContinue();
    }
  };

  return (
    <div className="px-4 pt-4">
      <ArgyleLink
        payDistributionUpdateFlow={true}
        onClose={() => {
          if (useGlobalStore.getState().isPdConfigured) {
            // receive({ label: "Credit", amount: creditAmount });
            setupEarlyPayAndContinue();
          }
        }}
        onLinkInit={(link) => setLinkInstance(link)}
      />
      <DecorativeIconWrapper>
        <EarlyPayIcon />
      </DecorativeIconWrapper>
      <Heading className="mb-3">Almost there</Heading>
      <Paragraph>
        Your&apos;re almost done. We can see that your last paycheck is{" "}
        <Strong>{formatter.format(lastPayoutAmount)}</Strong>. We&apos;re ready
        to deposit <Strong>{formatter.format(earlypayAmount)}</Strong> to your
        account as soon as you complete your application.
      </Paragraph>
      <ToggleButton
        label="Connect your work and income"
        checked={isAccountConnected}
      />
      <ToggleButton
        label="Direct your income to GoodBank"
        checked={isPdConfigured}
      />
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
