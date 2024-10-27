import { memo } from "react";

/**
 * Dashboard-specific Loading Skeleton
 * Mimics the layout of dashboard components
 */
export const DashboardSkeleton = memo(() => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="p-4 border rounded-lg shadow animate-pulse">
          <div className="h-8 mb-4 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="w-2/3 h-4 bg-gray-200 rounded" />
            <div className="w-1/2 h-4 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
});

DashboardSkeleton.displayName = "DashboardSkeleton";
