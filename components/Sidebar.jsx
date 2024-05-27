"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const { toggleLogoutModal } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Function to check if the current route is the same as the path
  const isCurrentRoute = (path) => pathname === path;

  // Sidebar navigation items
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "/images/home.png" },
    { label: "Inventory", path: "/inventory", icon: "/images/inventory.png" },
    { label: "Suppliers", path: "/suppliers", icon: "/images/supplier.png" },
    { label: "Orders", path: "/orders", icon: "/images/orders.png" },
    { label: "Reports", path: "/reports", icon: "/images/reports.png" },
  ];

  // Function to handle logout modal
  const handleOpenLogoutModal = () => {
    toggleLogoutModal();
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-white border-r w-72 ">
        <div className="flex items-center justify-start h-24 pl-8 ">
          <Image
            src="/images/Logo.png"
            alt="InvenTrack Logo"
            width={60}
            height={60}
            style={{ width: "auto", height: "auto" }}
          />
          <div className="ml-2 text-2xl font-semibold leading-loose text-blue-600 ">
            InvenTrack
          </div>
        </div>
        <div className="items-center flex-grow pt-10 pl-12 space-y-10 overflow-y-auto text-xl h-80">
          {navItems.map((item, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  "flex flex-row space-x-3 cursor-pointer hover:text-blue-500",
                  {
                    "text-blue-600 underline": isCurrentRoute(item.path),
                  }
                )}
                onClick={() => router.push(item.path)}
              >
                <Image
                  src={item.icon}
                  alt={`${item.label} picture`}
                  width={20}
                  height={20}
                />
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-row pb-8 pl-12 text-xl cursor-pointer hover:text-blue-500">
          <Image
            src="/images/logout.png"
            alt="Logout picture"
            width={20}
            height={20}
          />
          <div className="ml-2" onClick={handleOpenLogoutModal}>
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
