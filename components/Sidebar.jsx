sidebar: "use client";

import Image from "next/image";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";
import { useAuth } from "@/context/AuthContext";

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const { toggleLogoutModal } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isCurrentRoute = (path) => pathname === path;

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "/images/home.png" },
    { label: "Inventory", path: "/inventory", icon: "/images/inventory.png" },
    { label: "Suppliers", path: "/suppliers", icon: "/images/supplier.png" },
    { label: "Orders", path: "/orders", icon: "/images/orders.png" },
    { label: "Reports", path: "/reports", icon: "/images/reports.png" },
  ];

  const sidebarContent = (
    <>
      {isMobile && (
        <div className="flex items-center h-20 px-4 border-b">
          <Image
            src="/images/logo.png"
            alt="InvenTrack Logo"
            width={38}
            height={38}
            className="mr-2"
          />
          <span className="text-xl font-semibold text-blue-600">
            InvenTrack
          </span>
        </div>
      )}

      {/* Navigation items */}
      <nav className="flex-grow py-6 overflow-y-auto">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={classNames(
              "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors",
              {
                "bg-blue-50 text-blue-600": isCurrentRoute(item.path),
              }
            )}
            onClick={(e) => {
              e.preventDefault();
              router.push(item.path);
              if (isMobile) onClose();
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
        onClick={() => {
          toggleLogoutModal();
          if (isMobile) onClose();
        }}
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
    </>
  );

  return (
    <>
      {!isMobile && (
        <aside className="hidden bg-white shadow-md md:flex md:flex-col md:w-64 md:h-screen">
          {sidebarContent}
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
            className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
