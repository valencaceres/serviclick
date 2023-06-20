import * as React from "react";
import { cn } from "~/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
  errorText?: string;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  value: string | number;
  debounce?: number;
  onDebouncedChange?: (value: string | number) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      autoFocus = true,
      helperText,
      errorText,
      onPaste,
      value: initialValue,
      debounce = 500,
      onChange,
      onDebouncedChange,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
      if (onDebouncedChange && debounce > 0) {
        const timeout = setTimeout(() => {
          onDebouncedChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
      }
    }, [value, debounce, onDebouncedChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="flex flex-col">
        {helperText && (
          <span className="whitespace-pre-wrap text-dusty-gray">
            {helperText}
          </span>
        )}
        <input
          className={cn(
            "flex h-10 w-full rounded-sm border border-dusty-gray border-opacity-40 bg-transparent px-3 py-6 outline-slate-400  placeholder:text-slate-400 hover:border-opacity-80 disabled:bg-slate-50",
            className
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {errorText && (
          <span className="block text-sm text-red-700">{errorText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
