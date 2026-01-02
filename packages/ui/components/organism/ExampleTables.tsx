import React from "react";
import { DataTable, TableColumn, TableAction } from "./DataTable";

// Example: Bookings Table
interface Booking {
  id: string;
  customerName: string;
  serviceName: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  scheduledDate: string;
  totalAmount: number;
  createdAt: string;
}

interface BookingsTableProps {
  bookings: Booking[];
  loading?: boolean;
  onRefresh?: () => void;
  onViewBooking?: (booking: Booking) => void;
  onUpdateStatus?: (booking: Booking) => void;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  loading,
  onRefresh,
  onViewBooking,
  onUpdateStatus,
  searchable = true,
  searchValue = "",
  onSearchChange,
}) => {
  const columns: TableColumn<Booking>[] = [
    {
      key: "customerName",
      label: "Customer",
      width: "150px",
    },
    {
      key: "serviceName",
      label: "Service",
      width: "150px",
    },
    {
      key: "status",
      label: "Status",
      width: "120px",
      render: (_, value) => {
        const statusColors = {
          pending: "bg-yellow-100 text-yellow-800",
          confirmed: "bg-blue-100 text-blue-800",
          completed: "bg-green-100 text-green-800",
          cancelled: "bg-red-100 text-red-800",
        };
        return (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              statusColors[value as keyof typeof statusColors]
            }`}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      key: "scheduledDate",
      label: "Scheduled",
      width: "100px",
      render: (_, value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "totalAmount",
      label: "Amount",
      width: "80px",
      render: (_, value) => `$${value.toFixed(2)}`,
    },
    {
      key: "createdAt",
      label: "Created",
      width: "100px",
      render: (_, value) => new Date(value).toLocaleDateString(),
    },
  ];

  const actions: TableAction<Booking>[] = [];

  if (onViewBooking) {
    actions.push({
      label: "View",
      onClick: onViewBooking,
      variant: "secondary",
    });
  }

  if (onUpdateStatus) {
    actions.push({
      label: "Update",
      onClick: onUpdateStatus,
      variant: "primary",
    });
  }

  return (
    <DataTable
      data={bookings}
      columns={columns}
      actions={actions}
      loading={loading}
      title="Bookings"
      onRefresh={onRefresh}
      emptyMessage="No bookings found"
      searchable={searchable}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search bookings..."
    />
  );
};

// Example: Services Table
interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  isActive: boolean;
  createdAt: string;
}

interface ServicesTableProps {
  services: Service[];
  loading?: boolean;
  onRefresh?: () => void;
  onEditService?: (service: Service) => void;
  onToggleStatus?: (service: Service) => void;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const ServicesTable: React.FC<ServicesTableProps> = ({
  services,
  loading,
  onRefresh,
  onEditService,
  onToggleStatus,
  searchable = true,
  searchValue = "",
  onSearchChange,
}) => {
  const columns: TableColumn<Service>[] = [
    {
      key: "name",
      label: "Service Name",
      width: "200px",
    },
    {
      key: "category",
      label: "Category",
      width: "120px",
    },
    {
      key: "price",
      label: "Price",
      width: "80px",
      render: (_, value) => `$${value.toFixed(2)}`,
    },
    {
      key: "duration",
      label: "Duration",
      width: "80px",
      render: (_, value) => `${value} min`,
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
      key: "description",
      label: "Description",
      render: (_, value) => (
        <span className="truncate max-w-xs block" title={value}>
          {value.length > 50 ? `${value.substring(0, 50)}...` : value}
        </span>
      ),
    },
  ];

  const actions: TableAction<Service>[] = [];

  if (onEditService) {
    actions.push({
      label: "Edit",
      onClick: onEditService,
      variant: "primary",
    });
  }

  if (onToggleStatus) {
    // We can't use dynamic labels directly, so we'll use a generic "Toggle" label
    // or create separate actions for each state
    actions.push({
      label: "Toggle Status",
      onClick: onToggleStatus,
      variant: "secondary",
    });
  }

  return (
    <DataTable
      data={services}
      columns={columns}
      actions={actions}
      loading={loading}
      title="Services"
      onRefresh={onRefresh}
      emptyMessage="No services found"
      searchable={searchable}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search services..."
    />
  );
};

export default { BookingsTable, ServicesTable };
