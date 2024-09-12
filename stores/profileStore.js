import { create } from "zustand";
import { persist } from "zustand/middleware";
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
    (set, get) => ({
      profile: null,
      loading: false,
      error: null,

      setProfile: (profile) => set({ profile }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      loadProfile: async (userId) => {
        set({ loading: true });
        try {
          const profileData = await fetchUserProfileById(userId);
          set({ profile: profileData, error: null });
        } catch (error) {
          console.error("Error loading profile:", error);
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      },

      updateImage: async (userId, imageFile) => {
        try {
          const newImageUrl = await updateProfileImage(userId, imageFile);
          set((state) => ({
            profile: { ...state.profile, imageUrl: newImageUrl },
          }));
        } catch (error) {
          console.error("Error updating profile image:", error);
          set({ error: error.message });
        }
      },

      reset: () => set({ profile: null, loading: false, error: null }),
    }),
    {
      name: "profile-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useProfileStore;
