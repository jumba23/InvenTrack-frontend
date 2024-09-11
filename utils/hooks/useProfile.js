"use client";

import { useEffect } from "react";
import useProfileStore from "@/stores/profileStore";
import { useAuth } from "@/context/AuthContext";

/**
 * useProfile Hook
 *
 * This custom hook manages the user profile data and its loading state.
 * It integrates with the authentication state to load the profile when a user is authenticated
 * and reset it when they log out.
 *
 * Features:
 * - Automatically loads user profile when authenticated
 * - Resets profile data on logout
 * - Provides access to profile data, loading state, and error state
 * - Offers a method to update the profile image
 *
 * @returns {Object} An object containing profile data, loading state, error state, and updateImage function
 */
export function useProfile() {
  const { authState } = useAuth();
  const { profile, loading, error, loadProfile, updateImage, reset } =
    useProfileStore();

  useEffect(() => {
    if (authState.isAuthenticated && authState.user && !profile && !loading) {
      loadProfile(authState.user.id);
    }
    if (!authState.isAuthenticated) {
      reset();
    }
  }, [
    authState.isAuthenticated,
    authState.user,
    profile,
    loading,
    loadProfile,
    reset,
  ]);

  return { profile, loading, error, updateImage };
}
