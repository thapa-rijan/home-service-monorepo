import { Button } from "@ui";
import { ServiceType } from "@shared";

export default function AdminDashboard() {
  const serviceTypes: ServiceType[] = ["cleaning", "plumbing", "electrical"];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-xl mb-2">Service Types:</h2>
        <ul className="list-disc pl-6">
          {serviceTypes.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </div>
      <Button>Manage Services</Button>
    </main>
  );
}
