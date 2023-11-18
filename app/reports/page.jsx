"use client";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { useRequireAuth } from "@/utils/hooks/useRequireAuth";

const ReportsPage = () => {
  useRequireAuth("/reports");
  return (
    <MainLayout>
      <div>Reports Page ... under construction</div>
    </MainLayout>
  );
};

export default ReportsPage;
