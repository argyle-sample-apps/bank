import { useEffect, useState } from "react";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import { CreditIcon, EditIcon } from "components/icons";
import {
  Title,
  Heading,
  Paragraph,
  Strong,
  Megatitle,
} from "components/typography";
import { Button } from "components/button";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useGlobalStore } from "stores/global";
import { useRouter } from "next/router";
import { useFakeIncome } from "hooks/useFakeIncome";
import currency from "currency.js";
import clamp from "just-clamp";
import CurrencyInput from "react-currency-input-field";

type EditableProps = {
  amount: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
};

const Editable = ({ amount, onChange, min, max }: EditableProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [localAmount, setLocalAmount] = useState<string>(String(amount));

  const formatted = currency(amount, { fromCents: true }).format();
  const precisionSplit = formatted.split(".");

  useEffect(() => {
    setLocalAmount(String(amount / 100));
  }, [amount]);

  const handleClick = (e: any) => {
    setIsEditable(true);
  };

  if (isEditable) {
    return (
      <div className="mb-3" onClick={handleClick}>
        <CurrencyInput
          className="w-4/6 text-5xl font-light text-now-darkest"
          autoFocus
          allowDecimals={false}
          placeholder="$500"
          defaultValue={localAmount}
          maxLength={6}
          prefix="$"
          onValueChange={(value) => {
            if (value) {
              setLocalAmount(value);
            }
          }}
          onBlur={() => {
            const value = clamp(min, Number(localAmount), max / 100);

            onChange(value);
            setIsEditable(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="mb-3 flex items-end pt-2 pb-1.5" onClick={handleClick}>
        <Megatitle>{precisionSplit[0]}</Megatitle>
        <Paragraph className="!text-2xl !text-black">
          .{precisionSplit[1]}
        </Paragraph>
      </div>
      <div>
        <button onClick={handleClick} className="ml-3 mt-4 h-4 w-4">
          <EditIcon />
        </button>
      </div>
    </div>
  );
};
const MIN_CREDIT_AMOUNT = 1;
export default function CreditOnboardingPage() {
  const creditAmount = useGlobalStore((state) => state.credit.amount) || 0;
  const setCreditAmount = useGlobalStore((state) => state.setAmount);

  const [maxAmount, setMaxAmount] = useState<number>(-1);

  const { income, isLoading } = useFakeIncome();
  const router = useRouter();

  const applyRoute = "credit/confirm";

  useEffect(() => {
    if (income?.total && maxAmount < 0) {
      let max =
        Math.ceil(income?.total?.gross_pay / income?.monthly.length) * 100;
      setMaxAmount(max);
      setCreditAmount(Math.ceil(max * 0.008) * 100);
    }
  }, [income]);

  const handleSetup = () => {
    router.push(applyRoute);
  };

  if (isLoading) {
    return (
      <div className="mt-8 grid animate-pulse gap-3 px-4">
        <div className="h-10 w-32 rounded-full bg-gray-200"></div>
        <div className="h-4 w-full rounded-full bg-gray-200"></div>
        <div className="h-4 w-4/6 rounded-full bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded-full bg-gray-200"></div>
        <div className="h-10 w-3/6 rounded-full bg-gray-200"></div>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 pt-4">
        <Title className="mb-7">Credit</Title>
        <DecorativeIconWrapper>
          <CreditIcon />
        </DecorativeIconWrapper>
        <Heading className="mb-5">Get cash now</Heading>
        <Paragraph className="mb-6">
          Based on your income you can get up to{" "}
          <Strong>{currency(maxAmount, { fromCents: true }).format()}</Strong>.
        </Paragraph>
        <Editable
          amount={creditAmount}
          onChange={(val) => setCreditAmount(Number(val) * 100)}
          min={MIN_CREDIT_AMOUNT}
          max={maxAmount}
        />
        <div className="mt-7 px-1">
          <Slider
            min={MIN_CREDIT_AMOUNT}
            step={100}
            max={maxAmount}
            value={creditAmount}
            onChange={(val) => {
              setCreditAmount(Math.ceil(Number(val) / 100) * 100);
            }}
            handleStyle={{
              height: 28,
              width: 28,
              marginTop: -12,
              opacity: 1,
              // boxShadow: "1px 2px 10px #9E9E9E",
              borderWidth: 2,
              //backgroundColor: "linear-gradient(#e66465, #9198e5)",
              backgroundColor: "white",
              borderColor: "#707192",
            }}
            railStyle={{ backgroundColor: "#FFEFD0", height: 4 }}
            trackStyle={{ backgroundColor: "#707192", height: 4 }}
          />
        </div>
        <div className="mt-7 flex">
          <Button as="button" onClick={handleSetup}>
            Apply
          </Button>
        </div>
      </div>
    </>
  );
}
