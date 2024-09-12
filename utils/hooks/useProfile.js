import useProfileStore from "@/stores/profileStore";

/**
 * useProfile Hook
 *
 * A custom hook that provides profile-related data and actions from the profile store.
 *
 * @returns {Object} The profile store state and actions.
 */
export const useProfile = () => {
  return useProfileStore(); // Directly return profile store from Zustand
};
