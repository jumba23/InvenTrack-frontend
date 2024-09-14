"use client";

/**
 * Sidebar Component
 *
 * ======================================== SUMMARY ========================================
 * **Purpose:**
 * The Sidebar component serves as the primary navigation menu for authenticated users in the InvenTrack application. It provides quick access to the main sections of the app, including Dashboard, Inventory, Suppliers, Orders, and Reports, and includes branding and logout functionality.

 * **Functionality:**
 * - **Navigation:**
 *   - Uses Next.js `useRouter` and `usePathname` hooks for client-side navigation and to determine the current active route.
 *   - Implements dynamic styling to highlight the active navigation item.
 * - **Logout:**
 *   - Includes a logout button that triggers a logout confirmation modal via the `toggleLogoutModal` function from `AuthContext`.
 * - **Branding:**
 *   - Displays the application logo and name at the top of the sidebar.
 * - **Responsive Design:**
 *   - Designed to occupy full height and adjust gracefully to different screen sizes.
 *
 * **Styling:**
 * - Utilizes Tailwind CSS classes for layout and styling.
 * - Applies hover effects and active state styles for enhanced user experience.
 *
 * **Components & Libraries Used:**
 * - `next/image` for optimized image loading.
 * - `next/navigation` hooks for client-side navigation without full page reloads.
 * - `classnames` library to conditionally apply CSS classes.
 * - `AuthContext` for authentication-related actions.
 *
 * **Key Next.js Features:**
 * - **App Router and Client Components:**
 *   - The `"use client"` directive indicates that this component is a client-side component in the Next.js App Router.
 * - **Dynamic Routing:**
 *   - Uses `useRouter` and `usePathname` from Next.js 14 for navigation and route management.
 *
 * **Accessibility:**
 * - Provides descriptive `alt` text for images.
 * - Uses semantic HTML elements like `<nav>` and `<aside>` for better accessibility.
 *
 * **Usage:**
 * - Typically included in the main application layout (`MainLayout`) to provide consistent navigation across authenticated pages.
 *
 * ===========================================================================================
 */

import Image from "next/image"; // Next.js optimized Image component
import React from "react";
import { useRouter, usePathname } from "next/navigation"; // Hooks for client-side navigation
import classNames from "classnames"; // Utility for conditionally joining class names
import { useAuth } from "@/context/AuthContext"; // Custom hook for authentication context

// Sidebar component definition
const Sidebar = () => {
  // Extract the toggleLogoutModal function from AuthContext
  const { toggleLogoutModal } = useAuth();

  // Get the router instance for navigation
  const router = useRouter();

  // Get the current pathname to determine the active link
  const pathname = usePathname();

  // Helper function to check if a path matches the current route
  const isCurrentRoute = (path) => pathname === path;

  // Define the navigation items with labels, paths, and icons
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "/images/home.png" },
    { label: "Inventory", path: "/inventory", icon: "/images/inventory.png" },
    { label: "Suppliers", path: "/suppliers", icon: "/images/supplier.png" },
    { label: "Orders", path: "/orders", icon: "/images/orders.png" },
    { label: "Reports", path: "/reports", icon: "/images/reports.png" },
  ];

  return (
    // Sidebar container
    <aside className="flex flex-col w-64 h-screen bg-white shadow-md">
      {/* Logo and branding */}
      <div className="flex items-center h-20 px-4 border-b">
        <Image
          src="/images/logo.png"
          alt="InvenTrack Logo"
          width={38}
          height={38}
          className="mr-2"
        />
        <span className="text-xl font-semibold text-blue-600">InvenTrack</span>
      </div>

      {/* Navigation items */}
      <nav className="flex-grow py-6 overflow-y-auto">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={classNames(
              "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors",
              {
                // Apply active styles if the item path matches the current route
                "bg-blue-50 text-blue-600": isCurrentRoute(item.path),
              }
            )}
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              router.push(item.path); // Navigate to the clicked path
            }}
          >
            <Image
              src={item.icon}
              alt={`${item.label} icon`}
              width={25}
              height={25}
              className="mr-3"
            />
            <span className="font-medium text-m">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Logout button */}
      <button
        onClick={toggleLogoutModal}
        className="flex items-center px-4 py-3 mb-6 font-medium text-gray-700 transition-colors text-m hover:bg-gray-100"
      >
        <Image
          src="/images/logout.png"
          alt="Logout icon"
          width={25}
          height={25}
          className="mr-3"
        />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
