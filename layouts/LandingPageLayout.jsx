import React from "react";
import Footer from "@/components/Footer";
import LandingHeader from "@/components/LandingPage/landingHeader";
import LandingMain from "@/components/LandingPage/landingMain";
/** ======================================== SUMMARY ========================================
 * LandingPageLayout is designed to structure the layout of the landing page for non-authenticated users.
 * It presents a welcoming interface that typically includes a header, main content area, and footer.
 * This layout is part of the public-facing portion of the application, aimed at users who have not logged in.
 *
 * Structure:
 * - The layout is organized as a vertical flex container to ensure that the header, main content,
 *   and footer are spaced out evenly and cover the entire height of the viewport.
 * - The LandingHeader component occupies the top portion of the layout, typically containing
 *   navigation links to login or register, as well as branding elements.
 * - The LandingMain component is designated as the primary content area, occupying the bulk of the
 *   screen space. It's intended for promotional material, information about the application, or calls to action.
 * - The Footer component sits at the bottom of the layout, providing additional information or links
 *   that are accessible from the landing page.
 *
 * Usage:
 * - This component should be used in the application's root or index page to render the initial view
 *   for visitors who are not authenticated. It's a critical part of the user journey, designed to engage
 *   users and encourage them to sign up or log in.
 * - The height proportions of the header, main, and footer sections are adjustable based on design
 *   requirements but are set here to maintain a balanced appearance.
 * ==========================================================================================*/
const LandingPageLayout = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <LandingHeader className="h-[20vh]" />
      <LandingMain className="h-[60vh]" />
      <Footer className="h-[20vh]" />
    </div>
  );
};

export default LandingPageLayout;
