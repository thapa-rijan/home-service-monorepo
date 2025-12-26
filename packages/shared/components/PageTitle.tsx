import React from "react";

export interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`mb-6 ${className}`.trim()}>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {title}
      </h1>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
    </div>
  );
};
