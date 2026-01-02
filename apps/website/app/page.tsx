import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { Button } from "@ui";
import { ServiceType } from "@shared";
import StaffGridClient from "../components/StaffGridClient";

export default function Home() {
  const serviceType: ServiceType = "cleaning";

  return (
    <div className="relative min-h-screen bg-slate-50">
      <Navbar />

      <Hero />

      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        <section className="mt-12 w-full">
          {/* Client grid to fetch and show staff cards */}
          <StaffGridClient />
        </section>
      </main>
    </div>
  );
}
