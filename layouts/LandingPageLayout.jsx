//layouts/LandingPageLayout.jsx

import React from "react";
import Footer from "@/components/MainPageComponents/Footer";
import LandingHeader from "@/components/LandingPageComponents/LandingHeader";
import LandingMain from "@/components/LandingPageComponents/LandingMain";

/**
 * LandingPageLayout Component
 *
 * Purpose:
 * Structures the layout of the landing page for non-authenticated users, providing a
 * responsive and welcoming interface across various device sizes.
 *
 * @component
 *
 * Structure:
 * - Uses a flex column layout to vertically stack components
 * - Implements responsive design for mobile compatibility
 *
 * Components:
 * - LandingHeader: Top section with navigation and branding
 * - LandingMain: Primary content area with promotional material
 * - Footer: Bottom section with additional links and information
 *
 * Responsiveness:
 * - Uses min-height instead of fixed height for better mobile layout
 * - Adjusts spacing and sizing for different screen sizes
 *
 * Usage:
 * Render this component for the initial view of non-authenticated users.
 * It's typically used in the application's root or index page.
 *
 * @example
 * <LandingPageLayout />
 *
 * Performance Note:
 * Consider lazy loading LandingMain content if it contains heavy media elements.
 */
const LandingPageLayout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <LandingHeader className="py-4 md:py-6" />
      <LandingMain className="flex-grow py-8 md:py-12" />
      <Footer className="py-1 md:py-2" />
    </div>
  );
};

export default LandingPageLayout;
