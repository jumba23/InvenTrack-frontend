import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateUser } from "../api/apiService";

export const useRequireAuth = (redirectUrl) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await validateUser();
        if (response === "Authenticated") {
          router.push(redirectUrl);
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        // Handle not authenticated scenario, like redirect to login
      }
    };
    checkAuthStatus();
  }, [router, redirectUrl]);
};
