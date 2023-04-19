import * as React from "react";

import { cn } from "~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
  errorText?: string;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, autoFocus = true, helperText, errorText, onPaste, ...props },
    ref
  ) => {
    return (
      <>
        {helperText && (
          <span className="whitespace-pre-wrap text-dusty-gray">
            {helperText}
          </span>
        )}
        <input
          className={cn(
            "flex h-10 w-full rounded-sm border border-dusty-gray border-opacity-40 bg-transparent px-3 py-6  outline-slate-400 placeholder:text-slate-400 hover:border-opacity-80",
            className
          )}
          ref={ref}
          {...props}
        />
        {errorText && (
          <span className="block self-center text-sm text-red-700">
            {errorText}
          </span>
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
