import { useEffect } from "react";
import { Footnote, Heading, Title } from "components/typography";
import { Modal } from "components/modal";
import { PaymentCard } from "components/payment-card";

type CardPinModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CardPinModal({ isOpen, onClose }: CardPinModalProps) {
  // TODO: get pin from Unit's API
  const PIN = "1234";

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="z-10 bg-white">
      <div className="px-4">
        <Heading>Your card PIN</Heading>
        <div className="mt-10 flex flex-col items-center justify-center">
          <PaymentCard size="default" mode="content" obfuscated={false} />
          <Title className="mt-10 mb-6 font-mono tracking-widest">{PIN}</Title>
          <Footnote>This screen will disappear in 5 seconds</Footnote>
        </div>
      </div>
    </Modal>
  );
}
