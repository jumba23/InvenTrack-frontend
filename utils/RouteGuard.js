"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LogoSpinner from "@/components/Spinners/LogoSpinner";

const PUBLIC_PATHS = ["/user/login", "/user/signup", "/"];

export function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading, checkAuth } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const authCheck = async () => {
      setIsChecking(true); // Show loading while checking auth
      const isAuthenticated = await checkAuth(); // Check auth

      const path = pathname.split("?")[0];
      // If not authenticated and trying to access a protected page, redirect to login
      if (!isAuthenticated && !PUBLIC_PATHS.includes(path)) {
        router.push("/user/login");
      } else {
        setIsChecking(false); // Done checking, stop loading
      }
    };

    authCheck();
  }, [pathname, router, checkAuth]);

  // Show loading spinner while checking authentication
  if (isChecking || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LogoSpinner />
      </div>
    );
  }

  return children;
}
