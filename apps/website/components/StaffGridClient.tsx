"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@home-service/lib";
import { fetchStaffRequest } from "@home-service/lib";
import { StaffCard } from "@ui";

export default function StaffGridClient() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((s) => s.staff);

  useEffect(() => {
    dispatch(fetchStaffRequest({ page: 1, limit: 12 }));
  }, [dispatch]);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Available Staff</h2>
      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {users.map((u) => (
          <StaffCard key={u.id} user={u} />
        ))}
      </div>
      {users.length === 0 && !loading && (
        <p className="mt-2 text-sm text-gray-500">No staff available.</p>
      )}
    </div>
  );
}
