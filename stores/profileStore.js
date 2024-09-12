import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  fetchUserProfileById,
  updateProfileImage,
} from "@/utils/api/apiService";

/**
 * Profile Store
 *
 * This Zustand store manages the state for user profiles in the application.
 * It provides actions for loading user profiles, updating profile images,
 * and managing loading and error states.
 *
 * The store uses the persist middleware to save its state in localStorage,
 * allowing for data persistence across page reloads.
 */
const useProfileStore = create(
  persist(
    (set) => ({
      profile: null,
      loading: false,
      error: null,

      // Set profile directly
      setProfile: (profile) => set({ profile }),

      // Load profile with userId
      loadProfile: async (profileId) => {
        set({ loading: true });
        try {
          const profileData = await fetchUserProfileById(profileId); // API call to get profile data
          set({ profile: profileData, error: null });
        } catch (error) {
          console.error("Error loading profile:", error);
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      },

      // Update profile image and update store
      updateImage: async (userId, imageFile) => {
        try {
          const newImageUrl = await updateProfileImage(userId, imageFile);
          set((state) => ({
            profile: { ...state.profile, profile_image_url: newImageUrl },
          }));
          return newImageUrl;
        } catch (error) {
          console.error("Error updating profile image:", error);
          set({ error: "Failed to upload image" });
          throw error;
        }
      },

      // Reset profile data
      reset: () => set({ profile: null, loading: false, error: null }),
    }),
    {
      name: "profile-storage", // Store key in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export default useProfileStore;
