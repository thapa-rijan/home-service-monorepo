import React from "react";

export interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`.trim()}>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};
