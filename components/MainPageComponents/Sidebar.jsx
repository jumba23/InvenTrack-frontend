// components/MainPageComponents/Sidebar.jsx
"use client";

/**
 * Sidebar Component
 *
 * A responsive sidebar navigation component that adapts between desktop and mobile views.
 * Implements Next.js Link component for optimized client-side navigation without full page reloads.
 *
 * Features:
 * - Responsive design with mobile drawer functionality
 * - Client-side navigation using Next.js Link
 * - Dynamic route highlighting
 * - Smooth transitions and animations
 * - Integrated logout functionality
 */

import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "/images/home.png" },
  { label: "Inventory", path: "/inventory", icon: "/images/inventory.png" },
  { label: "Suppliers", path: "/suppliers", icon: "/images/supplier.png" },
  { label: "Orders", path: "/orders", icon: "/images/orders.png" },
  { label: "Reports", path: "/reports", icon: "/images/reports.png" },
];

const Sidebar = memo(({ isOpen, onClose, isMobile }) => {
  const { toggleLogoutModal } = useAuth();
  const pathname = usePathname();

  const mainSidebarContent = (
    <>
      {isMobile && (
        <div className="flex items-center h-20 px-6 border-b">
          <Image
            src="/images/logo.png"
            alt="InvenTrack Logo"
            width={38}
            height={38}
            style={{ width: "auto", height: "auto" }}
            className="mr-2"
          />
          <span className="text-xl font-semibold text-blue-600">
            InvenTrack
          </span>
        </div>
      )}

      {/* Navigation items using Next.js Link for client-side navigation */}
      <nav className="flex-grow py-6 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={classNames(
              "flex items-center px-8 py-4 text-gray-700 hover:bg-gray-100 transition-colors",
              { "bg-gray-100": pathname === item.path }
            )}
            onClick={isMobile ? onClose : undefined}
          >
            <Image
              src={item.icon}
              alt={`${item.label} icon`}
              width={25}
              height={25}
              className="mr-3"
            />
            <span className="font-medium text-m">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );

  const logoutButton = (
    <button
      onClick={() => {
        toggleLogoutModal();
        if (isMobile) onClose();
      }}
      className="flex items-center w-full px-8 py-4 font-medium text-gray-700 transition-colors text-m hover:bg-gray-100"
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
  );

  return (
    <>
      {!isMobile && (
        <aside className="flex flex-col w-64 bg-white shadow-md">
          {mainSidebarContent}
          {logoutButton}
        </aside>
      )}

      {isMobile && (
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-40 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
        >
          <aside
            className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md transform transition-transform duration-300 ease-in-out flex flex-col ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex-grow overflow-y-auto">
              {mainSidebarContent}
            </div>
            {logoutButton}
          </aside>
        </div>
      )}
    </>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
