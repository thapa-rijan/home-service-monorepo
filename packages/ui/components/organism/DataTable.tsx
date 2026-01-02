import React from "react";

export interface TableColumn<T = any> {
  key: string;
  label: string;
  render?: (item: T, value: any) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

// Generic table action
export interface TableAction<T = any> {
  label: string;
  onClick: (item: T) => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: (item: T) => boolean;
}

// Generic table props
interface DataTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  title?: string;
  actions?: TableAction<T>[];
  onRefresh?: () => void;
  emptyMessage?: string;
  className?: string;
  headerActions?: React.ReactNode;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  title,
  actions = [],
  onRefresh,
  emptyMessage = "No data found",
  className = "",
  headerActions,
  searchable = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) => {
  const getNestedValue = (obj: T, path: string) => {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  };

  const renderCellValue = (item: T, column: TableColumn<T>) => {
    const value = getNestedValue(item, column.key);

    if (column.render) {
      return column.render(item, value);
    }

    if (value === null || value === undefined) {
      return "-";
    }

    return String(value);
  };

  const getActionButtonClass = (variant: string = "primary") => {
    const baseClass = "px-2 py-1 rounded text-xs font-medium transition-colors";
    switch (variant) {
      case "danger":
        return `${baseClass} bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300`;
      case "secondary":
        return `${baseClass} bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-300`;
      default:
        return `${baseClass} bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300`;
    }
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className}`}
    >
      {/* Header */}
      {(title || onRefresh || headerActions || searchable) && (
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-4 flex-1">
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {searchable && (
              <div className="flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {headerActions}
            {onRefresh && (
              <button
                className="inline-flex items-center gap-2 rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 disabled:bg-blue-300"
                onClick={onRefresh}
                disabled={loading}
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-3 py-2 text-left text-sm font-medium text-gray-700"
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="px-3 py-6 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

            {loading && data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="px-3 py-6 text-center text-sm text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            )}

            {data.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-3 py-2 text-sm text-gray-700"
                  >
                    {renderCellValue(item, column)}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-3 py-2 text-sm">
                    <div className="flex gap-1">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(item)}
                          disabled={action.disabled?.(item)}
                          className={getActionButtonClass(action.variant)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
