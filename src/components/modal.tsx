import clsx from "clsx";
import { CloseIcon } from "./icons";

type ModalProps = {
  children: React.ReactNode;
  className: string;
  isOpen: boolean;
  onClose?: () => void;
};

export function Modal({ children, className, isOpen, onClose }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={clsx("absolute inset-0", className)}>
      {onClose && (
        <div className="px-3 pt-6 pb-8">
          <button className="block h-8 w-8 p-1 text-now-grey" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
