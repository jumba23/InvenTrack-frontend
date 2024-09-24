"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import LogoutModal from "@/components/Modals/LogoutModal";

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {showLogoutModal && <LogoutModal />}
      <div className="flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} isMobile={isMobile} />
        <div className="flex flex-1 overflow-hidden">
          {!isMobile && (
            <div className="flex-shrink-0">
              <Sidebar isOpen={true} onClose={() => {}} isMobile={false} />
            </div>
          )}
          <main className="flex-1 w-full overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="px-6 py-3 mx-auto md:py-8">{children}</div>
          </main>
        </div>
        <Footer />
      </div>
      {isMobile && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isMobile={true}
        />
      )}
    </>
  );
};

export default MainLayout;
