"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "@/components/MainPageComponents/Header";
import Sidebar from "@/components/MainPageComponents/Sidebar";
import Footer from "@/components/MainPageComponents/Footer";
import dynamic from "next/dynamic";
import { memo } from "react";

const LogoutModal = dynamic(() => import("@/components/Modals/LogoutModal"), {
  ssr: false,
});
/**
 * MainLayout Component
 *
 * This component serves as the primary layout for authenticated users in the InvenTrack application.
 * It provides a responsive design that adapts to both desktop and mobile views.
 *
 * Features:
 * - Responsive sidebar that transforms into a drawer on mobile devices
 * - Header with a toggle button for the mobile sidebar
 * - Main content area that adjusts based on the sidebar state
 * - Footer that stays at the bottom of the page
 *
 * * Structure:
 * - The layout is organized as a horizontal flex container to accommodate the sidebar and the main content area side by side.
 * - The Header component is displayed at the top of the layout, providing navigation links, application branding,
 *   and user-related information or actions.
 * - The Sidebar component is placed on the left side, offering navigation across the different sections or features
 *   of the application.
 * - The main content area is dynamically filled with the `children` prop, allowing different pages or components
 *   to be rendered within this layout framework.
 * - The Footer component is displayed at the bottom of the layout, possibly containing copyright information,
 *   links to privacy policy, terms of use, or other resources.
 * - A LogoutModal is conditionally rendered based on the `showLogoutModal` state from the AuthContext. This modal
 *   can be triggered by user actions to confirm logout intentions.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The main content to be rendered within the layout
 */
const MainLayout = ({ children }) => {
  const { showLogoutModal } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleResize = useCallback(() => {
    const mobileCheck = window.innerWidth < 768;
    if (mobileCheck !== isMobile) {
      setIsMobile(mobileCheck);
    }
  }, [isMobile]);

  useEffect(() => {
    handleResize();
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [handleResize]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <>
      {showLogoutModal && <LogoutModal />}
      <div className="flex flex-col h-screen overflow-hidden">
        <MemoizedHeader toggleSidebar={toggleSidebar} isMobile={isMobile} />
        <div className="flex flex-1 overflow-hidden">
          <MemoizedSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            isMobile={isMobile}
          />
          <main
            className={`flex-1 w-full ${
              isMobile ? "overflow-auto" : "overflow-hidden"
            } bg-gray-100`}
            style={{ height: "calc(100vh - 5rem - 1.5rem)" }}
          >
            <div className="h-full px-4 py-4 overflow-auto">{children}</div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;

const MemoizedHeader = memo(Header, (prevProps, nextProps) => {
  return prevProps.isMobile === nextProps.isMobile;
});

const MemoizedSidebar = memo(Sidebar, (prevProps, nextProps) => {
  return (
    prevProps.isMobile === nextProps.isMobile &&
    prevProps.isOpen === nextProps.isOpen
  );
});
