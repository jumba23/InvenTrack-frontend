"use client";
import MainLayout from "@/layouts/MainLayout";
import { useRedirectToInventory } from "@/utils/hooks/useRedirectToInventory";
import InventoryPage from "./inventory/page";
import DashboardPage from "./dashboard/page";
import LoginForm from "./user/login/page";
import LandingPageLayout from "@/layouts/LandingPageLayout";

export default function Home() {
  //this is temporary redirect to inventory page
  // useRedirectToInventory("/inventory"); // Redirects to /inventory

  return <LandingPageLayout />;
}
