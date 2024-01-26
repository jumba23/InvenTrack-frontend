import Footer from "@/components/Footer";
import LandingHeader from "@/components/LandingPage/landingHeader";
import LandingMain from "@/components/LandingPage/landingMain";
import React from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";

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
