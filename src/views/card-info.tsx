import { useState } from "react";
import { PaymentCard, CardInfoOnly } from "components/payment-card";
import clsx from "clsx";

type CardInfoViewProps = {
  isMinimal?: boolean;
  onShowPin?: (yesNo: boolean) => void;
  onShowSecurity?: (yesNo: boolean) => void;
};

export function CardInfoView({
  isMinimal,
  onShowPin,
  onShowSecurity,
}: CardInfoViewProps) {
  const [obfuscated, setObfuscated] = useState(true);

  if (isMinimal) {
    return (
      <div className="flex pt-3">
        <PaymentCard mode="logo" size="xsmall" />
        <div className="flex-col">
          <CardInfoOnly mode="content" size="default" obfuscated={obfuscated} />
          <div className="ml-6 mt-3 text-[14px] text-now-darkorange">
            <button
              className={clsx({
                "text-now-darkorange": !obfuscated,
              })}
              onClick={() => setObfuscated(!obfuscated)}
            >
              {obfuscated ? "Reveal" : "Hide"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <PaymentCard mode="content" size="default" obfuscated={obfuscated} />
      <div className="mt-3 grid grid-cols-3 gap-4 text-[14px] text-now-purple">
        <button
          className={clsx({
            "text-now-darkorange": !obfuscated,
          })}
          onClick={() => setObfuscated(!obfuscated)}
        >
          {obfuscated ? "Reveal" : "Hide"}
        </button>
        <button onClick={() => onShowPin!(true)}>Show PIN</button>
        <button onClick={() => onShowSecurity!(true)}>Security</button>
      </div>
    </div>
  );
}
