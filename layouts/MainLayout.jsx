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
 * - Horizontal flex container layout
 * - Header component with navigation links and user information
 * - Sidebar component for navigation across application sections
 * - Main content area for dynamic rendering of child components
 * - Footer component with additional links or information
 *
 *
 * * Structure:
 * - Header: Top navigation bar with logo, search bar, and user account settings
 * - Sidebar: Responsive navigation menu with dynamic route highlighting
 * - Main Content: Dynamic content area for rendering child components
 * - Footer: Bottom section with additional links or information
 * - Logout Modal: Modal for user logout functionality
 * - Responsive Design: Adapts to both desktop and mobile views
 * - Client-Side Navigation: Utilizes Next.js Link for optimized client-side navigation
 * - Dynamic Rendering: Supports dynamic rendering of child components
 * - Logout Modal: Provides a modal for user logout functionality
 * - Responsive Design: Adapts to both desktop and mobile views
 * - Client-Side Navigation: Utilizes Next.js Link for optimized client-side navigation
 *  *
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
