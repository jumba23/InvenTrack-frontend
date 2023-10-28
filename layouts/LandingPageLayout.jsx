import Footer from "@/components/Footer";
import LandingHeader from "@/components/LandingPage/landingHeader";
import LandingMain from "@/components/LandingPage/landingMain";
import React from "react";

const LandingPageLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <LandingMain />
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
