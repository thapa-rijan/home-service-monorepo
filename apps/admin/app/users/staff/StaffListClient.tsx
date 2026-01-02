"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@home-service/lib";
import { fetchStaffRequest } from "@home-service/lib";
import { StaffTable } from "@ui";

export default function StaffListClient() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((s) => s.staff);

  useEffect(() => {
    dispatch(fetchStaffRequest({ page: 1, limit: 50 }));
  }, [dispatch]);

  return (
    <div>
      <StaffTable
        users={users}
        loading={loading}
        onRefresh={() => dispatch(fetchStaffRequest({ page: 1, limit: 50 }))}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
