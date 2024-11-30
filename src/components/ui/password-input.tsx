import * as React from "react";
import { cn } from "@/lib/utils";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  legend?: string; // Optional legend prop
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, legend, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">
        {legend && (
          <label className="absolute -top-3 left-3 px-2 text-sm text-black dark:text-white transition-all duration-200 bg-white dark:bg-black">
            {legend}
          </label>
        )}
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-[45px] w-full rounded-lg border border-black dark:border-white text-black dark:text-white bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-600 dark:text-white"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <VscEye className="h-5 w-5" />
          ) : (
            <VscEyeClosed className="h-5 w-5" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
