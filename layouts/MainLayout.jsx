import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-row h-screen ">
      <Sidebar />
      <div className="flex flex-col w-full h-full">
        <Header />
        <div className="PageContent">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
