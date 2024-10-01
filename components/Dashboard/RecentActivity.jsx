//components/Dashboard/RecentActivity.jsx

import React from "react";
import Card from "./DashboardCard";

/**
 * RecentActivity Component
 *
 * Displays a timeline of recent inventory-related activities.
 *
 * @component
 */
const RecentActivity = () => {
  const activities = [
    {
      action: "Added new product",
      product: "Product X",
      user: "John Doe",
      time: "2 hours ago",
    },
    {
      action: "Updated stock",
      product: "Product Y",
      user: "Jane Smith",
      time: "4 hours ago",
    },
    {
      action: "Price changed",
      product: "Product Z",
      user: "Mike Johnson",
      time: "1 day ago",
    },
    {
      action: "Reorder placed",
      product: "Product A",
      user: "Sarah Brown",
      time: "2 days ago",
    },
  ];

  return (
    <Card title="Recent Activity" className="flex flex-col h-full">
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">
                {activity.action}: {activity.product}
              </p>
              <p className="text-sm text-gray-500">by {activity.user}</p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RecentActivity;
