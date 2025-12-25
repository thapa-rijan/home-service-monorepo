import { Button } from "@ui";
import { ServiceType } from "@shared";

export default function Home() {
  const serviceType: ServiceType = "cleaning";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Home Service Website</h1>
      <p className="mb-4">Service Type: {serviceType}</p>
      <Button>Book a Service</Button>
    </main>
  );
}
