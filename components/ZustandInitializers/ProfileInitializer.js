// ZustandInitializers/ProfileInitializer.js
"use client";

import { useEffect } from "react";
import { useProfile } from "@/utils/hooks/useProfile";
import { useAuth } from "@/context/AuthContext"; // Assuming user data comes from AuthContext
import { ErrorTypes } from "@/utils/errorHandling/errorTypes";

/**
 * ProfileInitializer Component
 *
 * This component is responsible for initializing the user profile data when the application loads.
 * Now includes error handling for profile loading failures.
 */
export default function ProfileInitializer({ children }) {
  const { loadProfile, profile, loading, setError } = useProfile();
  const { authState } = useAuth(); // Assuming you have access to the userId here

  useEffect(() => {
    const profileId = authState?.profile?.id;
    if (profileId && !profile && !loading) {
      loadProfile(profileId).catch((error) => {
        setError({
          type: ErrorTypes.API_ERROR,
          message: "Failed to load profile",
        });
        console.error(
          "ProfileInitializer: Error loading profile for user",
          profileId,
          error
        );
      });
    }
  }, [authState?.profile?.id, profile, loading, loadProfile, setError]);

  return <>{children}</>;
}
