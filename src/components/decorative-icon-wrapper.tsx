type DecorativeIconWrapperProps = {
  children: React.ReactNode;
  className?: string | undefined;
};

export function DecorativeIconWrapper({
  children,
  className,
}: DecorativeIconWrapperProps) {
  return (
    <div
      className={
        className
          ? className
          : "brand-gradient relative mb-4 h-[52px] w-[52px] rounded-full"
      }
    >
      <div className="absolute inset-0 flex items-center justify-center p-3 text-white">
        {children}
      </div>
    </div>
  );
}
