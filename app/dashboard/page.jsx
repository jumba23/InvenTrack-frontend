//app/dashboard/page.jsx

"use client";

import KPIGrid from "@/components/Dashboard/KPIGrid";
import InventoryOverview from "@/components/Dashboard/InventoryOverview";
import QuickActions from "@/components/Dashboard/QuickActions";
import ProductAlerts from "@/components/Dashboard/ProductAlerts";
import RecentActivity from "@/components/Dashboard/RecentActivity";
import { useEffect } from "react";
import { useState } from "react";

/**
 * DashboardPage Component
 *
 * This component serves as the main dashboard for the inventory tracking application.
 * It displays various sections with key information and actions for inventory management.
 * The layout is optimized for both mobile and desktop views, ensuring equal height rows
 * and consistent card sizes.
 *
 * @component
 */
const DashboardPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`grid h-full gap-4 ${
        isMobile
          ? "grid-cols-1 overflow-auto"
          : "grid-cols-6 grid-rows-2 overflow-hidden"
      }`}
    >
      <div className={`${isMobile ? "" : "col-span-3 row-span-1"}`}>
        <KPIGrid />
      </div>
      <div
        className={`flex flex-row gap-4 ${
          isMobile ? "flex-col" : "flex-row col-span-3 row-span-1"
        }`}
      >
        <div className="flex-2">
          <ProductAlerts />
        </div>
        <div className="flex-1">
          <QuickActions />
        </div>
      </div>
      <div className={`${isMobile ? "" : "col-span-4 row-span-1"}`}>
        <InventoryOverview />
      </div>
      <div className={`${isMobile ? "" : "col-span-2 row-span-1"}`}>
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardPage;
