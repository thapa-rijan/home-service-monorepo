# Reusable Table Components

This package provides a flexible and reusable table system that can be used across different pages and data types.

## Components

### 1. DataTable (Generic Component)

The `DataTable` is a generic, highly customizable table component that can work with any data type.

#### Props

```typescript
interface DataTableProps<T> {
  data: T[]; // Array of data to display
  columns: TableColumn<T>[]; // Column configuration
  loading?: boolean; // Loading state
  title?: string; // Table title
  actions?: TableAction<T>[]; // Row actions
  onRefresh?: () => void; // Refresh handler
  emptyMessage?: string; // Message when no data
  className?: string; // Additional CSS classes
  headerActions?: React.ReactNode; // Custom header actions
  searchable?: boolean; // Enable search
  searchValue?: string; // Search input value
  onSearchChange?: (value: string) => void; // Search change handler
  searchPlaceholder?: string; // Search placeholder text
}
```

#### Column Configuration

```typescript
interface TableColumn<T> {
  key: string; // Data property key (supports nested: "user.name")
  label: string; // Column header label
  render?: (item: T, value: any) => React.ReactNode; // Custom render function
  sortable?: boolean; // Enable sorting (future feature)
  width?: string; // Column width
}
```

#### Action Configuration

```typescript
interface TableAction<T> {
  label: string; // Action button text
  onClick: (item: T) => void; // Click handler
  variant?: "primary" | "secondary" | "danger"; // Button style
  disabled?: (item: T) => boolean; // Dynamic disable function
}
```

### 2. StaffTable (Specialized Component)

Pre-configured table for displaying staff/user data with common columns and actions.

#### Props

```typescript
interface Props {
  users: User[]; // Array of users
  loading?: boolean; // Loading state
  onRefresh?: () => void; // Refresh handler
  onEditUser?: (user: User) => void; // Edit action
  onDeleteUser?: (user: User) => void; // Delete action
  onViewUser?: (user: User) => void; // View action
  searchable?: boolean; // Enable search
  searchValue?: string; // Search value
  onSearchChange?: (value: string) => void; // Search handler
}
```

## Usage Examples

### Basic Usage with Generic DataTable

```typescript
import { DataTable, TableColumn } from "@home-service/ui";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: TableColumn<Product>[] = [
    { key: "name", label: "Product Name" },
    { key: "category", label: "Category" },
    {
      key: "price",
      label: "Price",
      render: (_, value) => `$${value.toFixed(2)}`,
    },
    {
      key: "inStock",
      label: "Status",
      render: (_, value) => (
        <span className={value ? "text-green-600" : "text-red-600"}>
          {value ? "In Stock" : "Out of Stock"}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      data={products}
      columns={columns}
      loading={loading}
      title="Products"
      emptyMessage="No products found"
      searchable
    />
  );
};
```

### Using Staff Table

```typescript
import { StaffTable } from "@home-service/ui";

const StaffPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEditUser = (user: User) => {
    // Navigate to edit page or open modal
    console.log("Edit user:", user.id);
  };

  const handleDeleteUser = (user: User) => {
    // Show confirmation and delete
    console.log("Delete user:", user.id);
  };

  return (
    <StaffTable
      users={users}
      loading={loading}
      onRefresh={fetchUsers}
      onEditUser={handleEditUser}
      onDeleteUser={handleDeleteUser}
      searchable
    />
  );
};
```

### Advanced Usage with Custom Actions

```typescript
import { DataTable, TableColumn, TableAction } from "@home-service/ui";

const OrdersTable = () => {
  const columns: TableColumn<Order>[] = [
    { key: "orderNumber", label: "Order #" },
    { key: "customer.name", label: "Customer" }, // Nested property
    {
      key: "status",
      label: "Status",
      render: (order, status) => <StatusBadge status={status} />,
    },
    {
      key: "total",
      label: "Total",
      render: (_, value) => formatCurrency(value),
    },
  ];

  const actions: TableAction<Order>[] = [
    {
      label: "View",
      onClick: (order) => navigate(`/orders/${order.id}`),
      variant: "secondary",
    },
    {
      label: "Process",
      onClick: processOrder,
      variant: "primary",
      disabled: (order) => order.status !== "pending",
    },
    {
      label: "Cancel",
      onClick: cancelOrder,
      variant: "danger",
      disabled: (order) => order.status === "completed",
    },
  ];

  const headerActions = (
    <div className="flex gap-2">
      <button className="btn-primary">Export</button>
      <button className="btn-secondary">Import</button>
    </div>
  );

  return (
    <DataTable
      data={orders}
      columns={columns}
      actions={actions}
      title="Orders"
      headerActions={headerActions}
      searchable
      searchPlaceholder="Search orders..."
    />
  );
};
```

## Features

✅ **Generic Design**: Works with any data type  
✅ **Type Safe**: Full TypeScript support  
✅ **Customizable Columns**: Custom render functions, nested properties  
✅ **Row Actions**: Configurable action buttons per row  
✅ **Search**: Built-in search functionality  
✅ **Loading States**: Proper loading indicators  
✅ **Empty States**: Customizable empty messages  
✅ **Responsive**: Mobile-friendly design  
✅ **Accessible**: Proper ARIA labels and keyboard navigation

## Styling

The components use Tailwind CSS classes and follow a consistent design system. You can customize the appearance by:

1. **CSS Classes**: Pass custom `className` prop
2. **Theme Variables**: Override Tailwind theme colors
3. **Custom Renders**: Use column `render` functions for complete control

## Best Practices

1. **Column Keys**: Use descriptive keys that match your data structure
2. **Custom Renders**: Use render functions for formatted data (dates, currency, status)
3. **Actions**: Keep action labels short and descriptive
4. **Loading States**: Always provide loading feedback for async operations
5. **Search**: Enable search for tables with more than 10 rows
6. **Empty States**: Provide helpful messages when no data is available

## Migration from Old Components

To migrate from the old StaffTable:

```typescript
// Before
<StaffTable users={users} loading={loading} onRefresh={refresh} />

// After (same API, more features)
<StaffTable
  users={users}
  loading={loading}
  onRefresh={refresh}
  onEditUser={handleEdit}     // New optional prop
  onDeleteUser={handleDelete} // New optional prop
  searchable                  // New optional prop
/>
```
