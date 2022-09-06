import type { ReactElement } from "react";
import WithBackButton from "layouts/with-back-button";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import { CheckIcon } from "components/icons";
import { Heading, Paragraph, Strong } from "components/typography";
import { Button, InlineButton } from "components/button";
import { useGlobalStore } from "stores/global";
import { useRouter } from "next/router";
import { useProfile } from "hooks/useProfile";
import currency from "currency.js";

export default function CreditConfirmPage() {
  const setFeatureState = useGlobalStore((state) => state.setFeatureState);
  const creditAmount = useGlobalStore((state) => state.credit.amount) || 0;
  const interest = useGlobalStore((state) => state.credit.interest);
  const generateCreditTransactions = useGlobalStore(
    (state) => state.generateCreditTransactions
  );
  const applyRoute = "/credit";
  const router = useRouter();
  const { profile, isLoading } = useProfile();

  const handleConfirm = () => {
    const amountDue = creditAmount / 12;
    generateCreditTransactions(
      profile?.employerC || "",
      `https://res.cloudinary.com/argyle-media/image/upload/v1600705681/partner-logos/${profile?.employer}.png`,
      amountDue
    );
    // addBalanceIncome(creditAmount, "Your GoodBank balance", "now");

    setFeatureState("credit", true);

    router.push(applyRoute);
  };

  return (
    <div className="px-4 pt-4">
      <DecorativeIconWrapper>
        <CheckIcon />
      </DecorativeIconWrapper>
      <Heading className="mb-3">Loan approved</Heading>
      <Paragraph>
        Based on your income we’re ready to provide a loan of{" "}
        <Strong>{currency(creditAmount, { fromCents: true }).format()} </Strong>
        with <Strong>{interest}%</Strong> interest
      </Paragraph>
      <div className="mt-4 flex space-x-6">
        <Button onClick={() => handleConfirm()} as="button">
          Confirm
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

CreditConfirmPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
