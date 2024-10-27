// components/UI/LoadingSkeleton.jsx
import { memo } from "react";

/**
 * Generic Loading Skeleton
 * Provides a consistent loading experience across the application
 */
export const LoadingSkeleton = memo(() => {
  return (
    <div className="animate-pulse">
      <div className="h-20 mb-4 bg-gray-200 rounded-md" />
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-3/4 h-4 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
});

LoadingSkeleton.displayName = "LoadingSkeleton";
