import { AuthProvider, useAuth } from "@/context/AuthContext";
import React from "react";
import LandingPageLayout from "./LandingPageLayout";
import MainLayout from "./MainLayout";

const IndexLayout = () => {
  const { isAuthenticated } = useAuth();
  console.log("IndexLayout: is Authenticated", isAuthenticated);

  return <>{isAuthenticated ? <MainLayout /> : <LandingPageLayout />}</>;
};

export default IndexLayout;
