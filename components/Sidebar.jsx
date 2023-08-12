import Image from "next/image";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-white border-r w-72 SideBar">
      <div className="flex items-center justify-start h-20 pl-8 LogoSection">
        <Image
          src="/images/Logo.png"
          alt="InvenTrack Logo"
          width={50}
          height={50}
        />
        <div className="ml-2 text-xl font-semibold leading-loose text-blue-600 ">
          InvenTrack
        </div>
      </div>
      <div className="items-center flex-grow pt-10 pl-12 space-y-10 overflow-y-auto h-80">
        <div className="flex flex-row space-x-3">
          <Image
            src="/images/home.png"
            alt="Home picture"
            width={20}
            height={20}
          />
          <div>Dashboard</div>
        </div>
        <div className="flex flex-row space-x-3">
          <Image
            src="/images/inventory.png"
            alt="Inventory picture"
            width={20}
            height={20}
          />
          <div>Inventory</div>
        </div>
        <div className="flex flex-row space-x-3">
          <Image
            src="/images/supplier.png"
            alt="Sales picture"
            width={20}
            height={20}
          />
          <div>Suppliers</div>
        </div>
        <div className="flex flex-row space-x-3">
          <Image
            src="/images/orders.png"
            alt="Orders picture"
            width={20}
            height={20}
          />
          <div>Orders</div>
        </div>
        <div className="flex flex-row space-x-3">
          <Image
            src="/images/reports.png"
            alt="Reports picture"
            width={20}
            height={20}
          />
          <div>Reports</div>
        </div>
      </div>
      <div className="flex flex-row pb-5 pl-12 ">
        <Image
          src="/images/logout.png"
          alt="Logout picture"
          width={20}
          height={20}
        />
        <div className="ml-2">Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
