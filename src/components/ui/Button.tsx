import { mergeClassNames } from "../../utils/StyleHelper";

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "link";
  className?: string;
  disabled?: boolean;
};

export default function Button({
  size = "md",
  variant = "primary",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={mergeClassNames(
        "relative flex items-center justify-center text-neutral-50 rounded-3xl overflow-hidden transition-all duration-300 text-nowrap font-semibold group",
        {
          "px-4 py-1": size === "sm",
          "px-6 py-3": size === "md",
          "px-8 py-4": size === "lg",
        },
        {
          "bg-primary-600 border-t-2 border-primary-300 before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:bg-gradient-to-b before:from-primary-500 before:via-primary-600 before:to-primary-800 hover:before:opacity-100 hover:shadow-xl hover:shadow-primary-600/40 focus:ring-4 focus:ring-primary-500/50":
            variant === "primary",
          "bg-gradient-to-br from-neutral-700 to-neutral-900 border-t-2 border-neutral-600 before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:bg-gradient-to-br before:from-neutral-600 before:to-neutral-800 hover:before:opacity-100 hover:shadow-lg hover:shadow-neutral-800/50 focus:ring-4 focus:ring-neutral-500/50":
            variant === "secondary",
          "bg-neutral-100/10 backdrop-blur-sm border-2 border-primary-700 text-primary-700 hover:shadow-xl hover:shadow-primary-600/40 hover:text-neutral-50 hover:bg-primary-700  focus:ring-4 focus:ring-primary-800/30":
            variant === "outline",
          "bg-neutral-100/10 backdrop-blur-sm text-primary-800 transition-colors hover:bg-primary-200 focus:bg-primary-100":
            variant === "link",
        },
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </button>
  );
}
