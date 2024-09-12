"use client";

import { useEffect } from "react";
import { useProfile } from "@/utils/hooks/useProfile";

/**
 * ProfileInitializer Component
 *
 * This component is responsible for initializing the user profile data when the application loads.
 * It uses the useProfile hook to trigger the initial loading of the user profile.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @returns {React.ReactNode} The child components
 */
export default function ProfileInitializer({ children }) {
  const { loadProfile } = useProfile();

  useEffect(() => {
    // Trigger initial profile loading when the component mounts
    loadProfile();
  }, [loadProfile]);

  // Render children without modifying them
  return <>{children}</>;
}
