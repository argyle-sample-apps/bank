import { Title, Heading, Paragraph } from "components/typography";
import { Button } from "components/button";
import { PaymentCard } from "components/payment-card";
import Link from "next/link";

export default function CardOnboardingPage() {
  const applyRoute = "/card/delivery";

  return (
    <div className="px-4 pt-4">
      <Title>Card</Title>
      <div className="flex items-center justify-center py-10">
        <PaymentCard mode="logo" size="default" />
      </div>
      <Heading className="mb-3">Create a card</Heading>
      <Paragraph className="mb-3">
        The FinanceNow debit card is the best way to pay for goods and services online
        and offline.
      </Paragraph>
      <div className="mt-4 flex">
        <Link href={applyRoute} passHref>
          <Button as="a">Start</Button>
        </Link>
      </div>
    </div>
  );
}
