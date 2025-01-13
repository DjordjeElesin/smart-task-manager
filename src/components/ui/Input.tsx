import React from "react";
import { mergeClassNames } from "../../utils/StyleHelper";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: "sm" | "md" | "lg";
  Icon?: React.ReactNode;
  isInvalid?: boolean;
  labelText?: string;
  className?: string;
};

export default function Input({
  size = "md",
  Icon,
  isInvalid,
  labelText,
  className,
  disabled,
  ...props
}: InputProps) {
  return (
    <div>
      <div className="relative">
        {Icon && (
          <span className="text-neutral-400 absolute right-0 px-4 z-10 -translate-y-1/2 top-1/2">
            {Icon}
          </span>
        )}
        <input
          className={mergeClassNames(
            "rounded-lg border-2 border-neutral-400 drop-shadow-md w-full outline-none px-3 text-neutral-900 placeholder:text-neutral-300 focus:ring-4 focus:ring-neutral-900/20",
            {
              "h-9": size === "sm",
              "h-12": size === "md",
              "h-20": size === "lg",
            },
            {
              "border-danger-500 border ring-4 ring-danger-500 ring-opacity-20 focus:ring-danger-400/80 focus:border-danger-300 focus:border":
                isInvalid,
            },
            {
              "pr-10": Icon,
            }
          )}
          {...props}
        />
      </div>
      {isInvalid && labelText ? (
        <label className="block mt-2 text-sm text-danger-400">
          {labelText}
        </label>
      ) : (
        false
      )}
    </div>
  );
}
