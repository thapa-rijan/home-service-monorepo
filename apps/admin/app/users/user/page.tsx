import { fetchUserRequest } from "@home-service/lib/redux/actions/user.actions";
import {  DataTable, TableAction, TableColumn } from "@home-service/ui/components/organism";

import { useAppDispatch, useAppSelector, User } from "@lib";
import { useEffect } from "react";

export default function RegularUsersPage() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((s) => s.user);
  useEffect(() => {
    dispatch(fetchUserRequest({ page: 1, limit: 50 }));
  }, [dispatch]);
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
  return (
    <div className="space-y-6">
      <DataTable
        data={users}
        columns={columns}
        actions={actions}
        loading={loading}
        title="Users"
        onRefresh={() => dispatch(fetchUserRequest({ page: 1, limit: 50 }))}
        emptyMessage="No users found"
        searchable={true}
        searchValue={""}
        onSearchChange={() => {}}
        searchPlaceholder="Search users..."
      />
    </div>
  );
}
