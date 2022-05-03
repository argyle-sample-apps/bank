type AvatarProps = {
  src: string;
};

export function Avatar({ src }: AvatarProps) {
  return (
    <div className="overflow-auto rounded-full border border-now-darkorange p-[5px]">
      <img
        className="block h-[28px] w-[28px] rounded-full"
        src={src}
        alt="User avatar"
      />
    </div>
  );
}
