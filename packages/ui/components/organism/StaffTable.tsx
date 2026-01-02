import React from "react";
import type { User } from "@home-service/lib";
import { DataTable, TableColumn, TableAction } from "./DataTable";

interface Props {
  users: User[];
  loading?: boolean;
  onRefresh?: () => void;
  onEditUser?: (user: User) => void;
  onDeleteUser?: (user: User) => void;
  onViewUser?: (user: User) => void;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const StaffTable: React.FC<Props> = ({
  users,
  loading,
  onRefresh,
  onEditUser,
  onDeleteUser,
  onViewUser,
  searchable = false,
  searchValue = "",
  onSearchChange,
}) => {
  const columns: TableColumn<User>[] = [
    {
      key: "name",
      label: "Name",
      width: "150px",
    },
    {
      key: "email",
      label: "Email",
      width: "200px",
    },
    {
      key: "jobTitle",
      label: "Job Title",
      width: "120px",
    },
    {
      key: "number",
      label: "Phone",
      width: "120px",
    },
    {
      key: "hourlyRate",
      label: "Rate",
      width: "80px",
      render: (_, value) => (value ? `$${value}/hr` : "-"),
    },
    {
      key: "isActive",
      label: "Status",
      width: "80px",
      render: (_, value) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      width: "100px",
      render: (_, value) => new Date(value).toLocaleDateString(),
    },
  ];

  const actions: TableAction<User>[] = [];

  if (onViewUser) {
    actions.push({
      label: "View",
      onClick: onViewUser,
      variant: "secondary",
    });
  }

  if (onEditUser) {
    actions.push({
      label: "Edit",
      onClick: onEditUser,
      variant: "primary",
    });
  }

  if (onDeleteUser) {
    actions.push({
      label: "Delete",
      onClick: onDeleteUser,
      variant: "danger",
    });
  }

  return (
    <DataTable
      data={users}
      columns={columns}
      actions={actions}
      loading={loading}
      title="Staff Members"
      onRefresh={onRefresh}
      emptyMessage="No staff found"
      searchable={searchable}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search staff members..."
    />
  );
};

export default StaffTable;
