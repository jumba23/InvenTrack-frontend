"use client";

import { useEffect } from "react";
import { useProfile } from "@/utils/hooks/useProfile";
import { useAuth } from "@/context/AuthContext"; // Assuming user data comes from AuthContext

/**
 * ProfileInitializer Component
 *
 * This component is responsible for initializing the user profile data when the application loads.
 */
export default function ProfileInitializer({ children }) {
  const { loadProfile, profile, loading } = useProfile();
  const { authState } = useAuth(); // Assuming you have access to the userId here

  useEffect(() => {
    const userId = authState?.user?.id; // Assuming you get the userId from auth state
    if (userId && !profile && !loading) {
      loadProfile(userId); // Load profile only if not already loaded and not loading
    }
  }, [authState?.user?.id, profile, loading, loadProfile]);

  return <>{children}</>;
}
