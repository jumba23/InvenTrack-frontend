"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RedirectToInventory() {
  const router = useRouter();

  // You can use the useEffect hook to navigate after the component mounts
  useEffect(() => {
    router.push("/inventory");
  }, [router]);

  return <main>Redirecting to Inventory...</main>;
}
