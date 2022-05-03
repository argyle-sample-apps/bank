import { useState, useEffect } from "react";
import { Footnote, Paragraph, Subheading } from "components/typography";
import { Modal } from "components/modal";
import clsx from "clsx";
import { CloseIcon, UnlockIcon } from "components/icons";

export function SamplePasswordButton({
  showHintsButton,
  showHints,
  onClick,
}: any) {
  if (!showHintsButton) {
    return null;
  }

  return (
    <div
      className={clsx(
        "pointer-events-none absolute top-[26px] left-0 right-0 z-[9999999999] flex items-center",
        showHints ? "justify-start" : "justify-center"
      )}
    >
      {showHints ? (
        <button
          className="pointer-events-auto flex items-center rounded-sm bg-now-orangepastel p-1 text-left leading-none"
          onClick={onClick}
        >
          <div className="text-now-black ml-5 h-3 w-3">
            <CloseIcon />
          </div>
        </button>
      ) : (
        <button
          className="pointer-events-auto flex items-center rounded-sm bg-now-orangepastel p-1 text-left leading-none"
          onClick={onClick}
        >
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3">
              <UnlockIcon />
            </div>
            <span className="text-[10px] uppercase">test credentials</span>
          </div>
          {showHints && (
            <div className="ml-2 h-3 w-3 text-now-orangepastel">
              <CloseIcon />
            </div>
          )}
        </button>
      )}
    </div>
  );
}

const credentials = [
  {
    label: "Email",
    value: "test1@argyle.com",
  },
  {
    label: "Phone number",
    value: "(800) 900-0010",
  },
  {
    label: "Username",
    value: "test_1",
    note: "Employee ID, User ID, etc.",
  },
  {
    label: "Password",
    value: "passgood",
  },
  {
    label: "SMS Code",
    value: "8081",
  },
  {
    label: "Driver’s license",
    value: "D1230010",
  },
];

type CardPinModalProps = {
  isOpen: boolean;
};

export function CredentialsHints({ isOpen }: CardPinModalProps) {
  const [copySuccessMessage, setCopySuccessMessage] = useState("");

  useEffect(() => {
    if (copySuccessMessage !== "") {
      const timer = setTimeout(() => {
        setCopySuccessMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccessMessage, setCopySuccessMessage]);

  return (
    <Modal isOpen={isOpen} className="z-[9999999998] bg-now-orangepastel">
      <div className="mt-6 px-4">
        <div className="flex pb-3">
          <div className="flex-1"></div>
          <div className="flex-1">
            <Subheading className="min-h-[25px] !text-black">
              {copySuccessMessage}
            </Subheading>
          </div>
        </div>
        <div className="flex pb-3">
          <div className="flex-1"></div>
          <div className="flex-1">
            <Footnote className="!text-black opacity-40">
              Tap bellow to copy
            </Footnote>
          </div>
        </div>
        <div className="divide-y divide-black divide-opacity-[.08] border-y border-black border-opacity-[.08]">
          {credentials.map((credential) => (
            <div className="flex items-center py-3" key={credential.label}>
              <div className="flex-1">
                <Paragraph className="!text-black opacity-60">
                  {credential.label}
                </Paragraph>
                {credential.note && (
                  <Footnote className="!text-black opacity-40">
                    {credential.note}
                  </Footnote>
                )}
              </div>
              <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(credential.value);
                  setCopySuccessMessage(`${credential.label} copied!`);
                }}
              >
                <Paragraph className="!text-black">
                  {credential.value}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
