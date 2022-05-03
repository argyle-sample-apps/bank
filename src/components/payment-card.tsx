import clsx from "clsx";
import { useGlobalStore } from "stores/global";
import { formatCardNumber } from "utils";
import { LogoIcon, VisaIcon } from "./icons";

const CARD_NUMBER = "4144479430012491";
const CARD_CVV = "553";
const CARD_VALID = "10/26";

type PaymentCardLogo = {
  mode: "logo";
  size: "default" | "small" | "xsmall";
  obfuscated?: boolean;
  showIcons?: boolean;
  isMinimal?: boolean;
};

type PaymentCardContent = {
  mode: "content";
  size: "default";
  obfuscated: boolean;
  showIcons?: boolean;
  isMinimal?: boolean;
};

type PaymentCardProps = PaymentCardLogo | PaymentCardContent;

export const PaymentCard = ({
  size,
  mode,
  obfuscated,
  isMinimal = false,
}: PaymentCardProps) => {
  let classname = clsx("brand-gradient relative rounded-lg", {
    "h-[160px] w-[250px] shadow-2xl": size === "default",
    "h-[80px] w-[125px] shadow-xl": size === "small",
    "h-[60px] w-[94px] shadow-lg": size === "xsmall",
  });
  if (isMinimal) {
    classname = clsx("brand-gradient relative rounded-lg", {
      "h-[160px] w-[250px]": size === "default",
      "h-[80px] w-[125px]": size === "small",
      "h-[60px] w-[94px]": size === "xsmall",
    });
  }
  return (
    <div className={classname}>
      <div className="absolute inset-0">
        {mode === "content" ? (
          <CardInfoOnly
            size={size}
            mode={mode}
            obfuscated={obfuscated}
            showIcons={true}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div
              className={clsx({
                "h-28 w-28": size === "default",
                "h-14 w-14": size === "small",
                "h-10 w-10": size === "xsmall",
              })}
            >
              <LogoIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CardInfoOnly = ({
  size,
  mode,
  obfuscated,
  showIcons = false,
}: PaymentCardProps) => {
  // const last4Digits = useGlobalStore((state) => state.card.last4Digits);
  const containerWithIcons =
    "flex h-full flex-col justify-between p-4 text-[14px] leading-[17px]";
  const containerWOIcons = "flex flex-col pl-6 text-[14px] leading-[17px]";
  return (
    <div className={showIcons ? containerWithIcons : containerWOIcons}>
      {showIcons && (
        <div className="h-12 w-12">
          <LogoIcon />
        </div>
      )}
      <div>
        {obfuscated ? (
          <span>•••• •••• •••• {CARD_NUMBER.slice(-4)}</span>
        ) : (
          <span>{formatCardNumber(CARD_NUMBER)}</span>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div className="mt-2 flex">
          <div className="mr-4">
            <span className="text-[9px] uppercase text-black opacity-40">
              valid
            </span>
            <span className="block">{CARD_VALID}</span>
          </div>
          <div>
            <span className="text-[9px] uppercase text-black opacity-40">
              cvv
            </span>
            <span className="block">{obfuscated ? "•••" : CARD_CVV}</span>
          </div>
        </div>
        {showIcons && (
          <div className="w-[48px]">
            <VisaIcon />
          </div>
        )}
      </div>
    </div>
  );
};
