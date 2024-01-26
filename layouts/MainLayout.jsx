import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { logoutModal as LogoutModal } from "@/components/Modals/logoutModal";
import { useAuth } from "../context/AuthContext";

const MainLayout = ({ children }) => {
  const { showLogoutModal } = useAuth();
  // const context = useAuth();
  // console.log("MainLayout: context", context);

  return (
    <>
      {showLogoutModal && <LogoutModal />}
      <div className="flex flex-row h-screen ">
        <Sidebar />
        <div className="flex flex-col w-full h-full">
          <Header />
          <div className="PageContent">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
