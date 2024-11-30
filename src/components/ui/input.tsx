import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  legend?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, legend, ...props }, ref) => {
    return (
      <div className="relative">
        {legend && (
          <legend className="absolute -top-2 left-2 px-2 bg-background text-sm text-black dark:text-white">
            {legend}
          </legend>
        )}
        <input
          type={type}
          className={cn(
            "flex h-[45px] w-full text-black dark:text-white rounded-lg border border-green/50 dark:border-white bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }