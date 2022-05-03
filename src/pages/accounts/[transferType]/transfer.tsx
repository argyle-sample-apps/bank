import type { ChangeEvent, ReactElement } from "react";
import WithCloseButton from "layouts/with-close-button";
import { useState } from "react";

import { Button } from "components/button";
import { Footnote, Heading, Paragraph, Strong } from "components/typography";
import { useRouter } from "next/router";
import { Input } from "components/input";
import currency from "currency.js";

import { useForm } from "react-hook-form";
import {
  AccountsScreenTypes,
  transferTranslation,
  TransferTypes,
} from "utils/accounts";
import { useUnit } from "hooks/useUnit";
import { useTransactions } from "hooks/useTransactions";

const TRANSFER_TYPE_KEY = "TRANSFER_TYPE";
const AMOUNT_KEY = "AMOUNT";

export default function AccountsTransferPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "$",
    },
  });

  const router = useRouter();
  const applyRoute = `/accounts/${TRANSFER_TYPE_KEY}/${AMOUNT_KEY}/success`;

  const { unit } = useUnit();
  const { mutate: checkingMutate } = useTransactions(unit.checkingAccount.id);
  const { mutate: balanceMutate } = useTransactions(unit.savingsAccount.id);

  const transferType = Number(router.query.transferType) as TransferTypes;

  const [inputVal, setInputVal] = useState<string>("");

  const addSavings = (amount: number) => {
    const url = "/api/unit/transactions/book";
    const config = {
      amount: amount,
      description: "From your balance",
      from: unit?.checkingAccount.id,
      to: unit?.savingsAccount.id,
      purpose: "add-savings",
    };

    const options = {
      method: "POST",
      body: JSON.stringify(config),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        checkingMutate();
        balanceMutate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const withdrawSavings = (amount: number) => {
    const url = "/api/unit/transactions/book";
    const config = {
      amount: amount,
      description: "To your balance",
      from: unit?.savingsAccount.id,
      to: unit?.checkingAccount.id,
      purpose: "withdraw-savings",
    };

    const options = {
      method: "POST",
      body: JSON.stringify(config),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        checkingMutate();
        balanceMutate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const amountAvailable =
    transferType == TransferTypes.addSavings
      ? unit?.checkingAccount?.attributes?.balance
      : unit?.savingsAccount?.attributes?.balance;

  const transferFunc =
    transferType == TransferTypes.addSavings ? addSavings : withdrawSavings;

  const curr = currency(inputVal || 0);
  const outputValue = curr.format();
  const isDoneDisabled =
    curr.intValue == 0 || amountAvailable - curr.intValue < 0;

  const onSubmit = () => {
    const amount = curr.intValue;
    transferFunc(amount);

    router.push(
      applyRoute
        .replace(TRANSFER_TYPE_KEY, "" + transferType)
        .replace(AMOUNT_KEY, "" + amount)
    );
  };

  const formatValue = (event: ChangeEvent<HTMLInputElement>) => {
    const nativeEvent = event.nativeEvent as InputEvent;
    const inputChar = nativeEvent.data;
    const isInputDelete = nativeEvent.inputType == "deleteContentBackward";

    let inputValTmp = "" + inputVal;
    if (isInputDelete) {
      inputValTmp = inputValTmp.substring(0, inputValTmp.length - 1);
    } else {
      inputValTmp += "" + inputChar;
    }

    // Remove non-currency related chars
    inputValTmp = inputValTmp.replace(/[^\d.-]/g, "");

    const formatted = currency(inputValTmp).format();

    setInputVal(inputValTmp);
  };

  const translations = transferTranslation(
    AccountsScreenTypes.Transfer,
    transferType
  );

  return (
    <div className="px-4">
      <Heading className="mb-3">{translations.heading}</Heading>
      <Paragraph className="mb-6">{translations.text}</Paragraph>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          onChange={formatValue}
          value={outputValue}
          id="amount"
          register={register}
          autoFocus
          className="mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 focus:border-blue-500 focus:ring-0"
        />
        {errors.amount && (
          <div className="mt-1 text-red-600">{errors.amount.message}</div>
        )}
        <Footnote className="mt-[15px] mb-[24px]">
          Available balance:{" "}
          <Strong>
            {currency(amountAvailable, { fromCents: true }).format()}
          </Strong>
        </Footnote>
        <Button disabled={isDoneDisabled}>{translations.button}</Button>
      </form>
    </div>
  );
}

AccountsTransferPage.getLayout = function getLayout(page: ReactElement) {
  return <WithCloseButton>{page}</WithCloseButton>;
};
