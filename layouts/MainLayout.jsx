import React from "react";
import { useAuth } from "../context/AuthContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { LogoutModal } from "@/components/Modals/LogoutModal";

/** ======================================== SUMMARY ========================================
 * MainLayout serves as the primary layout component for authenticated users.
 * It structures the main user interface of the application, including a header, sidebar, main content area, and footer.
 * This layout is displayed once a user is authenticated, providing access to the application's core features and content.
 *
 * Structure:
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
 * Usage:
 * - This component should wrap the main content of authenticated sections of the application. When defining
 *   routes or pages that require user authentication, wrap the content with MainLayout to ensure consistency
 *   in appearance and functionality across the user's session.
 * - The `children` prop allows for flexibility in rendering different components or pages within this unified layout,
 *   facilitating a cohesive user experience.
 * ==========================================================================================*/

const MainLayout = ({ children }) => {
  const { showLogoutModal } = useAuth();
  return (
    <>
      {showLogoutModal && <LogoutModal />}
      <div className="flex flex-row h-screen">
        <Sidebar />
        <div className="flex flex-col w-full h-full">
          <Header />
          <div className="flex-grow overflow-auto PageContent">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
