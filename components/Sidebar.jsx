"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { logoutModal as Modal } from "./Modals/logoutModal";
import { userLogout } from "@/utils/api/apiService";
import classNames from "classnames";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
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

  const handleLogout = async (shouldLogout) => {
    setShowModal(false);
    if (shouldLogout) {
      try {
        await userLogout();

        router.push("/");
      } catch (error) {
        console.error("Failed to logout:", error);
      }
    }
  };

  // Function to show the modal
  const triggerModal = () => {
    setShowModal(true);
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
                  width={30}
                  height={30}
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
            width={30}
            height={30}
          />
          <div className="ml-2" onClick={triggerModal}>
            Logout
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={handleLogout} />
    </>
  );
};

export default Sidebar;
