import React from "react";
import {
  useFormContext,
  Controller,
  FieldValues,
  Path,
  ControllerProps,
} from "react-hook-form";
import { HSInput, HSInputProps } from "./HSInput";

export interface HSFormInputProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<HSInputProps, "name"> {
  name: Path<TFieldValues>;
  rules?: ControllerProps<TFieldValues>["rules"];
  defaultValue?: any;
}

export function HSFormInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  rules,
  defaultValue,
  ...inputProps
}: HSFormInputProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <HSInput
          {...inputProps}
          {...field}
          error={errorMessage}
          aria-invalid={!!error}
        />
      )}
    />
  );
}

HSFormInput.displayName = "HSFormInput";
