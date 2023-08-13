import MainLayout from "@/layouts/MainLayout";
import { useRedirectToInventory } from "@/utils/hooks/useRedirectToInventory";

export default function Home() {
  //this is temporary redirect to inventory page
  // useRedirectToInventory("/inventory"); // Redirects to /inventory

  return <MainLayout>Inventory</MainLayout>;
}
