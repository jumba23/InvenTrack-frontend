"use client";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { useRequireAuth } from "@/utils/hooks/useRequireAuth";

const DashboardPage = () => {
  useRequireAuth("/");
  return (
    <MainLayout>
      <div>Dashboard Page ... under construction</div>
    </MainLayout>
  );
};

export default DashboardPage;
