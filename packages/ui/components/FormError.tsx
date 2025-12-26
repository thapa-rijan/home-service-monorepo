import React from "react";

export interface FormErrorProps {
  message?: string;
  className?: string;
}

export const FormError: React.FC<FormErrorProps> = ({
  message,
  className = "",
}) => {
  if (!message) return null;

  return (
    <p className={`text-sm text-red-600 ${className}`.trim()} role="alert">
      {message}
    </p>
  );
};
