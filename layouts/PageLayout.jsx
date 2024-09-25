// @/layouts/PageLayout.jsx

import React from "react";
import MainLayout from "@/layouts/MainLayout";

/**
 * PageLayout Component
 *
 * This component serves as a general layout wrapper for pages that require
 * the MainLayout structure with a full-height, overflow-hidden content area.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be rendered inside the layout
 */
const PageLayout = ({ children }) => {
  return (
    <MainLayout>
      <div className="h-full overflow-hidden">{children}</div>
    </MainLayout>
  );
};

export default PageLayout;
