"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutModal as Modal } from "./Modals/logoutModal";
import { userLogout } from "@/utils/api/apiService";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleLogout = async (shouldLogout) => {
    setShowModal(false);
    if (shouldLogout) {
      try {
        await userLogout();

        localStorage.removeItem("token");
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
          <div className="flex flex-row space-x-3 cursor-pointer hover:text-blue-500">
            <Image
              src="/images/home.png"
              alt="Home picture"
              width={30}
              height={30}
            />
            <div>Dashboard</div>
          </div>
          <div className="flex flex-row space-x-3 text-blue-600 underline cursor-pointer hover:text-blue-500">
            <Image
              src="/images/inventory.png"
              alt="Inventory picture"
              width={30}
              height={30}
            />
            <div>Inventory</div>
          </div>
          <div className="flex flex-row space-x-3 cursor-pointer hover:text-blue-500">
            <Image
              src="/images/supplier.png"
              alt="Sales picture"
              width={30}
              height={30}
            />
            <div>Suppliers</div>
          </div>
          <div className="flex flex-row space-x-3 cursor-pointer hover:text-blue-500">
            <Image
              src="/images/orders.png"
              alt="Orders picture"
              width={30}
              height={30}
            />
            <div>Orders</div>
          </div>
          <div className="flex flex-row space-x-3 cursor-pointer hover:text-blue-500">
            <Image
              src="/images/reports.png"
              alt="Reports picture"
              width={30}
              height={30}
            />
            <div>Reports</div>
          </div>
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
