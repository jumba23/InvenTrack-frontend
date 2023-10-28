import Footer from "@/components/Footer";
import LandingHeader from "@/components/LandingPage/landingHeader";
import LandingMain from "@/components/LandingPage/landingMain";
import React from "react";

const LandingPageLayout = () => {
  return (
    <>
      <LandingHeader />;
      <LandingMain />;
      <Footer />;
    </>
  );
};

export default LandingPageLayout;
