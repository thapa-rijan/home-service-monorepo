import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface HSSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface HSSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: HSSelectOption[];
  placeholder?: string;
  variant?: "default" | "filled" | "outline";
}

export const HSSelect = forwardRef<HTMLSelectElement, HSSelectProps>(
  (
    {
      label,
      error,
      helperText,
      options = [],
      placeholder,
      variant = "default",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const variantStyles = {
      default: "border-input",
      filled: "border-input bg-muted",
      outline: "border-2 border-input",
    };

    const errorStyles = error
      ? "border-destructive focus-visible:ring-destructive"
      : "";

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              baseStyles,
              variantStyles[variant],
              errorStyles,
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children ||
              options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
          </select>
        </div>
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

HSSelect.displayName = "HSSelect";
