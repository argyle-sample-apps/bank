type BottomSheetProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function BottomSheet({ children, isOpen, onClose }: BottomSheetProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-10 flex flex-col">
      <div className="flex-1 bg-gray-300 opacity-80" onClick={onClose} />
      <div className="bg-white p-5">{children}</div>
    </div>
  );
}
