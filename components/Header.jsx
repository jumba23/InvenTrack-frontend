"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IconButton, Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountMenu from "@/components/AccountSettings/AccountMenu";
import { useProfile } from "@/utils/hooks/useProfile";

const Header = ({ toggleSidebar, isMobile }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { profile } = useProfile();
  const storeName = profile?.store_name || "My Store";

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    setShowSearch(false);
  };

  const renderLogo = () => (
    <div className="flex items-center ">
      <Image
        src="/images/logo.png"
        alt="InvenTrack Logo"
        width={isMobile ? 58 : 38}
        height={isMobile ? 58 : 38}
        className="mr-2"
      />
      {!isMobile && (
        <span className="text-xl font-semibold text-blue-600">InvenTrack</span>
      )}
    </div>
  );

  const renderSearchBar = () => (
    <div className="relative flex-grow max-w-xl mr-2">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="absolute top-0 right-0 mt-1 mr-2"
      >
        <SearchIcon className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );

  const renderMobileSearch = () => (
    <>
      <IconButton color="inherit" onClick={() => setShowSearch(!showSearch)}>
        <SearchIcon />
      </IconButton>
      {showSearch && (
        <div className="absolute left-0 right-0 p-2 bg-white top-full">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-3 py-1 text-white bg-blue-500 rounded-r-full"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );

  const renderRightSection = () => (
    <div className="flex items-center">
      <IconButton color="inherit" className="mr-4">
        <Badge badgeContent={3} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <div
        className={`font-semibold text-gray-900 whitespace-nowrap ${
          isMobile ? "text-sm" : "text-base"
        }`}
      >
        {storeName}
      </div>
      <AccountMenu />
    </div>
  );

  return (
    <header className="bg-white border-2">
      <div className={`container mx-auto py-2 ${isMobile ? "px-3" : "px-6"}`}>
        <div className="flex items-center justify-between">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="mr-2 text-gray-500 hover:text-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          )}

          {renderLogo()}
          {!isMobile && renderSearchBar()}
          {isMobile && renderMobileSearch()}
          {renderRightSection()}
        </div>
      </div>
    </header>
  );
};

export default Header;
