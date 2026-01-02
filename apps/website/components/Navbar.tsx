"use client";

import Link from "next/link";
import { Button } from "@ui";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-6 z-50 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto w-[90%] rounded-2xl bg-transparent px-4 py-3 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-bold text-white">
              HomeService
            </Link>

            <ul className="hidden gap-6 text-sm text-white/90 md:flex">
              <li>
                <Link href="#services" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-white/90 hover:underline"
              >
                Sign in
              </Link>
              <Button className="bg-white text-black rounded-md shadow-sm hover:shadow">
                Book a Service
              </Button>
            </div>

            {/* mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* mobile off-canvas menu (left side) */}
        <div className="md:hidden">
          {/* backdrop */}
          <div
            className={`fixed inset-0 bg-black/40 transition-opacity ${
              open
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setOpen(false)}
            aria-hidden={!open}
          />

          {/* side panel */}
          <aside
            id="mobile-menu"
            className={`fixed top-0 left-0 h-full w-11/12 max-w-xs bg-white p-6 transform transition-transform duration-300 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
            aria-hidden={!open}
            role="dialog"
            aria-label="Main mobile menu"
          >
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="text-lg font-bold text-gray-900">
                HomeService
              </Link>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-gray-900">
              <Link
                href="#services"
                onClick={() => setOpen(false)}
                className="text-lg font-medium"
              >
                Services
              </Link>
              <Link
                href="#about"
                onClick={() => setOpen(false)}
                className="text-lg font-medium"
              >
                About
              </Link>
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="text-lg font-medium"
              >
                Contact
              </Link>
            </nav>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-gray-700"
              >
                Sign in
              </Link>
              <Button className="w-full mt-3 bg-black text-white">
                Book a Service
              </Button>
            </div>
          </aside>
        </div>
      </nav>
    </header>
  );
}
