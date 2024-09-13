"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { userLogout, validateUser, userLogin } from "@/utils/api/apiService";
import { useRouter } from "next/navigation";
import useProductStore from "@/stores/productStore";
import useProfileStore from "@/stores/profileStore";

/**
 * ===================================== SUMMARY =====================================
 *
 * AuthContext Component (Context API)
 *
 * Purpose:
 * This component provides authentication context for managing user login, logout, and
 * session validation throughout the InvenTrack application. It is designed to simplify
 * state management for authentication and authorization within the app, using a combination
 * of React's `Context` API and hooks such as `useState`, `useMemo`, and `useCallback`.
 *
 * Key Features:
 * 1. **Auth State Management**:
 *    - Handles `isAuthenticated`, `loading`, and `profile` states for tracking
 *      the current authentication status and user profile data.
 *    - Stores these values in a single `authState` object for easier management and updates.
 *
 * 2. **Login Functionality**:
 *    - Provides a `login` function that authenticates users using email and password,
 *      fetching the user profile and associated data upon successful login.
 *    - Automatically routes the user to the last visited route post-login.
 *
 * 3. **Logout Functionality**:
 *    - Provides a `logout` function that clears user data from both the session and the
 *      zustand stores (for products and profiles), before redirecting the user to the home page.
 *
 * 4. **Authentication Check**:
 *    - `checkAuth` function verifies the user's session or token and sets the
 *      authentication state accordingly. This is used to maintain session persistence.
 *
 * 5. **Logout Modal Management**:
 *    - Provides a simple `toggleLogoutModal` function to show or hide a modal for logging out.
 *
 * State Breakdown:
 * - `authState`: Contains `isAuthenticated`, `loading`, and `profile`.
 * - `showLogoutModal`: Tracks whether the logout confirmation modal is visible.
 * - `lastRoute`: Stores the last visited route before logout, allowing users to return to it upon login.
 *
 * Usage:
 * Wrap this provider around your app or individual pages where authentication state is required.
 * Example:
 *
 * ```jsx
 * <AuthProvider>
 *   <MyApp />
 * </AuthProvider>
 * ```
 * Components can then use `useAuth()` to access the authentication context:
 *
 * ```jsx
 * const { login, logout, authState, checkAuth } = useAuth();
 * ```
 *
 * ===================================================================================
 */

// Creating the AuthContext with default values
const AuthContext = createContext({
  authState: {
    isAuthenticated: false,
    loading: true,
    user: null,
  },
  showLogoutModal: false,
  login: () => {},
  logout: () => {},
  toggleLogoutModal: () => {},
  checkAuth: () => Promise.resolve(),
});

// Custom hook to access AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component that wraps the application to provide authentication state and functionality
export function AuthProvider({ children }) {
  const router = useRouter();
  const { loadProducts, reset: resetProducts } = useProductStore();
  const { loadProfile, reset: resetProfile } = useProfileStore();

  // Initializing auth state
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,
    profile: null,
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [lastRoute, setLastRoute] = useState("/dashboard");

  /**
   * checkAuth function:
   * - Checks the user's authentication status by validating their token or session.
   * - If the user is authenticated, `isAuthenticated` is set to true.
   * - If not, the user is logged out and redirected accordingly.
   *
   * Returns:
   *   true if authenticated, false otherwise.
   */
  const checkAuth = useCallback(async () => {
    try {
      const response = await validateUser(); // Validate the user token/session

      if (response === "Authenticated") {
        setAuthState((prev) => ({
          ...prev,
          isAuthenticated: true,
          loading: false,
        }));
        return true;
      } else {
        setAuthState({
          isAuthenticated: false,
          loading: false,
          profile: null,
        });
        return false;
      }
    } catch (error) {
      console.error("Authentication check failed", error);
      setAuthState({
        isAuthenticated: false,
        loading: false,
        profile: null,
      });
      return false;
    }
  }, []);

  /**
   * login function:
   * - Logs in the user by making an API call with their email and password.
   * - Loads additional user data (products, profile) upon successful login.
   * - Redirects the user to their last visited route (if available).
   *
   * Params:
   *  - email: User's email address.
   *  - password: User's password.
   */
  const login = useCallback(
    async (email, password) => {
      try {
        const response = await userLogin(email, password); // Login API
        setAuthState({
          isAuthenticated: true,
          loading: false,
          profile: response.profile,
        });
        loadProducts(); // Load products based on user data
        loadProfile(response.profile.id); // Load user profile using ID from user data
        setShowLogoutModal(false); // Ensure the logout modal is closed after login
        router.push(lastRoute); // Route to the last visited route
      } catch (error) {
        console.error("Login failed", error);
        setAuthState((prev) => ({ ...prev, isAuthenticated: false }));
        throw error;
      }
    },
    [router, lastRoute, loadProducts, loadProfile]
  );

  /**
   * logout function:
   * - Logs the user out by clearing session and profile data, and resetting zustand state.
   * - Redirects the user to the home page upon successful logout.
   */
  const logout = useCallback(async () => {
    try {
      await userLogout(); // Logout API call
      setAuthState({
        isAuthenticated: false,
        loading: false,
        profile: null,
      });
      resetProducts();
      resetProfile();
      toggleLogoutModal(); // Close the logout modal after logout
      router.push("/"); // Route to home page after logout
    } catch (error) {
      console.error("Logout Failed:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, resetProducts, resetProfile]);

  /**
   * toggleLogoutModal function:
   * - Toggles the visibility of the logout confirmation modal.
   */
  const toggleLogoutModal = useCallback(() => {
    setShowLogoutModal((prev) => !prev);
  }, []);

  // Memoize the context value to optimize performance and prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      authState,
      showLogoutModal,
      login,
      logout,
      toggleLogoutModal,
      checkAuth,
    }),
    [authState, showLogoutModal, login, logout, toggleLogoutModal, checkAuth]
  );

  // Providing the auth context to children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
