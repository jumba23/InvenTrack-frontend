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
    const profileId = authState?.profile?.id;
    if (profileId && !profile && !loading) {
      loadProfile(profileId); // Load profile only if not already loaded and not loading
    }
  }, [authState?.profile?.id, profile, loading, loadProfile]);

  return <>{children}</>;
}
