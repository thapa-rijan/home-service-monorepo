import React from "react";
import {
  useFormContext,
  Controller,
  FieldValues,
  Path,
  ControllerProps,
} from "react-hook-form";
import { HSSelect, HSSelectProps } from "./HSSelect";

export interface HSSelectFormProps<
  TFieldValues extends FieldValues = FieldValues
> extends Omit<HSSelectProps, "name"> {
  name: Path<TFieldValues>;
  rules?: ControllerProps<TFieldValues>["rules"];
  defaultValue?: any;
}

export function HSSelectForm<TFieldValues extends FieldValues = FieldValues>({
  name,
  rules,
  defaultValue,
  ...selectProps
}: HSSelectFormProps<TFieldValues>) {
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
        <HSSelect
          {...selectProps}
          {...field}
          error={errorMessage}
          aria-invalid={!!error}
        />
      )}
    />
  );
}

HSSelectForm.displayName = "HSSelectForm";
