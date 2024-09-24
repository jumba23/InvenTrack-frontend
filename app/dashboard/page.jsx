// DashboardPage.jsx
"use client";
import KPIGrid from "@/components/Dashboard/KPIGrid";
import InventoryOverview from "@/components/Dashboard/InventoryOverview";
import QuickActions from "@/components/Dashboard/QuickActions";
import ProductAlerts from "@/components/Dashboard/ProductAlerts";
import RecentActivity from "@/components/Dashboard/RecentActivity";

/**
 * DashboardPage Component
 *
 * This component serves as the main dashboard for the inventory tracking application.
 * It displays various sections with key information and actions for inventory management.
 *
 * @component
 */
const DashboardPage = () => {
  return (
    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <KPIGrid />
      </div>
      <div className="flex flex-col gap-4 lg:col-span-1">
        <QuickActions />
        <ProductAlerts />
      </div>
      <div className="lg:col-span-2">
        <InventoryOverview />
      </div>
      <div className="lg:col-span-1">
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardPage;
