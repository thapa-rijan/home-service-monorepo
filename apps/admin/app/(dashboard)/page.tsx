export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500">Welcome to your admin dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight text-gray-700">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-gray-900">1,234</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight text-gray-700">
              Active Services
            </h3>
            <p className="text-3xl font-bold text-gray-900">42</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight text-gray-700">
              Revenue
            </h3>
            <p className="text-3xl font-bold text-gray-900">$12,345</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight text-gray-700">
              Pending Requests
            </h3>
            <p className="text-3xl font-bold text-gray-900">8</p>
          </div>
        </div>
      </div>
    </div>
  );
}
