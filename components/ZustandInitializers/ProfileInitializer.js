"use client";

import { useEffect } from "react";
import { useProfile } from "@/utils/hooks/useProfile";

export default function ProfileInitializer({ children }) {
  const { loadProfile } = useProfile();

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return <>{children}</>;
}
