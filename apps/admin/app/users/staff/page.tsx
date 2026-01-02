import StaffListClient from "./StaffListClient";

export default function StaffUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Staff Users
        </h1>
        <p className="text-gray-500">Manage staff member accounts</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {/* Client component handles fetching and table display */}
        <StaffListClient />
      </div>
    </div>
  );
}
