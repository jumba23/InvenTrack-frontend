import { useRedirectToInventory } from "@/utils/hooks/useRedirectToInventory";

export default function Home() {
  //this is temporary redirect to inventory page
  useRedirectToInventory("/inventory"); // Redirects to /inventory

  return <div>Redirecting...</div>;
}
