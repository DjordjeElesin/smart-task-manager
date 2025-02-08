import React from "react";
import { mergeClassNames } from "../../lib/utils/StyleHelper";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: "sm" | "md" | "lg";
  Icon?: React.ReactNode;
  isInvalid?: boolean;
  labelText?: string;
  className?: string;
  width?: string
};

export default function Input({
  size = "md",
  Icon,
  isInvalid,
  labelText,
  className,
  disabled,
  width="100%",
  ...props
}: InputProps) {
  return (
    <div style={{width}}>
      <div className="relative">
        {Icon && (
          <span className="text-neutral-400 absolute right-0 px-4 z-10 -translate-y-1/2 top-1/2">
            {Icon}
          </span>
        )}
        <input
          className={mergeClassNames(
            "rounded-3xl border-2 border-neutral-200 bg-primary-50 drop-shadow-md w-full outline-none px-4 text-neutral-800 placeholder:text-neutral-300 focus:ring-1 focus:ring-neutral-600/20",
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
            },
            className
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
