import { Heading } from "components/typography";
import { BottomSheet } from "components/bottom-sheet";
import { InlineButton } from "components/button";
import { useState } from "react";
import { useGlobalStore } from "stores/global";

type CardSecurityProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CardSecurity({ isOpen, onClose }: CardSecurityProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const setFeatureState = useGlobalStore((state) => state.setFeatureState);
  const isDemoAccount = useGlobalStore((state) => state.isDemoAccount);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {showConfirmation ? (
        <>
          <Heading className="mb-6">
            Are you sure you want to remove this card?
          </Heading>
          <div className="grid grid-cols-1 place-items-start gap-6">
            <InlineButton
              className="!text-red-500"
              onClick={() => {
                setFeatureState("card", false);
              }}
            >
              Remove anyway
            </InlineButton>
            <InlineButton
              className="!text-now-purple"
              onClick={() => {
                setShowConfirmation(false);
                onClose();
              }}
            >
              Cancel
            </InlineButton>
          </div>
        </>
      ) : (
        <>
          <Heading className="mb-6">Security</Heading>
          <div className="grid grid-cols-1 place-items-start gap-6">
            <InlineButton
              onClick={() => setShowConfirmation(true)}
              className="!text-red-500"
              disabled={isDemoAccount}
            >
              Remove this card
            </InlineButton>
            <InlineButton disabled className="!text-red-500">
              Block this card
            </InlineButton>
            <InlineButton onClick={onClose} className="!text-now-purple">
              Cancel
            </InlineButton>
          </div>
        </>
      )}
    </BottomSheet>
  );
}
