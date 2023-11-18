// DashboardPage.jsx
"use client";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { useRequireAuth } from "@/utils/hooks/useRequireAuth";

const DashboardPage = () => {
  useRequireAuth("/dashboard");
  return (
    <MainLayout>
      {/* Parent div that fills space of its parent */}
      <div className="flex flex-col h-full ">
        {/* First child div */}
        <div className="flex flex-col items-center justify-center mb-4 bg-white rounded-lg h-3/4">
          <div>Product Stats</div>
        </div>

        {/* Second child div */}
        <div className="flex flex-col items-center justify-center rounded-lg h-1/4">
          {/* Children arranged in a row with the same width */}
          <div className="flex justify-between w-full h-full">
            <div className="flex-1 h-full p-6 mr-2 bg-white rounded-lg">
              Quick Actions
            </div>
            <div className="flex-1 h-full p-6 ml-2 bg-white rounded-lg">
              Product Alerts
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
