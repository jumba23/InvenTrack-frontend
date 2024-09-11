"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  fetchUserProfileById,
  updateProfileImage,
} from "@/utils/api/apiService";
import { useAuth } from "./AuthContext";

/**
 * ProfileContext and Provider
 *
 * This module defines the ProfileContext and ProfileProvider for the application.
 * It manages the state related to user profiles, including profile data, loading state,
 * error handling, and image updates.
 *
 * Key features:
 * - Manages profile state and related functions
 * - Implements profile data loading when user ID is available
 * - Provides function for updating profile image
 * - Integrates with AuthContext to access user ID
 *
 * Usage:
 * - Wrap the application or relevant part of the component tree with ProfileProvider
 * - Use the useProfile hook to access profile state and functions in child components
 */

// Create a new context for profile data
const ProfileContext = createContext({
  profile: null,
  loading: true,
  error: null,
  updateImage: () => {},
});

// Create a custom hook to use the profile context
export function useProfile() {
  return useContext(ProfileContext);
}

// Create a provider component to wrap the application and provide profile data
export function ProfileProvider({ children }) {
  const { authState } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load profile data when user ID is available
  useEffect(() => {
    const loadProfile = async () => {
      if (authState.isAuthenticated && authState.user) {
        try {
          setLoading(true);
          const profileData = await fetchUserProfileById(authState.user.id);
          console.log("Profile data:", profileData);
          setProfile(profileData);
        } catch (error) {
          console.error("Error loading profile:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProfile();
  }, [authState.isAuthenticated, authState.user]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    const updateImage = async (imageFile) => {
      if (!authState.user) {
        throw new Error("User not authenticated");
      }
      try {
        const newImageUrl = await updateProfileImage(
          authState.user.id,
          imageFile
        );
        setProfile((prevProfile) => ({
          ...prevProfile,
          imageUrl: newImageUrl,
        }));
      } catch (error) {
        console.error("Error updating profile image:", error);
        setError(error);
      }
    };

    return {
      profile,
      loading,
      error,
      updateImage,
    };
  }, [profile, loading, error, authState.user]);

  console.log("ProfileContext value", contextValue);

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}
