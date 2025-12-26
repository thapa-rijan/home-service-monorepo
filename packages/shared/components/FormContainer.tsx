import React from "react";

export interface FormContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`w-full max-w-md space-y-8 ${className}`.trim()}>
      {(title || subtitle) && (
        <div className="text-center">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>
          )}
          {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};
