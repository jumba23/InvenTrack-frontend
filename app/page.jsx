"use client";
import MainLayout from "@/layouts/MainLayout";
import { useRedirectToInventory } from "@/utils/hooks/useRedirectToInventory";
import InventoryPage from "./inventory/page";
import DashboardPage from "./dashboard/page";
import LandingPageLayout from "@/layouts/LandingPageLayout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  //this is temporary redirect to inventory page
  // useRedirectToInventory("/inventory"); // Redirects to /inventory

  // const [hasToken, setHasToken] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/inventory");
    }
    console.log("User Auth token", token);
  }, []);

  return <LandingPageLayout />;
}
