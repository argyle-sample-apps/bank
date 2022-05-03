import { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = {
  id: string;
  label?: string;
  disabled?: boolean;
  register: any;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  id,
  label,
  disabled = false,
  register,
  ...inputProps
}: InputProps) => {
  return (
    <label className="">
      {label && (
        <span className="text-xs font-normal text-gray-400">{label}</span>
      )}
      <input
        type="text"
        className={clsx(
          "mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 focus:border-black focus:ring-0",
          {
            ["cursor-not-allowed border-b-0 opacity-70"]: disabled,
          }
        )}
        disabled={disabled}
        {...register(id)}
        {...inputProps}
      />
    </label>
  );
};
